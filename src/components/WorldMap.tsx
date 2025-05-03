'use client';
import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  // Marker,
  Popup,
  CircleMarker,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

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
}

const WorldMap = ({ locationData }: WorldMapProps) => {
  // Set up state to handle Leaflet in Next.js (which uses SSR)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render the map on the server
  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full z-0">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%', borderRadius: '0.375rem' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locationData.map((point) => (
          <CircleMarker
            key={point.id}
            center={[point.lat, point.lng]}
            radius={5}
            pathOptions={{
              color: 'white',
              weight: 1,
              fillColor: point.status === 'genuine' ? '#22c55e' : '#ef4444',
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <div className="p-1">
                <div className="font-semibold">{point.location}</div>
                <div className="text-sm">
                  Status:{' '}
                  <span
                    className={`font-medium ${
                      point.status === 'genuine'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {point.status}
                  </span>
                </div>
                <div className="text-sm">Date: {point.date}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Legend */}
        <div className="absolute top-2 left-2 z-500 bg-white p-2 rounded shadow-md">
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs">Genuine QR</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs">Tampered QR</span>
          </div>
        </div>
      </MapContainer>
    </div>
  );
};

export default WorldMap;
