'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Headphones, BatteryLow, TrafficCone } from 'lucide-react';

type SensoryState = 'regulado' | 'alerta' | 'fatiga';

interface SensoryTrafficLightProps {
  isHighContrast?: boolean;
}

export const SensoryTrafficLight: React.FC<SensoryTrafficLightProps> = ({
  isHighContrast = false,
}) => {
  const [sensoryState, setSensoryState] = useState<SensoryState>('regulado');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem('aula_sensoryState') as SensoryState;
    if (savedState && ['regulado', 'alerta', 'fatiga'].includes(savedState)) {
      setSensoryState(savedState);
    }
  }, []);

  const handleStateChange = (newState: SensoryState) => {
    setSensoryState(newState);
    localStorage.setItem('aula_sensoryState', newState);
  };

  const statusConfig = {
    regulado: {
      title: 'Regulado & Disponible',
      desc: 'El estudiante o usuario está en zona verde. Óptimo para incorporar aprendizajes complejos y actividades grupales.',
      action: 'Sugerencia: Continuar con la rutina planificada.',
      color: isHighContrast
        ? 'bg-emerald-950/80 border-emerald-700 text-emerald-100'
        : 'bg-emerald-100/90 border-emerald-300 text-emerald-950',
      actionBg: isHighContrast
        ? 'bg-slate-900 text-emerald-200 border-emerald-600'
        : 'bg-white/90 text-stone-950 border-stone-300',
    },
    alerta: {
      title: 'En Sobrecarga / Alerta',
      desc: 'Sensación de saturación auditiva, visual o cognitiva cercana.',
      action: 'Sugerencia: Ofrecer audífonos de cancelación de ruido, dimmear luces o dar 5 min en rincón calmo.',
      color: isHighContrast
        ? 'bg-amber-950/80 border-amber-700 text-amber-100'
        : 'bg-amber-100/90 border-amber-300 text-amber-950',
      actionBg: isHighContrast
        ? 'bg-slate-900 text-amber-200 border-amber-600'
        : 'bg-white/90 text-stone-950 border-stone-300',
    },
    fatiga: {
      title: 'Batería Baja / Agotamiento',
      desc: 'Energía física o mental comprometida (fatiga acumulada o disautonomía).',
      action: 'Sugerencia: Reducir demandas de tareas, permitir postura reclinada e hidratación.',
      color: isHighContrast
        ? 'bg-rose-950/80 border-rose-700 text-rose-100'
        : 'bg-rose-100/90 border-rose-300 text-rose-950',
      actionBg: isHighContrast
        ? 'bg-slate-900 text-rose-200 border-rose-600'
        : 'bg-white/90 text-stone-950 border-stone-300',
    },
  };

  const current = statusConfig[sensoryState];

  return (
    <section
      className={`border rounded-3xl p-5 shadow-sm transition-colors ${
        isHighContrast
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white/90 border-stone-200/80 text-stone-800'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className={`text-lg font-bold ${isHighContrast ? 'text-white' : 'text-stone-800'}`}>
            Semáforo de Regulación Sensorial
          </h2>
          <p className={`text-xs ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
            Monitoreo de sobrecarga emocional y sensorial
          </p>
        </div>
        <TrafficCone className={`w-6 h-6 ${isHighContrast ? 'text-amber-400' : 'text-amber-500'}`} />
      </div>

      <div className="flex justify-around items-center gap-2 my-4">
        {/* Regulado */}
        <button
          type="button"
          onClick={() => handleStateChange('regulado')}
          className={`flex-1 py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
            sensoryState === 'regulado'
              ? isHighContrast
                ? 'bg-emerald-500 border-emerald-300 ring-2 ring-emerald-300 scale-105 shadow-sm'
                : 'bg-emerald-200 border-emerald-400 ring-2 ring-emerald-300 scale-105 shadow-sm'
              : isHighContrast
              ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
              : 'bg-stone-100/80 border-stone-200 hover:bg-stone-200'
          }`}
        >
          <Leaf
            className={`w-6 h-6 ${
              sensoryState === 'regulado'
                ? isHighContrast ? 'text-slate-950' : 'text-emerald-700'
                : isHighContrast ? 'text-emerald-400' : 'text-emerald-700'
            }`}
          />
          <span
            className={`text-[11px] font-extrabold ${
              sensoryState === 'regulado'
                ? isHighContrast ? 'text-slate-950' : 'text-stone-900'
                : isHighContrast ? 'text-white' : 'text-stone-900'
            }`}
          >
            Regulado
          </span>
        </button>

        {/* Sobrecarga */}
        <button
          type="button"
          onClick={() => handleStateChange('alerta')}
          className={`flex-1 py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
            sensoryState === 'alerta'
              ? isHighContrast
                ? 'bg-amber-400 border-amber-200 ring-2 ring-amber-300 scale-105 shadow-sm'
                : 'bg-amber-200 border-amber-400 ring-2 ring-amber-300 scale-105 shadow-sm'
              : isHighContrast
              ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
              : 'bg-stone-100/80 border-stone-200 hover:bg-stone-200'
          }`}
        >
          <Headphones
            className={`w-6 h-6 ${
              sensoryState === 'alerta'
                ? isHighContrast ? 'text-slate-950' : 'text-amber-800'
                : isHighContrast ? 'text-amber-400' : 'text-amber-800'
            }`}
          />
          <span
            className={`text-[11px] font-extrabold ${
              sensoryState === 'alerta'
                ? isHighContrast ? 'text-slate-950' : 'text-stone-900'
                : isHighContrast ? 'text-white' : 'text-stone-900'
            }`}
          >
            Sobrecarga
          </span>
        </button>

        {/* Batería Baja */}
        <button
          type="button"
          onClick={() => handleStateChange('fatiga')}
          className={`flex-1 py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
            sensoryState === 'fatiga'
              ? isHighContrast
                ? 'bg-rose-500 border-rose-300 ring-2 ring-rose-300 scale-105 shadow-sm'
                : 'bg-rose-200 border-rose-400 ring-2 ring-rose-300 scale-105 shadow-sm'
              : isHighContrast
              ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
              : 'bg-stone-100/80 border-stone-200 hover:bg-stone-200'
          }`}
        >
          <BatteryLow
            className={`w-6 h-6 ${
              sensoryState === 'fatiga'
                ? isHighContrast ? 'text-slate-950' : 'text-rose-700'
                : isHighContrast ? 'text-rose-400' : 'text-rose-700'
            }`}
          />
          <span
            className={`text-[11px] font-extrabold ${
              sensoryState === 'fatiga'
                ? isHighContrast ? 'text-slate-950' : 'text-stone-900'
                : isHighContrast ? 'text-white' : 'text-stone-900'
            }`}
          >
            Batería baja
          </span>
        </button>
      </div>

      <div className={`border p-4 rounded-2xl text-xs transition-all ${current.color}`}>
        <p className={`font-extrabold text-sm mb-1 ${isHighContrast ? 'text-white' : 'text-stone-950'}`}>
          {current.title}
        </p>
        <p className={`mb-2 leading-relaxed font-semibold ${isHighContrast ? 'text-slate-200' : 'text-stone-900'}`}>
          {current.desc}
        </p>
        <div className={`p-2.5 rounded-xl font-bold text-[11px] border ${current.actionBg}`}>
          {current.action}
        </div>
      </div>
    </section>
  );
};