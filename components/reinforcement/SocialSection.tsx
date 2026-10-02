'use client';

import React from 'react';
import { Heart, Volume2 } from 'lucide-react';
import { SocialStory } from '@/types/reinforcement';

const SOCIAL_STORIES: SocialStory[] = [
  {
    id: 's1',
    title: '🔊 ¿Qué hago si hay mucho ruido en el recreo o fiesta?',
    steps:
      '1. Puedo usar mis audífonos de cancelación. 2. Puedo avisar a la maestra que necesito 5 minutos de pausa. 3. Está bien apartarme un momento.',
    speechText:
      '¿Qué hago si hay mucho ruido en el recreo o fiesta? Uno, puedo usar mis audífonos. Dos, puedo avisar a la maestra que necesito cinco minutos de pausa. Tres, está bien apartarme un momento.',
  },
  {
    id: 's2',
    title: '✏️ ¿Cómo pedir prestado un material a un compañero?',
    steps:
      '1. Me acerco y digo su nombre. 2. Pregunto: "¿Me prestas tu color, por favor?". 3. Si me dice que no, no pasa nada, le pregunto a alguien más.',
    speechText:
      '¿Cómo pedir prestado un material? Uno, me acerco y digo su nombre. Dos, pregunto: Me prestas tu color por favor. Tres, si me dice que no, no pasa nada.',
  },
];

interface SocialSectionProps {
  cardBgClass: string;
  onSpeak: (text: string) => void;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ cardBgClass, onSpeak }) => {
  return (
    <div className={`p-5 rounded-3xl border shadow-sm ${cardBgClass}`}>
      <h4 className="font-bold text-base mb-1 flex items-center gap-2">
        <Heart className="w-5 h-5 text-rose-500" /> Historias Sociales & Autorregulación
      </h4>
      <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
        Guías visuales sobre cómo actuar en entornos comunes para reducir la ansiedad.
      </p>

      <div className="space-y-3">
        {SOCIAL_STORIES.map((story) => (
          <div
            key={story.id}
            className="p-4 rounded-2xl border border-stone-200 bg-stone-50 dark:bg-slate-800 dark:border-slate-700 flex justify-between items-start gap-3"
          >
            <div>
              <h5 className="font-bold text-xs text-stone-900 dark:text-white">{story.title}</h5>
              <p className="text-xs text-stone-600 dark:text-slate-300 mt-1">{story.steps}</p>
            </div>
            <button
              onClick={() => onSpeak(story.speechText)}
              className="p-2 rounded-xl bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 cursor-pointer shrink-0"
              aria-label="Escuchar historia social"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};