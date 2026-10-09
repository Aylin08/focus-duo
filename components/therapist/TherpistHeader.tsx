'use client';

import React from 'react';
import { FilePlus, Plus } from 'lucide-react';

interface TherapistHeaderProps {
  showForm: boolean;
  onToggleForm: () => void;
}

export const TherapistHeader: React.FC<TherapistHeaderProps> = ({
  showForm,
  onToggleForm,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-slate-800">
      <div>
        <h3 className="text-base font-bold flex items-center gap-2">
          Panel de Gestión Pedagógica & Terapéutica
        </h3>
        <p className="text-xs text-stone-500 dark:text-slate-400">
          Asigna tareas personalizadas por alumno o generales por grupo.
        </p>
      </div>

      <button
        type="button"
        onClick={onToggleForm}
        className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow transition"
      >
        {showForm ? <Plus className="w-4 h-4 rotate-45" /> : <FilePlus className="w-4 h-4" />}
        {showForm ? 'Cancelar' : 'Nueva Asignación'}
      </button>
    </div>
  );
};