import React, { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';
import { Category } from '@/types/reinforcement';

interface TherapistPanelProps {
  cardBgClass: string;
  onAdd: (category: Category, subject: string, title: string) => void;
  onSelectCategory: (category: Category) => void;
}

export const TherapistPanel: React.FC<TherapistPanelProps> = ({ cardBgClass, onAdd, onSelectCategory }) => {
  const [newSubject, setNewSubject] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('academico');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAdd(selectedCategory, newSubject, newTitle);
    onSelectCategory(selectedCategory);
    setNewTitle('');
    setNewSubject('');
  };

  return (
    <div className={`p-5 rounded-3xl border shadow-sm space-y-4 ${cardBgClass}`}>
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-stone-900 dark:text-white">Panel Terapéutico</h3>
          <p className="text-xs text-stone-500 dark:text-slate-400">
            Asigna ejercicios de articulación, habla, historias sociales o autonomía.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-stone-100 dark:border-slate-800">
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category)}
            className="px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 font-bold outline-none"
          >
            <option value="academico">📘 Académico</option>
            <option value="lenguaje">🎙️ Habla & Lenguaje</option>
            <option value="social">❤️ Historias Sociales</option>
            <option value="autonomia">⭐ Autonomía</option>
          </select>

          <input
            type="text"
            placeholder="Área (Ej. Practicar la letra 'R')"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="flex-1 min-w-[200px] px-3.5 py-2 text-xs rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 outline-none"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enunciado, trabalenguas o instrucción..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> + Asignar
          </button>
        </div>
      </form>
    </div>
  );
};