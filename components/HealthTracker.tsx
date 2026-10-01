'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Wind, Droplet, Plus, RotateCcw } from 'lucide-react';

type BreathPhase = 'Inhala' | 'Sostén' | 'Exhala' | 'Listo';

interface HealthTrackerProps {
  isHighContrast?: boolean;
}

export const HealthTracker: React.FC<HealthTrackerProps> = ({
  isHighContrast = false,
}) => {
  const [waterGlasses, setWaterGlasses] = useState<number>(0);
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Listo');

  // Cargar agua persistida
  useEffect(() => {
    const savedWater = localStorage.getItem('aula_waterGlasses');
    if (savedWater !== null) {
      setWaterGlasses(parseInt(savedWater, 10) || 0);
    }
  }, []);

  // Secuencia de respiración vagal (4s Inhala, 4s Sostén, 4s Exhala = 12s)
  useEffect(() => {
    if (!isBreathing) return;

    setBreathPhase('Inhala');

    const timer1 = setTimeout(() => {
      setBreathPhase('Sostén');
    }, 4000);

    const timer2 = setTimeout(() => {
      setBreathPhase('Exhala');
    }, 8000);

    const timer3 = setTimeout(() => {
      setIsBreathing(false);
      setBreathPhase('Listo');
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isBreathing]);

  const addWaterGlass = () => {
    const updated = waterGlasses + 1;
    setWaterGlasses(updated);
    localStorage.setItem('aula_waterGlasses', updated.toString());
  };

  const resetWater = () => {
    setWaterGlasses(0);
    localStorage.setItem('aula_waterGlasses', '0');
  };

  return (
    <section
      className={`border rounded-3xl p-5 shadow-sm transition-colors ${
        isHighContrast
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white/90 border-stone-200/80 text-stone-800'
      }`}
    >
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className={`text-lg font-bold ${isHighContrast ? 'text-white' : 'text-stone-800'}`}>
            Salud, Hidratación & Calma
          </h2>
          <p className={`text-xs ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
            Prevención de fatiga, disautonomía y autorregulación
          </p>
        </div>
        <Heart className="w-5 h-5 text-rose-500 fill-rose-100" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Tarjeta Toma de Agua / Electrolitos */}
        <div
          className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center transition-all ${
            isHighContrast
              ? 'bg-slate-800/90 border-slate-700'
              : 'bg-amber-50/40 border-amber-200/80'
          }`}
        >
          <p className={`text-xs font-semibold ${isHighContrast ? 'text-slate-300' : 'text-stone-700'}`}>
            Toma de Agua / Electrolitos
          </p>

          <div className="my-2">
            <Droplet className={`w-8 h-8 mx-auto ${isHighContrast ? 'text-sky-400' : 'text-sky-500'}`} />
            <p className={`text-sm font-extrabold mt-2 ${isHighContrast ? 'text-white' : 'text-stone-900'}`}>
              {waterGlasses} {waterGlasses === 1 ? 'Vaso Registrado' : 'Vasos Registrados'}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full">
            <button
              onClick={addWaterGlass}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                isHighContrast
                  ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
                  : 'bg-stone-200/80 hover:bg-stone-300/80 text-stone-800 border border-stone-300/80'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Vaso</span>
            </button>

            <button
              onClick={resetWater}
              title="Reiniciar contador"
              className={`p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center ${
                isHighContrast
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  : 'bg-stone-200/80 hover:bg-stone-300/80 text-stone-600'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tarjeta Respiración Vagal Guiada */}
        <div
          className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center transition-all ${
            isHighContrast
              ? 'bg-slate-800/90 border-slate-700'
              : 'bg-stone-50/90 border-stone-200/80'
          }`}
        >
          <p className={`text-xs font-semibold ${isHighContrast ? 'text-slate-300' : 'text-stone-700'}`}>
            Respiración Vagal Guiada
          </p>

          <div className="my-2 flex flex-col items-center justify-center min-h-[85px]">
            <div
              className={`w-12 h-12 rounded-full border-2 border-teal-500 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                breathPhase === 'Inhala'
                  ? 'scale-125 bg-teal-300/90 shadow-md shadow-teal-200'
                  : breathPhase === 'Sostén'
                  ? 'scale-125 bg-teal-200/90 animate-pulse'
                  : breathPhase === 'Exhala'
                  ? 'scale-90 bg-teal-100/60'
                  : 'bg-teal-100/40'
              }`}
            >
              <Wind className="w-6 h-6 text-teal-700" />
            </div>
            <p className={`text-xs font-bold mt-2 ${isHighContrast ? 'text-teal-300' : 'text-teal-950'}`}>
              {isBreathing ? `${breathPhase}...` : 'Pausa de 12 segundos'}
            </p>
          </div>

          <button
            onClick={() => setIsBreathing(true)}
            disabled={isBreathing}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              isBreathing
                ? 'bg-teal-200 text-teal-900 border border-teal-300 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            {isBreathing ? 'En proceso...' : 'Iniciar Respiración'}
          </button>
        </div>
      </div>
    </section>
  );
};