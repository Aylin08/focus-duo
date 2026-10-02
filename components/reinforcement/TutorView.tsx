'use client';

import React from 'react';
import { Home, HeartHandshake } from 'lucide-react';

export const TutorView: React.FC<{ isHighContrast?: boolean }> = ({ isHighContrast }) => {
  return (
    <div className={`p-6 rounded-3xl border shadow-sm ${isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-900'}`}>
      <div className="flex items-center gap-3 mb-3">
        <Home className="w-6 h-6 text-emerald-600" />
        <h3 className="text-base font-bold">Acompañamiento en el Hogar (Tutor/Familia)</h3>
      </div>
      <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
        Rutinas recomendadas por los especialistas para reforzar en casa.
      </p>

      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-start gap-3">
        <HeartHandshake className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-xs">Recomendación para hoy</h4>
          <p className="text-xs text-stone-600 dark:text-slate-300 mt-1">
            Practicar la historia de "ruidos fuertes" antes de salir a lugares concurridos.
          </p>
        </div>
      </div>
    </div>
  );
};