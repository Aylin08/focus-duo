'use client';

import React from 'react';
import { Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { AcademicTask } from '@/types/reinforcement';

const ACADEMIC_TASKS: AcademicTask[] = [
  {
    id: 'm1',
    category: 'math',
    title: '🔢 Misión: Conteo visual de bloques (1 al 20)',
    speechText: 'Conteo visual de bloques del 1 al 20',
  },
  {
    id: 'm2',
    category: 'math',
    title: '🛒 Misión: Comprar en la tiendita (Sumas sencillas)',
    speechText: 'Comprar en la tiendita',
  },
  {
    id: 'l1',
    category: 'literacy',
    title: '🔤 Diferenciar letras espejo (b, d, p, q)',
    speechText: 'Diferenciar letras espejo',
  },
  {
    id: 'l2',
    category: 'literacy',
    title: '📖 Cuento breve con pictogramas',
    speechText: 'Cuento breve con pictogramas',
  },
];

interface AcademicSectionProps {
  cardBgClass: string;
  isCompleted: (id: string) => boolean;
  onToggleTask: (id: string, speechText: string) => void;
}

export const AcademicSection: React.FC<AcademicSectionProps> = ({
  cardBgClass,
  isCompleted,
  onToggleTask,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Matemáticas Adaptadas */}
      <div className={`p-5 rounded-3xl border shadow-sm ${cardBgClass}`}>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-indigo-500" />
          <h4 className="font-bold text-sm">Matemáticas Adaptadas</h4>
        </div>
        <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
          Juegos de asociación numérica y lógica cotidiana.
        </p>
        <div className="space-y-2">
          {ACADEMIC_TASKS.filter((t) => t.category === 'math').map((task) => (
            <button
              key={task.id}
              onClick={() => onToggleTask(task.id, task.speechText)}
              className={`w-full p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                isCompleted(task.id)
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through'
                  : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>{task.title}</span>
              {isCompleted(task.id) ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                  +10 ⭐
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lectoescritura Divergente */}
      <div className={`p-5 rounded-3xl border shadow-sm ${cardBgClass}`}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h4 className="font-bold text-sm">Lectoescritura Divergente</h4>
        </div>
        <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
          Lectura con apoyo de pictogramas y discriminación visual.
        </p>
        <div className="space-y-2">
          {ACADEMIC_TASKS.filter((t) => t.category === 'literacy').map((task) => (
            <button
              key={task.id}
              onClick={() => onToggleTask(task.id, task.speechText)}
              className={`w-full p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                isCompleted(task.id)
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through'
                  : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>{task.title}</span>
              {isCompleted(task.id) ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                  +10 ⭐
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};