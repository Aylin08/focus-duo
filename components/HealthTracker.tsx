import React, { useState, useEffect } from 'react';
import { HeartPulse, Droplet, Wind } from 'lucide-react';

export const HealthTracker: React.FC = () => {
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhala' | 'Sostén' | 'Exhala' | 'Listo'>('Listo');

  useEffect(() => {
    const savedGlasses = localStorage.getItem('aula_waterGlasses');
    if (savedGlasses !== null) {
      setWaterGlasses(Number(savedGlasses));
    }
  }, []);

  const handleAddWater = () => {
    const newCount = waterGlasses + 1;
    setWaterGlasses(newCount);
    localStorage.setItem('aula_waterGlasses', newCount.toString());
  };

  const handleResetWater = () => {
    setWaterGlasses(0);
    localStorage.setItem('aula_waterGlasses', '0');
  };

  useEffect(() => {
    if (isBreathing) {
      setBreathPhase('Inhala');
      
      const timer1 = setTimeout(() => setBreathPhase('Sostén'), 4000);
      const timer2 = setTimeout(() => setBreathPhase('Exhala'), 8000);
      const timer3 = setTimeout(() => {
        setBreathPhase('Listo');
        setIsBreathing(false);
      }, 12000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isBreathing]);

  return (
    <section className="bg-white/90 border border-stone-200/80 rounded-3xl p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-bold text-stone-800">Salud, Hidratación & Calma</h2>
          <p className="text-xs text-stone-500 font-medium">Prevención de fatiga, disautonomía y autorregulación</p>
        </div>
        <HeartPulse className="w-6 h-6 text-rose-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Registro de Hidratación */}
        <div className="bg-amber-50/90 border border-amber-200/70 p-4 rounded-2xl flex flex-col justify-between items-center text-center">
          <div className="w-full flex justify-between items-center">
            <p className="text-xs font-semibold text-stone-700">Toma de Agua / Electrolitos</p>
            {waterGlasses > 0 && (
              <button
                onClick={handleResetWater}
                className="text-[10px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <div className="my-2 flex flex-col items-center">
            <Droplet className="w-8 h-8 text-cyan-600 mb-1" />
            <p className="text-sm font-extrabold text-stone-900">{waterGlasses} Vasos Registrados</p>
          </div>
          <button
            onClick={handleAddWater}
            className="w-full bg-stone-200 hover:bg-stone-300 text-stone-900 font-bold text-lg rounded-xl py-1 border border-stone-300 transition shadow-xs cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Pausa de Respiración Guiada */}
        <div className="bg-stone-50/90 border border-stone-200/80 p-4 rounded-2xl flex flex-col justify-between items-center text-center">
          <p className="text-xs font-semibold text-stone-700">Respiración Vagal Guiada</p>
          
          <div className="my-2 flex flex-col items-center justify-center min-h-[85px]">
            <div
              className={`w-12 h-12 rounded-full border-2 border-teal-500 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                breathPhase === 'Inhala'
                  ? 'scale-125 bg-teal-300/90 shadow-md shadow-teal-200'
                  : breathPhase === 'Sostén'
                  ? 'scale-125 bg-teal-200/90 animate-pulse'
                  : breathPhase === 'Exhala'
                  ? 'scale-90 bg-teal-100/60'
                  : 'bg-teal-100/40'
              }`}
            >
              <Wind className="w-6 h-6 text-teal-700" />
            </div>
            <p className="text-xs font-bold text-teal-950 mt-2">
              {isBreathing ? `${breathPhase}...` : 'Pausa de 12 segundos'}
            </p>
          </div>

          <button
            onClick={() => setIsBreathing(true)}
            disabled={isBreathing}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              isBreathing
                ? 'bg-teal-200 text-teal-900 border border-teal-300 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            {isBreathing ? 'En proceso...' : 'Iniciar Respiración'}
          </button>
        </div>
      </div>
    </section>
  );
};