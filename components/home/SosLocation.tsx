'use client';

import React, { useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Coords } from '@/types/home';

interface SosLocationProps {
  isHighContrast?: boolean;
}

export const SosLocation: React.FC<SosLocationProps> = ({ isHighContrast = false }) => {
  const [locationStatus, setLocationStatus] = useState<string>('');
  const [coords, setCoords] = useState<Coords | null>(null);

  const handleGetLocation = () => {
    setLocationStatus('Obteniendo ubicación...');
    if (!navigator.geolocation) {
      setLocationStatus('Geolocalización no soportada en este navegador.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setLocationStatus('Ubicación detectada con éxito.');
      },
      () => {
        setLocationStatus('No se pudo obtener la ubicación. Verifica los permisos.');
      }
    );
  };

  return (
    <div
      className={`p-5 rounded-3xl border shadow-sm ${
        isHighContrast
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-amber-500/10 border-amber-300/60 text-stone-800'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-amber-500 text-stone-950 rounded-2xl shrink-0">
          <MapPin className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm">¿Dónde estoy? / Ayuda SOS</h4>
          <p className="text-xs font-medium text-stone-800 dark:text-slate-200 mt-0.5">
            Genera la posición actual para compartir con la familia en caso de desorientación.
          </p>

          <button
            onClick={handleGetLocation}
            className={`mt-3 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm flex items-center gap-2 ${
              isHighContrast
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Obtener mi Ubicación Actual</span>
          </button>

          {locationStatus && (
            <p className="text-xs font-semibold mt-2 text-stone-800 dark:text-slate-200">
              {locationStatus}
            </p>
          )}

          {coords && (
            <div className="mt-2">
              <a
                href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-bold text-indigo-600 dark:text-indigo-400 underline"
              >
                Ver punto en Google Maps 📍
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};