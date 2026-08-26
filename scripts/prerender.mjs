/**
 * Prerender (SSG) das rotas do site para SEO.
 *
 * Por que existe: o site é um SPA Vite + React e o conteúdo (mais as meta tags
 * injetadas pelo hook usePageSEO via document) só aparece depois que o JS roda.
 * O Google indexa muito melhor HTML já renderizado. Este script sobe um
 * `vite preview` sobre o /dist, visita cada rota com um Chromium headless,
 * espera a renderização + a injeção de SEO, e grava o HTML final em
 * dist/<rota>/index.html. Roda automaticamente no `postbuild`.
 */
import { preview } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";

// No ambiente da Vercel/CI o Chromium do Puppeteer não roda (faltam libs de
// sistema). Usamos @sparticuz/chromium (Chromium com libs embutidas) +
// puppeteer-core. No local usamos o Puppeteer completo normalmente.
async function getBrowser() {
  const isServerless = !!(process.env.VERCEL || process.env.CI || process.env.AWS_REGION);
  if (isServerless) {
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteer = (await import("puppeteer-core")).default;
    return puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  const puppeteer = (await import("puppeteer")).default;
  return puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

// Rotas indexáveis (mesmo conjunto do sitemap.xml).
const ROUTES = [
  "/",
  "/sobre",
  "/o-que-fazemos",
  "/como-funciona-revestimento-de-cilindros",
  "/o-que-e-revestimento-grafico",
  "/diferenca-entre-gravacao-e-revestimento",
  "/problemas-desgaste-cilindros-graficos",
  "/servicos/galvanizacao-e-cromo",
  "/servicos/preparacao-tecnica-e-tratamentos",
  "/servicos/processos-de-revestimento",
  "/servicos/usinagem-e-fabricacao",
  "/servicos/cilindros-especiais",
  "/servicos/prova-e-analise",
  "/servicos/cilindro-hidraulico-e-haste",
  "/privacidade",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const server = await preview({
    preview: { port: 4185, strictPort: true },
    logLevel: "warn",
  });
  const base = `http://localhost:4185`;

  const browser = await getBrowser();

  let ok = 0;
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      // Sinaliza às animações (CountUp etc.) que estamos no prerender, para
      // renderizarem o valor final direto no HTML estático.
      await page.evaluateOnNewDocument(() => {
        window.__PRERENDER__ = true;
      });
      const url = `${base}${route}`;
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      // Garante que o React montou e o usePageSEO já rodou (useEffect).
      await page.waitForSelector("footer", { timeout: 30000 }).catch(() => {});
      await sleep(500);

      const html = await page.evaluate(
        () => "<!DOCTYPE html>\n" + document.documentElement.outerHTML
      );

      const outDir =
        route === "/" ? distDir : join(distDir, route.replace(/^\/|\/$/g, ""));
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, "index.html"), html, "utf8");
      console.log(`prerendered ${route} -> ${join(outDir, "index.html").replace(distDir, "dist")}`);
      ok++;
      await page.close();
    }
    // Página 404 (dist/404.html).
    //
    // Antes, qualquer endereço inexistente caía no rewrite genérico do
    // vercel.json e recebia a home pré-renderizada com status 200: soft 404 em
    // escala, e o NotFound nunca aparecia no HTML. Agora geramos o arquivo
    // visitando um caminho que não casa com nenhuma rota, deixando o catch-all
    // do React Router renderizar o NotFound. O vercel.json serve este arquivo
    // com status 404 de verdade.
    const page404 = await browser.newPage();
    await page404.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });
    await page404.goto(`${base}/__404__`, { waitUntil: "networkidle2", timeout: 60000 });
    await page404.waitForSelector("footer", { timeout: 30000 }).catch(() => {});
    await sleep(500);
    const html404 = await page404.evaluate(
      () => "<!DOCTYPE html>\n" + document.documentElement.outerHTML
    );
    await writeFile(join(distDir, "404.html"), html404, "utf8");
    console.log("prerendered 404 -> dist\\404.html");
    await page404.close();
  } finally {
    await browser.close();
    await server.httpServer.close();
  }

  console.log(`\nPrerender concluído: ${ok}/${ROUTES.length} rotas + 404.html.`);
  if (ok !== ROUTES.length) process.exitCode = 1;
}

run().catch((err) => {
  console.error("Falha no prerender:", err);
  process.exit(1);
});
