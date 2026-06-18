import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

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
      <div className="flex-shrink-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="text-muted-foreground/60"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      </div>
    </div>
    <div className="flex items-center gap-2 mb-3">
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400"
          aria-hidden
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">Verificado</span>
    </div>
    <p className="text-sm text-foreground/90 leading-relaxed">{text}</p>
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
      <div className="hero-curve" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,70 C360,140 1080,10 1440,80 L1440,120 L0,120 Z"
            fill="hsl(0 0% 100%)"
          />
          <path
            d="M0,70 C360,140 1080,10 1440,80"
            fill="none"
            stroke="hsl(189 94% 43%)"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
};

export default FeedbackSection;
