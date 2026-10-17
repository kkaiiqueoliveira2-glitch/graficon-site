import { Link } from "react-router-dom";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import CurvaSecao from "@/components/CurvaSecao";
import { PalavraGiratoria } from "@/components/ui/animated-hero";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";

// O que a Graficon reveste e recupera. A ordem segue quem chega pelo anúncio:
// os leads reais foram de borracha (moinho e gráfica), e offset foi confirmado
// em 28/09. "Rolo" sempre com complemento (pedido do Matheus, 29/09).
const PALAVRAS = [
  "cilindros gráficos",
  "rolos de borracha",
  "rolos de offset",
  "cilindros industriais",
  "hastes com cromo duro",
];

/**
 * Hero centrado no padrão dos posts da Graficon (15/10/2026): fundo no degradê
 * da marca em vez de foto (é o mesmo dos carrosséis e deixa o texto ser o
 * primeiro a aparecer), título em Poppins Black, palavra de destaque na Cor 3.
 * Os números do hero antigo saíram: "100% controle de qualidade" não tinha
 * como ser provado, e a regra da marca é não afirmar número sem a Gilda.
 */
const HeroSection = () => {
  const scrollToFormulario = () => {
    trackMetaEvent("CliqueBotaoOrcamento", {
      origem: "hero",
      botao: "Solicitar Orçamento",
    });
    trackGoogleEvent("clique_orcamento", { origem: "hero" });
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const trackWhatsAppHero = () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "hero", botao: "Mande a foto do cilindro" });
    trackGoogleEvent("clique_whatsapp", { origem: "hero" });
  };

  return (
    <section id="home" className="hero-graficon">
      <div className="hero-graficon-brilho" aria-hidden="true" />

      <div className="container relative z-10 pb-20 pt-12 md:py-0">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="hero-eyebrow mb-5 md:mb-6">Qualidade industrial · +40 anos</span>

          <h1 className="hero-graficon-titulo">
            Revestimento e recuperação de
            <PalavraGiratoria palavras={PALAVRAS} className="text-cyan" />
          </h1>

          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-white/85 md:mt-6 md:text-xl">
            Borracha na dureza certa, medida em Shore A, e cromo duro com retífica na medida
            da sua máquina. Atendemos gráfica e indústria; não fazemos peça automotiva.
          </p>

          {/* WhatsApp na frente: é o canal que a Graficon atende e por onde os
              leads da campanha chegam. A foto da peça já adianta a avaliação. */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <a
              href={WHATSAPP_URL_ORCAMENTO}
              target="_blank"
              rel="noreferrer"
              onClick={trackWhatsAppHero}
              className="btn-wa w-full justify-center whitespace-nowrap px-5 py-4 text-[15px] uppercase tracking-normal sm:w-auto sm:px-8 sm:text-base sm:tracking-wide"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Mande a foto do cilindro
            </a>
            <button
              onClick={scrollToFormulario}
              className="btn-outline-white w-full text-base uppercase tracking-wide sm:w-auto"
            >
              Solicitar orçamento
            </button>
          </div>

          <p className="mt-8 max-w-xl text-sm text-white/70">
            Saiba{" "}
            <Link to="/o-que-e-revestimento-grafico" className="text-white underline underline-offset-2 hover:text-cyan">
              o que é revestimento gráfico
            </Link>{" "}
            e{" "}
            <Link to="/como-funciona-revestimento-de-cilindros" className="text-white underline underline-offset-2 hover:text-cyan">
              como funciona o revestimento de cilindros
            </Link>
            .
          </p>
        </div>
      </div>

      <CurvaSecao posicao="base" corDestino="hsl(0 0% 100%)" />
    </section>
  );
};

export default HeroSection;
