import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { WHATSAPP_URL_ORCAMENTO } from "@/components/WhatsAppFloatingButton";

const Footer = () => {
  return (
    <footer className="footer-industrial relative overflow-hidden pt-28 md:pt-36">
      {/* Curva no topo (vinda da seção clara acima) */}
      <div className="section-curve-top" aria-hidden>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,0 L1440,0 L1440,50 C1080,110 360,-10 0,40 Z" fill="hsl(var(--muted))" />
          <path d="M0,40 C360,-10 1080,110 1440,50" fill="none" stroke="hsl(var(--brand-3))" strokeWidth="3" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_0.8fr]">
          <div>
            <div className="mb-4">
              {/* Versão branca do logo oficial, pro fundo navy do rodapé. O nome
                  da empresa já está dentro da marca, então o <h3> em texto que
                  ficava ao lado saiu — repetir "Graficon" dobrado polui. */}
              <img
                src="/logo-graficon-branco.webp?v=5"
                alt="Graficon Ferramentaria Gráfica"
                className="h-12 w-auto object-contain"
                width={199}
                height={60}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-primary-foreground/75 text-sm leading-relaxed">
              Especialistas em revestimento e recuperação de cilindros
              industriais para flexografia, gráfica e processos industriais.
            </p>
            <div className="footer-cta">
              <a
                href={WHATSAPP_URL_ORCAMENTO}
                target="_blank"
                rel="noreferrer"
                className="footer-whatsapp-button"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Solicitar orçamento no WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <div>Comercial: +55 (11) 91529-1313</div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:comercialgraficon@gmail.com"
                  className="footer-link"
                >
                  comercialgraficon@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Mara+Rosa+95+Bairro+dos+Eucaliptos+São+Paulo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link inline-flex items-start gap-2 text-left hover:underline"
                >
                  <span>
                    Rua Mara Rosa, 95<br />
                    Bairro dos Eucaliptos – São Paulo
                  </span>
                  <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="footer-link">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/o-que-fazemos" className="footer-link">
                  O que fazemos
                </Link>
              </li>
              <li>
                <Link to="/o-que-e-revestimento-grafico" className="footer-link">
                  O que é revestimento gráfico
                </Link>
              </li>
              <li>
                <Link to="/como-funciona-revestimento-de-cilindros" className="footer-link">
                  Como funciona o revestimento
                </Link>
              </li>
              <li>
                <Link to="/diferenca-entre-gravacao-e-revestimento" className="footer-link">
                  Gravação e revestimento
                </Link>
              </li>
              <li>
                <Link to="/problemas-desgaste-cilindros-graficos" className="footer-link">
                  Desgaste de cilindros
                </Link>
              </li>
              <li>
                <a href="/#contato" className="footer-link">
                  Solicitar Orçamento
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Graficon Revestimento de Cilindros.
            Todos os direitos reservados.{" "}
            <Link to="/privacidade" className="footer-link hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
