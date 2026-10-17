import { services } from "@/data/services";
import { miniatura } from "@/lib/miniatura";
import { ColorChangeCard } from "@/components/ui/color-change-card";

// Borracha abre a grade, em largura dupla: os 2 leads reais da conta foram de
// borracha (28/07) e é o serviço que fala com gráfica. Os outros 6 seguem a
// ordem de services.ts, dois por linha.
const DESTAQUE = "processos-de-revestimento";
const ordenados = [
  ...services.filter((s) => s.slug === DESTAQUE),
  ...services.filter((s) => s.slug !== DESTAQUE),
];

const fotos = (src: string) =>
  `${miniatura(src, 720)} 720w, ${miniatura(src, 1200)} 1200w, ${src} 1800w`;

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
            alto desempenho, precisão e durabilidade, do preparo da base à prova final.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {ordenados.map((service) => {
            const destaque = service.slug === DESTAQUE;
            return (
              <ColorChangeCard
                key={service.slug}
                to={`/servicos/${service.slug}`}
                titulo={service.title}
                descricao={service.description}
                img={miniatura(service.image, 720)}
                srcSet={fotos(service.image)}
                sizes={
                  destaque
                    ? "(min-width: 1400px) 1340px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 4rem)"
                    : "(min-width: 1400px) 660px, (min-width: 768px) calc(50vw - 3rem), calc(100vw - 4rem)"
                }
                className={destaque ? "md:col-span-2" : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesHome;
