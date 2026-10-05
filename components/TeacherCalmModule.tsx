'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import { GlassWater, Heart, Sun, Flame } from 'lucide-react';

export const TeacherCalmModule: React.FC = () => {
  const { canAccessTeacherCalmSpace } = useUser();

  if (!canAccessTeacherCalmSpace) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-900 border border-amber-200/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-amber-400 text-slate-950 rounded-2xl font-bold">
          <Sun className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-black text-stone-900 dark:text-white">
            Espacio de Calma & Autocuidado Docente
          </h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Seguimiento de hidratación, salud y pausa sensorial activa para la jornada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-amber-100 dark:border-slate-700 flex items-center gap-3">
          <GlassWater className="w-7 h-7 text-sky-500" />
          <div>
            <span className="text-xs font-bold text-stone-800 dark:text-slate-200 block">
              Hidratación
            </span>
            <span className="text-[11px] text-stone-500 dark:text-slate-400">
              Meta: 4/8 vasos de agua
            </span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-amber-100 dark:border-slate-700 flex items-center gap-3">
          <Heart className="w-7 h-7 text-rose-500" />
          <div>
            <span className="text-xs font-bold text-stone-800 dark:text-slate-200 block">
              Pausa de Respiración
            </span>
            <span className="text-[11px] text-stone-500 dark:text-slate-400">
              3 min de autorregulación
            </span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl border border-amber-100 dark:border-slate-700 flex items-center gap-3">
          <Flame className="w-7 h-7 text-amber-500" />
          <div>
            <span className="text-xs font-bold text-stone-800 dark:text-slate-200 block">
              Ambiente del Aula
            </span>
            <span className="text-[11px] text-emerald-600 font-bold">
              ● Estado Armónico
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};