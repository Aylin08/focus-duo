'use client';

import React from 'react';
import { Mic, Heart, FilePlus } from 'lucide-react';

export const TherapistView: React.FC<{ isHighContrast?: boolean }> = ({ isHighContrast }) => {
  return (
    <div className={`p-6 rounded-3xl border shadow-sm ${isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-900'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold">Panel de Terapia & Lenguaje</h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">Control de ejercicios fonoaudiológicos y regulación.</p>
        </div>
        <button className="py-2 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer">
          <FilePlus className="w-4 h-4" /> Crear Historia Social
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center gap-3">
          <Mic className="w-7 h-7 text-indigo-500" />
          <div>
            <h4 className="font-bold text-xs">Ejercicios de Articulación</h4>
            <p className="text-xs text-stone-500 dark:text-slate-400">Fonemas R y S habilitados</p>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center gap-3">
          <Heart className="w-7 h-7 text-rose-500" />
          <div>
            <h4 className="font-bold text-xs">Autorregulación</h4>
            <p className="text-xs text-stone-500 dark:text-slate-400">2 Guías sociales activas</p>
          </div>
        </div>
      </div>
    </div>
  );
};