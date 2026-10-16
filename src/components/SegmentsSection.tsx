import { miniatura } from "@/lib/miniatura";

// Grade com os 5 segmentos à vista (16/10/2026). O carrossel anterior mostrava
// um por vez, e quem não clicava na seta não via que a Graficon atende gráfica.
// As imagens são lazy: só baixam quando a seção chega perto da tela.
const segments = [
  {
    title: "Gráficas: offset e flexografia",
    description:
      "Rolos entintadores e molhadores de offset, rolos e cilindros de flexografia, com a borracha na dureza certa.",
    image: "/segments/graficas-flexografia.webp",
  },
  {
    title: "Papel e celulose",
    description:
      "Rolos e cilindros para máquina de papel e papelão, com revestimento pensado para processo contínuo.",
    image: "/segments/papel-celulose.webp",
  },
  {
    title: "Embalagens e cartonagem",
    description: "Cilindros e rolos para impressão de embalagem, rótulo e caixa de papelão.",
    image: "/segments/embalagens-cartonagem.webp",
  },
  {
    title: "Metalgrafia e automação",
    description: "Rolos de borracha e cilindros com cromo duro para linhas de impressão em metal.",
    image: "/segments/metalgrafia-automacao.webp",
  },
  {
    title: "Plásticos e indústria geral",
    description:
      "Rolos emborrachados, hastes e eixos industriais com reencape, cromo duro e retífica.",
    image: "/segments/plasticos-industria-geral.webp",
  },
];

const SegmentsSection = () => (
  <section id="segmentos" className="section-industrial bg-muted">
    <div className="container">
      <div className="mx-auto max-w-3xl text-center" data-reveal>
        <p className="section-eyebrow justify-center">Segmentos atendidos</p>
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Gráfica e indústria
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
          Atendemos quem imprime e quem produz. Não fazemos peça automotiva, de moto ou
          decorativa.
        </p>
      </div>

      <div className="segmentos-grade">
        {segments.map((segment, i) => (
          <article
            key={segment.title}
            className={`segmento-card${i === 0 ? " segmento-card-destaque" : ""}`}
          >
            <img
              src={miniatura(segment.image, 840)}
              srcSet={`${miniatura(segment.image, 840)} 840w, ${segment.image} 1100w`}
              sizes={i === 0 ? "(min-width: 1024px) 760px, 280px" : "(min-width: 1024px) 370px, (min-width: 640px) 45vw, 280px"}
              alt={segment.title}
              width={800}
              height={400}
              loading="lazy"
              decoding="async"
              className="segmento-card-imagem"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground">{segment.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {segment.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default SegmentsSection;
