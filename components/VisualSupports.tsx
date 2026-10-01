'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Check, MessageSquareHeart } from 'lucide-react';

interface VisualSupportsProps {
  isHighContrast?: boolean;
}

interface Pictogram {
  id: string;
  label: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  phrase: string;
}

const PICTOGRAMS: Pictogram[] = [
  {
    id: 'pausa',
    label: 'Pausa / Descanso',
    icon: '⏸️',
    bgColor: 'bg-amber-100/90 hover:bg-amber-200/90',
    borderColor: 'border-amber-300',
    phrase: 'Solicito un descanso breve para autorregularme.',
  },
  {
    id: 'ruido',
    label: 'Mucho Ruido',
    icon: '🎧',
    bgColor: 'bg-indigo-100/90 hover:bg-indigo-200/90',
    borderColor: 'border-indigo-300',
    phrase: 'Necesito usar mis audífonos para reducir la carga auditiva.',
  },
  {
    id: 'agua',
    label: 'Tomar Agua',
    icon: '💧',
    bgColor: 'bg-sky-100/90 hover:bg-sky-200/90',
    borderColor: 'border-sky-300',
    phrase: 'Quiero tomar agua.',
  },
  {
    id: 'ayuda',
    label: 'Necesito Ayuda',
    icon: '🙋‍♂️',
    bgColor: 'bg-purple-100/90 hover:bg-purple-200/90',
    borderColor: 'border-purple-300',
    phrase: 'Necesito ayuda con esta actividad.',
  },
  {
    id: 'bien',
    label: 'Me siento Bien',
    icon: '😊',
    bgColor: 'bg-emerald-100/90 hover:bg-emerald-200/90',
    borderColor: 'border-emerald-300',
    phrase: 'Me siento bien y regulado.',
  },
  {
    id: 'abrumado',
    label: 'Estoy Abrumado',
    icon: '🤯',
    bgColor: 'bg-rose-100/90 hover:bg-rose-200/90',
    borderColor: 'border-rose-300',
    phrase: 'Me siento abrumado o saturado en este momento.',
  },
  {
    id: 'calma',
    label: 'Espacio Calmo',
    icon: '🍃',
    bgColor: 'bg-teal-100/90 hover:bg-teal-200/90',
    borderColor: 'border-teal-300',
    phrase: 'Quiero ir un momento al rincón de calma.',
  },
  {
    id: 'termine',
    label: 'Terminé',
    icon: '✅',
    bgColor: 'bg-green-100/90 hover:bg-green-200/90',
    borderColor: 'border-green-300',
    phrase: 'Ya terminé la actividad.',
  },
];

export const VisualSupports: React.FC<VisualSupportsProps> = ({
  isHighContrast = false,
}) => {
  const [selectedPicto, setSelectedPicto] = useState<Pictogram | null>(null);
  const [isAcknowledged, setIsAcknowledged] = useState<boolean>(false);

  // Limpiar temporizador si se desdesmonta o cambia de pictograma
  useEffect(() => {
    if (isAcknowledged) {
      const timer = setTimeout(() => {
        setSelectedPicto(null);
        setIsAcknowledged(false);
      }, 1500); // Se oculta tras 1.5 segundos

      return () => clearTimeout(timer);
    }
  }, [isAcknowledged]);

  const speakPhrase = (phraseText: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phraseText);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = (picto: Pictogram) => {
    setSelectedPicto(picto);
    setIsAcknowledged(false);
    speakPhrase(picto.phrase);
  };

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
  };

  return (
    <section
      className={`border rounded-3xl p-5 shadow-sm transition-colors ${
        isHighContrast
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white/90 border-stone-200/80 text-stone-800'
      }`}
    >
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className={`text-lg font-bold ${isHighContrast ? 'text-white' : 'text-stone-900'}`}>
            Apoyos Visuales & Pictogramas (AAC)
          </h2>
          <p className={`text-xs ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
            Comunicación rápida mediante apoyos gráficos y síntesis de voz
          </p>
        </div>
        <MessageSquareHeart className={`w-5 h-5 ${isHighContrast ? 'text-indigo-400' : 'text-indigo-500'}`} />
      </div>

      {/* Barra de MENSAJE EXPRESADO */}
      {selectedPicto ? (
        <div className="bg-stone-900 text-white p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-md mb-4 transition-all animate-fadeIn">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-2xl shrink-0">{selectedPicto.icon}</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Mensaje Expresado:
              </p>
              <p className="text-xs font-extrabold text-stone-100 truncate">{selectedPicto.phrase}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Botón de Bocina */}
            <button
              onClick={() => speakPhrase(selectedPicto.phrase)}
              title="Escuchar de nuevo"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-sky-400" />
            </button>

            {/* Botón Entendido con cambio de estado y retraso */}
            <button
              onClick={handleAcknowledge}
              disabled={isAcknowledged}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isAcknowledged
                  ? 'bg-emerald-500 text-white border border-emerald-400 scale-105'
                  : 'bg-amber-400 hover:bg-amber-500 text-stone-950'
              }`}
            >
              <span>{isAcknowledged ? 'Entendido' : 'Entendido'}</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`p-3.5 mb-4 rounded-2xl border border-dashed text-center transition-all ${
            isHighContrast
              ? 'border-slate-700 text-slate-400'
              : 'border-stone-300/80 text-stone-500 bg-stone-50/50'
          }`}
        >
          <p className="text-xs font-medium">
            Selecciona un pictograma abajo para expresar una necesidad
          </p>
        </div>
      )}

      {/* Grilla de Pictogramas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PICTOGRAMS.map((picto) => {
          const isSelected = selectedPicto?.id === picto.id;
          return (
            <button
              key={picto.id}
              onClick={() => handleSelect(picto)}
              className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                picto.bgColor
              } ${picto.borderColor} ${
                isSelected
                  ? 'ring-2 ring-stone-900 scale-105 shadow-md border-transparent'
                  : 'opacity-90 hover:opacity-100'
              }`}
            >
              <span className="text-2xl">{picto.icon}</span>
              <span className="text-xs font-bold text-stone-900 text-center leading-tight">
                {picto.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};