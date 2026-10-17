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
  // Some onde a página já tem o próprio botão do WhatsApp e o flutuante ficava
  // em cima de texto no celular: o hero da home (15/10/2026), o "Como funciona"
  // e a seção de contato (17/10/2026). O número é a fração da seção que precisa
  // estar na tela pra esconder.
  const [escondido, setEscondido] = useState(false);

  useEffect(() => {
    setEscondido(false);
    if (!("IntersectionObserver" in window)) return;
    const regras: [string, number][] = [
      ["home", 0.35],
      ["como-funciona", 0],
      ["contato", 0.15],
    ];
    const alvos = regras
      .map(([id, min]) => [document.getElementById(id), min] as const)
      .filter((r): r is readonly [HTMLElement, number] => r[0] !== null);
    if (!alvos.length) return;
    const ativo = new Map<Element, boolean>();
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const min = alvos.find(([el]) => el === e.target)?.[1] ?? 0;
          ativo.set(e.target, e.isIntersecting && e.intersectionRatio > min);
        }
        setEscondido([...ativo.values()].some(Boolean));
      },
      { threshold: [0, 0.15, 0.35, 1] },
    );
    alvos.forEach(([el]) => obs.observe(el));
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
