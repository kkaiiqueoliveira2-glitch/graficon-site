import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
