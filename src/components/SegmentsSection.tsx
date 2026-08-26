import { useEffect, useState } from "react";

const segments = [
  {
    title: "Gráficas e Flexografia",
    description:
      "Soluções técnicas para impressão com alto padrão de precisão e acabamento.",
    image: "/segments/graficas-flexografia.webp",
  },
  {
    title: "Papel e Celulose",
    description:
      "Revestimentos duráveis para processos contínuos e exigentes.",
    image: "/segments/papel-celulose.webp",
  },
  {
    title: "Embalagens e Cartonagem",
    description:
      "Cilindros ajustados para alta produtividade e qualidade no empacotamento.",
    image: "/segments/embalagens-cartonagem.webp",
  },
  {
    title: "Metalgrafia e Automação Industrial",
    description:
      "Desempenho confiável em operações industriais complexas.",
    image: "/segments/metalgrafia-automacao.webp",
  },
  {
    title: "Plásticos e Indústria Geral",
    description:
      "Flexibilidade para diferentes aplicações, materiais e exigências.",
    image: "/segments/plasticos-industria-geral.webp",
  },
];

const SWIPE_THRESHOLD = 50;

const SegmentsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? segments.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === segments.length - 1 ? 0 : prev + 1));
  };

  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
    setIsPaused(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientX);
    setIsPaused(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (mouseStart == null) return;
    const diff = mouseStart - e.clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();
      else goPrev();
      setMouseStart(null);
    }
  };

  const onMouseUp = () => {
    setMouseStart(null);
    setIsPaused(false);
  };

  const onMouseLeave = () => {
    setMouseStart(null);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === segments.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="segmentos" className="section-industrial bg-muted">
      <div className="container">
        <div className="max-w-5xl mx-auto text-center" data-reveal>
          <p className="section-eyebrow justify-center">Segmentos atendidos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Expertise técnica para indústrias exigentes
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            O domínio da tecnologia e a constante inovação no parque fabril
            contribuem para atuarmos em diversos segmentos com alto padrão de
            qualidade.
          </p>
        </div>

        <div
          className="segment-carousel select-none touch-pan-y cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          role="region"
          aria-label="Carrossel de segmentos - arraste ou deslize para navegar"
        >
          {/* Os 5 segmentos ficam no HTML, não só o slide visível.
              Antes, o carrossel renderizava apenas o segmento ativo, então
              4 dos 5 não existiam no HTML pré-renderizado: "rotogravura",
              "papel e celulose" e "metalgrafia" eram declarados no JSON-LD e
              não apareciam em lugar nenhum do texto. Schema confirma o que o
              texto diz, não substitui o texto.
              Os inativos usam o atributo `hidden`, que os tira do fluxo e da
              árvore de acessibilidade: um único card ocupa espaço, o visual
              fica idêntico, e as imagens seguem `lazy` (sem caixa de layout,
              o navegador não as baixa). */}
          {segments.map((segment, index) => {
            const ativo = index === currentIndex;
            return (
              <div key={segment.title} className="segment-carousel-card" hidden={!ativo}>
                <div
                  key={ativo ? `image-${currentIndex}` : `image-off-${index}`}
                  className={`segment-carousel-image${ativo ? " segment-image-animate" : ""}`}
                >
                  {/* Só o slide ativo monta a <img>. Renderizar as 5 fazia o
                      navegador baixar todas mesmo com display:none (medido:
                      +700 KB na home), e imagem de slide oculto não agrega
                      nada ao SEO. O que precisa existir no HTML é o texto. */}
                  {ativo && (
                    <img
                      src={segment.image}
                      alt={segment.title}
                      width={800}
                      height={400}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>
                <div
                  key={ativo ? `content-${currentIndex}` : `content-off-${index}`}
                  className={`segment-carousel-content items-center md:items-start${ativo ? " segment-content-animate" : ""}`}
                >
                  <span className="segment-label">Segmento</span>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {segment.title}
                  </h3>
                  <p className="text-muted-foreground mt-3">
                    {segment.description}
                  </p>
                </div>
              </div>
            );
          })}

          <div className="segment-carousel-controls">
            <button type="button" className="segment-nav" onClick={goPrev}>
              ‹
            </button>
            <div className="segment-dots">
              {segments.map((segment, index) => (
                <button
                  key={segment.title}
                  type="button"
                  className={
                    index === currentIndex
                      ? "segment-dot segment-dot-active"
                      : "segment-dot"
                  }
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ver segmento ${segment.title}`}
                />
              ))}
            </div>
            <button type="button" className="segment-nav" onClick={goNext}>
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SegmentsSection;
