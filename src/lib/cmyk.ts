/**
 * As quatro cores de seleção do CMYK.
 *
 * É a única coisa no site que sai da paleta azul do manual da marca, e é
 * PROPOSITAL (confirmado pelo cliente em 11/08/2026): a Graficon é ferramentaria
 * gráfica, e ciano/magenta/amarelo/preto é o vocabulário do setor que ela
 * atende. Quem é do ramo reconhece na hora.
 *
 * Não trocar por tons de azul "pra ficar dentro do manual" — o manual rege a
 * identidade da marca, e aqui a cor está funcionando como referência ao ramo do
 * cliente, não como cor institucional.
 *
 * Fica num arquivo só porque estava declarado igual em CmykHighlights e em
 * SectionDivider — duas cópias da mesma paleta é como o fio das curvas de seção
 * acabou divergindo na troca de marca.
 */
export const CMYK = {
  cyan: "#00A5E0",
  magenta: "#D81B60",
  yellow: "#FFB300",
  black: "#212121",
} as const;
