import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Card de foto que ganha cor no hover. Ideia do "Color Change Cards" do
 * 21st.dev (escolhido pelo Kaique em 17/10/2026), refeito sem framer-motion e
 * sem react-icons: tudo é CSS (.cc-card em index.css), então não pesa.
 *
 * No computador a foto fica em preto e branco sob o véu da marca e ganha cor
 * no hover; as letras do título sobem uma a uma e a seta gira. No celular não
 * existe hover, então a foto já aparece colorida. Com movimento reduzido só a
 * cor muda: as letras e a foto não se mexem.
 *
 * As letras ficam agrupadas por palavra (nowrap): o título quebra linha entre
 * palavras, nunca no meio de uma.
 */
type Props = {
  to: string;
  titulo: string;
  descricao: string;
  img: string;
  srcSet?: string;
  sizes?: string;
  className?: string;
};

export function ColorChangeCard({ to, titulo, descricao, img, srcSet, sizes, className }: Props) {
  let i = 0;
  return (
    <Link to={to} className={cn("cc-card group", className)}>
      <img
        src={img}
        srcSet={srcSet}
        sizes={sizes}
        alt=""
        loading="lazy"
        decoding="async"
        className="cc-card-foto"
      />
      <div className="cc-card-veu" />
      <div className="cc-card-conteudo">
        <ArrowRight className="cc-card-seta" aria-hidden="true" />
        <div>
          <h3 className="cc-card-titulo">
            <span className="sr-only">{titulo}</span>
            <span aria-hidden="true">
              {titulo.split(" ").map((palavra, p) => (
                <span key={p}>
                  {p > 0 && " "}
                  <span className="whitespace-nowrap">
                    {palavra.split("").map((letra) => {
                      const n = i++;
                      return (
                        <span key={n} className="cc-letra">
                          <span
                            className="cc-letra-trilho"
                            style={{ "--i": n } as CSSProperties}
                          >
                            <span>{letra}</span>
                            <span>{letra}</span>
                          </span>
                        </span>
                      );
                    })}
                  </span>
                </span>
              ))}
            </span>
          </h3>
          <p className="cc-card-descricao">{descricao}</p>
        </div>
      </div>
    </Link>
  );
}
