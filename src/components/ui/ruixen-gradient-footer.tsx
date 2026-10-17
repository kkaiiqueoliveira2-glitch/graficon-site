import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CMYK } from "@/lib/cmyk";

/**
 * Rodapé com as quatro faixas CMYK subindo do chão no fim da página.
 *
 * O mecanismo veio do "Ruixen Gradient Footer" do 21st.dev (escolhido pelo
 * Kaique em 17/10/2026): uma faixa fixa no pé da tela que entra na última
 * parte da rolagem e fica inteira no fim da página. O desenho veio da
 * referência que ele mandou no mesmo dia: ciano, magenta, amarelo e preto lado
 * a lado, com o topo se desfazendo em quadradinhos, como pixel de impressão.
 * As cores são as de lib/cmyk.ts, as mesmas dos cards da home.
 *
 * Detalhes:
 * - a faixa sobe deslizando (translateY), não esticando: esticar deformaria os
 *   quadrados;
 * - o SVG usa o tamanho real em pixels (ResizeObserver), pelo mesmo motivo;
 * - os quadrados são sorteados com semente fixa: o desenho é sempre o mesmo;
 * - a posição é escrita direto no elemento, uma vez por quadro, e longe do fim
 *   a faixa fica invisível (elemento fixo aberto a página inteira pesa no
 *   Safari do iPhone).
 */
const CORES = [CMYK.cyan, CMYK.magenta, CMYK.yellow, CMYK.black];

// gerador com semente: mesmo desenho a cada carga e no pré-render
function sorteador(semente: number) {
  let s = semente;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Quadrado = { x: number; y: number; t: number; cor: string };

function desenhar(w: number, h: number) {
  const sorte = sorteador(7);
  const lado = Math.max(10, Math.min(22, Math.round(w / 64)));
  const faixa = w / CORES.length;
  const linhaCorpo = Math.round(h * 0.5); // onde começa o bloco cheio
  const corpos: { x: number; y: number; w: number; cor: string }[] = [];
  const quadrados: Quadrado[] = [];

  CORES.forEach((cor, f) => {
    const x0 = f * faixa;
    const colunas = Math.ceil(faixa / lado);
    // topo irregular: cada coluna do bloco cheio começa um pouco acima ou abaixo
    const topos = Array.from({ length: colunas }, () => linhaCorpo + Math.round((sorte() - 0.5) * 3) * lado);
    const topoMin = Math.min(...topos);
    corpos.push({ x: x0, y: topoMin + lado * 2, w: faixa + 1, cor });

    for (let c = 0; c < colunas; c++) {
      const x = x0 + c * lado;
      if (x >= x0 + faixa) break;
      // degraus do topo irregular, já como quadrados cheios
      for (let y = topos[c]; y < topoMin + lado * 2; y += lado) {
        quadrados.push({ x, y, t: Math.min(lado, x0 + faixa - x) + 0.5, cor });
      }
      // pixels soltos acima, cada vez mais raros
      const linhas = Math.floor(topos[c] / lado);
      for (let r = 1; r <= linhas; r++) {
        const p = 0.8 * Math.pow(1 - r / linhas, 1.6);
        if (sorte() < p) {
          const t = lado * (0.55 + sorte() * 0.3);
          quadrados.push({
            x: x + (lado - t) * sorte(),
            y: topos[c] - r * lado + (lado - t) * sorte(),
            t,
            cor,
          });
        }
      }
      // furos brancos logo abaixo do topo, como na referência
      for (let r = 0; r < 3; r++) {
        if (sorte() < 0.22 - r * 0.06) {
          const t = lado * 0.6;
          quadrados.push({ x: x + (lado - t) / 2, y: topos[c] + r * lado + (lado - t) / 2, t, cor: "#ffffff" });
        }
      }
    }
  });

  return { corpos, quadrados };
}

type Props = {
  children?: ReactNode;
  /** altura da faixa; é também a rolagem que ela leva pra subir */
  alturaFaixa?: string;
  className?: string;
  style?: CSSProperties;
};

export function RuixenGradientFooter({
  children,
  alturaFaixa = "clamp(170px, 34vh, 380px)",
  className,
  style,
}: Props) {
  const faixa = useRef<HTMLDivElement>(null);
  const [tam, setTam] = useState<{ w: number; h: number } | null>(null);

  // tamanho real, pra o SVG não deformar os quadrados
  useEffect(() => {
    const el = faixa.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width);
      const h = Math.round(e.contentRect.height);
      setTam((a) => (a && a.w === w && a.h === h ? a : { w, h }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = faixa.current;
    if (!el) return;
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const h = el.offsetHeight || 1;
      const falta = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      const t = Math.max(0, Math.min(1, (h - falta) / h));
      el.style.transform = `translateY(${(1 - t) * 100}%)`;
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

  const desenho = tam ? desenhar(tam.w, tam.h) : null;

  return (
    <footer className={className} style={{ paddingBottom: alturaFaixa, ...style }}>
      {children}

      <div
        ref={faixa}
        aria-hidden="true"
        className="rgf-brilho"
        style={{ height: alturaFaixa, transform: "translateY(100%)", visibility: "hidden" }}
      >
        {tam && desenho && (
          <svg width={tam.w} height={tam.h} viewBox={`0 0 ${tam.w} ${tam.h}`} shapeRendering="crispEdges">
            {desenho.corpos.map((c, i) => (
              <rect key={`c${i}`} x={c.x} y={c.y} width={c.w} height={tam.h - c.y} fill={c.cor} />
            ))}
            {desenho.quadrados.map((q, i) => (
              <rect key={i} x={q.x} y={q.y} width={q.t} height={q.t} fill={q.cor} />
            ))}
          </svg>
        )}
      </div>
    </footer>
  );
}
