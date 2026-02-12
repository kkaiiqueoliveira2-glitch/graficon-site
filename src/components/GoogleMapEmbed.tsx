// Coordenadas exatas para Rua Mara Rosa 95, Jardim Dona Sinha, São Paulo
const MAP_LAT = -23.5996576;
const MAP_LNG = -46.5076932;
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_LAT},${MAP_LNG}+(Rua+Mara+Rosa+95)&z=17&output=embed`;

const GoogleMapEmbed = () => {
  return (
    <div className="map-embed-wrapper">
      <iframe
        title="Localização Graficon - Rua Mara Rosa 95"
        src={MAP_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMapEmbed;
