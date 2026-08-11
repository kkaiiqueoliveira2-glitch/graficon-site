import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageSEO } from "@/hooks/usePageSEO";
import { getServiceBySlug, services } from "@/data/services";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import PerguntarIA from "@/components/PerguntarIA";

const SITE_URL = "https://graficonrevestimento.com";

const ServicoDetalhe = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  usePageSEO({
    title: service ? service.seoTitle : "Serviço não encontrado | Graficon",
    description: service ? service.seoDescription : "Página não encontrada.",
    path: service ? `/servicos/${service.slug}` : "/servicos",
    type: "article",
    noindex: !service,
    image: service ? `${SITE_URL}${service.image}` : undefined,
    jsonLd: service
      ? { name: service.title, description: service.seoDescription }
      : undefined,
    faqItems: service
      ? service.faq.map((f) => ({ question: f.q, answer: f.a }))
      : [],
  });

  if (!service) {
    return <NotFound />;
  }

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Serviços", item: `${SITE_URL}/o-que-fazemos` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${SITE_URL}/servicos/${service.slug}`,
      },
    ],
  };

  /**
   * Schema do serviço em si, separado do Article que o usePageSEO já injeta.
   *
   * O Article descreve "esta página é um texto sobre X"; o Service descreve
   * "a Graficon presta o serviço X, na região Y". É esse segundo que amarra o
   * serviço à entidade da empresa (via @id do LocalBusiness da home) e o que os
   * mecanismos de resposta usam pra dizer quem faz o quê.
   *
   * Sem preço: cada orçamento sai de análise técnica da peça, então declarar
   * faixa de valor aqui seria inventar dado.
   */
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/servicos/${service.slug}#servico`,
    name: service.title,
    description: service.seoDescription,
    url: `${SITE_URL}/servicos/${service.slug}`,
    serviceType: service.title,
    category: "Revestimento e recuperação de cilindros industriais",
    provider: { "@id": `${SITE_URL}/#empresa` },
    areaServed: [
      { "@type": "City", name: "São Paulo" },
      { "@type": "State", name: "São Paulo" },
      { "@type": "Country", name: "Brasil" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/servicos/${service.slug}`,
      servicePhone: "+55-11-91529-1313",
      availableLanguage: "Portuguese",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `O que inclui — ${service.title}`,
      itemListElement: service.bullets.map((b, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Service", name: b },
      })),
    },
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Banner */}
        <section className="services-hero">
          <div className="container">
            <nav className="mb-5 flex items-center justify-center gap-1 text-sm text-white/70">
              <Link to="/" className="hover:text-white">Início</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/o-que-fazemos" className="hover:text-white">Serviços</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{service.title}</span>
            </nav>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Conteúdo: imagem + texto */}
        <section className="section-industrial bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                <img
                  src={service.image}
                  alt={`${service.title} — Graficon Revestimento de Cilindros`}
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div>
                <p className="section-eyebrow">Serviço</p>
                <h2 className="section-title mb-5">{service.title}</h2>
                {service.longDescription.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                    {p}
                  </p>
                ))}

                <ul className="mt-6 space-y-3">
                  {service.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "hsl(var(--cyan) / 0.15)", border: "1px solid hsl(var(--cyan) / 0.4)" }}>
                        <Check className="h-3.5 w-3.5 text-cyan" />
                      </span>
                      <span className="text-foreground/90">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={WHATSAPP_URL_ORCAMENTO}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-wa px-8 py-3.5 text-sm uppercase tracking-wide"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Falar no WhatsApp
                  </a>
                  <Link to="/#contato" className="btn-brand-outline px-8 py-3.5 text-sm uppercase tracking-wide">
                    Solicitar orçamento <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perguntas frequentes do serviço */}
        <section className="section-industrial bg-white">
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <p className="section-eyebrow justify-center">Perguntas frequentes</p>
              <h2 className="section-title">Dúvidas sobre {service.title.toLowerCase()}</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {service.faq.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="faq-item border-b-0">
                  <AccordionTrigger className="text-left text-base font-semibold text-primary hover:no-underline py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Fecha o FAQ oferecendo uma segunda opinião neutra. Quem chega
                aqui já leu as respostas da própria Graficon — a checagem externa
                vale mais no fim da leitura do que no começo. */}
            <div className="mt-8">
              <PerguntarIA
                prompt={service.promptIA}
                origem={`servico-${service.slug}`}
              />
            </div>
          </div>
        </section>

        {/* Outros serviços */}
        <section className="section-industrial bg-muted">
          <div className="container">
            <p className="section-eyebrow">Outros serviços</p>
            <h2 className="section-title mb-10">Conheça também</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((s) => (
                <Link key={s.slug} to={`/servicos/${s.slug}`} className="svc-card">
                  <div className="svc-card-media">
                    <img src={s.image} alt={s.title} loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215_60%_10%/0.65)] to-transparent" />
                    <div className="svc-card-icon absolute bottom-4 left-4">
                      <s.icon className="h-6 w-6 text-cyan" />
                    </div>
                  </div>
                  <div className="svc-card-body">
                    <h3 className="text-xl font-semibold text-primary mb-3">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                      {s.description}
                    </p>
                    <span className="svc-card-link">
                      Saiba mais <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </div>
  );
};

export default ServicoDetalhe;
