import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Palavra que troca dentro do título. Ideia do "Animated Hero" do 21st.dev
 * (escolhido pelo Kaique em 15/10/2026), refeita sem framer-motion: a troca é
 * só CSS (.palavra-giratoria em index.css), então não pesa no carregamento.
 *
 * Todas as palavras ficam empilhadas na mesma célula do grid, e a célula
 * assume o tamanho da maior: o título não pula quando a palavra muda, nem
 * quando a mais longa quebra em duas linhas no celular.
 *
 * Com movimento reduzido a troca vira esmaecimento, sem deslizar.
 */
type Props = {
  palavras: string[];
  /** ms entre uma palavra e a próxima */
  intervalo?: number;
  className?: string;
};

export function PalavraGiratoria({ palavras, intervalo = 2600, className }: Props) {
  const [atual, setAtual] = useState(0);
  const total = palavras.length;

  useEffect(() => {
    const id = window.setInterval(() => setAtual((i) => (i + 1) % total), intervalo);
    return () => window.clearInterval(id);
  }, [total, intervalo]);

  const anterior = (atual - 1 + total) % total;

  return (
    <span className={cn("palavra-giratoria", className)}>
      {/* leitor de tela ouve a lista uma vez, não cada troca */}
      <span className="sr-only">{palavras.join(", ")}</span>
      <span aria-hidden="true" className="palavra-giratoria-trilho">
        {palavras.map((p, i) => (
          <span
            key={p}
            className="palavra-giratoria-item"
            data-estado={i === atual ? "atual" : i === anterior ? "saiu" : "espera"}
          >
            {p}
          </span>
        ))}
      </span>
    </span>
  );
}
