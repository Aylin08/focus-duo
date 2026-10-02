import React from 'react';
import { Eye, Contrast, Zap, FileText } from 'lucide-react';

interface AccessibilityToolbarProps {
  isDyslexic: boolean;
  setIsDyslexic: (value: boolean) => void;
  isHighContrast: boolean;
  setIsHighContrast: (value: boolean) => void;
  isReducedMotion: boolean;
  setIsReducedMotion: (value: boolean) => void;
  onOpenReport?: () => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  isDyslexic,
  setIsDyslexic,
  isHighContrast,
  setIsHighContrast,
  isReducedMotion,
  setIsReducedMotion,
  onOpenReport,
}) => {
  return (
    <div className={`p-2.5 rounded-3xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 transition-colors shadow-sm ${
      isHighContrast 
        ? 'bg-slate-900 border-slate-700 text-white' 
        : 'bg-stone-200/80 border-stone-300 text-stone-900'
    }`}>
      {/* Opciones de Accesibilidad */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold px-2 text-stone-800 dark:text-slate-200 flex items-center gap-1.5 shrink-0">
          <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Ajustes de Accesibilidad:
        </span>

        <button
          onClick={() => setIsDyslexic(!isDyslexic)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
            isDyslexic
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-300/80'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-stone-700" />
          <span>Fuente Lectura Fácil</span>
        </button>

        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
            isHighContrast
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-300/80'
          }`}
        >
          <Contrast className="w-3.5 h-3.5 text-stone-700" />
          <span>Alto Contraste</span>
        </button>

        <button
          onClick={() => setIsReducedMotion(!isReducedMotion)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
            isReducedMotion
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-300/80'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-stone-700" />
          <span>Reducir Animaciones</span>
        </button>
      </div>

      {/* Botón Resumen Integrado */}
{onOpenReport && (
  <button
    onClick={onOpenReport}
    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-sm border shrink-0 ${
      isHighContrast
        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-300'
        : 'bg-stone-900 hover:bg-stone-800 text-white border-stone-900'
    }`}
  >
    <FileText className={`w-3.5 h-3.5 ${isHighContrast ? 'text-slate-950' : 'text-amber-400'}`} />
    <span>Resumen de Jornada</span>
  </button>
)}
    </div>
  );
};