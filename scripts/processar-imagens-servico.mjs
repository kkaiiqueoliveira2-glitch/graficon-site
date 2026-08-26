/**
 * Processa as fotos novas das páginas de serviço.
 *
 * Você baixa em alta e joga em `imagens-novas/` com o nome do alvo. O script
 * corta pro 16:9 que o layout usa, redimensiona pra 1800x1014 (o dobro do que
 * as antigas tinham: elas estavam em 900x507 e o navegador precisava ampliar,
 * que é por que saíam borradas) e encode em WebP mirando 120-180KB.
 *
 * Uso:
 *   node scripts/processar-imagens-servico.mjs           (grava em public/services)
 *   node scripts/processar-imagens-servico.mjs --teste    (só mostra o que faria)
 */
import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

const ENTRADA = "imagens-novas";
const SAIDA = "public/services";
const LARGURA = 1800;
const ALTURA = 1014; // 16:9, mesmo enquadramento que as páginas já usam
const ALVO_KB = { min: 110, max: 190 };

/** nome que você dá ao arquivo -> arquivo final que o site consome */
const ALVOS = {
  galvanizacao: "svc-galvanizacao.webp",
  preparacao: "svc-preparacao.webp",
  revestimento: "svc-revestimento.webp",
  usinagem: "svc-usinagem.webp",
  especiais: "svc-especiais.webp",
  prova: "svc-prova.webp",
  hidraulico: "svc-hidraulico.webp",
};

const teste = process.argv.includes("--teste");

if (!existsSync(ENTRADA)) {
  mkdirSync(ENTRADA, { recursive: true });
  console.log(`Criei a pasta ${ENTRADA}/. Jogue as fotos lá com estes nomes:`);
  for (const k of Object.keys(ALVOS)) console.log(`  ${k}.jpg`);
  process.exit(0);
}

const arquivos = readdirSync(ENTRADA).filter((f) =>
  [".jpg", ".jpeg", ".png", ".webp"].includes(extname(f).toLowerCase())
);

if (arquivos.length === 0) {
  console.log(`Nada em ${ENTRADA}/. Nomes aceitos: ${Object.keys(ALVOS).join(", ")}`);
  process.exit(0);
}

/**
 * Busca a qualidade que cai dentro da faixa de KB em vez de chutar um número.
 * Foto com muito detalhe (cavaco, textura de borracha) pesa bem mais que foto
 * lisa na mesma qualidade, então valor fixo erraria pros dois lados.
 */
async function encodeNaFaixa(pipeline) {
  let melhor = null;
  for (const q of [82, 76, 70, 64, 58, 52, 46]) {
    const buf = await pipeline.clone().webp({ quality: q, effort: 6 }).toBuffer();
    const kb = buf.length / 1024;
    melhor = { buf, q, kb };
    if (kb <= ALVO_KB.max) break;
  }
  return melhor;
}

let ok = 0;
for (const arq of arquivos) {
  const chave = basename(arq, extname(arq)).toLowerCase();
  const destino = ALVOS[chave];
  if (!destino) {
    console.log(`? ${arq} — nome não reconhecido, pulando. Use: ${Object.keys(ALVOS).join(", ")}`);
    continue;
  }

  const entrada = join(ENTRADA, arq);
  const meta = await sharp(entrada).metadata();

  if (meta.width < LARGURA) {
    console.log(
      `! ${arq} — ${meta.width}x${meta.height}. Menor que ${LARGURA}px de largura: ` +
        `ampliar não cria detalhe, o resultado sai mole. Procure uma versão maior.`
    );
    continue;
  }

  const pipeline = sharp(entrada)
    .resize(LARGURA, ALTURA, { fit: "cover", position: "attention" })
    .sharpen({ sigma: 0.6 });

  const r = await encodeNaFaixa(pipeline);
  const origemKB = (statSync(entrada).size / 1024).toFixed(0);

  if (teste) {
    console.log(
      `~ ${arq} (${meta.width}x${meta.height}, ${origemKB}KB) -> ${destino} ` +
        `${LARGURA}x${ALTURA}, q${r.q}, ${r.kb.toFixed(0)}KB`
    );
  } else {
    await sharp(r.buf).toFile(join(SAIDA, destino));
    console.log(
      `OK ${arq} (${meta.width}x${meta.height}) -> ${destino} ` +
        `${LARGURA}x${ALTURA}, q${r.q}, ${r.kb.toFixed(0)}KB`
    );
    ok++;
  }
}

console.log(teste ? "\n(teste, nada foi gravado)" : `\n${ok} imagem(ns) gravada(s) em ${SAIDA}/`);
