import { Award, Headphones, Repeat, Palette } from "lucide-react";
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
    icon: Award,
    title: "Alta qualidade de impressão",
    description: "Controle dimensional rigoroso e acabamento técnico em cada revestimento.",
  },
  {
    color: CMYK.magenta,
    icon: Headphones,
    title: "Atendimento personalizado",
    description: "Suporte técnico especializado para analisar sua demanda e indicar a melhor solução.",
  },
  {
    color: CMYK.yellow,
    icon: Repeat,
    title: "Parceria de longo prazo",
    description: "Clientes recorrentes contam com benefícios e prioridade no atendimento.",
  },
  {
    color: CMYK.black,
    icon: Palette,
    title: "Soluções sob medida",
    description: "Tecnologia e processos adaptados para cada segmento e aplicação.",
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
            fill="hsl(210 15% 94%)"
          />
          <path
            d="M0,40 C360,-10 1080,110 1440,50"
            fill="none"
            stroke="hsl(189 94% 43%)"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div className="container relative z-10">
        <h2 data-reveal className="text-2xl md:text-3xl font-bold text-white text-center mb-10 md:mb-12">
          Por que escolher revestimento de cilindros com a Graficon?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="cmyk-highlight-card"
              style={{ backgroundColor: item.color }}
            >
              <item.icon className="w-10 h-10 md:w-12 md:h-12 text-white mb-4" aria-hidden />
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
