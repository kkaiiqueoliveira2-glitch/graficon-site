import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesHome from "@/components/ServicesHome";
import SegmentsSection from "@/components/SegmentsSection";
import AboutBand from "@/components/AboutBand";
import CmykHighlights from "@/components/CmykHighlights";
import FeedbackSection from "@/components/FeedbackSection";
import FaqHome from "@/components/FaqHome";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    document.title =
      "Revestimento de Cilindros | Graficon - Recuperação e Revestimento Industrial em São Paulo";
  }, []);

  useEffect(() => {
    if (location.hash === "#contato" || location.hash === "#formulario-orcamento") {
      setTimeout(() => {
        document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesHome />
        <SegmentsSection />
        <AboutBand />
        <CmykHighlights />
        <FeedbackSection />
        <FaqHome />
        <CTASection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
