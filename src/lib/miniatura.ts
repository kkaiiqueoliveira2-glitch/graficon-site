// Caminho da versão menor de uma foto de public/, gerada por
// scripts/gerar-miniaturas.mjs ("/services/svc-x.webp" -> "/services/svc-x-720.webp").
export const miniatura = (src: string, largura: number) =>
  src.replace(/\.webp$/, `-${largura}.webp`);
