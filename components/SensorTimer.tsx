'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Brain, Coffee, Target } from 'lucide-react';

interface SensorTimerProps {
  isHighContrast?: boolean;
}

export const SensorTimer: React.FC<SensorTimerProps> = ({ isHighContrast = false }) => {
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Reproducir un tono suave (cuenco tibetano/campana) al terminar
  const playCompletionSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, audioCtx.currentTime); // Frecuencia armónica 432Hz
      osc.frequency.exponentialRampToValueAtTime(216, audioCtx.currentTime + 1.5);

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
      console.error("Audio error:", e);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
      playCompletionSound();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const setTimerMinutes = (minutes: number) => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(minutes * 60);
  };

  const toggleTimer = () => {
    if (timeLeft === 0) setTimeLeft(15 * 60);
    setIsFinished(false);
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section
      className={`border rounded-3xl p-5 shadow-sm transition-all h-full flex flex-col justify-between ${
        isFinished
          ? 'animate-pulse ring-4 ring-amber-400/50 border-amber-400'
          : ''
      } ${
        isHighContrast
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white/90 border-stone-200/80 text-stone-800'
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className={`text-base font-bold ${isHighContrast ? 'text-white' : 'text-stone-800'}`}>
              Temporizador Visual & Estructura
            </h3>
            <p className={`text-xs ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
              Gestión de bloques de trabajo y pausas de descompresión
            </p>
          </div>
          <Timer className={`w-5 h-5 ${isHighContrast ? 'text-amber-400' : 'text-amber-500'}`} />
        </div>

        {/* Accesos rápidos */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setTimerMinutes(10)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
              isHighContrast
                ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-rose-500" /> 10 min Enfoque
          </button>
          <button
            type="button"
            onClick={() => setTimerMinutes(20)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
              isHighContrast
                ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-500" /> 20 min Enfoque
          </button>
          <button
            type="button"
            onClick={() => setTimerMinutes(5)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap ${
              isHighContrast
                ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-emerald-500" /> 5 min Pausa
          </button>
        </div>

        {/* Display del Temporizador */}
        <div className={`p-4 rounded-2xl border text-center transition-all ${
          isHighContrast
            ? 'bg-slate-800 border-slate-700'
            : 'bg-amber-50/60 border-amber-200/80'
        }`}>
          <div className="text-4xl font-extrabold tracking-tight mb-3 font-mono">
            {formatTime(timeLeft)}
          </div>

          <div className="flex justify-center items-center gap-2">
            <button
              type="button"
              onClick={toggleTimer}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isRunning
                  ? 'bg-slate-800 text-white hover:bg-slate-900'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              {isRunning ? 'Pausar' : 'Iniciar'}
            </button>

            <button
              type="button"
              onClick={resetTimer}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isHighContrast
                  ? 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
              title="Reiniciar temporizador"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};