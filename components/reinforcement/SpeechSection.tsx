'use client';

import React from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { SpeechExercise } from '@/types/reinforcement';

const SPEECH_EXERCISES: SpeechExercise[] = [
  {
    title: 'R / RR',
    description: 'Ejercicios de vibración de lengua',
    speechText: 'Ejercicios de vibración de lengua para la erre',
    colorClass: 'text-indigo-600',
    btnClass: 'bg-indigo-600 text-white',
  },
  {
    title: 'S / Z',
    description: 'Soplo suave y posición dental',
    speechText: 'Soplo suave y posición dental para la ese y zeta',
    colorClass: 'text-amber-600',
    btnClass: 'bg-amber-500 text-stone-950',
  },
  {
    title: 'L / CL',
    description: 'Elevación del ápice lingual',
    speechText: 'Elevación del ápice lingual para la ele',
    colorClass: 'text-emerald-600',
    btnClass: 'bg-emerald-600 text-white',
  },
];

interface SpeechSectionProps {
  cardBgClass: string;
  onSpeak: (text: string) => void;
}

export const SpeechSection: React.FC<SpeechSectionProps> = ({ cardBgClass, onSpeak }) => {
  return (
    <div className={`p-5 rounded-3xl border shadow-sm ${cardBgClass}`}>
      <h4 className="font-bold text-base flex items-center gap-2 mb-1">
        <Mic className="w-5 h-5 text-indigo-500" /> Terapia de Habla & Articulación
      </h4>
      <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
        Ejercicios breves de modulación, praxias y articulación de fonemas difíciles.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SPEECH_EXERCISES.map((exercise, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl border border-stone-200 bg-stone-50 dark:bg-slate-800 dark:border-slate-700 text-center flex flex-col justify-between"
          >
            <div>
              <span className={`text-2xl font-black block mb-1 ${exercise.colorClass}`}>
                {exercise.title}
              </span>
              <p className="text-xs text-stone-600 dark:text-slate-300 font-medium mb-3">
                {exercise.description}
              </p>
            </div>
            <button
              onClick={() => onSpeak(exercise.speechText)}
              className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${exercise.btnClass}`}
            >
              <Volume2 className="w-3.5 h-3.5" /> Escuchar y Practicar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};