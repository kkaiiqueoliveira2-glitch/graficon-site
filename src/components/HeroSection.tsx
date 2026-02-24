import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-industrial.jpg?w=1920&format=webp";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="container relative z-10 pt-12 pb-8 md:pt-0 md:pb-0">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="hidden md:inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 self-center">
              Qualidade industrial comprovada
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 mt-0 md:mt-5 leading-tight max-w-3xl mx-auto lg:mx-0 pt-4 md:pt-0">
              Revestimento e Recuperação de Cilindros Industriais
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Especialistas em cilindros para flexografia, gráfica e processos
              industriais com alta precisão, desempenho e confiabilidade.
            </p>
            <p className="text-sm md:text-base text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0">
              Saiba{" "}
              <Link to="/o-que-e-revestimento-grafico" className="text-white underline underline-offset-2 hover:text-white/95">
                o que é revestimento gráfico
              </Link>{" "}
              e{" "}
              <Link to="/como-funciona-revestimento-de-cilindros" className="text-white underline underline-offset-2 hover:text-white/95">
                como funciona o revestimento de cilindros
              </Link>
              .
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="btn-embossed btn-embossed-pulse text-primary font-semibold text-base px-8 py-6"
              >
                Solicitar Orçamento
              </Button>
              <Link
                to="/o-que-fazemos"
                className="hero-secondary-btn"
              >
                Ver serviços
              </Link>
            </div>
          </div>

          <div className="hero-panel mt-8 lg:mt-0 w-full max-w-lg mx-auto lg:mx-0 lg:max-w-none">
            <div className="grid gap-4">
              <div className="hero-panel-item flex-col md:flex-row items-center md:items-start justify-center md:justify-between text-center md:text-left">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Precisão e uniformidade
                  </p>
                  <p className="text-sm text-white/70">
                    Controle dimensional e acabamento técnico rigoroso.
                  </p>
                </div>
                <span className="hero-panel-badge">ISO</span>
              </div>
              <div className="hero-panel-item flex-col md:flex-row items-center md:items-start justify-center md:justify-between text-center md:text-left">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Atendimento técnico especializado
                  </p>
                  <p className="text-sm text-white/70">
                    Diagnóstico e solução sob medida para cada aplicação.
                  </p>
                </div>
                <span className="hero-panel-badge">24h</span>
              </div>
              <div className="hero-panel-item flex-col md:flex-row items-center md:items-start justify-center md:justify-between text-center md:text-left">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Durabilidade e performance
                  </p>
                  <p className="text-sm text-white/70">
                    Revestimentos de alta resistência para longas tiragens.
                  </p>
                </div>
                <span className="hero-panel-badge">Alta</span>
              </div>
            </div>

            <div className="hero-panel-stats text-center md:text-left">
              <div>
                <p className="text-2xl font-bold text-white">+40 anos</p>
                <p className="text-xs text-white/70">de profissão</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-white/70">Controle de qualidade</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Sob medida</p>
                <p className="text-xs text-white/70">Soluções técnicas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
