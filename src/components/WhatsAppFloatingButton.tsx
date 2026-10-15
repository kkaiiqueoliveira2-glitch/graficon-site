import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();
  // Some enquanto o hero da home está na tela: lá já tem o botão grande do
  // WhatsApp, e no celular o flutuante ficava em cima dele (15/10/2026).
  const [escondido, setEscondido] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero || !("IntersectionObserver" in window)) {
      setEscondido(false);
      return;
    }
    const obs = new IntersectionObserver(([e]) => setEscondido(e.intersectionRatio > 0.35), {
      threshold: [0, 0.35, 1],
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, [pathname]);

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
      data-escondido={escondido}
      aria-hidden={escondido}
      tabIndex={escondido ? -1 : undefined}
      aria-label="Fale conosco no WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
};

export default WhatsAppFloatingButton;
