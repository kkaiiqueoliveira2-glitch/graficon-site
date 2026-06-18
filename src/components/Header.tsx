import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Clock, Instagram } from "lucide-react";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";

const INSTAGRAM_URL = "https://www.instagram.com/graficon.revestimento/";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSobre = location.pathname === "/sobre";
  const isOQueFazemos = location.pathname === "/o-que-fazemos";
  const scrollToFormulario = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const navLinkBase = "nav-link";
  const navLinkActive = "nav-link nav-link-active";

  return (
    <div className="header-sticky">
      {/* Barra superior utilitária */}
      <div className="topbar">
        <div className="topbar-inner">
          <span className="hidden md:inline text-white/70">
            Revestimento e recuperação de cilindros industriais · São Paulo
          </span>
          <a href="tel:+5511915291313">
            <Phone className="h-3.5 w-3.5" /> (11) 91529-1313
          </a>
          <span className="inline-flex items-center gap-1.5 text-white/70">
            <Clock className="h-3.5 w-3.5" /> Seg–Sex, 08h–18h
          </span>
        </div>
      </div>

      <header className="header-solid">
        <div className="header-solid-inner">
          <Link to="/" className="flex items-center gap-3" aria-label="Graficon — página inicial">
            <img
              src="/logo-graficon.png?v=3"
              alt="Graficon Revestimento de Cilindros"
              className="h-11 w-auto object-contain"
              height={44}
              decoding="async"
            />
          </Link>

          <nav className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-8 text-sm font-semibold">
              <Link
                to="/"
                className={isSobre || isOQueFazemos ? navLinkBase : navLinkActive}
                aria-current={isSobre || isOQueFazemos ? undefined : "page"}
              >
                Início
              </Link>
              <Link
                to="/sobre"
                className={isSobre ? navLinkActive : navLinkBase}
                aria-current={isSobre ? "page" : undefined}
              >
                Quem somos
              </Link>
              <Link
                to="/o-que-fazemos"
                className={isOQueFazemos ? navLinkActive : navLinkBase}
                aria-current={isOQueFazemos ? "page" : undefined}
              >
                Serviços
              </Link>
              <Link
                to="/#contato"
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

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="nav-icon-btn"
              aria-label="Instagram da Graficon"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={WHATSAPP_URL_ORCAMENTO}
              target="_blank"
              rel="noreferrer"
              className="nav-icon-btn-wa"
              aria-label="WhatsApp da Graficon"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <Link
              to="/#contato"
              className="btn-cyan hidden md:inline-flex px-6 py-3 text-sm uppercase tracking-wide"
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
        <div className="header-accent-line" />

        {isMenuOpen ? (
          <div className="mobile-nav md:hidden">
            <Link
              to="/"
              className={isSobre || isOQueFazemos ? navLinkBase : navLinkActive}
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/sobre"
              className={isSobre ? navLinkActive : navLinkBase}
              onClick={() => setIsMenuOpen(false)}
            >
              Quem somos
            </Link>
            <Link
              to="/o-que-fazemos"
              className={isOQueFazemos ? navLinkActive : navLinkBase}
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link
              to="/#contato"
              className={navLinkBase}
              onClick={(e) => {
                setIsMenuOpen(false);
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.history.replaceState(null, "", "/#contato");
                  setTimeout(scrollToFormulario, 200);
                }
              }}
            >
              Contato
            </Link>
            <Link
              to="/#contato"
              className="btn-cyan mt-2 w-full px-4 py-3 text-sm uppercase tracking-wide"
              onClick={(e) => {
                setIsMenuOpen(false);
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.history.replaceState(null, "", "/#contato");
                  setTimeout(scrollToFormulario, 200);
                }
              }}
            >
              Solicitar Orçamento
            </Link>
          </div>
        ) : null}
      </header>
    </div>
  );
};

export default Header;
