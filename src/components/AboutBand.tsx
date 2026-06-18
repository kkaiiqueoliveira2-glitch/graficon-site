import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users, Wrench } from "lucide-react";
import CountUp from "@/components/CountUp";

const pillars = [
  { icon: Users, label: "Equipe técnica capacitada" },
  { icon: Wrench, label: "Processo criterioso por aplicação" },
  { icon: ShieldCheck, label: "Controle de qualidade rigoroso" },
];

const AboutBand = () => {
  return (
    <section className="section-industrial bg-muted">
      <div className="container">
        <div className="about-band grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="section-eyebrow" style={{ color: "hsl(var(--cyan))" }}>
              Quem somos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              +40 anos revestindo e recuperando cilindros industriais
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              A Graficon une conhecimento técnico, tecnologia e foco em desempenho para
              entregar soluções confiáveis em cada projeto — novo ou recuperação.
              Cada cilindro é analisado de forma criteriosa, considerando aplicação,
              material e necessidade do cliente, com acabamento dentro dos padrões.
            </p>

            <ul className="space-y-3 mb-8">
              {pillars.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: "hsl(var(--cyan) / 0.18)", border: "1px solid hsl(var(--cyan) / 0.4)" }}>
                    <p.icon className="h-5 w-5 text-cyan" />
                  </span>
                  {p.label}
                </li>
              ))}
            </ul>

            <Link to="/sobre" className="btn-cyan px-7 py-3.5 text-sm uppercase tracking-wide">
              Conheça a Graficon <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="about-band-stat">
              <p className="text-2xl md:text-3xl font-bold text-white">
                <CountUp end={40} prefix="+" />
              </p>
              <p className="text-xs text-white/70 mt-1">anos de profissão</p>
            </div>
            <div className="about-band-stat">
              <p className="text-2xl md:text-3xl font-bold text-white">
                <CountUp end={100} suffix="%" />
              </p>
              <p className="text-xs text-white/70 mt-1">controle de qualidade</p>
            </div>
            <div className="about-band-stat">
              <p className="text-2xl md:text-3xl font-bold text-white">
                <CountUp end={5} suffix="+" />
              </p>
              <p className="text-xs text-white/70 mt-1">segmentos atendidos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBand;
