import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";

const CTASection = () => {
  const scrollToFormulario = () => {
    trackMetaEvent("CliqueBotaoOrcamento", {
      origem: "cta",
      botao: "Solicitar orçamento técnico",
    });
    trackGoogleEvent("clique_orcamento", { origem: "cta" });
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const trackWhatsAppCta = () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "cta", botao: "Falar no WhatsApp" });
    trackGoogleEvent("clique_whatsapp", { origem: "cta" });
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="cta-showcase max-w-6xl mx-auto">
          {/* Imagem do produto */}
          <div className="cta-showcase-media order-1 md:order-none">
            <img
              src="/services/svc-preparacao.webp"
              alt="Técnico medindo um cilindro industrial com paquímetro de precisão"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-14 text-center md:text-left">
            <p className="section-eyebrow justify-center md:justify-start" style={{ color: "hsl(var(--cyan))" }}>
              Atendimento técnico especializado
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[1.05] text-white mb-4">
              Precisa recuperar ou revestir{" "}
              <span className="block text-cyan">cilindros?</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto md:mx-0">
              Envie sua demanda, amostra ou especificações. Fazemos uma análise técnica
              completa e retornamos com um orçamento sob medida, com foco em desempenho
              e durabilidade.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href={WHATSAPP_URL_ORCAMENTO}
                target="_blank"
                rel="noreferrer"
                onClick={trackWhatsAppCta}
                className="btn-wa px-8 py-4 text-base uppercase tracking-wide"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp
              </a>
              <button
                onClick={scrollToFormulario}
                className="btn-outline-white px-8 py-4 text-base uppercase tracking-wide"
              >
                Solicitar orçamento <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
