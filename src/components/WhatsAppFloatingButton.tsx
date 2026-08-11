import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const WHATSAPP_NUMBER = "5511915291313";

const WHATSAPP_MSG_ORCAMENTO = [
  "Olá! Tudo bem? 😊",
  "",
  "Estou entrando em contato pelo site da Graficon, através do *Solicitar orçamento*. Gostaria de receber uma proposta para revestimento ou recuperação de cilindros.",
  "",
  "Aguardo retorno. Obrigado(a)!",
].join("\n");

export const WHATSAPP_URL_ORCAMENTO = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG_ORCAMENTO)}`;

const WhatsAppFloatingButton = () => {
  const handleClick = () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "flutuante", botao: "Botão flutuante" });
    trackGoogleEvent("clique_whatsapp", { origem: "flutuante" });
  };

  return (
    <a
      href={WHATSAPP_URL_ORCAMENTO}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className="whatsapp-floating-button"
      aria-label="Fale conosco no WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
};

export default WhatsAppFloatingButton;
