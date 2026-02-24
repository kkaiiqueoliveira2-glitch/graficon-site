import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SegmentsSection from "@/components/SegmentsSection";
import CmykHighlights from "@/components/CmykHighlights";
import CTASection from "@/components/CTASection";
import FeedbackSection from "@/components/FeedbackSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Revestimento de Cilindros | Graficon - São Paulo";
  }, []);

  useEffect(() => {
    if (location.hash === "#contato" || location.hash === "#formulario-orcamento") {
      setTimeout(() => {
        document.getElementById("formulario-orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SegmentsSection />
        <CTASection />
        <FeedbackSection />
        <CmykHighlights />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
