import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronRight,
  AlertTriangle,
  Camera,
  Search,
  FileCheck,
} from "lucide-react";
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
import WhatsAppIcon from "@/components/WhatsAppIcon";
import PerguntarIA from "@/components/PerguntarIA";
import FormularioOrcamento from "@/components/FormularioOrcamento";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";

const SITE_URL = "https://graficonrevestimento.com";
const WHATSAPP_NUMERO = "5511915291313";

/** Como o atendimento funciona de verdade, na ordem em que acontece. */
const PASSOS = [
  {
    icon: Camera,
    titulo: "Você manda a medida e a foto",
    texto:
      "Diâmetro, comprimento e uma foto da peça. É o que permite avaliar o desgaste sem a peça sair do lugar.",
  },
  {
    icon: Search,
    titulo: "Avaliamos se dá para recuperar",
    texto:
      "Nem toda peça compensa. Quando não compensar, falamos, em vez de empurrar um serviço que não resolve.",
  },
  {
    icon: FileCheck,
    titulo: "Você recebe um orçamento técnico",
    texto:
      "Escopo do que será feito e prazo, no mesmo dia útil. Sem compromisso e sem valor genérico por telefone.",
  },
];

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

  /**
   * Cada página abre o WhatsApp com uma frase própria, não com a genérica do
   * botão flutuante. Do lado da Gilda isso é a única pista de por onde o lead
   * entrou, e do lado do relatório é o que permite separar qual página converte.
   */
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    service.waMensagem ??
      "Olá! Vim pelo site e gostaria de solicitar um orçamento."
  )}`;

  const registraWhatsApp = (posicao: string) => () => {
    const origem = `servico-${service.slug}-${posicao}`;
    trackMetaEvent("CliqueWhatsApp", { origem, botao: "Falar no WhatsApp" });
    trackGoogleEvent("clique_whatsapp", { origem });
  };

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
        {/* Banner.

            A primeira dobra antes só tinha breadcrumb, título e subtítulo: nem
            um botão. Quem chega de anúncio decide nos primeiros segundos, então
            aqui entram as três provas que a Graficon tem de verdade e os dois
            caminhos de contato, sem precisar rolar. */}
        <section className="services-hero">
          <div className="container">
            <nav className="mb-5 flex items-center justify-center gap-1 text-sm text-white/70">
              <Link to="/" className="hover:text-white">Início</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/o-que-fazemos" className="hover:text-white">Serviços</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white">{service.title}</span>
            </nav>

            <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                {service.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {[
                  "+40 anos de profissão",
                  "Diagnóstico técnico gratuito",
                  "Resposta no mesmo dia útil",
                ].map((t) => (
                  <span key={t} className="contact-badge">
                    <Check className="h-4 w-4 text-cyan" /> {t}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={registraWhatsApp("hero")}
                  className="btn-wa px-8 py-4 text-base justify-center"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Falar no WhatsApp
                </a>
                <a
                  href="#orcamento"
                  className="btn-outline-white text-base justify-center"
                >
                  Mandar a medida da peça
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* A dor antes do processo.

            Quem procura esse serviço não acorda querendo "controle de espessura
            e dureza": ele tem uma máquina parada ou uma peça fora de medida. A
            página começa pelo sintoma, na linguagem dele, e só depois explica o
            que a Graficon faz a respeito.

            Ícone de alerta em card neutro, nunca fundo vermelho: o tom do site é
            técnico, não alarmista. */}
        {service.dores && service.dores.length > 0 && (
          <section className="section-industrial bg-muted">
            <div className="container">
              <div className="max-w-3xl mb-10">
                <p className="section-eyebrow">Chegou aqui por causa disso?</p>
                <h2 className="section-title">
                  Os sinais de que a peça precisa de serviço
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {service.dores.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-white p-6 shadow-sm"
                    style={{ borderLeft: "4px solid hsl(var(--primary))" }}
                  >
                    <AlertTriangle
                      className="h-6 w-6 text-primary mb-4"
                      aria-hidden
                    />
                    <p className="text-foreground/90 leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-muted-foreground">
                Se reconheceu a peça em algum desses, na maioria das vezes ela
                volta a operar sem precisar comprar uma nova.{" "}
                <a href="#orcamento" className="text-primary underline underline-offset-2 font-medium">
                  Mande a medida e a foto
                </a>{" "}
                que avaliamos.
              </p>
            </div>
          </section>
        )}

        {/* Conteúdo: imagem + texto.

            O H2 aqui era o mesmo texto do H1, repetido a uma rolagem de
            distância. Agora ele diz o que a seção realmente entrega. */}
        <section className="section-industrial bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <figure className="m-0">
                <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
                  <img
                    src={service.image}
                    alt={`${service.title} — Graficon Revestimento de Cilindros`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  Laboratório próprio em São Paulo, com controle de processo em
                  todas as etapas.
                </figcaption>
              </figure>

              <div>
                <p className="section-eyebrow">Como resolvemos</p>
                <h2 className="section-title mb-5">
                  O que a Graficon faz com a sua peça
                </h2>
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
              </div>
            </div>
          </div>
        </section>

        {/* Como funciona o atendimento.

            O CTA de WhatsApp deixa de ser um botão solto no meio do texto e passa
            a vir com o processo explicado. Quem hesita em chamar no WhatsApp
            hesita por não saber o que vem depois do "oi" — três passos curtos
            custam menos que qualquer argumento de venda. */}
        <section className="section-blue-gradient py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="services-eyebrow">Como funciona</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Do primeiro contato ao orçamento
              </h2>
              <p className="text-white/85 text-lg leading-relaxed">
                A Graficon recupera cilindros e hastes de máquinas industriais e
                gráficas há mais de 40 anos, em São Paulo. O atendimento começa
                pela peça, não por uma tabela de preço.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {PASSOS.map((passo, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20">
                      <passo.icon className="h-5 w-5 text-cyan" aria-hidden />
                    </span>
                    <span className="text-cyan font-bold text-sm tracking-widest">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {passo.titulo}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-sm">
                    {passo.texto}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={registraWhatsApp("banda-atendimento")}
                className="btn-wa px-8 py-4 text-base justify-center w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp agora
              </a>
              <a href="#orcamento" className="btn-outline-white text-base justify-center w-full sm:w-auto">
                Prefiro preencher os dados <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 text-center text-white/60 text-sm">
              Atendimento de segunda a quinta, 8h às 18h · Sexta, 8h às 15h
            </p>
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

        {/* Orçamento na própria página.

            Antes daqui o único caminho era um link para /#contato, ou seja: o
            visitante tinha que sair da página que respondeu a dúvida dele pra
            pedir preço. Com a verba de tráfego caindo direto nestas URLs, esse
            pulo era o vazamento mais caro do funil.

            O campo da peça já vem preenchido com o serviço desta página, então
            a mensagem chega no WhatsApp da consultora já classificada. */}
        <section id="orcamento" className="section-industrial bg-muted scroll-mt-28 md:scroll-mt-32">
          <div className="container max-w-3xl">
            <p className="section-eyebrow">Orçamento sem compromisso</p>
            <h2 className="section-title mb-4">
              Mande a medida e receba um orçamento técnico
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Preencha abaixo e a conversa abre no WhatsApp já com os dados da
              peça. Sem formulário longo, sem esperar retorno de e-mail:
              respondemos no mesmo dia útil.
            </p>
            <FormularioOrcamento
              pecaPadrao={service.pecaPadrao}
              placeholderMensagem={service.exemploMensagem}
              origem={`servico-${service.slug}`}
              className="contact-card"
            />
          </div>
        </section>

        {/* Outros serviços */}
        <section className="section-industrial bg-white">
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
