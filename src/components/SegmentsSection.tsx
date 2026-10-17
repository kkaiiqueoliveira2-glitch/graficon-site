import { miniatura } from "@/lib/miniatura";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

// Carrossel 3D (17/10/2026), no lugar da grade de 16/10. A grade tinha entrado
// porque o carrossel antigo mostrava um por vez e quem não clicava na seta não
// via que a Graficon atende gráfica; por isso os 5 nomes ficam à vista abaixo
// do carrossel, e gráfica abre a fila.
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
  <section id="segmentos" className="section-industrial bg-muted overflow-x-clip">
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

      <FeatureCarousel
        itens={segments.map((segment) => ({
          titulo: segment.title,
          texto: segment.description,
          img: miniatura(segment.image, 840),
          srcSet: `${miniatura(segment.image, 840)} 840w, ${segment.image} 1100w`,
          alt: segment.title,
        }))}
      />
    </div>
  </section>
);

export default SegmentsSection;
