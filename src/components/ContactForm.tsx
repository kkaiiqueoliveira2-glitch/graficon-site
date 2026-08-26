import { MapPin, ExternalLink, Clock, Users, FileCheck, Phone, Mail, Check } from "lucide-react";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import CurvaSecao from "@/components/CurvaSecao";
import FormularioOrcamento from "@/components/FormularioOrcamento";

/**
 * Seção de contato da home: faixa de chamada, cartões de telefone/endereço/
 * horário, o formulário de orçamento e o mapa.
 *
 * O formulário em si vive em FormularioOrcamento, porque também roda no
 * rodapé de cada página de serviço. Aqui ele entra sem props, ou seja, com
 * o campo de peça em branco: quem chega pela home ainda não disse o que
 * precisa.
 */
const ContactForm = () => {
  return (
    <>
      <section className="contact-hero relative overflow-hidden pt-28 pb-28 md:pt-40 md:pb-40">
        {/* Curva no topo (vinda da faixa branca acima) */}
        <CurvaSecao posicao="topo" corDestino="hsl(0 0% 100%)" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <p className="contact-eyebrow">Fale conosco</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Solicite seu <span className="text-cyan">Orçamento</span>
            </h2>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              Conte com uma equipe técnica especializada para analisar sua
              demanda e indicar a melhor solução para seus cilindros.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "Diagnóstico técnico gratuito",
                "Resposta rápida",
                "+40 anos de profissão",
              ].map((t) => (
                <span key={t} className="contact-badge">
                  <Check className="h-4 w-4 text-cyan" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Curva na base (descendo para a seção de cards) */}
        <CurvaSecao posicao="base" corDestino="hsl(var(--muted))" />
      </section>

      <section id="contato" className="section-industrial bg-muted py-16 md:py-24 scroll-mt-28 md:scroll-mt-32">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 mb-12 text-center md:text-left">
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Phone className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Telefone</h3>
              <p className="text-sm text-muted-foreground">Comercial: (11) 91529-1313</p>
              <p className="mt-1 text-sm text-muted-foreground">Seg a qui, 08h–18h · Sex, 08h–15h</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Mail className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">E-mail</h3>
              <a
                href="mailto:comercialgraficon@gmail.com"
                className="text-sm text-primary hover:underline"
              >
                comercialgraficon@gmail.com
              </a>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <MapPin className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Endereço</h3>
              <p className="text-sm text-muted-foreground">Rua Mara Rosa, 95</p>
              <p className="text-sm text-muted-foreground">Bairro dos Eucaliptos – São Paulo, SP</p>
            </div>
          </div>

          <div id="formulario-orcamento" className="contact-form-float grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-0 items-stretch overflow-hidden bg-card">
            <div className="contact-form-panel-blue contact-panel text-center lg:text-left rounded-none border-r border-b lg:border-b-0 border-white/10">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "hsl(var(--cyan-foreground))", backgroundColor: "hsl(var(--cyan))" }}>
                Orçamento gratuito
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                Peça seu orçamento agora <span className="text-cyan">sem compromisso</span>
              </h2>
              <p className="text-white/90 leading-relaxed mb-6">
                Leva menos de 1 minuto. Preencha os campos ao lado e fale direto com nossa
                equipe técnica pelo WhatsApp — retorno no mesmo dia útil.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left">
                  <span className="contact-benefit-icon">
                    <Clock className="w-5 h-5 text-cyan" />
                  </span>
                  <div>
                    <p className="font-medium text-white text-sm">Resposta rápida</p>
                    <p className="text-sm text-white/80">Retorno ágil para projetos e manutenção.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left">
                  <span className="contact-benefit-icon">
                    <Users className="w-5 h-5 text-cyan" />
                  </span>
                  <div>
                    <p className="font-medium text-white text-sm">Atendimento técnico</p>
                    <p className="text-sm text-white/80">Avaliação por especialistas em cilindros.</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left">
                  <span className="contact-benefit-icon">
                    <FileCheck className="w-5 h-5 text-cyan" />
                  </span>
                  <div>
                    <p className="font-medium text-white text-sm">Orçamento sob medida</p>
                    <p className="text-sm text-white/80">Escopo alinhado com desempenho e durabilidade.</p>
                  </div>
                </div>
              </div>
            </div>

          <FormularioOrcamento />
        </div>

        <div className="contact-map-section">
          <div className="contact-map-header">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Como chegar
                </h3>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-muted-foreground text-center sm:text-left">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Graficon Revestimento de Cilindros</p>
                    <p className="text-sm">Rua Mara Rosa, 95</p>
                    <p className="text-sm">Bairro dos Eucaliptos – São Paulo, SP</p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+Mara+Rosa+95+Bairro+dos+Eucaliptos+São+Paulo"
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
