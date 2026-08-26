import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";

const WHATSAPP_NUMERO = "5511915291313";

/**
 * Formulário de orçamento — o "pré-atendimento" da Graficon.
 *
 * Os campos espelham, na mesma ordem, o que a saudação automática do WhatsApp
 * pede: empresa, qual peça, medidas (diâmetro e comprimento) e foto. Quem
 * preenche aqui chega na conversa com a consultora sem responder tudo de novo.
 *
 * Diâmetro e comprimento ficam OPCIONAIS de propósito. São o que separa um
 * lead vago de um orçamento técnico — os dois primeiros leads reais da conta
 * chegaram com medida, foto e urgência — mas exigir número de quem não está
 * com o paquímetro na mão custa lead, e a conta tem verba rodando. Quem não
 * souber, a consultora pergunta no WhatsApp.
 *
 * Foto não vira campo: não há backend, o componente monta uma mensagem e abre
 * o wa.me, e link de WhatsApp não aceita anexo. Então a foto vira instrução.
 *
 * Vive num componente próprio porque roda em dois contextos: a seção de
 * contato da home e o rodapé de cada página de serviço. Nas páginas de
 * serviço, `pecaPadrao` já chega preenchido com o que aquela página vende, o
 * que corta um campo do trabalho do visitante e faz a mensagem chegar
 * classificada do outro lado.
 */
export type FormularioOrcamentoProps = {
  /** Pré-preenche "qual peça precisa de serviço" (páginas de serviço). */
  pecaPadrao?: string;
  /** Vai para o evento de conversão, pra dar pra ler de onde o lead saiu. */
  origem?: string;
  /** Exemplo no campo livre, ajustado ao serviço da página. */
  placeholderMensagem?: string;
  className?: string;
};

const FormularioOrcamento = ({
  pecaPadrao = "",
  origem = "formulario_orcamento",
  placeholderMensagem = "Ex: repor camada de cromo duro, reencape de borracha, retífica...",
  className = "contact-card rounded-none border-0",
}: FormularioOrcamentoProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    empresa: "",
    responsavel: "",
    whatsapp: "",
    peca: pecaPadrao,
    diametro: "",
    comprimento: "",
    mensagem: "",
  });

  const isFormValid =
    formData.empresa.trim().length > 0 &&
    formData.responsavel.trim().length > 0 &&
    formData.whatsapp.trim().length > 0 &&
    formData.peca.trim().length > 0;

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
        title: "Faltou preencher",
        description:
          "Preencha empresa, responsável, WhatsApp e qual peça precisa de serviço.",
        variant: "destructive",
      });
      return;
    }

    const medida = [formData.diametro.trim(), formData.comprimento.trim()]
      .filter(Boolean)
      .join(" × ");

    const conversionPayload = {
      empresa: formData.empresa.trim(),
      responsavel: formData.responsavel.trim(),
      whatsapp: formData.whatsapp.trim(),
      peca: formData.peca.trim(),
      medida,
      mensagem: formData.mensagem.trim(),
      canal: "site",
      origem,
    };

    trackMetaEvent("FormularioOrcamentoEnviado", conversionPayload);
    trackMetaEvent("Lead", conversionPayload, false);
    trackGoogleEvent("gerar_lead", { canal: conversionPayload.canal, origem });

    // Mesma ordem da saudação automática do WhatsApp, pra a consultora bater o
    // olho e já ter tudo. Linhas vazias são omitidas em vez de virarem "—".
    const mensagem = [
      "*Solicitação de orçamento pelo site*",
      "",
      `*Empresa:* ${formData.empresa.trim()}`,
      `*Responsável:* ${formData.responsavel.trim()}`,
      `*WhatsApp:* ${formData.whatsapp.trim()}`,
      `*Peça:* ${formData.peca.trim()}`,
      medida ? `*Medidas:* ${medida}` : null,
      formData.mensagem.trim() ? "" : null,
      formData.mensagem.trim() ? "*O que precisa ser feito:*" : null,
      formData.mensagem.trim() || null,
      "",
      "_Se tiver foto da peça, mando aqui na sequência._",
    ]
      .filter((linha) => linha !== null)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast({
      title: "Abrindo WhatsApp",
      description: "Envie a mensagem e anexe a foto da peça, se tiver.",
    });

    setFormData({
      empresa: "",
      responsavel: "",
      whatsapp: "",
      peca: pecaPadrao,
      diametro: "",
      comprimento: "",
      mensagem: "",
    });
  };

  return (
    <div className={className}>
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
              Qual peça precisa de serviço? *
            </label>
            <Input
              name="peca"
              value={formData.peca}
              onChange={handleChange}
              placeholder="Ex: rolo de borracha, haste hidráulica"
              className="contact-input"
              maxLength={150}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Medidas da peça
            <span className="ml-2 font-normal text-muted-foreground">
              opcional, mas agiliza o orçamento
            </span>
          </label>
          <div className="grid grid-cols-2 gap-5">
            <Input
              name="diametro"
              value={formData.diametro}
              onChange={handleChange}
              placeholder="Diâmetro (ex: 120 mm)"
              className="contact-input"
              maxLength={40}
              aria-label="Diâmetro da peça"
            />
            <Input
              name="comprimento"
              value={formData.comprimento}
              onChange={handleChange}
              placeholder="Comprimento (ex: 800 mm)"
              className="contact-input"
              maxLength={40}
              aria-label="Comprimento da peça"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            O que precisa ser feito?
            <span className="ml-2 font-normal text-muted-foreground">opcional</span>
          </label>
          <Textarea
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            placeholder={placeholderMensagem}
            rows={3}
            className="contact-input resize-none"
            maxLength={1000}
          />
        </div>

        {/* O wa.me não aceita anexo, então a foto vira instrução. Ela é o
            que mais qualifica o lead nessa conta, vale o destaque. */}
        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/60 px-4 py-3">
          <Camera className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Tem foto da peça?</span>{" "}
            Anexe direto na conversa do WhatsApp que vai abrir. É o que permite
            avaliar o desgaste e fechar o orçamento mais rápido.
          </p>
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
  );
};

export default FormularioOrcamento;
