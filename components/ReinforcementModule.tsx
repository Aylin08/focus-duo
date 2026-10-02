'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Mic, Heart, Trophy, Star } from 'lucide-react';
import { Category } from '@/types/reinforcement';
import { AcademicSection } from './reinforcement/AcademicSection';
import { SpeechSection } from './reinforcement/SpeechSection';
import { SocialSection } from './reinforcement/SocialSection';
import { useSpeech } from '@/hooks/useSpeech';
import { usePoints } from '@/hooks/usePoints';

interface ReinforcementModuleProps {
  isHighContrast?: boolean;
}

export const ReinforcementModule: React.FC<ReinforcementModuleProps> = ({ isHighContrast = false }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('academico');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const { speak } = useSpeech();
  const { points, addPoints, removePoints } = usePoints();

  useEffect(() => {
    const savedTasks = localStorage.getItem('aula_reinforcement_tasks');
    if (savedTasks) {
      try {
        setCompletedTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error al cargar tareas de refuerzo:', error);
      }
    }
  }, []);

  const toggleTask = (id: string, text: string) => {
    const isAlreadyCompleted = completedTasks.includes(id);
    const updatedTasks = isAlreadyCompleted
      ? completedTasks.filter((item) => item !== id)
      : [...completedTasks, id];

    if (isAlreadyCompleted) {
      removePoints(10);
    } else {
      addPoints(10);
      speak(`¡Excelente! Completaste: ${text}. ¡Ganaste 10 estrellas!`);
    }

    setCompletedTasks(updatedTasks);
    localStorage.setItem('aula_reinforcement_tasks', JSON.stringify(updatedTasks));
  };

  const isCompleted = (id: string) => completedTasks.includes(id);

  const cardBgClass = isHighContrast
    ? 'bg-slate-900 border-slate-700 text-white'
    : 'bg-white border-stone-200 text-stone-800';

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      {/* Selector de Categorías & Contador de Estrellas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`p-2 rounded-3xl border flex flex-wrap gap-2 shadow-sm w-full sm:w-auto flex-1 ${cardBgClass}`}>
          <button
            onClick={() => setActiveCategory('academico')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'academico'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Académico</span>
          </button>

          <button
            onClick={() => setActiveCategory('lenguaje')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'lenguaje'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Habla & Lenguaje</span>
          </button>

          <button
            onClick={() => setActiveCategory('social')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'social'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Historias Sociales</span>
          </button>
        </div>

        {/* Badge Recompensa de Puntos */}
        <div className="flex items-center gap-2 py-2 px-4 bg-amber-400/20 border border-amber-300 dark:border-amber-500/40 rounded-2xl shadow-sm shrink-0">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
          <div className="text-right">
            <span className="block text-[10px] uppercase font-black text-amber-700 dark:text-amber-400 leading-tight">
              Estrellas
            </span>
            <span className="text-lg font-black text-stone-900 dark:text-white leading-none">
              {points} ⭐
            </span>
          </div>
        </div>
      </div>

      {/* Renderizado Condicional de Secciones */}
      {activeCategory === 'academico' && (
        <AcademicSection
          cardBgClass={cardBgClass}
          isCompleted={isCompleted}
          onToggleTask={toggleTask}
        />
      )}

      {activeCategory === 'lenguaje' && (
        <SpeechSection cardBgClass={cardBgClass} onSpeak={speak} />
      )}

      {activeCategory === 'social' && (
        <SocialSection cardBgClass={cardBgClass} onSpeak={speak} />
      )}

      {/* Resumen de Logros */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between ${
          isHighContrast ? 'bg-slate-800 border-slate-700' : 'bg-amber-400/20 border-amber-300'
        }`}
      >
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-amber-500" />
          <div>
            <h5 className="font-bold text-xs">¡Tus Logros de Hoy!</h5>
            <p className="text-xs text-stone-600 dark:text-slate-300">
              Has completado {completedTasks.length} misiones y acumulado {completedTasks.length * 10} estrellas en esta sección.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};