import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  useEffect(() => {
    document.title = "Página não encontrada | Graficon";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center section-industrial bg-muted">
        <div className="container text-center">
          <p className="text-8xl font-bold text-primary/20 mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            O endereço que você procurou não existe ou foi movido. Verifique a
            URL ou retorne à página inicial.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="btn-embossed inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary"
            >
              Ir para a Home
            </Link>
            <Link
              to="/#contato"
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Falar com a Graficon
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
