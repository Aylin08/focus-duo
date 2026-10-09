'use client';

import React from 'react';
import { Mic, Heart } from 'lucide-react';

export const TherapistStatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center gap-3">
        <Mic className="w-7 h-7 text-indigo-500 shrink-0" />
        <div>
          <h4 className="font-bold text-xs">Ejercicios de Articulación</h4>
          <p className="text-xs text-stone-500 dark:text-slate-400">Fonemas R y S habilitados</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 flex items-center gap-3">
        <Heart className="w-7 h-7 text-rose-500 shrink-0" />
        <div>
          <h4 className="font-bold text-xs">Autorregulación & Historias</h4>
          <p className="text-xs text-stone-500 dark:text-slate-400">Guías neuroafirmativas activas</p>
        </div>
      </div>
    </div>
  );
};