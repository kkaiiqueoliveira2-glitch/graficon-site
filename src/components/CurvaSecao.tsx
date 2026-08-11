/**
 * Curva de transição entre seções, com o fio da Cor 3 por cima.
 *
 * Esse SVG estava copiado seis vezes (hero, cards CMYK, depoimentos, duas no
 * formulário de contato e rodapé). Quando a paleta trocou pelo manual da marca,
 * três dessas cópias ficaram pra trás e continuaram com o ciano antigo no fio —
 * dava pra ver a diferença rolando a página. Agora existe um lugar só.
 *
 * `posicao`:
 *   "base" - curva na parte de baixo da seção, descendo pra próxima
 *   "topo" - curva no topo da seção, vindo da seção anterior
 *
 * `corDestino` é a cor da seção PRA ONDE a curva vai (o preenchimento abaixo do
 * fio). Passar um token: "hsl(0 0% 100%)" pra branco, "hsl(var(--muted))" pro
 * cinza claro.
 */

type Props = {
  posicao: "base" | "topo";
  corDestino: string;
};

const CAMINHO = {
  base: {
    preenchimento: "M0,70 C360,140 1080,10 1440,80 L1440,120 L0,120 Z",
    fio: "M0,70 C360,140 1080,10 1440,80",
    classe: "hero-curve",
  },
  topo: {
    preenchimento: "M0,0 L1440,0 L1440,50 C1080,110 360,-10 0,40 Z",
    fio: "M0,40 C360,-10 1080,110 1440,50",
    classe: "section-curve-top",
  },
} as const;

const CurvaSecao = ({ posicao, corDestino }: Props) => {
  const c = CAMINHO[posicao];
  return (
    <div className={c.classe} aria-hidden>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d={c.preenchimento} fill={corDestino} />
        <path
          d={c.fio}
          fill="none"
          stroke="hsl(var(--brand-3))"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

export default CurvaSecao;
