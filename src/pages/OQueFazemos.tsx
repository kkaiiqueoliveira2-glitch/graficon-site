import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";

const OQueFazemos = () => {
  useEffect(() => {
    document.title = "Revestimento e Recuperação de Cilindros | Graficon - Serviços";
  }, []);
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
