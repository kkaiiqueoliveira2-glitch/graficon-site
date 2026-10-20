import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";
import WhatsAppIcon from "@/components/WhatsAppIcon";

// Pedido da Gilda (20/10/2026): "coloca estas informações na página, aí o cliente
// fica sabendo o que fazemos". Lista de elastômeros, medida máxima e dureza vieram
// dela por WhatsApp; SBR entra porque foi confirmado em 28/09. A medida veio escrita
// "1.400 diâmetro até 5.500 MT" e foi lida como milímetro.
const ELASTOMEROS = [
  "Nitrílica (NBR)",
  "Neoprene",
  "Silicone",
  "Hypalon",
  "EPDM",
  "SBR",
  "Poliuretano (PU)",
];

const CAPACIDADE = [
  { valor: "1.400 mm", texto: "de diâmetro, no máximo" },
  { valor: "5.500 mm", texto: "de comprimento, no máximo" },
  { valor: "Shore A", texto: "dureza na sua indicação ou definida junto com a gente" },
  { valor: "Laboratório", texto: "próprio, para desenvolver o composto que a peça pede" },
];

const WHATSAPP_URL_ELASTOMERO = `https://wa.me/5511915291313?text=${encodeURIComponent(
  "Olá! Vi no site que vocês vulcanizam vários tipos de borracha. Quero consultar o composto e a medida de um cilindro."
)}`;

const ElastomerosSection = () => {
  const registraWhatsApp = () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "elastomeros", botao: "Consultar composto e medida" });
    trackGoogleEvent("clique_whatsapp", { origem: "elastomeros" });
  };

  return (
    <section id="vulcanizacao" className="section-industrial bg-muted">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div data-reveal>
            <p className="section-eyebrow">Vulcanização de borracha</p>
            <h2 className="section-title">A borracha certa para cada aplicação</h2>
            <p className="section-subtitle">
              Vulcanizamos o revestimento de rolos e cilindros em vários elastômeros. O
              composto se escolhe pelo que encosta na borracha: tinta, solvente,
              temperatura e pressão. Se a aplicação pede um composto fora da lista,
              desenvolvemos no nosso laboratório.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Elastômeros que vulcanizamos">
              {ELASTOMEROS.map((nome) => (
                <li
                  key={nome}
                  className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-semibold text-primary"
                >
                  {nome}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={WHATSAPP_URL_ELASTOMERO}
                target="_blank"
                rel="noreferrer"
                onClick={registraWhatsApp}
                className="btn-wa justify-center whitespace-nowrap px-6 py-3.5 text-sm uppercase tracking-wide"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Consultar composto e medida
              </a>
              <Link
                to="/servicos/processos-de-revestimento"
                className="inline-flex items-center justify-center gap-2 px-2 py-3.5 text-sm font-bold uppercase tracking-wide text-primary hover:underline"
              >
                Revestimento de borracha <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <dl
            data-reveal
            className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl shadow-xl"
            style={{ backgroundColor: "hsl(var(--brand-2))" }}
          >
            {CAPACIDADE.map((item) => (
              <div key={item.valor} className="flex flex-col gap-1.5 p-4 sm:p-7" style={{ backgroundColor: "hsl(var(--brand-1))" }}>
                <dt className="text-lg font-extrabold leading-tight text-white sm:text-3xl">{item.valor}</dt>
                <dd className="text-sm leading-snug text-white/75 sm:text-base">{item.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default ElastomerosSection;
