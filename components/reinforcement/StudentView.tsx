'use client';

import React, { useState } from 'react';
import { BookOpen, Mic, Heart, Star, Brain, Sparkles, CheckCircle2, Volume2, Trophy } from 'lucide-react';

interface Props {
  points: number;
  toggleTask: (id: string, text: string) => void;
  isCompleted: (id: string) => boolean;
  speak: (text: string) => void;
  completedCount: number;
  isHighContrast?: boolean;
}

export const StudentView: React.FC<Props> = ({
  points,
  toggleTask,
  isCompleted,
  speak,
  completedCount,
  isHighContrast = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<'academico' | 'lenguaje' | 'social'>('academico');

  return (
    <div className="space-y-6">
      {/* Encabezado de Pestañas y Estrellas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`p-2 rounded-3xl border flex flex-wrap gap-2 shadow-sm w-full sm:w-auto flex-1 ${
          isHighContrast ? 'bg-slate-900 border-slate-700' : 'bg-white border-stone-200'
        }`}>
          <button
            onClick={() => setActiveCategory('academico')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'academico' ? 'bg-indigo-600 text-white' : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Académico</span>
          </button>

          <button
            onClick={() => setActiveCategory('lenguaje')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'lenguaje' ? 'bg-indigo-600 text-white' : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Lenguaje</span>
          </button>

          <button
            onClick={() => setActiveCategory('social')}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'social' ? 'bg-indigo-600 text-white' : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Historias Sociales</span>
          </button>
        </div>

        <div className="flex items-center gap-2 py-2 px-4 bg-amber-400/20 border border-amber-300 rounded-2xl shrink-0">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
          <span className="text-lg font-black text-stone-900 dark:text-white">{points} ⭐</span>
        </div>
      </div>

      {/* Contenido de Académico */}
      {activeCategory === 'academico' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`p-5 rounded-3xl border ${isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-800'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-indigo-500" />
              <h4 className="font-bold text-sm">Matemáticas Adaptadas</h4>
            </div>
            <button
              onClick={() => toggleTask('m1', 'Conteo visual de bloques')}
              className={`w-full p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                isCompleted('m1') ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <span>🔢 Conteo visual de bloques (1 al 20)</span>
              {isCompleted('m1') ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">+10 ⭐</span>}
            </button>
          </div>

          <div className={`p-5 rounded-3xl border ${isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200 text-stone-800'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-sm">Lectoescritura</h4>
            </div>
            <button
              onClick={() => toggleTask('l1', 'Diferenciar letras espejo')}
              className={`w-full p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                isCompleted('l1') ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through' : 'bg-stone-50 border-stone-200'
              }`}
            >
              <span>🔤 Diferenciar letras espejo (b, d, p, q)</span>
              {isCompleted('l1') ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">+10 ⭐</span>}
            </button>
          </div>
        </div>
      )}

      {/* Contenido de Lenguaje */}
      {activeCategory === 'lenguaje' && (
        <div className={`p-5 rounded-3xl border ${isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200'}`}>
          <h4 className="font-bold text-sm mb-3">Ejercicios de Vocalización</h4>
          <button 
            onClick={() => speak('Ejercicios de vibración de lengua para la letra erre')}
            className="py-2 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" /> Practicar letra R
          </button>
        </div>
      )}

      {/* Contenido de Historias Sociales */}
      {activeCategory === 'social' && (
        <div className={`p-5 rounded-3xl border ${isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-stone-200'}`}>
          <h4 className="font-bold text-sm mb-2">🔊 ¿Qué hago si hay mucho ruido en el recreo?</h4>
          <p className="text-xs text-stone-500 mb-3">1. Puedo usar mis audífonos. 2. Puedo pedir 5 minutos de descanso.</p>
          <button 
            onClick={() => speak('Si hay mucho ruido puedo usar mis audífonos o pedir un descanso.')}
            className="py-2 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" /> Escuchar Guía
          </button>
        </div>
      )}

      {/* Tarjeta de Logros */}
      <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-300 flex items-center gap-3">
        <Trophy className="w-6 h-6 text-amber-500" />
        <div>
          <h5 className="font-bold text-xs">¡Tus Logros!</h5>
          <p className="text-xs text-stone-600 dark:text-slate-300">Completaste {completedCount} misiones hoy.</p>
        </div>
      </div>
    </div>
  );
};