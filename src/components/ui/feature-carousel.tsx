import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Carrossel 3D com o item do centro em destaque e os vizinhos esmaecidos.
 * Ideia do "Feature Carousel" do 21st.dev (escolhido pelo Kaique em
 * 17/10/2026), sem o Button do shadcn e com cards deitados: as fotos dos
 * segmentos são 16:10 e o card em pé do original cortava a máquina.
 *
 * O que mudou do original, pelo motivo da grade de 16/10 (quem não clicava na
 * seta não via que a Graficon atende gráfica):
 * - os nomes dos 5 itens ficam à vista abaixo, como botões;
 * - a troca automática para com o mouse em cima, com foco, fora da tela e com
 *   movimento reduzido;
 * - no celular dá pra arrastar pro lado.
 *
 * Todos os títulos e textos estão no HTML (pré-render e crawler leem).
 */
export type ItemCarrossel = {
  titulo: string;
  texto: string;
  img: string;
  srcSet?: string;
  alt: string;
};

type Props = {
  itens: ItemCarrossel[];
  intervalo?: number;
  className?: string;
};

export function FeatureCarousel({ itens, intervalo = 4000, className }: Props) {
  const total = itens.length;
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const toque = useRef<number | null>(null);

  const proximo = useCallback(() => setAtual((i) => (i + 1) % total), [total]);
  const anterior = useCallback(() => setAtual((i) => (i - 1 + total) % total), [total]);

  // só troca sozinho quando está na tela
  useEffect(() => {
    const el = raiz.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (pausado || !visivel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(proximo, intervalo);
    return () => window.clearInterval(id);
  }, [pausado, visivel, proximo, intervalo, atual]);

  return (
    <div
      ref={raiz}
      className={cn("fc-raiz", className)}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div
        className="fc-palco"
        onTouchStart={(e) => {
          toque.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (toque.current === null) return;
          const dx = e.changedTouches[0].clientX - toque.current;
          toque.current = null;
          if (Math.abs(dx) > 40) (dx < 0 ? proximo : anterior)();
        }}
      >
        {itens.map((item, i) => {
          let pos = (i - atual + total) % total;
          if (pos > Math.floor(total / 2)) pos -= total;
          const lado = Math.abs(pos);
          return (
            <figure
              key={item.titulo}
              className="fc-card"
              data-pos={lado === 0 ? "centro" : lado === 1 ? "vizinho" : "fora"}
              style={{
                transform: `translateX(${pos * 62}%) scale(${lado === 0 ? 1 : lado === 1 ? 0.82 : 0.7}) rotateY(${pos * -12}deg)`,
              }}
              aria-hidden={lado !== 0}
              onClick={lado === 1 ? () => setAtual(i) : undefined}
            >
              <img
                src={item.img}
                srcSet={item.srcSet}
                sizes="(min-width: 830px) 600px, calc((100vw - 4rem) * 0.8)"
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              <figcaption className="fc-legenda">{item.titulo}</figcaption>
            </figure>
          );
        })}

        <button type="button" className="fc-seta fc-seta-esq" onClick={anterior} aria-label="Segmento anterior">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" className="fc-seta fc-seta-dir" onClick={proximo} aria-label="Próximo segmento">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="fc-textos" aria-live="polite">
        {itens.map((item, i) => (
          <p key={item.titulo} className="fc-texto" hidden={i !== atual}>
            {item.texto}
          </p>
        ))}
      </div>

      <div className="fc-nomes">
        {itens.map((item, i) => (
          <button
            key={item.titulo}
            type="button"
            className="fc-nome"
            aria-pressed={i === atual}
            onClick={() => setAtual(i)}
          >
            {item.titulo}
          </button>
        ))}
      </div>
    </div>
  );
}
