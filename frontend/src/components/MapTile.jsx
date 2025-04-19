import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// 🔄 Composant interne pour mettre à jour dynamiquement la position de la carte
const MapUpdater = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      // Utilise flyTo pour centrer la carte avec animation quand les coordonnées changent
      map.flyTo([lat, lon], 11);
    }
  }, [lat, lon, map]);

  return null;
};

// 🗺️ Composant principal qui affiche la carte avec un marqueur
const MapTile = ({ lat, lon, city }) => {
  if (!lat || !lon) return null; // Vérifie que les coordonnées sont valides

  return (
    <div className="rounded-2xl shadow p-4 bg-white w-full h-[300px] mt-4 map-tile flex">
      {/* Conteneur Leaflet */}
      <MapContainer center={[lat, lon]} zoom={11} scrollWheelZoom={false} style={{ height: "30rem", width: "30rem", borderRadius: "1rem"  }}>
        {/* Fond de carte via un service externe (Carto) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
        />
        
        {/* Marqueur sur la position de la ville */}
        <Marker position={[lat, lon]}>
          <Popup>{city}</Popup>
        </Marker>

        {/* Déclenche une mise à jour quand les coordonnées changent */}
        <MapUpdater lat={lat} lon={lon} />
      </MapContainer>
    </div>
  );
};

export default MapTile;
