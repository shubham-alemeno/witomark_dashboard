// 'use client';
// import { useEffect, useState } from 'react';
// import {
//   MapContainer,
//   TileLayer,
//   // Marker,
//   Popup,
//   CircleMarker,
// } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import React from 'react';

// interface LocationData {
//   id: number;
//   lat: number;
//   lng: number;
//   status: string;
//   location: string;
//   date: string;
// }

// interface WorldMapProps {
//   locationData: LocationData[];
// }

// const WorldMap = ({ locationData }: WorldMapProps) => {
//   // Set up state to handle Leaflet in Next.js (which uses SSR)
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Don't render the map on the server
//   if (!isMounted) {
//     return (
//       <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//         Loading map...
//       </div>
//     );
//   }

//   return (
//     <div className="relative w-full h-full z-0">
//       <MapContainer
//         center={[20, 0]}
//         zoom={2}
//         style={{ height: '100%', width: '100%', borderRadius: '0.375rem' }}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {locationData.map((point) => (
//           <CircleMarker
//             key={point.id}
//             center={[point.lat, point.lng]}
//             radius={5}
//             pathOptions={{
//               color: 'white',
//               weight: 1,
//               fillColor: point.status === 'genuine' ? '#22c55e' : '#ef4444',
//               fillOpacity: 0.8,
//             }}
//           >
//             <Popup>
//               <div className="p-1">
//                 <div className="font-semibold">{point.location}</div>
//                 <div className="text-sm">
//                   Status:{' '}
//                   <span
//                     className={`font-medium ${
//                       point.status === 'genuine'
//                         ? 'text-green-600'
//                         : 'text-red-600'
//                     }`}
//                   >
//                     {point.status}
//                   </span>
//                 </div>
//                 <div className="text-sm">Date: {point.date}</div>
//               </div>
//             </Popup>
//           </CircleMarker>
//         ))}

//         {/* Legend */}
//         <div className="absolute top-2 left-2 z-500 bg-white p-2 rounded shadow-md">
//           <div className="flex items-center mb-1">
//             <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
//             <span className="text-xs">Genuine QR</span>
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
//             <span className="text-xs">Tampered QR</span>
//           </div>
//         </div>
//       </MapContainer>
//     </div>
//   );
// };

// export default WorldMap;

import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
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

  // Calculate map settings based on point distribution
  const getMapSettings = () => {
    // Default for world view
    const worldDefault = {
      center: [20, 0],
      zoom: 2,
      useAutoBounds: false,
    };

    // If we have no data, return world view
    if (!locationData || locationData.length === 0) {
      return worldDefault;
    }

    // Calculate distribution of points
    let minLat = 90,
      maxLat = -90,
      minLng = 180,
      maxLng = -180;

    locationData.forEach((point) => {
      minLat = Math.min(minLat, point.lat);
      maxLat = Math.max(maxLat, point.lat);
      minLng = Math.min(minLng, point.lng);
      maxLng = Math.max(maxLng, point.lng);
    });

    // Calculate span of coordinates
    const latSpan = maxLat - minLat;
    const lngSpan = maxLng - minLng;

    // If points are globally distributed (cover more than 180 degrees longitude or 90 degrees latitude)
    // or span across multiple continents, use world view
    if (lngSpan > 180 || latSpan > 90 || lngSpan > 60) {
      return worldDefault;
    }

    // Otherwise, focus on the region with some padding
    const latPadding = latSpan * 0.2;
    const lngPadding = lngSpan * 0.2;

    return {
      center: [(minLat + maxLat) / 2, (minLng + maxLng) / 2],
      bounds: [
        [minLat - latPadding, minLng - lngPadding],
        [maxLat + latPadding, maxLng + lngPadding],
      ],
      useAutoBounds: true,
    };
  };

  const sortedLocationData = [...locationData].sort((a, b) => {
    if (a.lat === b.lat && a.lng === b.lng) {
      if (a.status === 'genuine' && b.status === 'tampered') return -1;
      if (a.status === 'tampered' && b.status === 'genuine') return 1;
    }
    return 0;
  });

  const mapSettings = getMapSettings();

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        center={mapSettings.center}
        zoom={mapSettings.zoom}
        bounds={mapSettings.useAutoBounds ? mapSettings.bounds : undefined}
        style={{ height: '100%', width: '100%', borderRadius: '0.375rem' }}
        scrollWheelZoom={true}
        worldCopyJump={!mapSettings.useAutoBounds}
        maxBounds={
          mapSettings.useAutoBounds
            ? [
                [-90, -180],
                [90, 180],
              ]
            : undefined
        }
        maxBoundsViscosity={mapSettings.useAutoBounds ? 1.0 : 0}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={mapSettings.useAutoBounds ? true : false}
        />

        {sortedLocationData.map((point) => (
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
        <div className="absolute bottom-2 left-2 z-500 bg-white p-2 rounded shadow-md">
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
