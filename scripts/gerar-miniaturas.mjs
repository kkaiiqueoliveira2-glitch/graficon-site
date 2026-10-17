// Gera as versões menores das fotos de public/ (16/10/2026).
//
//   node scripts/gerar-miniaturas.mjs
//
// As fotos de serviço têm 1800 px, mas no card da home aparecem com ~400 px.
// Cada foto ganha uma irmã "-<largura>.webp" e o <img> usa srcset (ver
// src/lib/miniatura.ts): o navegador baixa a pequena no card e a grande só onde
// ela aparece grande. Rodar de novo sempre que trocar uma foto dessas pastas.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ALVOS = [
  { pasta: "public/services", largura: 720 },
  // 1200: card de serviço da home ocupa a largura do celular (color-change-card, 17/10)
  { pasta: "public/services", largura: 1200, qualidade: 62 },
  { pasta: "public/segments", largura: 840 },
  { pasta: "public", largura: 640, so: ["cilindros-quem-somos.webp"] },
];

for (const { pasta, largura, so, qualidade = 72 } of ALVOS) {
  const arquivos = (so ?? fs.readdirSync(pasta)).filter(
    (f) => f.endsWith(".webp") && !/-\d+\.webp$/.test(f),
  );
  for (const f of arquivos) {
    const origem = path.join(pasta, f);
    const destino = path.join(pasta, f.replace(/\.webp$/, `-${largura}.webp`));
    await sharp(origem).resize({ width: largura }).webp({ quality: qualidade }).toFile(destino);
    const kb = (p) => Math.round(fs.statSync(p).size / 1024);
    console.log(`${origem} ${kb(origem)} KB -> ${destino} ${kb(destino)} KB`);
  }
}
