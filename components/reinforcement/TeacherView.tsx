'use client';

import React from 'react';
import { Plus, BookOpen, BarChart2 } from 'lucide-react';

export const TeacherView: React.FC<{ isHighContrast?: boolean }> = ({ isHighContrast }) => {
  return (
    <div className={`p-6 rounded-3xl border shadow-sm ${isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-900'}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold">Panel de Gestión Pedagógica (Docente)</h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">Diseño y asignación de misiones según el PIAR.</p>
        </div>
        <button className="py-2 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" /> Asignar Misión
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
          <BookOpen className="w-5 h-5 text-indigo-500 mb-2" />
          <h4 className="font-bold text-xs">Misiones Activas</h4>
          <p className="text-lg font-black text-indigo-600">4 Asignadas</p>
        </div>
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700">
          <BarChart2 className="w-5 h-5 text-emerald-500 mb-2" />
          <h4 className="font-bold text-xs">Progreso del Grupo</h4>
          <p className="text-lg font-black text-emerald-600">85% Completado</p>
        </div>
      </div>
    </div>
  );
};