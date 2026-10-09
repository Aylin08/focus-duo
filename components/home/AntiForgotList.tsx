'use client';

import React, { useState } from 'react';
import { Briefcase, Plus, Volume2, CheckCircle2, Trash2 } from 'lucide-react';
import { MemoryItem } from '@/types/home';
import { useSpeech } from '@/hooks/useSpeech';

interface AntiForgotListProps {
  memoryList: MemoryItem[];
  isHighContrast?: boolean;
  onToggle: (id: string) => void;
  onAdd: (name: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  isStudent?: boolean; // 👈 Prop agregada para verificar si es estudiante
}

export const AntiForgotList: React.FC<AntiForgotListProps> = ({
  memoryList,
  isHighContrast = false,
  onToggle,
  onAdd,
  onDelete,
  isStudent = false,
}) => {
  const [newMemoryText, setNewMemoryText] = useState('');
  const { speak } = useSpeech();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    onAdd(newMemoryText.trim());
    setNewMemoryText('');
  };

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speak(text);
  };

  return (
    <div
      className={`p-5 rounded-3xl border shadow-sm ${
        isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-800'
      }`}
    >
      <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-indigo-500" /> Lista Anti-Olvidos
      </h3>
      <p className="text-xs text-stone-500 dark:text-slate-400 mb-3">
        Cosas esenciales para revisar antes de salir de casa o cambiar de actividad.
      </p>

      {/* Formulario de Agregar Recordatorio (Oculto si es estudiante) */}
      {!isStudent && (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
          <input
            type="text"
            value={newMemoryText}
            onChange={(e) => setNewMemoryText(e.target.value)}
            placeholder="Nuevo recordatorio..."
            className="flex-1 px-3 py-1.5 text-xs rounded-xl border dark:bg-slate-800 dark:border-slate-700 outline-none"
          />
          <button
            type="submit"
            className="p-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition cursor-pointer"
            title="Agregar Recordatorio"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
        {memoryList.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggle(item.id)}
            className={`p-3 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
              item.checked
                ? 'bg-indigo-600 text-white border-indigo-600'
                : isHighContrast
                ? 'bg-slate-800 border-slate-700'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={(e) => handleSpeak(item.name, e)}
                className="p-1 text-inherit opacity-80 hover:opacity-100 transition cursor-pointer"
                title="Escuchar"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold">{item.name}</span>
            </div>

            <div className="flex items-center gap-1">
              {item.checked && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}

              {/* Botón Eliminar (Oculto si es estudiante) */}
              {!isStudent && (
                <button
                  type="button"
                  onClick={(e) => onDelete(item.id, e)}
                  className="p-1 opacity-70 hover:opacity-100 hover:text-rose-400 transition cursor-pointer"
                  title="Eliminar"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};