import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSobre = location.pathname === "/sobre";
  const isOQueFazemos = location.pathname === "/o-que-fazemos";
  const scrollToFormulario = () => {
    document.getElementById("formulario-orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const navLinkBase = "nav-link";
  const navLinkActive = "nav-link nav-link-active";

  return (
    <header className="header-navbar-wrapper sticky top-0 z-50">
      <div className="header-navbar-pill container flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 shrink-0 flex items-center justify-center">
            <img
              src="/logo-graficon.png?v=3"
              alt="Graficon"
              className="w-full h-full object-contain"
              width={44}
              height={44}
              decoding="async"
            />
          </div>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center gap-8 text-sm font-semibold">
            <Link
              to="/"
              className={
                isSobre || isOQueFazemos
                  ? navLinkBase
                  : navLinkActive
              }
              aria-current={isSobre || isOQueFazemos ? undefined : "page"}
            >
              Home
            </Link>
            <Link
              to="/sobre"
              className={
                isSobre
                  ? navLinkActive
                  : navLinkBase
              }
              aria-current={isSobre ? "page" : undefined}
            >
              Sobre
            </Link>
            <Link
              to="/o-que-fazemos"
              className={
                isOQueFazemos
                  ? navLinkActive
                  : navLinkBase
              }
              aria-current={isOQueFazemos ? "page" : undefined}
            >
              O que fazemos
            </Link>
            <Link
              to="/#formulario-orcamento"
              className={navLinkBase}
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  scrollToFormulario();
                }
              }}
            >
              Contato
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/#formulario-orcamento"
            className="header-cta hidden md:inline-flex"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                scrollToFormulario();
              }
            }}
          >
            Solicitar Orçamento
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="mobile-nav md:hidden">
          <Link
            to="/"
            className={isSobre || isOQueFazemos ? navLinkBase : navLinkActive}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/sobre"
            className={isSobre ? navLinkActive : navLinkBase}
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre
          </Link>
          <Link
            to="/o-que-fazemos"
            className={isOQueFazemos ? navLinkActive : navLinkBase}
            onClick={() => setIsMenuOpen(false)}
          >
            O que fazemos
          </Link>
          <Link
            to="/#formulario-orcamento"
            className={navLinkBase}
            onClick={(e) => {
              setIsMenuOpen(false);
              if (location.pathname === "/") {
                e.preventDefault();
                window.history.replaceState(null, "", "/#formulario-orcamento");
                setTimeout(scrollToFormulario, 200);
              }
            }}
          >
            Contato
          </Link>
          <Link
            to="/#formulario-orcamento"
            className="mobile-cta"
            onClick={(e) => {
              setIsMenuOpen(false);
              if (location.pathname === "/") {
                e.preventDefault();
                window.history.replaceState(null, "", "/#formulario-orcamento");
                setTimeout(scrollToFormulario, 200);
              }
            }}
          >
            Solicitar Orçamento
          </Link>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
