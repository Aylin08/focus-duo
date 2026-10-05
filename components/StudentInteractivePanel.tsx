'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import { AlertCircle, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export const StudentInteractivePanel: React.FC = () => {
  const { currentUser, selectedStudent, addAlert } = useUser();

  // Solo se renderiza si el usuario conectado es el Estudiante
  if (currentUser.role !== 'estudiante') return null;

  const handleSendSignal = (
    type: 'routine_completed' | 'pictogram_used' | 'semaphore_signal' | 'sensorial_calm',
    message: string
  ) => {
    addAlert({
      studentId: selectedStudent?.id || 's1',
      studentName: selectedStudent?.name || 'Estudiante',
      type,
      message,
    });
  };

  return (
    <div className="bg-amber-50/60 dark:bg-slate-900 border border-amber-200/80 dark:border-slate-800 rounded-3xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-400 text-slate-950 rounded-2xl font-black text-xl">
          ⭐
        </div>
        <div>
          <h2 className="text-xl font-black text-stone-900 dark:text-white">
            ¡Hola, {selectedStudent?.name || 'Estudiante'}!
          </h2>
          <p className="text-xs font-medium text-stone-600 dark:text-slate-400">
            ¿Cómo te sientes hoy? Usa tus herramientas cuando lo necesites.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Botón Semáforo Sensorial: Pedir Pausa */}
        <button
          onClick={() =>
            handleSendSignal(
              'semaphore_signal',
              'ha activado el Semáforo Sensorial (solicita una pausa/descanso).'
            )
          }
          className="p-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer active:scale-95"
        >
          <AlertCircle className="w-5 h-5" />
          Necesito un Descanso 🛑
        </button>

        {/* Botón Pictograma de Apoyo */}
        <button
          onClick={() =>
            handleSendSignal(
              'pictogram_used',
              'ha seleccionado un pictograma de apoyo visual.'
            )
          }
          className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer active:scale-95"
        >
          <MessageSquare className="w-5 h-5" />
          Usar Pictograma 🗣️
        </button>

        {/* Botón Terminar Rutina */}
        <button
          onClick={() =>
            handleSendSignal(
              'routine_completed',
              'ha completado la rutina/actividad asignada.'
            )
          }
          className="p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer active:scale-95"
        >
          <CheckCircle2 className="w-5 h-5" />
          ¡Terminé mi Rutina! 🎉
        </button>
      </div>
    </div>
  );
};