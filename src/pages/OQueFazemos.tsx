import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import { usePageSEO } from "@/hooks/usePageSEO";

const OQueFazemos = () => {
  usePageSEO({
    title: "Revestimento e Recuperação de Cilindros | Graficon - Serviços",
    description:
      "Serviços de revestimento e recuperação de cilindros para flexografia, rotogravura, embalagens, papel e celulose. Soluções técnicas sob medida em São Paulo.",
    path: "/o-que-fazemos",
    jsonLd: {
      name: "Serviços de revestimento e recuperação de cilindros",
      description:
        "Revestimento e recuperação de cilindros industriais e gráficos para os principais processos de impressão e conversão.",
    },
  });
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default OQueFazemos;
