'use client';

import React, { useState } from 'react';
import { Sun, Coffee, Moon, Plus, Volume2, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { RoutineItem } from '@/types/home';
import { useSpeech } from '@/hooks/useSpeech';
import { useUser } from '@/context/UserContext';

interface HomeRoutinesProps {
  routines: RoutineItem[];
  isHighContrast?: boolean;
  onToggle: (id: string) => void;
  onAdd: (text: string, timeOfDay: 'manana' | 'tarde' | 'noche') => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export const HomeRoutines: React.FC<HomeRoutinesProps> = ({
  routines,
  isHighContrast = false,
  onToggle,
  onAdd,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<'manana' | 'tarde' | 'noche'>('manana');
  const [newRoutineText, setNewRoutineText] = useState('');
  const { speak } = useSpeech();
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoutineText.trim()) return;
    onAdd(newRoutineText.trim(), activeTab);
    setNewRoutineText('');
  };

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speak(text);
  };

  const filteredRoutines = routines.filter((r) => r.timeOfDay === activeTab);

  return (
    <div
      className={`p-5 rounded-3xl border shadow-sm transition-all ${
        isHighContrast
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white border-stone-200 text-stone-800'
      }`}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200 dark:border-slate-800">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500 shrink-0" /> Rutinas del Hogar
        </h3>
      </div>

      {/* Control de Momentos del Día */}
      <div className="flex gap-1.5 mb-4 p-1.5 rounded-2xl bg-stone-100 dark:bg-slate-800/80 border border-stone-200/50 dark:border-slate-700/50">
        {(['manana', 'tarde', 'noche'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === tab
                ? 'bg-amber-400 text-stone-900 shadow-sm font-extrabold'
                : 'text-stone-600 dark:text-slate-400 hover:bg-stone-200/60 dark:hover:bg-slate-700/50'
            }`}
          >
            {tab === 'manana' && <Sun className="w-3.5 h-3.5 shrink-0" />}
            {tab === 'tarde' && <Coffee className="w-3.5 h-3.5 shrink-0" />}
            {tab === 'noche' && <Moon className="w-3.5 h-3.5 shrink-0" />}
            <span className="capitalize">{tab}</span>
          </button>
        ))}
      </div>

      {/* Formulario de Agregar (siempre visible o según canManageHomeRoutines) */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 pb-3 border-b border-stone-100 dark:border-slate-800">
        <input
          type="text"
          value={newRoutineText}
          onChange={(e) => setNewRoutineText(e.target.value)}
          placeholder="Nueva rutina..."
          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        />
        <button
          type="submit"
          className="p-2 bg-amber-400 text-stone-950 rounded-xl hover:bg-amber-500 transition cursor-pointer font-bold shrink-0"
          title="Agregar Tarea"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* Lista de Rutinas */}
      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
        {filteredRoutines.length === 0 ? (
          <p className="text-xs text-stone-400 dark:text-slate-500 text-center py-6 border border-dashed border-stone-200 dark:border-slate-800 rounded-2xl">
            No hay rutinas registradas para este horario.
          </p>
        ) : (
          filteredRoutines.map((item) => (
            <div
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition cursor-pointer ${
                item.completed
                  ? isHighContrast
                    ? 'bg-slate-800/40 border-slate-700/60 text-slate-400 line-through'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-800 line-through'
                  : isHighContrast
                  ? 'bg-slate-800 border-slate-700 hover:border-amber-400/50'
                  : 'bg-stone-50 border-stone-200 hover:border-amber-400/60 hover:bg-white shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={(e) => handleSpeak(item.text, e)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-amber-500 hover:bg-stone-200/50 dark:hover:bg-slate-700 transition shrink-0 cursor-pointer"
                  title="Escuchar"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-xs font-medium break-words">{item.text}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.completed ? (
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                ) : (
                  <Circle className="w-4.5 h-4.5 text-stone-300 dark:text-slate-600" />
                )}

                <button
                  type="button"
                  onClick={(e) => onDelete(item.id, e)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
                  title="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};