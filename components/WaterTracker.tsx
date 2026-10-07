'use client';

import React, { useState, useEffect } from 'react';
import { Droplet, Plus, RotateCcw } from 'lucide-react';

interface WaterTrackerProps {
  isHighContrast?: boolean;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({ isHighContrast = false }) => {
  const [waterGlasses, setWaterGlasses] = useState<number>(0);

  useEffect(() => {
    const savedWater = localStorage.getItem('aula_waterGlasses');
    if (savedWater !== null) {
      setWaterGlasses(parseInt(savedWater, 10) || 0);
    }
  }, []);

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
    <div
      className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center transition-all ${
        isHighContrast ? 'bg-slate-800/90 border-slate-700' : 'bg-amber-50/40 border-amber-200/80'
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
  );
};