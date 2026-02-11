const MAP_ADDRESS = "Rua Mara Rosa 95, Bairro dos Eucaliptos, São Paulo";
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_ADDRESS)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

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
