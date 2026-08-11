import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";
import CountUp from "@/components/CountUp";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";
// Versões responsivas: o celular baixa ~640/960px em vez dos 1920px (LCP).
import heroSrcset from "@/assets/hero-industrial.jpg?w=640;960;1280;1920&format=webp&as=srcset";
import heroImage from "@/assets/hero-industrial.jpg?w=1280&format=webp";

const HeroSection = () => {
  const scrollToFormulario = () => {
    trackMetaEvent("CliqueBotaoOrcamento", {
      origem: "hero",
      botao: "Solicitar Orçamento",
    });
    trackGoogleEvent("clique_orcamento", { origem: "hero" });
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToConteudo = () => {
    document.getElementById("segmentos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const trackWhatsAppHero = () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "hero", botao: "Chamar no WhatsApp" });
    trackGoogleEvent("clique_whatsapp", { origem: "hero" });
  };

  return (
    <section id="home" className="hero-usitemb">
      {/* Imagem de fundo — <img> real com prioridade alta (LCP) em vez de background CSS */}
      <img
        src={heroImage}
        srcSet={heroSrcset}
        sizes="100vw"
        alt="Revestimento e recuperação de cilindros industriais — Graficon, São Paulo"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-usitemb-overlay" />

      {/* Conteúdo */}
      <div className="container relative z-10 py-20 md:py-0">
        <div className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start">
          <span className="hero-eyebrow">Qualidade industrial · +40 anos</span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6">
            Revestimento e recuperação de{" "}
            <span className="text-cyan">cilindros industriais</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl">
            Especialistas em cilindros para flexografia, rotogravura, embalagens, papel e
            celulose — com alta precisão, desempenho e confiabilidade.
          </p>

          {/* WhatsApp na frente: é o canal que a Graficon realmente atende, e
              os leads da campanha chegam por ele. O formulário fica como
              segundo caminho, pra quem prefere mandar especificação escrita. */}
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
            <a
              href={WHATSAPP_URL_ORCAMENTO}
              target="_blank"
              rel="noreferrer"
              onClick={trackWhatsAppHero}
              className="btn-wa px-8 py-4 text-base uppercase tracking-wide"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Falar no WhatsApp
            </a>
            <button
              onClick={scrollToFormulario}
              className="btn-outline-white text-base uppercase tracking-wide"
            >
              Solicitar orçamento
            </button>
          </div>

          <p className="mt-6 text-sm text-white/70 max-w-xl">
            Saiba{" "}
            <Link to="/o-que-e-revestimento-grafico" className="text-white underline underline-offset-2 hover:text-cyan">
              o que é revestimento gráfico
            </Link>{" "}
            e{" "}
            <Link to="/como-funciona-revestimento-de-cilindros" className="text-white underline underline-offset-2 hover:text-cyan">
              como funciona o revestimento de cilindros
            </Link>
            .
          </p>

          {/* Stats inline */}
          <div className="mt-10 grid grid-cols-3 gap-8 border-t border-white/15 pt-8 w-full max-w-xl">
            <div className="hero-stat-inline">
              <strong><CountUp end={40} prefix="+" suffix=" anos" /></strong>
              <span>de profissão</span>
            </div>
            <div className="hero-stat-inline">
              <strong><CountUp end={100} suffix="%" /></strong>
              <span>Controle de qualidade</span>
            </div>
            <div className="hero-stat-inline">
              <strong>Sob medida</strong>
              <span>Soluções técnicas</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToConteudo}
        className="hero-scroll-chevron"
        aria-label="Rolar para o conteúdo"
      >
        <ChevronDown className="h-7 w-7" />
      </button>

      {/* Borda curva na base, igual à referência */}
      <div className="hero-curve" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,70 C360,140 1080,10 1440,80 L1440,120 L0,120 Z"
            fill="hsl(0 0% 100%)"
          />
          <path
            d="M0,70 C360,140 1080,10 1440,80"
            fill="none"
            stroke="hsl(var(--brand-3))"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
