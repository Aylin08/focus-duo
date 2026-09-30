import React from 'react';
import { School, ClipboardList } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-stone-200">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">
            Aula con Corazón
          </h1>
          <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-100 border border-emerald-300 text-emerald-950 px-3 py-1 rounded-full font-bold">
            <School className="w-3.5 h-3.5 text-emerald-700" />
            Escuela Primaria & Terapias
          </span>
        </div>
        <p className="text-xs text-stone-600 mt-1 font-medium">
          Plataforma de acompañamiento por grados y cuidado neuroafirmativo
        </p>
      </div>
      <button className="inline-flex items-center gap-2 bg-amber-200 hover:bg-amber-300 text-stone-950 border border-amber-400 px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer">
        <ClipboardList className="w-4 h-4 text-stone-800" />
        Inscripciones & Valoraciones
      </button>
    </header>
  );
};