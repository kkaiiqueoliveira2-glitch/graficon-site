import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PerguntarIA from "@/components/PerguntarIA";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";

/**
 * FAQ da home no "Frequently Asked Questions" do 21st.dev (escolhido pelo
 * Kaique em 17/10/2026), sem a biblioteca motion: as palavras do título
 * entram desfocadas uma a uma e as perguntas sobem em sequência, tudo em CSS
 * (.faqv-* em index.css), disparado uma vez quando a seção aparece.
 *
 * O accordion é o do site (ui/accordion.tsx), que mantém as respostas no HTML
 * pré-renderizado; o do componente original desmontava as fechadas.
 * Sem JS ou com movimento reduzido, tudo aparece direto.
 */
const faqs = [
  {
    q: "O que é revestimento de cilindros?",
    a: "É a aplicação de uma camada técnica sobre o cilindro, de borracha ou de metal, que forma a superfície de trabalho e garante resistência ao desgaste, uniformidade e repetibilidade no processo.",
  },
  {
    q: "A Graficon faz recuperação de cilindros usados?",
    a: "Sim. Recuperamos cilindros, rolos de borracha e hastes desgastados ou danificados, devolvendo a medida, o acabamento e o desempenho. Nem toda peça compensa: mande a medida e a foto que avaliamos antes.",
  },
  {
    q: "Vocês medem a dureza da borracha do rolo?",
    a: "Sim. A dureza se mede em Shore A, com durômetro, e o reencape sai na dureza da aplicação: rolo entintador ou molhador de offset, flexografia, rotogravura ou uso industrial.",
  },
  {
    q: "Quais segmentos a Graficon atende?",
    a: "Gráficas de offset e flexografia, rotogravura, papel e celulose, embalagens e cartonagem, metalgrafia e automação, plásticos e indústria em geral. Não fazemos peça automotiva, de moto ou decorativa.",
  },
  {
    q: "Como solicito um orçamento?",
    a: "Pelo WhatsApp (11) 91529-1313 ou pelo formulário no fim da página. Mande o diâmetro, o comprimento e uma foto da peça: o orçamento técnico sai em até 24 horas.",
  },
  {
    q: "Onde a Graficon está localizada?",
    a: "Em São Paulo/SP, na Rua Mara Rosa, 95, no Bairro dos Eucaliptos. Atendimento de segunda a quinta das 08h às 18h, e sexta das 08h às 15h.",
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

const TITULO = "Perguntas frequentes";

const FaqHome = () => {
  const secao = useRef<HTMLElement>(null);
  // "armado" esconde os itens até a seção aparecer; sem JS nunca arma
  const [estado, setEstado] = useState<"" | "armado" | "visto">("");

  useEffect(() => {
    const el = secao.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEstado("armado");
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEstado("visto");
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const registraWhatsApp = () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "faq-home", botao: "WhatsApp do FAQ" });
    trackGoogleEvent("clique_whatsapp", { origem: "faq-home" });
  };

  return (
    <section ref={secao} className="faqv-secao" data-estado={estado}>
      <div className="container max-w-3xl">
        <h2 className="faqv-titulo">
          {TITULO.split(" ").map((palavra, i) => (
            <span key={i} className="faqv-palavra" style={{ "--i": i } as CSSProperties}>
              {palavra}
            </span>
          ))}
        </h2>

        <p className="faqv-descricao">
          Se a sua dúvida não estiver aqui, fale com a gente pelo{" "}
          <a href={WHATSAPP_URL_ORCAMENTO} target="_blank" rel="noreferrer" onClick={registraWhatsApp}>
            WhatsApp (11) 91529-1313
          </a>
          .
        </p>

        <Accordion type="single" collapsible className="faqv-lista">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="faqv-item"
              style={{ "--i": i } as CSSProperties}
            >
              <AccordionTrigger className="faqv-pergunta">{f.q}</AccordionTrigger>
              <AccordionContent className="faqv-resposta">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="faqv-ia">
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
