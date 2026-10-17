import { useState } from "react";
import { MapPin } from "lucide-react";

// Coordenadas exatas para Rua Mara Rosa 95, Jardim Dona Sinha, São Paulo
const MAP_LAT = -23.5996576;
const MAP_LNG = -46.5076932;
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}+(Rua+Mara+Rosa+95)&z=17&output=embed`;

/**
 * O mapa do Google pesava ~630 KB e carregava sozinho perto do fim da home
 * (auditoria de 17/10/2026). Agora fica um desenho leve de ruas no lugar e o
 * mapa de verdade só carrega no clique, no mesmo espaço (a página não pula).
 */
const GoogleMapEmbed = () => {
  const [ativo, setAtivo] = useState(false);

  return (
    <div className="map-embed-wrapper">
      {ativo ? (
        <iframe
          title="Localização Graficon - Rua Mara Rosa 95"
          src={MAP_EMBED_URL}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button type="button" onClick={() => setAtivo(true)} className="map-capa">
          <svg className="map-capa-ruas" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g fill="none" strokeLinecap="round">
              <path d="M-20 250 C 200 230 330 300 520 270 S 900 210 1220 240" strokeWidth="18" />
              <path d="M160 -20 L 300 340" strokeWidth="12" />
              <path d="M640 -20 C 600 120 560 200 600 340" strokeWidth="16" />
              <path d="M-20 90 L 1220 40" strokeWidth="10" />
              <path d="M820 -20 L 1000 340" strokeWidth="10" />
              <path d="M380 -20 C 420 100 400 220 460 340" strokeWidth="8" />
              <path d="M-20 170 C 300 160 800 190 1220 140" strokeWidth="8" />
              <path d="M1060 -20 L 1140 340" strokeWidth="8" />
            </g>
          </svg>
          <span className="map-capa-pino" aria-hidden="true">
            <MapPin className="h-7 w-7" />
          </span>
          <span className="map-capa-botao">Ver mapa</span>
        </button>
      )}
    </div>
  );
};

export default GoogleMapEmbed;
