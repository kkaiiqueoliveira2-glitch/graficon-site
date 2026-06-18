import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

const ServicesHome = () => {
  return (
    <section id="servicos" className="section-industrial bg-white">
      <div className="container">
        <div className="max-w-3xl mb-12" data-reveal>
          <p className="section-eyebrow">Nossos serviços</p>
          <h2 className="section-title">
            Revestimento e recuperação de cilindros sob medida
          </h2>
          <p className="section-subtitle">
            Processos técnicos especializados para entregar cilindros industriais com
            alto desempenho, precisão e durabilidade — do preparo da base à prova final.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link key={i} to={`/servicos/${service.slug}`} className="svc-card">
              <div className="svc-card-media">
                <img src={service.image} alt={service.title} loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215_60%_10%/0.65)] to-transparent" />
                <div className="svc-card-icon absolute bottom-4 left-4">
                  <service.icon className="h-6 w-6 text-cyan" />
                </div>
              </div>
              <div className="svc-card-body">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                  {service.description}
                </p>
                <span className="svc-card-link">
                  Saiba mais <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHome;
