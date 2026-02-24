import { Button } from "@/components/ui/button";

const CTASection = () => {
  const scrollToFormulario = () => {
    document.getElementById("formulario-orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-16 md:py-20 cta-gradient">
      <div className="container">
        <div className="cta-panel max-w-4xl mx-auto text-center">
          <p className="cta-eyebrow">Atendimento técnico especializado</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Precisa recuperar ou revestir cilindros?
          </h2>
          <p className="text-foreground/85 text-lg mb-8">
            Receba uma análise técnica completa com foco em desempenho,
            durabilidade e padrão industrial.
          </p>
          <div className="cta-highlights">
            <span>Diagnóstico por aplicação</span>
            <span>Controle rigoroso de qualidade</span>
            <span>Soluções sob medida</span>
          </div>
          <Button
            onClick={scrollToFormulario}
            size="lg"
            className="btn-cylinder font-semibold text-base px-10 py-6 text-white border-0 bg-transparent hover:bg-transparent"
          >
            Solicitar orçamento técnico
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
