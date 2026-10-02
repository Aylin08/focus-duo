'use client';

import React, { useState } from 'react';
import { AlertTriangle, MapPin, Navigation, Send, Check } from 'lucide-react';

interface SosGeoButtonProps {
  isHighContrast?: boolean;
}

export const SosGeoButton: React.FC<SosGeoButtonProps> = ({ isHighContrast = false }) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleGetLocation = () => {
    setLoading(true);
    setError(null);
    setSent(false);

    if (!navigator.geolocation) {
      setError('La geolocalización no es compatible con este navegador.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError('No se pudo obtener la ubicación. Revisa los permisos GPS.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSendAlert = () => {
    if (!location) return;
    const mapsUrl = `https://maps.google.com/?q=${location.lat},${location.lng}`;
    const message = encodeURIComponent(`¡NECESITO AYUDA! Mi ubicación actual es: ${mapsUrl}`);
    
    // Abrir WhatsApp o app de mensajes por defecto
    window.open(`https://wa.me/?text=${message}`, '_blank');
    setSent(true);
  };

  return (
    <div
      className={`p-5 rounded-3xl border shadow-sm transition-all ${
        isHighContrast
          ? 'bg-rose-950/40 border-rose-800 text-white'
          : 'bg-rose-50 border-rose-200 text-stone-800'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-md">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-extrabold text-base text-rose-950 dark:text-rose-200">
            Geolocalización Segura & SOS
          </h3>
          <p className="text-xs text-rose-700 dark:text-rose-300">
            Botón de auxilio visual para situaciones de desorientación
          </p>
        </div>
      </div>

      {!location ? (
        <button
          onClick={handleGetLocation}
          disabled={loading}
          className="w-full py-3.5 px-4 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Navigation className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Obteniendo GPS...' : '¿Dónde estoy? / Generar Auxilio SOS'}</span>
        </button>
      ) : (
        <div className="space-y-3 animate-fadeIn">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-stone-700 dark:text-slate-300 font-semibold">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Ubicación GPS Detectada</span>
            </div>
            <a
              href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline font-bold"
            >
              Ver Mapa
            </a>
          </div>

          <button
            onClick={handleSendAlert}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
          >
            {sent ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            <span>{sent ? 'Alerta Enviada a Tutores' : 'Enviar Ubicación por Mensaje'}</span>
          </button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs font-semibold text-rose-600 dark:text-rose-400 text-center">
          {error}
        </p>
      )}
    </div>
  );
};