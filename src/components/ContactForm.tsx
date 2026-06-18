import { useState } from "react";
import { MapPin, ExternalLink, Clock, Users, FileCheck, Phone, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import { trackMetaEvent } from "@/lib/metaPixel";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    empresa: "",
    responsavel: "",
    whatsapp: "",
    servico: "",
    mensagem: "",
  });
  const isFormValid =
    formData.empresa.trim().length > 0 &&
    formData.responsavel.trim().length > 0 &&
    formData.whatsapp.trim().length > 0 &&
    formData.servico.trim().length > 0 &&
    formData.mensagem.trim().length > 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const conversionPayload = {
      empresa: formData.empresa.trim(),
      responsavel: formData.responsavel.trim(),
      whatsapp: formData.whatsapp.trim(),
      servico: formData.servico.trim(),
      mensagem: formData.mensagem.trim(),
      canal: "site",
      origem: "formulario_orcamento",
    };

    trackMetaEvent("FormularioOrcamentoEnviado", conversionPayload);
    trackMetaEvent("Lead", conversionPayload, false);

    const mensagem = [
      "*Nova solicitação de orçamento*",
      "",
      `*Empresa:* ${formData.empresa}`,
      `*Responsável:* ${formData.responsavel}`,
      `*WhatsApp:* ${formData.whatsapp}`,
      `*Serviço desejado:* ${formData.servico}`,
      "",
      "*Mensagem:*",
      formData.mensagem,
    ].join("\n");

    const url = `https://wa.me/5511915291313?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast({
      title: "Abrindo WhatsApp",
      description: "Envie a mensagem para finalizar sua solicitação.",
    });

    setFormData({
      empresa: "",
      responsavel: "",
      whatsapp: "",
      servico: "",
      mensagem: "",
    });
  };

  return (
    <>
      <section className="contact-hero relative overflow-hidden pt-28 pb-28 md:pt-40 md:pb-40">
        {/* Curva no topo (vinda da faixa branca acima) */}
        <div className="section-curve-top" aria-hidden>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 L1440,50 C1080,110 360,-10 0,40 Z" fill="hsl(0 0% 100%)" />
            <path d="M0,40 C360,-10 1080,110 1440,50" fill="none" stroke="hsl(189 94% 43%)" strokeWidth="3" />
          </svg>
        </div>

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
        <div className="hero-curve" aria-hidden>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,70 C360,140 1080,10 1440,80 L1440,120 L0,120 Z" fill="hsl(210 15% 94%)" />
            <path d="M0,70 C360,140 1080,10 1440,80" fill="none" stroke="hsl(189 94% 43%)" strokeWidth="3" />
          </svg>
        </div>
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

          <div id="formulario-orcamento" className="contact-form-float grid lg:grid-cols-[1.05fr_0.95fr] gap-0 items-stretch overflow-hidden bg-card">
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

          <div className="contact-card rounded-none border-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome da Empresa *
                  </label>
                  <Input
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Sua empresa"
                    className="contact-input"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Responsável *
                  </label>
                  <Input
                    name="responsavel"
                    value={formData.responsavel}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="contact-input"
                    maxLength={100}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    WhatsApp *
                  </label>
                  <Input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="contact-input"
                    maxLength={20}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Serviço Desejado *
                  </label>
                  <Input
                    name="servico"
                    value={formData.servico}
                    onChange={handleChange}
                    placeholder="Ex: Revestimento de cilindros"
                    className="contact-input"
                    maxLength={150}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensagem *
                </label>
                <Textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Descreva sua necessidade..."
                  rows={4}
                  className="contact-input resize-none"
                  maxLength={1000}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="contact-form-submit w-full py-7 text-base font-bold"
                disabled={!isFormValid}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Quero meu orçamento agora
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3">
                Resposta no mesmo dia útil · Sem compromisso · Diagnóstico gratuito
              </p>
            </form>
          </div>
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
