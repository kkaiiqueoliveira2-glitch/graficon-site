import { Sparkles } from "lucide-react";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";

/**
 * Linha de botões "pergunte a uma IA" (prompt deep link / AI CTA).
 *
 * Cada botão abre o assistente com a pergunta já preenchida na URL.
 *
 * SOBRE A ESCOLHA DAS PERGUNTAS
 * O padrão que circula desse recurso usa pergunta de reputação — "a empresa X é
 * confiável?". Aqui isso não funcionaria: em 10/08/2026 a única fonte pública
 * sobre a Graficon é este site. Não há diretório, review de terceiro nem menção
 * externa. Uma IA perguntada sobre a reputação da empresa hoje responde que não
 * tem informação, ou pior, descreve um concorrente — o oposto do que o botão
 * deveria provocar.
 *
 * Então as perguntas aqui são técnicas, sobre o problema que o visitante já tem
 * na mão. São perguntas que qualquer modelo responde bem sem depender de
 * conhecer a marca, e que confirmam pro comprador que revestir/recuperar é o
 * caminho certo — que é a dúvida real de quem chega neste site.
 *
 * Quando a marca tiver presença fora do próprio domínio (Google Meu Negócio
 * ativo, menção em portal do setor, review), aí sim vale trocar por pergunta de
 * reputação e citar a Graficon pelo nome.
 */

type Assistente = {
  nome: string;
  base: string;
  /** `q` na maioria; o Gemini não aceita prompt por querystring. */
  parametro: string;
};

const ASSISTENTES: Assistente[] = [
  { nome: "ChatGPT", base: "https://chatgpt.com/", parametro: "q" },
  { nome: "Perplexity", base: "https://www.perplexity.ai/search", parametro: "q" },
  { nome: "Claude", base: "https://claude.ai/new", parametro: "q" },
];

const montarUrl = ({ base, parametro }: Assistente, prompt: string) =>
  `${base}?${parametro}=${encodeURIComponent(prompt)}`;

type Props = {
  /** A pergunta que abre no assistente. */
  prompt: string;
  /** Frase curta acima dos botões. */
  titulo?: string;
  /** Identifica o bloco no relatório de ads. */
  origem: string;
  /** `claro` = fundo branco/cinza. `escuro` = sobre navy. */
  tom?: "claro" | "escuro";
};

const PerguntarIA = ({
  prompt,
  titulo = "Não é da sua área? Confira com uma IA:",
  origem,
  tom = "claro",
}: Props) => {
  const escuro = tom === "escuro";

  return (
    <div className={escuro ? "ia-bloco ia-bloco-escuro" : "ia-bloco"}>
      <p className="ia-bloco-titulo">
        <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
        {titulo}
      </p>
      <div className="ia-bloco-botoes">
        {ASSISTENTES.map((a) => (
          <a
            key={a.nome}
            href={montarUrl(a, prompt)}
            target="_blank"
            rel="noreferrer"
            className="ia-botao"
            onClick={() => {
              trackMetaEvent("PerguntarIA", { origem, assistente: a.nome });
              trackGoogleEvent("perguntar_ia", { origem, assistente: a.nome });
            }}
          >
            {a.nome}
          </a>
        ))}
      </div>
      <p className="ia-bloco-nota">
        A pergunta abre pronta. A resposta é do assistente, não da Graficon.
      </p>
    </div>
  );
};

export default PerguntarIA;
