import { Button } from "@/components/ui/button";

const CTASection = () => {
  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20 cta-gradient">
      <div className="container">
        <div className="cta-panel max-w-4xl mx-auto text-center">
          <p className="cta-eyebrow">Atendimento técnico especializado</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Precisa recuperar ou revestir cilindros?
          </h2>
          <p className="text-white/85 text-lg mb-8">
            Receba uma análise técnica completa com foco em desempenho,
            durabilidade e padrão industrial.
          </p>
          <div className="cta-highlights">
            <span>Diagnóstico por aplicação</span>
            <span>Controle rigoroso de qualidade</span>
            <span>Soluções sob medida</span>
          </div>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="btn-embossed btn-embossed-pulse text-primary font-semibold text-base px-8 py-6"
          >
            Solicitar orçamento técnico
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
