import React, { useState } from 'react';

export const VisualSupports: React.FC = () => {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const pictograms = [
    {
      id: 'break',
      label: 'Pausa',
      icon: '⏸️',
      message: 'Solicito un descanso breve para autorregularme.',
      btnBg: 'bg-amber-200 hover:bg-amber-300 border-amber-400',
    },
    {
      id: 'headphones',
      label: 'Audífonos',
      icon: '🎧',
      message: 'Necesito aislamiento auditivo / audífonos.',
      btnBg: 'bg-indigo-200 hover:bg-indigo-300 border-indigo-400',
    },
    {
      id: 'water',
      label: 'Agua / Sed',
      icon: '💧',
      message: 'Necesito tomar agua o electrolitos.',
      btnBg: 'bg-cyan-200 hover:bg-cyan-300 border-cyan-400',
    },
    {
      id: 'walk',
      label: 'Movimiento',
      icon: '🚶‍♂️',
      message: 'Necesito una pausa activa de movimiento motor.',
      btnBg: 'bg-emerald-200 hover:bg-emerald-300 border-emerald-400',
    },
    {
      id: 'light',
      label: 'Mucha Luz',
      icon: '🕶️',
      message: 'La luz ambiental me causa molestia visual.',
      btnBg: 'bg-yellow-200 hover:bg-yellow-300 border-yellow-400',
    },
    {
      id: 'help',
      label: 'Ayuda',
      icon: '🙋‍♀️',
      message: 'Necesito apoyo o acompañamiento en la tarea.',
      btnBg: 'bg-purple-200 hover:bg-purple-300 border-purple-400',
    },
  ];

  return (
    <section className="bg-white/90 border border-stone-200/80 rounded-3xl p-5 shadow-sm md:col-span-2">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-lg font-bold text-stone-800">
            Apoyos Visuales & Comunicación Rápida (AAC)
          </h2>
          <p className="text-xs text-stone-500">
            Selecciona un pictograma para expresar tu necesidad actual sin esfuerzo verbal
          </p>
        </div>
        <span className="text-2xl">🗣️</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 my-3">
        {pictograms.map((pic) => (
          <button
            key={pic.id}
            onClick={() => setActiveMessage(pic.message)}
            className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 ${pic.btnBg}`}
          >
            <span className="text-2xl">{pic.icon}</span>
            <span className="text-xs font-extrabold text-stone-950 text-center">
              {pic.label}
            </span>
          </button>
        ))}
      </div>

      {activeMessage ? (
        <div className="bg-stone-900 text-white p-3.5 rounded-2xl text-xs flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-base">📢</span>
            <p className="font-bold text-stone-100">{activeMessage}</p>
          </div>
          <button
            onClick={() => setActiveMessage(null)}
            className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition"
          >
            Entendido ✓
          </button>
        </div>
      ) : (
        <p className="text-[11px] text-stone-400 text-center mt-1">
          Toca cualquier pictograma para transmitir la necesidad a la docente o terapeuta.
        </p>
      )}
    </section>
  );
};