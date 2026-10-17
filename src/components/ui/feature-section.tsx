import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Etapas que avançam com a rolagem. Ideia do "Feature Steps" do 21st.dev
 * (escolhido pelo Kaique em 17/10/2026), refeito sem framer-motion e sem
 * next/image. No original as etapas trocavam sozinhas a cada 3 s; aqui a
 * seção fica presa na tela e cada trecho de rolagem leva pra próxima etapa.
 *
 * A rolagem só troca o estado quando a etapa muda: a barra de progresso da
 * etapa ativa é escrita direto no elemento dela (transform), nunca numa
 * variável no :root, que recalcula a página inteira a cada quadro.
 *
 * Sem JS (pré-render, crawler) todas as etapas estão no HTML. Com movimento
 * reduzido a foto troca só esmaecendo.
 */
export type Etapa = {
  titulo: string;
  texto: string;
  img: string;
  srcSet?: string;
  alt: string;
};

type Props = {
  etapas: Etapa[];
  eyebrow?: string;
  titulo: ReactNode;
  subtitulo?: ReactNode;
  rodape?: ReactNode;
  id?: string;
  className?: string;
};

/** quanto de rolagem (em altura de tela) cada etapa ocupa */
const TELA_POR_ETAPA = 0.6;

export function FeatureSteps({ etapas, eyebrow, titulo, subtitulo, rodape, id, className }: Props) {
  const [atual, setAtual] = useState(0);
  const trilho = useRef<HTMLDivElement>(null);
  const barras = useRef<(HTMLSpanElement | null)[]>([]);
  const total = etapas.length;

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    let quadro = 0;
    let ultima = -1;

    const medir = () => {
      quadro = 0;
      const r = el.getBoundingClientRect();
      const curso = el.offsetHeight - (el.firstElementChild as HTMLElement).offsetHeight;
      const p = curso > 0 ? Math.min(1, Math.max(0, -r.top / curso)) : 0;
      const pos = Math.min(total - 0.0001, p * total);
      const etapa = Math.floor(pos);
      if (etapa !== ultima) {
        ultima = etapa;
        setAtual(etapa);
      }
      barras.current.forEach((b, i) => {
        if (!b) return;
        const v = i < etapa ? 1 : i === etapa ? pos - etapa : 0;
        b.style.transform = `scaleY(${v})`;
      });
    };

    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [total]);

  // clicar numa etapa rola até ela
  const irPara = (i: number) => {
    const el = trilho.current;
    if (!el) return;
    const curso = el.offsetHeight - (el.firstElementChild as HTMLElement).offsetHeight;
    const topo = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: topo + (curso * (i + 0.5)) / total, behavior: "smooth" });
  };

  return (
    <section id={id} className={cn("fs-secao", className)}>
      <div
        ref={trilho}
        className="fs-trilho"
        style={{ height: `calc(var(--fs-tela) + ${(total - 1) * TELA_POR_ETAPA} * var(--fs-tela))` }}
      >
        <div className="fs-palco">
          <div className="container">
            <div className="fs-cabeca">
              {eyebrow && <p className="section-eyebrow fs-eyebrow">{eyebrow}</p>}
              <h2 className="fs-titulo">{titulo}</h2>
              {subtitulo && <p className="fs-subtitulo">{subtitulo}</p>}
            </div>

            <div className="fs-grade">
              <ol className="fs-lista">
                {etapas.map((etapa, i) => (
                  <li
                    key={i}
                    className="fs-etapa"
                    data-estado={i === atual ? "atual" : i < atual ? "feita" : "espera"}
                  >
                    <button type="button" className="fs-etapa-botao" onClick={() => irPara(i)}>
                      <span className="fs-marcador" aria-hidden="true">
                        {i < atual ? <Check className="h-5 w-5" strokeWidth={3} /> : i + 1}
                      </span>
                      <span className="fs-etapa-corpo">
                        <span className="fs-etapa-titulo">{etapa.titulo}</span>
                        <span className="fs-etapa-texto">
                          <span>{etapa.texto}</span>
                        </span>
                      </span>
                    </button>
                    {i < total - 1 && (
                      <span className="fs-linha" aria-hidden="true">
                        <span
                          className="fs-linha-cheia"
                          ref={(b) => {
                            barras.current[i] = b;
                          }}
                        />
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              <div className="fs-fotos">
                {etapas.map((etapa, i) => (
                  <div
                    key={i}
                    className="fs-foto"
                    data-estado={i === atual ? "atual" : i < atual ? "saiu" : "espera"}
                  >
                    <img
                      src={etapa.img}
                      srcSet={etapa.srcSet}
                      sizes="(min-width: 768px) 600px, 100vw"
                      alt={etapa.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      {rodape && <div className="container fs-rodape">{rodape}</div>}
    </section>
  );
}
