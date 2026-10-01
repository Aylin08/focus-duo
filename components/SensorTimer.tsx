'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Bell } from 'lucide-react';

interface SensorTimerProps {
  isHighContrast?: boolean;
}

export const SensorTimer: React.FC<SensorTimerProps> = ({
  isHighContrast = false,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60); // 15 minutos por defecto
  const [isActive, setIsActive] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<number>(15 * 60);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      // Notificación sonora suave al terminar
      if ('speechSynthesis' in window) {
        const text = mode === 'work' ? 'Tiempo de descanso iniciado' : 'Tiempo de enfoque completado';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(initialTime);
  };

  const setPreset = (minutes: number, timerMode: 'work' | 'break') => {
    const totalSecs = minutes * 60;
    setMode(timerMode);
    setInitialTime(totalSecs);
    setSecondsLeft(totalSecs);
    setIsActive(false);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Cálculo de porcentaje para la barra visual
  const percentage = Math.max(0, Math.min(100, (secondsLeft / initialTime) * 100));

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
            Temporizador Visual & Estructura
          </h2>
          <p className={`text-xs ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
            Gestión de bloques de trabajo y pausas de descompresión
          </p>
        </div>
        <Timer className={`w-5 h-5 ${isHighContrast ? 'text-amber-400' : 'text-amber-500'}`} />
      </div>

      {/* Selector de Presets */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setPreset(10, 'work')}
          className={`py-1.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
            initialTime === 10 * 60 && mode === 'work'
              ? 'bg-amber-400 text-stone-950 font-extrabold'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          🎯 10 min Enfoque
        </button>
        <button
          onClick={() => setPreset(20, 'work')}
          className={`py-1.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
            initialTime === 20 * 60 && mode === 'work'
              ? 'bg-amber-400 text-stone-950 font-extrabold'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          🧠 20 min Enfoque
        </button>
        <button
          onClick={() => setPreset(5, 'break')}
          className={`py-1.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
            initialTime === 5 * 60 && mode === 'break'
              ? 'bg-teal-400 text-stone-950 font-extrabold'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
        >
          ☕ 5 min Pausa
        </button>
      </div>

      {/* Pantalla del Reloj */}
      <div
        className={`p-5 rounded-2xl border text-center relative overflow-hidden transition-all ${
          mode === 'work'
            ? 'bg-amber-50/50 border-amber-200/80'
            : 'bg-teal-50/50 border-teal-200/80'
        }`}
      >
        {/* Barra de progreso de fondo */}
        <div
          className={`absolute bottom-0 left-0 top-0 opacity-15 transition-all duration-1000 ${
            mode === 'work' ? 'bg-amber-500' : 'bg-teal-500'
          }`}
          style={{ width: `${percentage}%` }}
        />

        <div className="relative z-10">
          <p className="text-4xl font-extrabold tracking-tight text-stone-900 mb-2">
            {formatTime(secondsLeft)}
          </p>

          <div className="flex justify-center items-center gap-2">
            <button
              onClick={toggleTimer}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-stone-800 text-white hover:bg-stone-900'
                  : mode === 'work'
                  ? 'bg-amber-400 hover:bg-amber-500 text-stone-950'
                  : 'bg-teal-500 hover:bg-teal-600 text-white'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4" /> Pausar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Iniciar
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              title="Reiniciar"
              className="p-2 rounded-xl bg-stone-200/80 hover:bg-stone-300/80 text-stone-700 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};