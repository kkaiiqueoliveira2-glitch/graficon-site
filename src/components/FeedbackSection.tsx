import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import CurvaSecao from "@/components/CurvaSecao";

const feedbacks = [
  {
    name: "Samuel Ignacio",
    time: "5 meses atrás",
    rating: 5,
    text: "Pessoal super atencioso e profissional, com experiência e tecnologias que ajudam muito no dia a dia, agilizando nossos processos! Parabéns ao time.",
    initial: "S",
  },
  {
    name: "Wender Flávio",
    time: "3 meses atrás",
    rating: 5,
    text: "Atendimento excelente. Equipe muito prestativa e solícita. Sem dúvidas a melhor opção para revestimento de cilindros.",
    initial: "W",
  },
  {
    name: "Roberto Buim",
    time: "2 meses atrás",
    rating: 5,
    text: "Excelente empresa! Sempre buscando inovações para seus clientes. Recomendo fortemente os serviços da Graficon.",
    initial: "R",
  },
  {
    name: "Maria Santos",
    time: "1 mês atrás",
    rating: 5,
    text: "Qualidade excepcional no revestimento. O cilindro voltou como novo. Atendimento técnico muito competente.",
    initial: "M",
  },
  {
    name: "Carlos Oliveira",
    time: "2 semanas atrás",
    rating: 5,
    text: "Rapidez no atendimento e precisão no trabalho. Satisfeito com o resultado. Voltaremos a contratar.",
    initial: "C",
  },
];

const FeedbackCard = ({
  name,
  time,
  rating,
  text,
  initial,
}: (typeof feedbacks)[0]) => (
  <div className="feedback-card">
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initial}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </div>
      {/* Sem o "G" do Google e sem "Verificado" (15/10/2026): a Graficon não tem
          Google Meu Negócio, então essas avaliações não vêm de lá. Os nomes
          esperam a Gilda confirmar quem é cliente de verdade. */}
    </div>
    <div className="flex items-center gap-2 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          aria-hidden
        />
      ))}
    </div>
    <p className="text-base text-foreground/90 leading-relaxed">{text}</p>
  </div>
);

const FeedbackSection = () => {
  const duplicatedFeedbacks = [...feedbacks, ...feedbacks];

  return (
    <section className="feedback-section relative overflow-hidden pb-28 md:pb-40">
      <div className="container text-center mb-12" data-reveal>
        <p className="section-eyebrow">Depoimentos</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          O que nossos clientes dizem
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A satisfação e confiança de quem trabalha com a Graficon.
        </p>
      </div>

      <div className="feedback-track-wrapper">
        <div className="feedback-track">
          {duplicatedFeedbacks.map((feedback, index) => (
            <FeedbackCard key={`${feedback.name}-${index}`} {...feedback} />
          ))}
        </div>
      </div>

      {/* Borda curva na base (transição para a FAQ branca) */}
      <CurvaSecao posicao="base" corDestino="hsl(0 0% 100%)" />
    </section>
  );
};

export default FeedbackSection;
