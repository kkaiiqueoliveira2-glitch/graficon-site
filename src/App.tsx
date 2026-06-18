import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import OQueFazemos from "./pages/OQueFazemos";
import Privacidade from "./pages/Privacidade";
import NotFound from "./pages/NotFound";
import ComoFuncionaRevestimento from "./pages/ComoFuncionaRevestimento";
import OQueERevestimentoGrafico from "./pages/OQueERevestimentoGrafico";
import DiferencaGravacaoRevestimento from "./pages/DiferencaGravacaoRevestimento";
import ProblemasDesgasteCilindros from "./pages/ProblemasDesgasteCilindros";
import ServicoDetalhe from "./pages/ServicoDetalhe";

const queryClient = new QueryClient();

// Ao trocar de rota, volta o scroll para o topo (exceto quando há âncora #).
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

// Revela blocos com fade + subida conforme entram na tela (estilo USITEMB).
const REVEAL_SELECTORS = [
  "[data-reveal]",
  ".svc-card",
  ".segment-carousel",
  ".about-band",
  ".cmyk-highlight-card",
  ".faq-item",
  ".cta-showcase",
  ".contact-info-card",
  ".contact-form-float",
  ".contact-map-section",
].join(", ");

const ScrollReveal = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) return;

    document.documentElement.classList.add("reveal-on");
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS));

    // stagger por linha (mesmo elemento-pai)
    const groups = new Map<Element, HTMLElement[]>();
    els.forEach((el) => {
      el.classList.add("reveal");
      const p = el.parentElement;
      if (!p) return;
      const arr = groups.get(p) ?? [];
      arr.push(el);
      groups.set(p, arr);
    });
    groups.forEach((arr) =>
      arr.forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i, 6) * 90}ms`;
      })
    );

    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          io.unobserve(el);
          // Após a animação, remove as classes para não interferir nos hovers
          // (transform/opacity voltam ao estado natural do elemento).
          const delay = parseFloat(el.style.transitionDelay) || 0;
          const t = window.setTimeout(() => {
            el.classList.remove("reveal", "is-visible");
            el.style.transitionDelay = "";
          }, 700 + delay);
          timers.push(t);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);
  return null;
};

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollReveal />
        <GoogleAnalytics />
        <WhatsAppFloatingButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/o-que-fazemos" element={<OQueFazemos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/como-funciona-revestimento-de-cilindros" element={<ComoFuncionaRevestimento />} />
          <Route path="/o-que-e-revestimento-grafico" element={<OQueERevestimentoGrafico />} />
          <Route path="/diferenca-entre-gravacao-e-revestimento" element={<DiferencaGravacaoRevestimento />} />
          <Route path="/diferenca-entre-gravacao-e-revestimento-grafico" element={<DiferencaGravacaoRevestimento />} />
          <Route path="/problemas-desgaste-cilindros-graficos" element={<ProblemasDesgasteCilindros />} />
          <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
