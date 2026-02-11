import { useEffect, useState } from "react";

const segments = [
  {
    title: "Gráficas e Flexografia",
    description:
      "Soluções técnicas para impressão com alto padrão de precisão e acabamento.",
    image: "/segments/graficas-flexografia.jpg",
  },
  {
    title: "Papel e Celulose",
    description:
      "Revestimentos duráveis para processos contínuos e exigentes.",
    image: "/segments/papel-celulose.jpg",
  },
  {
    title: "Embalagens e Cartonagem",
    description:
      "Cilindros ajustados para alta produtividade e qualidade no empacotamento.",
    image: "/segments/embalagens-cartonagem.jpg",
  },
  {
    title: "Metalgrafia e Automação Industrial",
    description:
      "Desempenho confiável em operações industriais complexas.",
    image: "/segments/metalgrafia-automacao.jpg",
  },
  {
    title: "Plásticos e Indústria Geral",
    description:
      "Flexibilidade para diferentes aplicações, materiais e exigências.",
    image: "/segments/plasticos-industria-geral.jpg",
  },
];

const SegmentsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSegment = segments[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? segments.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === segments.length - 1 ? 0 : prev + 1));
  };

  const [isPaused, setIsPaused] = useState(false);

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
    <section className="section-industrial bg-muted">
      <div className="container">
        <div className="max-w-5xl mx-auto text-center">
          <p className="section-eyebrow">Segmentos atendidos</p>
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
          className="segment-carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="segment-carousel-card">
            <div key={`image-${currentIndex}`} className="segment-carousel-image segment-image-animate">
              <img
                src={currentSegment.image}
                alt={currentSegment.title}
                width={800}
                height={400}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div key={`content-${currentIndex}`} className="segment-carousel-content segment-content-animate">
              <span className="segment-label">Segmento</span>
              <h3 className="text-2xl font-semibold text-foreground">
                {currentSegment.title}
              </h3>
              <p className="text-muted-foreground mt-3">
                {currentSegment.description}
              </p>
            </div>
          </div>

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
