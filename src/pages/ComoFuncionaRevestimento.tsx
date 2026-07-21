import { Link } from "react-router-dom";
import {
  Check,
  ArrowRight,
  Gauge,
  Timer,
  ShieldCheck,
  AlertTriangle,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageSEO } from "@/hooks/usePageSEO";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";

const WHATSAPP_NUMBER = "5511915291313";
const WHATSAPP_MSG_ARTIGO =
  "Olá! Estava lendo sobre o revestimento de cilindros no site da Graficon e gostaria de solicitar um orçamento.";
const WHATSAPP_URL_ARTIGO = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MSG_ARTIGO
)}`;

const steps = [
  {
    n: "01",
    title: "Inspeção do núcleo",
    desc: "Análise de dimensões, concentricidade e estado superficial. Em cilindros recuperados, remoção da camada antiga.",
  },
  {
    n: "02",
    title: "Preparação da superfície",
    desc: "Ajuste e limpeza do núcleo para receber o novo revestimento com aderência adequada.",
  },
  {
    n: "03",
    title: "Definição de material e espessura",
    desc: "Escolha técnica conforme a aplicação — rotogravura, flexografia ou laminação.",
  },
  {
    n: "04",
    title: "Aplicação do revestimento",
    desc: "Vazamento, laminação ou técnica específica, conforme o processo definido para o cilindro.",
  },
  {
    n: "05",
    title: "Tratamento e usinagem",
    desc: "Tratamento térmico ou químico, usinagem e acabamento, com controle de concentricidade e diâmetro final.",
  },
  {
    n: "06",
    title: "Controle de qualidade final",
    desc: "Verificação de medidas, dureza e conformidade com o pedido antes da liberação do cilindro.",
  },
];

const beneficios = [
  {
    icon: Timer,
    title: "Maior durabilidade",
    desc: "Revestimento bem executado prolonga a vida útil do cilindro e reduz a troca prematura de peças.",
  },
  {
    icon: Gauge,
    title: "Precisão em impressão",
    desc: "Controle dimensional e acabamento uniforme garantem registro correto e repetibilidade entre tiragens.",
  },
  {
    icon: ShieldCheck,
    title: "Redução de paradas na produção",
    desc: "Menos falhas e retrabalho significam menos paradas de máquina e mais produtividade na linha.",
  },
];

const revestimentos = [
  {
    tipo: "Galvanização",
    indicado: "Base do cilindro, antes do revestimento final",
    caracteristica: "Camada metálica uniforme e aderente",
    aplicacao: "Preparação para qualquer tipo de revestimento",
  },
  {
    tipo: "Cromo duro",
    indicado: "Recuperação de medida e resistência ao desgaste",
    caracteristica: "Alta dureza superficial",
    aplicacao: "Cilindros desgastados, uso industrial pesado",
  },
  {
    tipo: "Fotopolímero",
    indicado: "Flexografia",
    caracteristica: "Boa definição de relevo, material leve",
    aplicacao: "Impressão flexográfica em embalagens",
  },
  {
    tipo: "Borracha (elastômero)",
    indicado: "Flexografia e laminação",
    caracteristica: "Flexibilidade e resistência a solventes",
    aplicacao: "Aplicações que exigem amortecimento",
  },
  {
    tipo: "Composto técnico",
    indicado: "Rotogravura",
    caracteristica: "Alta resistência para longas tiragens",
    aplicacao: "Rotogravura e processos correlatos",
  },
];

const ComoFuncionaRevestimento = () => {
  usePageSEO({
    title: "Como Funciona o Revestimento de Cilindros | Graficon Revestimento",
    description:
      "Saiba como funciona o revestimento de cilindros gráficos, as etapas do processo e quando é indicado para rotogravura e flexografia.",
    path: "/como-funciona-revestimento-de-cilindros",
    type: "article",
    faqItems: [
      {
        question: "Como funciona o revestimento de cilindros gráficos?",
        answer:
          "O processo inclui inspeção do núcleo, preparação da superfície, aplicação do material, tratamento e acabamento com controle dimensional final.",
      },
      {
        question: "Quando o revestimento de cilindros é indicado?",
        answer:
          "É indicado para recuperar cilindros desgastados, restaurar padrão de impressão e prolongar a vida útil em rotogravura e flexografia.",
      },
      {
        question: "Quanto tempo leva para revestir um cilindro?",
        answer:
          "O prazo varia conforme dimensão, material e complexidade técnica, sendo definido após análise do cilindro e das especificações do processo.",
      },
    ],
    jsonLd: {
      name: "Como funciona o revestimento de cilindros",
      description:
        "Processo técnico, etapas e aplicações do revestimento de cilindros para rotogravura e flexografia.",
    },
  });

  const trackWhatsApp = (origem: string) => {
    trackMetaEvent("CliqueWhatsApp", { origem, botao: "Solicitar avaliação técnica" });
    trackGoogleEvent("clique_whatsapp", { origem });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article>
          {/* HERO */}
          <section className="about-hero">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <p className="about-eyebrow">Guia técnico · Rotogravura &amp; Flexografia</p>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Como funciona o revestimento de cilindros para{" "}
                  <span className="text-cyan">rotogravura e flexografia</span>
                </h1>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10">
                  O processo técnico, etapa por etapa, que define a durabilidade e a
                  qualidade de impressão do seu cilindro — e os critérios para decidir
                  entre revestir, recuperar ou trocar.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={WHATSAPP_URL_ARTIGO}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWhatsApp("hero-artigo")}
                    className="about-cta-button"
                  >
                    Solicitar Avaliação Técnica via WhatsApp
                  </a>
                  <Link to="/o-que-fazemos" className="btn-outline-white text-base">
                    Ver todos os serviços
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-8 border-t border-white/15 pt-8 max-w-xl mx-auto">
                  <div className="hero-stat-inline items-center text-center">
                    <strong>+40 anos</strong>
                    <span>de profissão</span>
                  </div>
                  <div className="hero-stat-inline items-center text-center">
                    <strong>100%</strong>
                    <span>Controle de qualidade</span>
                  </div>
                  <div className="hero-stat-inline items-center text-center">
                    <strong>SP</strong>
                    <span>e região</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INTRO + IMAGEM */}
          <section className="section-industrial bg-white">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
                <div className="order-2 lg:order-1">
                  <p className="section-eyebrow">O que é</p>
                  <h2 className="section-title mb-5">O que é revestimento gráfico</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    O revestimento gráfico é a aplicação de uma camada de material
                    polimérico ou composto sobre a superfície de um núcleo metálico
                    (cilindro), formando a superfície de impressão utilizada em
                    rotogravura, flexografia e processos correlatos.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Define a geometria das células ou relevos de impressão",
                      "Determina a dureza superficial e a resistência ao desgaste",
                      "Usinagem final garante concentricidade e diâmetro corretos",
                      "Evita desbalanceamento e vibração em altas velocidades",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: "hsl(var(--cyan) / 0.15)",
                            border: "1px solid hsl(var(--cyan) / 0.4)",
                          }}
                        >
                          <Check className="h-3.5 w-3.5 text-cyan" />
                        </span>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2 overflow-hidden rounded-2xl border border-border shadow-lg">
                  <img
                    src="/services/svc-revestimento.webp"
                    alt="Cilindro industrial em processo de revestimento técnico — Graficon"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* PARA QUE SERVE */}
          <section className="section-industrial bg-muted">
            <div className="container max-w-3xl">
              <p className="section-eyebrow">Função</p>
              <h2 className="section-title mb-5">Para que serve o revestimento gráfico</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O revestimento gráfico serve para formar ou restaurar a superfície de
                impressão dos cilindros utilizados em rotogravura e flexografia. A
                espessura, a uniformidade e o acabamento influenciam diretamente a
                qualidade da impressão, o registro e a repetibilidade entre tiragens.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sem o revestimento adequado, o cilindro não atende às especificações da
                máquina e do processo — a falta de uniformidade provoca variação de cor,
                falhas de registro e desperdício de material.
              </p>
            </div>
          </section>

          {/* ETAPAS DO PROCESSO */}
          <section className="section-industrial bg-white">
            <div className="container">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="section-eyebrow justify-center">Passo a passo</p>
                <h2 className="section-title">
                  Como funciona o revestimento de cilindros gráficos
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {steps.map((step) => (
                  <div
                    key={step.n}
                    className="about-pillar-card"
                  >
                    <span className="text-cyan text-sm font-bold tracking-widest">
                      {step.n}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Fotos do processo: da inspeção à aprovação final */}
              <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
                <figure className="overflow-hidden rounded-2xl border border-border shadow-lg">
                  <img
                    src="/services/svc-preparacao.webp"
                    alt="Inspeção técnica de cilindro com paquímetro de precisão — etapa inicial do processo"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="px-4 py-3 text-sm text-muted-foreground bg-muted">
                    Inspeção e preparação do núcleo
                  </figcaption>
                </figure>
                <figure className="overflow-hidden rounded-2xl border border-border shadow-lg">
                  <img
                    src="/services/svc-prova.webp"
                    alt="Prova e análise técnica do cilindro revestido — etapa final do processo"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption className="px-4 py-3 text-sm text-muted-foreground bg-muted">
                    Prova, análise e aprovação final
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* TABELA COMPARATIVA */}
          <section className="section-industrial bg-muted">
            <div className="container max-w-5xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <p className="section-eyebrow justify-center">Referência técnica</p>
                <h2 className="section-title">Tipos de revestimento e aplicações</h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="px-5 py-4 font-semibold">Processo / material</th>
                      <th className="px-5 py-4 font-semibold">Indicado para</th>
                      <th className="px-5 py-4 font-semibold">Característica técnica</th>
                      <th className="px-5 py-4 font-semibold">Aplicação principal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revestimentos.map((r, i) => (
                      <tr
                        key={r.tipo}
                        className={i % 2 === 0 ? "bg-card" : "bg-muted/60"}
                      >
                        <td className="px-5 py-4 font-semibold text-foreground border-t border-border">
                          {r.tipo}
                        </td>
                        <td className="px-5 py-4 text-muted-foreground border-t border-border">
                          {r.indicado}
                        </td>
                        <td className="px-5 py-4 text-muted-foreground border-t border-border">
                          {r.caracteristica}
                        </td>
                        <td className="px-5 py-4 text-muted-foreground border-t border-border">
                          {r.aplicacao}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Referência geral por processo. Dureza, espessura e material exatos são
                definidos após análise técnica do cilindro e da aplicação.
              </p>
            </div>
          </section>

          {/* APLICAÇÕES E BENEFÍCIOS */}
          <section className="section-industrial bg-white">
            <div className="container">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="section-eyebrow justify-center">Aplicações e benefícios</p>
                <h2 className="section-title">
                  Por que investir em revestimento gráfico bem executado
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {beneficios.map((b) => (
                  <div key={b.title} className="about-pillar-card">
                    <div className="about-pillar-icon">
                      <b.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BANNER INTERMEDIÁRIO */}
          <section className="py-14 md:py-16" style={{ backgroundColor: "hsl(var(--cyan))" }}>
            <div className="container">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center md:text-left">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--cyan-foreground))] leading-tight">
                    Tem um cilindro desgastado ou fora do padrão de impressão?
                  </h2>
                  <p className="text-[hsl(var(--cyan-foreground))]/80 mt-2">
                    Envie as especificações e receba uma avaliação técnica sem custo.
                  </p>
                </div>
                <a
                  href={WHATSAPP_URL_ARTIGO}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsApp("banner-meio-artigo")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--navy-dark))] px-8 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 shrink-0"
                >
                  Falar no WhatsApp <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </section>

          {/* PROBLEMAS */}
          <section className="section-industrial bg-muted">
            <div className="container max-w-3xl">
              <p className="section-eyebrow">Atenção</p>
              <h2 className="section-title mb-6">
                Problemas causados pela ausência ou má execução do revestimento
              </h2>
              <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-start gap-4 mb-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    A ausência de revestimento adequado ou a má execução do processo
                    levam a desgaste prematuro, descolamento da camada e variação
                    dimensional — em rotogravura e flexografia, isso se traduz em falhas
                    de registro, manchas, variação de cor e impressão fora do padrão.
                  </p>
                </div>
                <ul className="space-y-3 pl-14">
                  {[
                    "Retrabalho industrial, aumento de custos e atraso de prazos",
                    "Danos às máquinas em casos mais graves",
                    "Paradas de produção prolongadas",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* QUANDO CONTRATAR */}
          <section className="section-industrial bg-white">
            <div className="container max-w-3xl">
              <p className="section-eyebrow">Decisão</p>
              <h2 className="section-title mb-5">
                Quando contratar uma empresa especializada
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A especialização técnica garante que o cilindro atenda às
                especificações da aplicação. Contrate um fornecedor especializado
                quando:
              </p>
              <ul className="space-y-3">
                {[
                  "For necessário revestir cilindros novos ou recuperar cilindros usados",
                  "Houver requisitos técnicos específicos de rotogravura ou flexografia",
                  "Problemas recorrentes de qualidade sugerirem falha no processo atual",
                  "A demanda interna não justificar investimento em estrutura própria",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "hsl(var(--cyan) / 0.15)",
                        border: "1px solid hsl(var(--cyan) / 0.4)",
                      }}
                    >
                      <Check className="h-3.5 w-3.5 text-cyan" />
                    </span>
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                Para quem busca{" "}
                <Link to="/" className="text-primary font-medium hover:underline">
                  revestimento de cilindros gráficos
                </Link>
                , a escolha do fornecedor deve considerar experiência, controle de
                qualidade e capacidade de entrega.
              </p>
            </div>
          </section>

          {/* FECHAMENTO: PROVA SOCIAL + SELOS + CTA FINAL */}
          <section className="section-blue-gradient py-16 md:py-20">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  +40 anos revestindo e recuperando cilindros para a indústria gráfica
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Controle de qualidade em todas as etapas, do núcleo à prova final.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                  <span className="contact-badge">
                    <ShieldCheck className="h-4 w-4 text-cyan" /> 100% controle de qualidade
                  </span>
                  <span className="contact-badge">
                    <Timer className="h-4 w-4 text-cyan" /> +40 anos de profissão
                  </span>
                  <span className="contact-badge">
                    <Gauge className="h-4 w-4 text-cyan" /> Atendimento técnico especializado
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={WHATSAPP_URL_ARTIGO}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackWhatsApp("fechamento-artigo")}
                    className="about-cta-button"
                  >
                    Solicitar Orçamento Técnico
                  </a>
                  <Link to="/#contato" className="btn-outline-white text-base">
                    Preencher formulário
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ComoFuncionaRevestimento;
