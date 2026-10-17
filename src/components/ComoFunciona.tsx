import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";
import { miniatura } from "@/lib/miniatura";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";
import { FeatureSteps, type Etapa } from "@/components/ui/feature-section";

// Os 3 primeiros passos são os mesmos das páginas de serviço (PASSOS em
// ServicoDetalhe.tsx); o 4º fecha o ciclo com o serviço feito. Nada de prazo
// de entrega fixo: só o "até 24 horas" do orçamento é compromisso confirmado.
const ETAPAS: Etapa[] = [
  {
    titulo: "Você manda a medida e a foto",
    texto:
      "Diâmetro, comprimento e uma foto da peça pelo WhatsApp. É o que permite avaliar o desgaste sem a peça sair do lugar.",
    img: "/card-analise.webp",
    alt: "Medição do diâmetro de um cilindro com paquímetro digital",
  },
  {
    titulo: "Avaliamos se dá para recuperar",
    texto:
      "Nem toda peça compensa. Quando não compensar, falamos, em vez de empurrar um serviço que não resolve.",
    img: miniatura("/services/svc-prova.webp", 720),
    srcSet: `${miniatura("/services/svc-prova.webp", 720)} 720w, ${miniatura("/services/svc-prova.webp", 1200)} 1200w`,
    alt: "Técnico conferindo a medida de um cilindro na bancada",
  },
  {
    titulo: "Você recebe um orçamento técnico",
    texto:
      "Em até 24 horas, com o escopo do que será feito e o prazo de entrega. Sem compromisso e sem valor genérico por telefone.",
    img: "/card-revestimento.webp",
    alt: "Superfície de um cilindro recuperado, com acabamento espelhado",
  },
  {
    titulo: "A peça é recuperada",
    texto:
      "Com o orçamento aprovado, a peça passa pelo serviço descrito nele e é conferida na medida e na dureza antes da entrega.",
    img: "/card-precisao.webp",
    alt: "Cilindro sendo usinado no torno",
  },
];

const ComoFunciona = () => {
  const registraWhatsApp = () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "como-funciona", botao: "Mande a foto do cilindro" });
    trackGoogleEvent("clique_whatsapp", { origem: "como-funciona" });
  };

  return (
    <FeatureSteps
      id="como-funciona"
      etapas={ETAPAS}
      eyebrow="Como funciona"
      titulo={
        <>
          Da foto no WhatsApp <em>à peça recuperada</em>
        </>
      }
      subtitulo="O atendimento começa pela peça, não por uma tabela de preço."
      rodape={
        <a
          href={WHATSAPP_URL_ORCAMENTO}
          target="_blank"
          rel="noreferrer"
          onClick={registraWhatsApp}
          className="btn-wa w-full justify-center whitespace-nowrap px-5 py-4 text-[15px] uppercase tracking-normal sm:w-auto sm:px-8 sm:text-base sm:tracking-wide"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Mande a foto do cilindro
        </a>
      }
    />
  );
};

export default ComoFunciona;
