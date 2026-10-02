'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Wind, Volume2, VolumeX, HeartPulse } from 'lucide-react';

interface SensoryCalmProps {
  isHighContrast?: boolean;
}

export const SensoryCalmModule: React.FC<SensoryCalmProps> = ({ isHighContrast = false }) => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [calmTimeLeft, setCalmTimeLeft] = useState<number | null>(null);

  // Simulación de audio blanco/lluvia con Web Audio API (sin archivos externos)
  useEffect(() => {
    if (!activeSound) return;

    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = activeSound === 'rain' ? 'lowpass' : 'bandpass';
    filter.frequency.value = activeSound === 'rain' ? 800 : 1000;

    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.05;

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    whiteNoise.start();

    return () => {
      whiteNoise.stop();
      audioCtx.close();
    };
  }, [activeSound]);

  // Contador para pausa sensorial de 60s
  useEffect(() => {
    if (calmTimeLeft === null) return;
    if (calmTimeLeft <= 0) {
      setCalmTimeLeft(null);
      return;
    }
    const timer = setInterval(() => setCalmTimeLeft((prev) => (prev ? prev - 1 : null)), 1000);
    return () => clearInterval(timer);
  }, [calmTimeLeft]);

  return (
    <section
      className={`border rounded-3xl p-5 shadow-sm transition-all h-full flex flex-col justify-between ${
        isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white/90 border-stone-200/80 text-stone-800'
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className={`text-base font-bold ${isHighContrast ? 'text-white' : 'text-stone-800'}`}>
              Estrategias de Calma Sensorial
            </h3>
            <p className={`text-xs ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
              Herramientas rápidas de autorregulación y enmascaramiento
            </p>
          </div>
          <Sparkles className={`w-5 h-5 ${isHighContrast ? 'text-teal-400' : 'text-teal-600'}`} />
        </div>

        {/* Pausa Sensorial de 1 minuto */}
        <div className={`p-3.5 rounded-2xl border mb-3 flex items-center justify-between ${
          isHighContrast ? 'bg-slate-800 border-slate-700' : 'bg-teal-50/70 border-teal-200/80'
        }`}>
          <div className="flex items-center gap-3">
            <HeartPulse className={`w-5 h-5 ${isHighContrast ? 'text-teal-400' : 'text-teal-600'}`} />
            <div>
              <p className={`text-xs font-bold ${isHighContrast ? 'text-white' : 'text-stone-800'}`}>
                Pausa Sensorial (60s)
              </p>
              <p className={`text-[11px] ${isHighContrast ? 'text-slate-300' : 'text-stone-600'}`}>
                {calmTimeLeft !== null ? `En proceso: ${calmTimeLeft}s` : 'Cierra los ojos o fija la mirada'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCalmTimeLeft(calmTimeLeft === null ? 60 : null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              calmTimeLeft !== null
                ? 'bg-rose-500 text-white'
                : isHighContrast
                ? 'bg-teal-600 text-white hover:bg-teal-500'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            {calmTimeLeft !== null ? 'Detener' : 'Iniciar'}
          </button>
        </div>

        {/* Generador de Ambiente Sonoro */}
        <div>
          <p className={`text-xs font-bold mb-2 ${isHighContrast ? 'text-slate-300' : 'text-stone-700'}`}>
            Filtro Auditivo / Ruido Blanco:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveSound(activeSound === 'white' ? null : 'white')}
              className={`flex-1 py-2 px-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSound === 'white'
                  ? isHighContrast
                    ? 'bg-teal-900 border-teal-400 text-teal-200'
                    : 'bg-teal-200 border-teal-400 text-teal-900'
                  : isHighContrast
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <Wind className="w-4 h-4" /> Ruido Neutro
            </button>

            <button
              type="button"
              onClick={() => setActiveSound(activeSound === 'rain' ? null : 'rain')}
              className={`flex-1 py-2 px-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSound === 'rain'
                  ? isHighContrast
                    ? 'bg-sky-900 border-sky-400 text-sky-200'
                    : 'bg-sky-200 border-sky-400 text-sky-900'
                  : isHighContrast
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              {activeSound === 'rain' ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />} Lluvia Suave
            </button>
          </div>
        </div>
      </div>

      <div className={`mt-3 p-2.5 rounded-xl border text-[11px] font-medium text-center ${
        isHighContrast ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-stone-50 border-stone-200 text-stone-600'
      }`}>
        Técnica 5-4-3-2-1: Observa 5 objetos, toca 4 texturas, escucha 3 sonidos.
      </div>
    </section>
  );
};