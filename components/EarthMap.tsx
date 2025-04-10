'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const heartIcon = new L.DivIcon({
  html: '<div class="pulse-icon">💚</div>',
  className: 'custom-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface LovePoint {
  message: string;
  location: {
    country: string;
    lat: number;
    lon: number;
  };
}

export default function EarthMap() {
  const [points, setPoints] = useState<LovePoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'loveMessages'));
      const data = snapshot.docs
        .map((doc) => doc.data())
        .filter((doc: any) => doc.location?.lat && doc.location?.lon);
      setPoints(data as LovePoint[]);
    };
    fetchData();
  }, []);

  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-4">🌍 Bản đồ yêu thương toàn cầu</h2>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '500px', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap & Carto"
        />
        {points.map((point, index) => (
          <Marker
            key={index}
            position={[point.location.lat, point.location.lon]}
            icon={heartIcon}
          >
            <Popup>
              <div className="text-sm">
                {point.message}
                <br />
                <span className="text-gray-500">📍 {point.location.country}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style jsx>{`
        .pulse-icon {
          animation: pulse 2s infinite;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

