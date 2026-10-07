'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { WaterTracker } from './WaterTracker';
import { BreathingExercise } from './BreathingExercise';

interface HealthTrackerProps {
  isHighContrast?: boolean;
}

export const HealthTracker: React.FC<HealthTrackerProps> = ({ isHighContrast = false }) => {
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
        <WaterTracker isHighContrast={isHighContrast} />
        <BreathingExercise isHighContrast={isHighContrast} />
      </div>
    </section>
  );
};