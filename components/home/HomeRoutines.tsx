'use client';

import React, { useState } from 'react';
import { Sun, Coffee, Moon, Plus, Volume2, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { RoutineItem } from '@/types/home';
import { useSpeech } from '@/hooks/useSpeech';

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
      className={`p-5 rounded-3xl border shadow-sm ${
        isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-500" /> Rutinas del Hogar
        </h3>
      </div>

      {/* Selector de momento del día */}
      <div className="flex gap-2 mb-4 p-1 rounded-2xl bg-stone-100 dark:bg-slate-800">
        {(['manana', 'tarde', 'noche'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === tab
                ? 'bg-amber-400 text-stone-900 shadow-sm'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
            }`}
          >
            {tab === 'manana' && <Sun className="w-3.5 h-3.5" />}
            {tab === 'tarde' && <Coffee className="w-3.5 h-3.5" />}
            {tab === 'noche' && <Moon className="w-3.5 h-3.5" />}
            <span className="capitalize">{tab}</span>
          </button>
        ))}
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <input
          type="text"
          value={newRoutineText}
          onChange={(e) => setNewRoutineText(e.target.value)}
          placeholder="Nueva rutina..."
          className="flex-1 px-3 py-1.5 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700 outline-none"
        />
        <button
          type="submit"
          className="p-1.5 bg-amber-400 text-stone-950 rounded-xl hover:bg-amber-500 transition"
          title="Agregar Tarea"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* Lista */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {filteredRoutines.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`p-3 rounded-2xl border flex items-center justify-between transition cursor-pointer ${
              item.completed
                ? isHighContrast
                  ? 'bg-slate-800/60 border-slate-700 text-slate-400 line-through'
                  : 'bg-emerald-50/60 border-emerald-200 text-emerald-800 line-through'
                : isHighContrast
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-750'
                : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2 pr-2">
              <button
                type="button"
                onClick={(e) => handleSpeak(item.text, e)}
                className="p-1 text-stone-400 hover:text-amber-500 transition"
                title="Escuchar"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-medium">{item.text}</span>
            </div>

            <div className="flex items-center gap-2">
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-stone-300 shrink-0" />
              )}
              <button
                type="button"
                onClick={(e) => onDelete(item.id, e)}
                className="p-1 text-stone-400 hover:text-rose-500 transition"
                title="Eliminar"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};