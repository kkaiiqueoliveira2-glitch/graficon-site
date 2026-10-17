import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Ruixen Gradient Footer do 21st.dev (escolhido pelo Kaique em 17/10/2026):
 * rodapé normal, com o brilho desfocado fixo no pé da tela, que sobe do chão
 * na última faixa de rolagem e chega à altura cheia no fim da página.
 *
 * Igual ao original, só com as cores trocadas pelas da referência CMYK que ele
 * mandou (ciano, magenta, amarelo e preto), na mesma ordem de faixas do
 * arco-íris original. A escala é escrita direto no elemento, uma vez por
 * quadro, em vez de um setState a cada evento de rolagem; o visual é o mesmo.
 */
type Stop = { offset: number; color: string };

const VBW = 1271;
const VBH = 599;

// Do chão (0) pro alto (1): preto → ciano → ciano claro → quase branco →
// amarelo → magenta → magenta transparente.
const CMYK_STOPS: Stop[] = [
  { offset: 0, color: "#1D1D1B" },
  { offset: 0.1827, color: "#009FE3" },
  { offset: 0.2837, color: "#5CC6F0" },
  { offset: 0.4135, color: "#E8F7FD" },
  { offset: 0.5866, color: "#FFE500" },
  { offset: 0.8029, color: "#E6007E" },
  { offset: 1, color: "#E6007E00" },
];

function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid;
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

type Props = {
  children?: ReactNode;
  gradientHeight?: string;
  minReveal?: number;
  bars?: number;
  blur?: number;
  peak?: number;
  valley?: number;
  stops?: Stop[];
  className?: string;
  style?: CSSProperties;
};

export function RuixenGradientFooter({
  children,
  gradientHeight = "40vh",
  minReveal = 0.045,
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = CMYK_STOPS,
  className,
  style,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    let quadro = 0;
    const measure = () => {
      quadro = 0;
      const h = el.offsetHeight || 1;
      const left = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      const t = clamp01((h - left) / h);
      el.style.transform = `scaleY(${minReveal + (1 - minReveal) * t})`;
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [minReveal]);

  const colW = VBW / bars;

  return (
    <footer className={className} style={{ paddingBottom: gradientHeight, ...style }}>
      {children}

      <div
        ref={bandRef}
        aria-hidden="true"
        className="rgf-brilho"
        style={{ height: gradientHeight, transform: `scaleY(${minReveal})` }}
      >
        <svg
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter id={`blur-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>
          {bellHeights(bars, peak, valley).map((barH, i) => (
            <g key={i} filter={`url(#blur-${uid})`}>
              <rect
                x={i * colW}
                y={VBH - barH}
                width={colW * 1.23}
                height={barH}
                fill={`url(#grad-${uid})`}
              />
            </g>
          ))}
        </svg>
      </div>
    </footer>
  );
}
