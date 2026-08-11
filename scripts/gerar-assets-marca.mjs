/**
 * Gera os assets de marca e as versões WebP das fotos pesadas do `public/`.
 *
 * Fonte da marca: manual oficial recebido do cliente em 10/08/2026, guardado no
 * workspace da Conect+ em `clientes/Graficon-Revestimento/identidade/`.
 * Os PNGs originais do kit são grandes (o horizontal tem 6897px de largura) e
 * não servem pra ir direto pro site.
 *
 * Uso: node scripts/gerar-assets-marca.mjs
 *
 * É um passo manual de propósito — roda quando o kit da marca muda, não a cada
 * build. Os arquivos gerados são versionados no git.
 */
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const KIT = "C:/Users/Administrator/Desktop/agencia-conect-plus/clientes/Graficon-Revestimento/identidade";

/** Logos e ícones derivados do kit oficial. */
const MARCA = [
  // Header: o logo horizontal completo, com o descritor "Ferramentaria Gráfica".
  { de: `${KIT}/logo-horizontal.png`, para: "logo-graficon-horizontal.webp", largura: 640 },
  { de: `${KIT}/logo-horizontal.png`, para: "logo-graficon-horizontal.png", largura: 640 },
  // (o logo branco do footer sai de `marcaEmBrancoPuro`, mais abaixo)
  // Ícone "G" isolado — favicon e marca d'água.
  { de: `${KIT}/icone.png`, para: "icone-graficon.png", largura: 512 },
  { de: `${KIT}/icone.png`, para: "favicon-192.png", largura: 192 },
  { de: `${KIT}/icone.png`, para: "apple-touch-icon.png", largura: 180 },
];

/**
 * Fotos que estavam em PNG no `public/`, somando ~6,7 MB. PNG só se justifica
 * quando precisa de transparência; essas quatro são fotos opacas.
 * `cilindros-quem-somos` é a exceção — tem alpha e continua com alpha em WebP.
 */
const FOTOS = [
  { arquivo: "card-revestimento.png", largura: 640 },
  { arquivo: "card-analise.png", largura: 640 },
  { arquivo: "card-precisao.png", largura: 640 },
  { arquivo: "card-sob-medida.png", largura: 640 },
  { arquivo: "cilindros-quem-somos.png", largura: 1100, alpha: true },
];

const kb = (n) => `${Math.round(n / 1024)} KB`;

/**
 * Devolve a marca em branco puro, na largura pedida.
 *
 * Sai do `logo-horizontal.png` (o colorido do manual), não do
 * `logo-horizontal-branco.png` do kit: aquele foi gerado removendo o fundo pelo
 * brilho de cada pixel e o alfa dele não passa de 207, então sobre o navy as
 * letras aparecem prateadas em vez de brancas. O colorido tem alfa limpo
 * (0–255), então dá pra usar o alfa dele como máscara e chapar #ffffff por
 * baixo — a forma continua sendo exatamente a do manual.
 */
async function marcaEmBrancoPuro(largura) {
  const base = await sharp(`${KIT}/logo-horizontal.png`)
    .resize({ width: largura, withoutEnlargement: true })
    .ensureAlpha()
    .toBuffer();
  const { width, height } = await sharp(base).metadata();
  const alfa = await sharp(base).extractChannel("alpha").toBuffer();
  return sharp({
    create: { width, height, channels: 3, background: "#ffffff" },
  })
    .joinChannel(alfa)
    .png()
    .toBuffer();
}

/**
 * Cartão de compartilhamento 1200×630 (og:image).
 *
 * Antes o og:image era o logo quadrado de 13 KB: no WhatsApp e no LinkedIn ele
 * aparecia recortado num quadradinho, sem dizer o que a empresa faz. Como o
 * WhatsApp é o canal principal de conversão do site, o link colado numa conversa
 * é uma peça de venda — vale ter o degradê da marca, o logo branco e a linha do
 * que a Graficon faz.
 */
async function gerarCartaoCompartilhamento() {
  const L = 1200;
  const A = 630;
  const fundo = Buffer.from(`
    <svg width="${L}" height="${A}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#101434"/>
          <stop offset="100%" stop-color="#1b2e75"/>
        </linearGradient>
      </defs>
      <rect width="${L}" height="${A}" fill="url(#g)"/>
      <rect x="0" y="${A - 10}" width="${L}" height="10" fill="#71a0e2"/>
      <text x="80" y="410" font-family="Poppins, Jost, Arial, sans-serif"
            font-size="52" font-weight="800" fill="#ffffff">
        Revestimento e recuperação
      </text>
      <text x="80" y="478" font-family="Poppins, Jost, Arial, sans-serif"
            font-size="52" font-weight="800" fill="#71a0e2">
        de cilindros industriais
      </text>
      <text x="80" y="540" font-family="Jost, Arial, sans-serif"
            font-size="28" fill="#ffffff" opacity="0.75">
        +40 anos de profissão · São Paulo
      </text>
    </svg>`);

  const camadas = [];
  if (existsSync(`${KIT}/logo-horizontal.png`)) {
    camadas.push({ input: await marcaEmBrancoPuro(460), top: 90, left: 80 });
  }

  const destino = path.join(PUBLIC, "og-graficon.jpg");
  const { size } = await sharp(fundo)
    .composite(camadas)
    .jpeg({ quality: 88 })
    .toFile(destino);
  console.log(`  ${"og-graficon.jpg".padEnd(34)} ${kb(size)}  (1200×630)`);
}

async function main() {
  await mkdir(PUBLIC, { recursive: true });

  console.log("Marca (kit oficial → public/)");
  for (const { de, para, largura } of MARCA) {
    if (!existsSync(de)) {
      console.warn(`  ! não achei ${de} — pulando ${para}`);
      continue;
    }
    const destino = path.join(PUBLIC, para);
    const img = sharp(de).resize({ width: largura, withoutEnlargement: true });
    const saida = para.endsWith(".webp")
      ? img.webp({ quality: 92, alphaQuality: 100 })
      : img.png({ compressionLevel: 9, palette: true });
    const { size } = await saida.toFile(destino);
    console.log(`  ${para.padEnd(34)} ${kb(size)}`);
  }

  console.log("\nMarca em branco puro (footer, fundo navy)");
  if (existsSync(`${KIT}/logo-horizontal.png`)) {
    const branco = await marcaEmBrancoPuro(640);
    for (const [nome, fn] of [
      ["logo-graficon-branco.webp", (s) => s.webp({ quality: 92, alphaQuality: 100 })],
      ["logo-graficon-branco.png", (s) => s.png({ compressionLevel: 9 })],
    ]) {
      const { size } = await fn(sharp(branco)).toFile(path.join(PUBLIC, nome));
      console.log(`  ${nome.padEnd(34)} ${kb(size)}`);
    }
  } else {
    console.warn("  ! logo-horizontal.png não encontrado no kit");
  }

  console.log("\nFotos (PNG → WebP)");
  let antes = 0;
  let depois = 0;
  for (const { arquivo, largura, alpha } of FOTOS) {
    const origem = path.join(PUBLIC, arquivo);
    if (!existsSync(origem)) {
      console.warn(`  ! não achei ${arquivo} — pulando`);
      continue;
    }
    // `sharp().metadata()` não traz `size` quando a entrada é um caminho —
    // o tamanho do original vem do fs.
    const { size: tamanhoOriginal } = await stat(origem);
    antes += tamanhoOriginal;
    const destino = origem.replace(/\.png$/, ".webp");
    const { size } = await sharp(origem)
      .resize({ width: largura, withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: alpha ? 100 : 80 })
      .toFile(destino);
    depois += size;
    console.log(
      `  ${arquivo.padEnd(34)} ${kb(tamanhoOriginal).padStart(9)} → ${kb(size)}`
    );
  }
  console.log(`\n  total: ${kb(antes)} → ${kb(depois)}`);
  console.log("\n  Os .png originais continuam no repo até o preview ser aprovado.");

  console.log("\nCartão de compartilhamento");
  await gerarCartaoCompartilhamento();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
