'use client';

import React, { useState, useEffect } from 'react';
import { Wind } from 'lucide-react';

type BreathPhase = 'Inhala' | 'Sostén' | 'Exhala' | 'Listo';

interface BreathingExerciseProps {
  isHighContrast?: boolean;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ isHighContrast = false }) => {
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Listo');

  useEffect(() => {
    if (!isBreathing) return;

    setBreathPhase('Inhala');

    const timer1 = setTimeout(() => setBreathPhase('Sostén'), 4000);
    const timer2 = setTimeout(() => setBreathPhase('Exhala'), 8000);
    const timer3 = setTimeout(() => {
      setIsBreathing(false);
      setBreathPhase('Listo');
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isBreathing]);

  return (
    <div
      className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center transition-all ${
        isHighContrast ? 'bg-slate-800/90 border-slate-700' : 'bg-stone-50/90 border-stone-200/80'
      }`}
    >
      <p className={`text-xs font-semibold ${isHighContrast ? 'text-slate-300' : 'text-stone-700'}`}>
        Respiración Vagal Guiada
      </p>

      <div className="my-2 flex flex-col items-center justify-center min-h-[85px]">
        <div
          className={`w-12 h-12 rounded-full border-2 border-teal-500 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
            breathPhase === 'Inhala'
              ? 'scale-125 bg-teal-300/90 shadow-md shadow-teal-200'
              : breathPhase === 'Sostén'
              ? 'scale-125 bg-teal-200/90 animate-pulse'
              : breathPhase === 'Exhala'
              ? 'scale-90 bg-teal-100/60'
              : 'bg-teal-100/40'
          }`}
        >
          <Wind className="w-6 h-6 text-teal-700" />
        </div>
        <p className={`text-xs font-bold mt-2 ${isHighContrast ? 'text-teal-300' : 'text-teal-950'}`}>
          {isBreathing ? `${breathPhase}...` : 'Pausa de 12 segundos'}
        </p>
      </div>

      <button
        onClick={() => setIsBreathing(true)}
        disabled={isBreathing}
        className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
          isBreathing
            ? 'bg-teal-200 text-teal-900 border border-teal-300 cursor-not-allowed'
            : 'bg-teal-600 hover:bg-teal-500 text-white'
        }`}
      >
        {isBreathing ? 'En proceso...' : 'Iniciar Respiración'}
      </button>
    </div>
  );
};