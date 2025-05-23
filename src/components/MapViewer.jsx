import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapViewer = ({ city }) => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchCoords = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setCoords({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
        } else {
          console.error("No results found for city:", city);
        }
      } catch (error) {
        console.error("Error fetching geocode:", error);
      }
    };

    fetchCoords();
  }, [city]);

  if (!coords) return (
    <div className="flex justify-center items-center h-[500px] bg-gray-950/90 backdrop-blur-xl rounded-3xl border border-cyan-500/30">
      <div className="animate-pulse rounded-full h-16 w-16 border-4 border-cyan-400/50 border-t-cyan-400"></div>
    </div>
  );

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30 bg-gray-950/90 backdrop-blur-xl">
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[coords.lat, coords.lng]} icon={new L.Icon({
          iconUrl: "https://i.imgur.com/9g3J0iD.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
          shadowUrl: null,
        })}>
          <Popup className="font-orbitron text-cyan-200 bg-gray-900/90 rounded-lg">{city}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapViewer;