import React from 'react';

interface Props {
  isDyslexic: boolean;
  setIsDyslexic: (val: boolean) => void;
  isHighContrast: boolean;
  setIsHighContrast: (val: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (val: boolean) => void;
}

export const AccessibilityToolbar: React.FC<Props> = ({
  isDyslexic,
  setIsDyslexic,
  isHighContrast,
  setIsHighContrast,
  reduceMotion,
  setReduceMotion,
}) => {
  return (
    <section className="max-w-4xl mx-auto mt-4">
      <div className="bg-stone-200/60 border border-stone-300/80 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-stone-700 flex items-center gap-1.5">
          <span>♿</span> Ajustes de Accesibilidad:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {/* Tipografía Lectura Fácil / Dislexia */}
          <button
            onClick={() => setIsDyslexic(!isDyslexic)}
            className={`px-3 py-1.5 rounded-xl font-medium border transition cursor-pointer ${
              isDyslexic
                ? 'bg-amber-300 border-amber-400 text-stone-900 font-bold'
                : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {isDyslexic ? '✓ Fuente Dislexia' : 'Fuente Lectura Fácil'}
          </button>

          {/* Alto Contraste */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`px-3 py-1.5 rounded-xl font-medium border transition cursor-pointer ${
              isHighContrast
                ? 'bg-slate-900 border-slate-700 text-amber-300 font-bold'
                : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {isHighContrast ? '✓ Alto Contraste' : 'Alto Contraste'}
          </button>

          {/* Reducir Animaciones */}
          <button
            onClick={() => setReduceMotion(!reduceMotion)}
            className={`px-3 py-1.5 rounded-xl font-medium border transition cursor-pointer ${
              reduceMotion
                ? 'bg-teal-300 border-teal-400 text-teal-950 font-bold'
                : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {reduceMotion ? '✓ Sin Movimiento' : 'Reducir Animaciones'}
          </button>
        </div>
      </div>
    </section>
  );
};