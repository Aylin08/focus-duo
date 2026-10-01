import React from 'react';
import { Accessibility, Eye, VolumeX, Sparkles } from 'lucide-react';

interface AccessibilityToolbarProps {
  isDyslexic: boolean;
  setIsDyslexic: (value: boolean) => void;
  isHighContrast: boolean;
  setIsHighContrast: (value: boolean) => void;
  isReducedMotion: boolean;
  setIsReducedMotion: (value: boolean) => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  isDyslexic,
  setIsDyslexic,
  isHighContrast,
  setIsHighContrast,
  isReducedMotion,
  setIsReducedMotion,
}) => {
  return (
    

  <div className="w-full bg-slate-200 border border-slate-300 rounded-2xl p-3 mb-6 flex flex-wrap justify-between items-center gap-3 transition-colors">
      <div className="flex items-center gap-2">
        <Accessibility className="w-5 h-5 text-indigo-600" />
        <span className="text-xs font-bold text-slate-800">
          Ajustes de Accesibilidad:
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Fuente Dislexia */}
        <button
          onClick={() => setIsDyslexic(!isDyslexic)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            isDyslexic
              ? 'bg-amber-400 text-stone-900 border border-amber-500 shadow-xs'
              : 'bg-white dark:bg-slate-700 text-stone-700 dark:text-slate-200 border border-stone-300 dark:border-slate-600 hover:bg-stone-100 dark:hover:bg-slate-600'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          {isDyslexic ? '✓ Fuente Lectura Fácil' : 'Fuente Lectura Fácil'}
        </button>

        {/* Alto Contraste */}
        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            isHighContrast
              ? 'bg-blue-600 text-white border border-blue-400 shadow-xs'
              : 'bg-white dark:bg-slate-700 text-stone-700 dark:text-slate-200 border border-stone-300 dark:border-slate-600 hover:bg-stone-100 dark:hover:bg-slate-600'
          }`}
        >
          {isHighContrast ? '✓ Alto Contraste' : 'Alto Contraste'}
        </button>

        {/* Reducir Animaciones */}
        <button
          onClick={() => setIsReducedMotion(!isReducedMotion)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            isReducedMotion
              ? 'bg-amber-400 text-stone-900 border border-amber-500 shadow-xs'
              : 'bg-white dark:bg-slate-700 text-stone-700 dark:text-slate-200 border border-stone-300 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-slate-600'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {isReducedMotion ? '✓ Reducir Animaciones' : 'Reducir Animaciones'}
        </button>
      </div>
    </div>
  );
};