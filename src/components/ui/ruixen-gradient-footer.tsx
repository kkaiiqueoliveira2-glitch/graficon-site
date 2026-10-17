import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Rodapé com brilho que sobe do chão no fim da página. Ideia do "Ruixen
 * Gradient Footer" do 21st.dev (escolhido pelo Kaique em 17/10/2026), com o
 * arco-íris trocado pelos azuis do manual da Graficon.
 *
 * O brilho é um SVG fixo no pé da tela que cresce (scaleY) na última faixa de
 * rolagem e chega à altura cheia no fim da página. Diferenças do original:
 * - a escala é escrita direto no elemento, uma vez por quadro, sem re-render
 *   do React a cada evento de rolagem;
 * - longe do fim ele fica invisível (visibility: hidden), em vez da faixa fina
 *   fixa no pé da tela durante a página inteira: elemento fixo com desfoque
 *   aberto o tempo todo é o tipo de coisa que pesa no Safari do iPhone.
 */
type Parada = { offset: number; color: string };

const VBW = 1271;
const VBH = 599;

// Do chão (0) pro alto (1): navy escuro, Cor 2, Cor 3, azul quase branco, Cor 3,
// Cor 2 e transparente, que some no navy do rodapé.
export const PARADAS_GRAFICON: Parada[] = [
  { offset: 0, color: "#101434" },
  { offset: 0.18, color: "#3545a8" },
  { offset: 0.3, color: "#71a0e2" },
  { offset: 0.42, color: "#dbe7fb" },
  { offset: 0.58, color: "#71a0e2" },
  { offset: 0.74, color: "#3545a8" },
  { offset: 1, color: "#3545a800" },
];

// curva de altura: centro mais alto, pontas mais baixas
function alturas(n: number, pico: number, vale: number): number[] {
  const meio = (n - 1) / 2;
  return Array.from({ length: n }, (_, i) => {
    const t = meio === 0 ? 0 : Math.abs(i - meio) / meio;
    return pico * VBH * (vale + (1 - vale) * (1 - Math.pow(t, 1.24)));
  });
}

type Props = {
  children?: ReactNode;
  /** altura do brilho; é também a rolagem que ele leva pra subir */
  alturaBrilho?: string;
  colunas?: number;
  desfoque?: number;
  pico?: number;
  vale?: number;
  paradas?: Parada[];
  className?: string;
  style?: CSSProperties;
};

export function RuixenGradientFooter({
  children,
  alturaBrilho = "clamp(180px, 38vh, 420px)",
  colunas = 9,
  desfoque = 15,
  pico = 0.98,
  vale = 0.55,
  paradas = PARADAS_GRAFICON,
  className,
  style,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const faixa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = faixa.current;
    if (!el) return;
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const h = el.offsetHeight || 1;
      const falta = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      const t = Math.max(0, Math.min(1, (h - falta) / h));
      el.style.transform = `scaleY(${t})`;
      el.style.visibility = t > 0.001 ? "visible" : "hidden";
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, []);

  const larguraColuna = VBW / colunas;

  return (
    <footer className={className} style={{ paddingBottom: alturaBrilho, ...style }}>
      {children}

      <div
        ref={faixa}
        aria-hidden="true"
        className="rgf-brilho"
        style={{ height: alturaBrilho, transform: "scaleY(0)", visibility: "hidden" }}
      >
        <svg viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {paradas.map((p, i) => (
                <stop key={i} offset={p.offset} stopColor={p.color} />
              ))}
            </linearGradient>
            <filter id={`blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={desfoque} />
            </filter>
          </defs>
          {alturas(colunas, pico, vale).map((h, i) => (
            <g key={i} filter={`url(#blur-${uid})`}>
              <rect
                x={i * larguraColuna}
                y={VBH - h}
                width={larguraColuna * 1.23}
                height={h}
                fill={`url(#grad-${uid})`}
              />
            </g>
          ))}
        </svg>
      </div>
    </footer>
  );
}
