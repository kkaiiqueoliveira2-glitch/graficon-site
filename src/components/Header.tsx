import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Clock, Instagram } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";
import { trackMetaEvent } from "@/lib/metaPixel";
import { trackGoogleEvent } from "@/lib/gtagEvent";

const INSTAGRAM_URL = "https://www.instagram.com/graficon.revestimento/";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSobre = location.pathname === "/sobre";
  const isOQueFazemos = location.pathname === "/o-que-fazemos";
  const scrollToFormulario = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const trackWhatsAppHeader = () => {
    trackMetaEvent("CliqueWhatsApp", { origem: "header", botao: "Ícone WhatsApp" });
    trackGoogleEvent("clique_whatsapp", { origem: "header" });
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
            {/* Logo oficial do manual (10/08/2026), com o descritor
                "Ferramentaria Gráfica". Substitui a versão empilhada que o site
                usava. Proporção 3,31:1 — o mobile fica num degrau menor pra não
                comer a largura do header. */}
            <img
              src="/logo-graficon-horizontal.webp?v=5"
              alt="Graficon Ferramentaria Gráfica — revestimento e recuperação de cilindros"
              className="h-10 md:h-12 w-auto object-contain"
              width={199}
              height={60}
              fetchPriority="high"
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
              onClick={trackWhatsAppHeader}
              className="nav-icon-btn-wa"
              aria-label="WhatsApp da Graficon"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <Link
              to="/#contato"
              className="btn-brand hidden md:inline-flex px-6 py-3 text-sm uppercase tracking-wide"
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
              className="btn-brand mt-2 w-full px-4 py-3 text-sm uppercase tracking-wide"
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
