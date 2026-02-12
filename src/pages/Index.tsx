import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SegmentsSection from "@/components/SegmentsSection";
import FeedbackSection from "@/components/FeedbackSection";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Revestimento de Cilindros | Graficon - São Paulo";
  }, []);

  useEffect(() => {
    if (location.hash === "#contato") {
      setTimeout(() => {
        document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
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
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
