import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface LocationData {
  id: number;
  lat: number;
  lng: number;
  status: string;
  location: string;
  date: string;
  maps_url?: string;
}

interface WorldMapProps {
  locationData: LocationData[];
}

// Fits the map to the visible markers whenever locationData changes
const MapBoundsHandler = ({ locationData }: { locationData: LocationData[] }) => {
  const map = useMap();

  useEffect(() => {
    const valid = locationData.filter(
      (p) => p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng) && p.lat !== 0 && p.lng !== 0
    );

    if (valid.length > 1) {
      map.fitBounds(
        valid.map((p) => [p.lat, p.lng] as [number, number]),
        { padding: [30, 30], maxZoom: 10 }
      );
    } else if (valid.length === 1) {
      map.setView([valid[0].lat, valid[0].lng], 8);
    } else {
      map.setView([20, 0], 2);
    }
  }, [map, locationData]);

  return null;
};

// Renders only markers inside the current viewport for performance
const VisibleMarkers = ({ locationData }: { locationData: LocationData[] }) => {
  const map = useMap();
  const [, setTick] = useState(0);

  useMapEvents({
    moveend: () => setTick((t) => t + 1),
    zoomend: () => setTick((t) => t + 1)
  });

  const bounds = map.getBounds();
  const visible = locationData.filter((p) => bounds.contains([p.lat, p.lng]));

  // Render genuine first so tampered dots sit on top
  const sorted = [...visible].sort((a, b) => {
    if (a.lat === b.lat && a.lng === b.lng) {
      if (a.status === "genuine" && b.status !== "genuine") return -1;
      if (a.status !== "genuine" && b.status === "genuine") return 1;
    }
    return 0;
  });

  return (
    <>
      {sorted.map((point) => (
        <CircleMarker
          key={point.id}
          center={[point.lat, point.lng]}
          radius={6}
          pathOptions={{
            color: "white",
            weight: 1.5,
            fillColor: point.status === "genuine" ? "#22c55e" : "#ef4444",
            fillOpacity: 0.85
          }}>
          <Popup>
            <div className="p-1 text-sm space-y-1">
              <div className="font-semibold">Scan {point.location}</div>
              <div>
                Result:{" "}
                <span className={`font-medium capitalize ${point.status === "genuine" ? "text-green-600" : "text-red-600"}`}>
                  {point.status}
                </span>
              </div>
              <div className="text-gray-500">{point.date}</div>
              {point.maps_url && (
                <a
                  href={point.maps_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-[#02bc5f] hover:underline text-xs">
                  Open in Google Maps
                </a>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
};

const WorldMap = ({ locationData }: WorldMapProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }

  return (
    <div className="relative w-full h-full z-0">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={18}
        // Prevent the map from repeating by clamping to world bounds
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
        scrollWheelZoom={true}
        zoomControl={false}>
        <MapBoundsHandler locationData={locationData} />
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          noWrap={true}
        />
        <VisibleMarkers locationData={locationData} />
      </MapContainer>
    </div>
  );
};

export default WorldMap;
