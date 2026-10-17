import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Check, ExternalLink, Instagram, Mail, MapPin } from "lucide-react";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import CurvaSecao from "@/components/CurvaSecao";
import FormularioOrcamento from "@/components/FormularioOrcamento";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";
import { miniatura } from "@/lib/miniatura";

/**
 * Seção de contato da home no "Contact Section" do 21st.dev (escolhido pelo
 * Kaique em 17/10/2026): foto de fundo com o véu da marca e bolhas subindo,
 * título à esquerda e um card com os contatos e o formulário à direita.
 *
 * O formulário é o mesmo FormularioOrcamento das páginas de serviço (monta a
 * mensagem e abre o WhatsApp). A lista de "o que você procura" do original não
 * entrou: o formulário já pergunta qual peça, e cada campo a mais custa lead.
 *
 * As bolhas são CSS e só animam com a seção na tela: o Safari do iPhone não
 * pausa animação fora da tela sozinho. As posições são fixas, não sorteadas,
 * pra o HTML do pré-render bater com o da página.
 */
const BOLHAS = [
  [6, 14, 0, 18], [14, 22, 4, 24], [22, 12, 9, 16], [31, 18, 2, 22], [39, 10, 7, 14],
  [47, 24, 11, 26], [55, 14, 1, 19], [63, 20, 6, 23], [71, 12, 10, 15], [79, 26, 3, 27],
  [86, 16, 8, 20], [93, 12, 5, 17], [27, 30, 12, 29], [68, 28, 14, 25],
] as const; // [esquerda %, tamanho px, atraso s, duração s]

const FOTO = "/services/svc-usinagem.webp";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Rua+Mara+Rosa+95+Bairro+dos+Eucaliptos+São+Paulo";

const ContactForm = () => {
  const secao = useRef<HTMLElement>(null);
  const [ativa, setAtiva] = useState(false);

  useEffect(() => {
    const el = secao.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([e]) => setAtiva(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const registra = (botao: string) => () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "contato", botao });
    trackGoogleEvent("clique_whatsapp", { origem: "contato" });
  };

  return (
    <>
      <section
        ref={secao}
        id="contato"
        className="ctt-secao scroll-mt-28 md:scroll-mt-32"
        data-ativa={ativa ? "sim" : "nao"}
      >
        <img
          src={miniatura(FOTO, 1200)}
          srcSet={`${miniatura(FOTO, 720)} 720w, ${miniatura(FOTO, 1200)} 1200w, ${FOTO} 1800w`}
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="ctt-foto"
        />
        <div className="ctt-veu" aria-hidden="true" />
        <div className="ctt-bolhas" aria-hidden="true">
          {BOLHAS.map(([x, t, atraso, duracao], i) => (
            <span
              key={i}
              style={
                {
                  left: `${x}%`,
                  width: t,
                  height: t,
                  animationDelay: `${atraso}s`,
                  animationDuration: `${duracao}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <CurvaSecao posicao="topo" corDestino="hsl(0 0% 100%)" />

        <div className="container relative z-10">
          <div className="ctt-grade">
            <div className="ctt-chamada">
              <p className="contact-eyebrow">Fale conosco</p>
              <h2 className="ctt-titulo">
                Antes de comprar um cilindro novo, <em>mande a foto pra gente</em>
              </h2>
              <p className="ctt-texto">
                Com a medida e a foto, a equipe técnica avalia se a peça compensa recuperar e
                manda o orçamento pelo WhatsApp.
              </p>
              <ul className="ctt-selos">
                {["Diagnóstico técnico gratuito", "Resposta em até 24 horas", "+40 anos de profissão"].map(
                  (t) => (
                    <li key={t}>
                      <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> {t}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div id="formulario-orcamento" className="ctt-card">
              <h3 className="ctt-card-titulo">Peça seu orçamento</h3>

              <div>
                <p className="text-sm text-muted-foreground">Fale direto pelo WhatsApp</p>
                <a
                  href={WHATSAPP_URL_ORCAMENTO}
                  target="_blank"
                  rel="noreferrer"
                  onClick={registra("Telefone do card de contato")}
                  className="ctt-telefone"
                >
                  (11) 91529-1313
                </a>
                <div className="ctt-icones">
                  <span className="text-sm text-muted-foreground">ou</span>
                  <a
                    href={WHATSAPP_URL_ORCAMENTO}
                    target="_blank"
                    rel="noreferrer"
                    onClick={registra("Ícone do card de contato")}
                    aria-label="WhatsApp"
                    className="ctt-icone"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                  <a href="mailto:comercialgraficon@gmail.com" aria-label="E-mail" className="ctt-icone">
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/graficon.revestimento/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="ctt-icone"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Endereço no Google Maps"
                    className="ctt-icone"
                  >
                    <MapPin className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <hr className="my-6 border-border" />

              <p className="mb-5 text-sm text-muted-foreground">
                Ou deixe os dados da peça: a mensagem chega pronta no WhatsApp.
              </p>
              <FormularioOrcamento className="" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container">
          <div className="contact-map-section mt-0">
            <div className="contact-map-header">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
                <div className="flex flex-col items-center sm:items-start">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Como chegar</h3>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-muted-foreground text-center sm:text-left">
                    <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Graficon Revestimento de Cilindros</p>
                      <p className="text-sm">Rua Mara Rosa, 95</p>
                      <p className="text-sm">Bairro dos Eucaliptos, São Paulo, SP</p>
                      <p className="text-sm">Seg a qui, 08h às 18h · Sex, 08h às 15h</p>
                    </div>
                  </div>
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground shrink-0 sm:justify-start"
                >
                  Abrir no Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <GoogleMapEmbed />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
