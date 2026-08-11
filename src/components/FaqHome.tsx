import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PerguntarIA from "@/components/PerguntarIA";

const faqs = [
  {
    q: "O que é revestimento de cilindros?",
    a: "É a aplicação de uma camada técnica sobre o cilindro para formar a superfície de trabalho/impressão e garantir resistência ao desgaste, uniformidade e repetibilidade no processo industrial.",
  },
  {
    q: "A Graficon faz recuperação de cilindros usados?",
    a: "Sim. Recuperamos cilindros desgastados ou danificados, devolvendo medidas, acabamento e desempenho conforme a aplicação, com controle de qualidade rigoroso.",
  },
  {
    q: "Quais segmentos a Graficon atende?",
    a: "Flexografia e gráficas, papel e celulose, embalagens e cartonagem, metalgrafia e automação industrial, além de plásticos e indústria em geral.",
  },
  {
    q: "Como solicito um orçamento?",
    a: "Pelo formulário no fim da página ou pelo WhatsApp comercial (11) 91529-1313. Descreva a peça, o material e a aplicação para recebermos uma análise técnica.",
  },
  {
    q: "Onde a Graficon está localizada?",
    a: "Estamos em São Paulo/SP, na Rua Mara Rosa, 95 — Bairro dos Eucaliptos. Atendimento de segunda a sexta, das 08h às 18h.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const FaqHome = () => {
  return (
    <section className="section-industrial bg-white">
      <div className="container max-w-3xl">
        <div className="text-center mb-10" data-reveal>
          <p className="section-eyebrow justify-center">Perguntas frequentes</p>
          <h2 className="section-title">Tire suas dúvidas</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="faq-item border-b-0">
              <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8">
          <PerguntarIA
            prompt="Meu cilindro de impressão está desgastado e perdeu medida. Vale a pena mandar recuperar e revestir, ou é melhor comprar um novo? Como avaliar isso?"
            origem="faq-home"
          />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
};

export default FaqHome;
