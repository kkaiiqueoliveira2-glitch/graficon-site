import heroImage from "@/assets/hero-industrial.jpg?w=1920&format=webp";

const CMYK = {
  cyan: "#00A5E0",
  magenta: "#D81B60",
  yellow: "#FFB300",
  black: "#212121",
};

const highlights = [
  {
    color: CMYK.cyan,
    image: "/card-revestimento.webp",
    alt: "Cilindro revestido com acabamento técnico espelhado",
    title: "Revestimento de alta qualidade",
    description: "Controle dimensional rigoroso e acabamento técnico em cada cilindro.",
  },
  {
    color: CMYK.magenta,
    image: "/card-analise.webp",
    alt: "Técnico medindo um cilindro com paquímetro de precisão",
    title: "Análise técnica dedicada",
    description: "Avaliamos sua demanda e indicamos a melhor solução pra cada peça.",
  },
  {
    color: CMYK.yellow,
    image: "/card-precisao.webp",
    alt: "Usinagem de cilindro industrial em torno CNC",
    title: "Precisão e repetibilidade",
    description: "Tecnologia e processos sob controle pra entregar o mesmo padrão sempre.",
  },
  {
    color: CMYK.black,
    image: "/card-sob-medida.webp",
    alt: "Vários cilindros industriais de tamanhos diferentes",
    title: "Soluções sob medida",
    description: "Cilindros especiais que fogem do padrão por material, dimensão ou aplicação.",
  },
];

const CmykHighlights = () => {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 cmyk-highlights-section overflow-hidden">
      {/* Background Image - mesma do Hero */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat cmyk-bg-image"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 hero-overlay" aria-hidden />

      {/* Borda curva no topo (vinda da seção clara acima) */}
      <div className="section-curve-top" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,0 L1440,0 L1440,50 C1080,110 360,-10 0,40 Z"
            fill="hsl(var(--muted))"
          />
          <path
            d="M0,40 C360,-10 1080,110 1440,50"
            fill="none"
            stroke="hsl(var(--brand-3))"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="container relative z-10">
        <h2 data-reveal className="text-2xl md:text-3xl font-bold text-white text-center mb-10 md:mb-12">
          Por que escolher revestimento de cilindros com a Graficon?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 md:gap-x-6 md:gap-y-20 pt-12 md:pt-16">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="cmyk-highlight-card"
              style={{ backgroundColor: item.color }}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="cmyk-highlight-card__photo"
                style={{ borderColor: item.color }}
              />
              <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CmykHighlights;
