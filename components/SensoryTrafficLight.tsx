import React, { useState, useEffect } from 'react';
import { Leaf, Headphones, BatteryLow, TrafficCone } from 'lucide-react';

type SensoryState = 'regulado' | 'alerta' | 'fatiga';

export const SensoryTrafficLight: React.FC = () => {
  const [sensoryState, setSensoryState] = useState<SensoryState>('regulado');

  useEffect(() => {
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
      color: 'bg-emerald-100/90 border-emerald-300 text-emerald-950',
    },
    alerta: {
      title: 'En Sobrecarga / Alerta',
      desc: 'Sensación de saturación auditiva, visual o cognitiva cercana.',
      action: 'Sugerencia: Ofrecer audífonos de cancelación de ruido, dimmear luces o dar 5 min en rincón calmo.',
      color: 'bg-amber-100/90 border-amber-300 text-amber-950',
    },
    fatiga: {
      title: 'Batería Baja / Agotamiento',
      desc: 'Energía física o mental comprometida (fatiga acumulada o disautonomía).',
      action: 'Sugerencia: Reducir demandas de tareas, permitir postura reclinada e hidratación.',
      color: 'bg-rose-100/90 border-rose-300 text-rose-950',
    },
  };

  const current = statusConfig[sensoryState];

  return (
    <section className="bg-white/90 border border-stone-200/80 rounded-3xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-lg font-bold text-stone-800">Semáforo de Regulación Sensorial</h2>
          <p className="text-xs text-stone-500">Monitoreo de sobrecarga emocional y sensorial</p>
        </div>
        <TrafficCone className="w-6 h-6 text-amber-500" />
      </div>

      <div className="flex justify-around items-center gap-2 my-4">
        <button
          onClick={() => handleStateChange('regulado')}
          className={`flex-1 py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
            sensoryState === 'regulado'
              ? 'bg-emerald-200 border-emerald-400 ring-2 ring-emerald-300 scale-105 shadow-sm'
              : 'bg-stone-100/80 border-stone-200 opacity-70 hover:opacity-100'
          }`}
        >
          <Leaf className="w-6 h-6 text-emerald-700" />
          <span className="text-[11px] font-extrabold text-stone-900">Regulado</span>
        </button>

        <button
          onClick={() => handleStateChange('alerta')}
          className={`flex-1 py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
            sensoryState === 'alerta'
              ? 'bg-amber-200 border-amber-400 ring-2 ring-amber-300 scale-105 shadow-sm'
              : 'bg-stone-100/80 border-stone-200 opacity-70 hover:opacity-100'
          }`}
        >
          <Headphones className="w-6 h-6 text-amber-800" />
          <span className="text-[11px] font-extrabold text-stone-900">Sobrecarga</span>
        </button>

        <button
          onClick={() => handleStateChange('fatiga')}
          className={`flex-1 py-3 px-2 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
            sensoryState === 'fatiga'
              ? 'bg-rose-200 border-rose-400 ring-2 ring-rose-300 scale-105 shadow-sm'
              : 'bg-stone-100/80 border-stone-200 opacity-70 hover:opacity-100'
          }`}
        >
          <BatteryLow className="w-6 h-6 text-rose-700" />
          <span className="text-[11px] font-extrabold text-stone-900">Batería baja</span>
        </button>
      </div>

      <div className={`border p-4 rounded-2xl text-xs transition-all ${current.color}`}>
        <p className="font-extrabold text-sm mb-1 text-stone-950">{current.title}</p>
        <p className="mb-2 leading-relaxed font-semibold text-stone-900">{current.desc}</p>
        <div className="bg-white/90 p-2.5 rounded-xl font-bold text-[11px] text-stone-950 border border-stone-300">
          {current.action}
        </div>
      </div>
    </section>
  );
};