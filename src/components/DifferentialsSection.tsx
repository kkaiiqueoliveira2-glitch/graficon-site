import { CheckCircle } from "lucide-react";

const differentials = [
  {
    title: "Alta precisão em cada etapa",
    description:
      "Processos controlados para garantir uniformidade e repetibilidade.",
  },
  {
    title: "Equipe especializada e atendimento direto",
    description:
      "Suporte técnico com profissionais experientes em cilindros industriais.",
  },
  {
    title: "Controle de qualidade industrial rigoroso",
    description:
      "Inspeções e medições para assegurar conformidade técnica.",
  },
  {
    title: "Soluções rápidas e confiáveis",
    description:
      "Prazos alinhados com a produção e entrega consistente.",
  },
];

const DifferentialsSection = () => {
  return (
    <section className="section-industrial bg-background">
      <div className="container">
        <div className="max-w-5xl mx-auto text-center">
          <p className="section-eyebrow">Diferenciais</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Diferenciais da Graficon
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Compromisso com qualidade, precisão e atendimento técnico em todas
            as etapas do processo.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-left">
            {differentials.map((item, index) => (
              <div key={index} className="differential-card">
                <div className="differential-icon">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
