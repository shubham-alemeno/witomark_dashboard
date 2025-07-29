import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";

interface LocationData {
  id: number;
  lat: number;
  lng: number;
  status: string;
  location: string;
  date: string;
}

interface WorldMapProps {
  locationData: LocationData[];
  onMarkerClick?: (locationData: LocationData) => void;
}

// Component to handle map bounds fitting
const MapBoundsHandler = ({ locationData }: { locationData: LocationData[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locationData && locationData.length > 0) {
      // Filter valid coordinates
      const validPoints = locationData.filter(
        (point) =>
          point.lat && point.lng && !isNaN(point.lat) && !isNaN(point.lng) && point.lat !== 0 && point.lng !== 0
      );

      if (validPoints.length > 0) {
        // If we have multiple distinct points, fit bounds
        if (validPoints.length > 1) {
          const bounds = validPoints.map((point) => [point.lat, point.lng] as [number, number]);
          map.fitBounds(bounds, { padding: [20, 20] });
        } else {
          // Single point, center and zoom
          const point = validPoints[0];
          map.setView([point.lat, point.lng], 12);
        }
      }
    }
  }, [map, locationData]);

  return null;
};

const WorldMap = ({ locationData, onMarkerClick }: WorldMapProps) => {
  // Set up state to handle Leaflet in Next.js (which uses SSR)
  const [isMounted, setIsMounted] = useState(false);
  console.log(locationData);

  const sortedLocationData = [...locationData].sort((a, b) => {
    if (a.lat === b.lat && a.lng === b.lng) {
      if (a.status === "genuine" && b.status === "tampered") return -1;
      if (a.status === "tampered" && b.status === "genuine") return 1;
    }
    return 0;
  });

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
        style={{ height: "100%", width: "100%", borderRadius: "0.375rem" }}
        scrollWheelZoom={true}
        zoomControl={false}>
        <MapBoundsHandler locationData={locationData} />
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          noWrap={false}
        />

        {sortedLocationData?.map((point) => (
          <CircleMarker
            key={point.id}
            center={[point.lat, point.lng]}
            radius={5}
            pathOptions={{
              color: "white",
              weight: 1,
              fillColor: point.status === "genuine" ? "#22c55e" : "#ef4444",
              fillOpacity: 0.8
            }}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) {
                  onMarkerClick(point);
                }
              }
            }}>
            <Popup>
              <div className="p-1">
                <div className="font-semibold">{point.location}</div>
                <div className="text-sm">
                  Status:{" "}
                  <span className={`font-medium ${point.status === "genuine" ? "text-green-600" : "text-red-600"}`}>
                    {point.status}
                  </span>
                </div>
                <div className="text-sm">Date: {point.date}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Legend */}
        {/* <div className="absolute bottom-2 left-2 z-500 bg-white p-2 rounded shadow-md">
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs">Genuine QR</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs">Tampered QR</span>
          </div>
        </div> */}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
