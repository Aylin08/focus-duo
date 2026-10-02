import React, { useState, useEffect } from 'react';
import { BookOpen, Mic, Heart, CheckCircle2, Trophy, Volume2, Sparkles, Brain, Star } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { usePoints } from '../hooks/usePoints';

interface ReinforcementModuleProps {
  isHighContrast?: boolean;
}

type Category = 'academico' | 'lenguaje' | 'social';

// --- Datos extraídos para facilitar mantenimiento ---
const ACADEMIC_TASKS = [
  {
    id: 'm1',
    category: 'math',
    title: '🔢 Misión: Conteo visual de bloques (1 al 20)',
    speechText: 'Conteo visual de bloques del 1 al 20'
  },
  {
    id: 'm2',
    category: 'math',
    title: '🛒 Misión: Comprar en la tiendita (Sumas sencillas)',
    speechText: 'Comprar en la tiendita'
  },
  {
    id: 'l1',
    category: 'literacy',
    title: '🔤 Diferenciar letras espejo (b, d, p, q)',
    speechText: 'Diferenciar letras espejo'
  },
  {
    id: 'l2',
    category: 'literacy',
    title: '📖 Cuento breve con pictogramas',
    speechText: 'Cuento breve con pictogramas'
  }
];

const SPEECH_EXERCISES = [
  {
    title: 'R / RR',
    description: 'Ejercicios de vibración de lengua',
    speechText: 'Ejercicios de vibración de lengua para la erre',
    colorClass: 'text-indigo-600',
    btnClass: 'bg-indigo-600 text-white'
  },
  {
    title: 'S / Z',
    description: 'Soplo suave y posición dental',
    speechText: 'Soplo suave y posición dental para la ese y zeta',
    colorClass: 'text-amber-600',
    btnClass: 'bg-amber-500 text-stone-950'
  },
  {
    title: 'L / CL',
    description: 'Elevación del ápice lingual',
    speechText: 'Elevación del ápice lingual para la ele',
    colorClass: 'text-emerald-600',
    btnClass: 'bg-emerald-600 text-white'
  }
];

const SOCIAL_STORIES = [
  {
    id: 's1',
    title: '🔊 ¿Qué hago si hay mucho ruido en el recreo o fiesta?',
    steps: '1. Puedo usar mis audífonos de cancelación. 2. Puedo avisar a la maestra que necesito 5 minutos de pausa. 3. Está bien apartarme un momento.',
    speechText: '¿Qué hago si hay mucho ruido en el recreo o fiesta? Uno, puedo usar mis audífonos. Dos, puedo avisar a la maestra que necesito cinco minutos de pausa. Tres, está bien apartarme un momento.'
  },
  {
    id: 's2',
    title: '✏️ ¿Cómo pedir prestado un material a un compañero?',
    steps: '1. Me acerco y digo su nombre. 2. Pregunto: "¿Me prestas tu color, por favor?". 3. Si me dice que no, no pasa nada, le pregunto a alguien más.',
    speechText: '¿Cómo pedir prestado un material? Uno, me acerco y digo su nombre. Dos, pregunto: Me prestas tu color por favor. Tres, si me dice que no, no pasa nada.'
  }
];

export const ReinforcementModule: React.FC<ReinforcementModuleProps> = ({ isHighContrast = false }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('academico');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const { speak } = useSpeech();
  const { points, addPoints, removePoints } = usePoints();

  // Cargar tareas guardadas al montar
  useEffect(() => {
    const savedTasks = localStorage.getItem('aula_reinforcement_tasks');
    if (savedTasks) {
      try {
        setCompletedTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error al cargar tareas de refuerzo:', error);
      }
    }
  }, []);

  // Alternar estado de finalización de una tarea
  const toggleTask = (id: string, text: string) => {
    const isAlreadyCompleted = completedTasks.includes(id);
    const updatedTasks = isAlreadyCompleted
      ? completedTasks.filter(item => item !== id)
      : [...completedTasks, id];

    if (isAlreadyCompleted) {
      removePoints(10);
    } else {
      addPoints(10);
      speak(`¡Excelente! Completaste: ${text}. ¡Ganaste 10 estrellas!`);
    }

    setCompletedTasks(updatedTasks);
    localStorage.setItem('aula_reinforcement_tasks', JSON.stringify(updatedTasks));
  };

  const isCompleted = (id: string) => completedTasks.includes(id);

  // Clases compartidas para tarjetas e inputs
  const cardBgClass = isHighContrast
    ? 'bg-slate-900 border-slate-700 text-white'
    : 'bg-white border-stone-200 text-stone-800';

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      {/* Selector de Categorías & Contador de Estrellas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`p-2 rounded-3xl border flex flex-wrap gap-2 shadow-sm w-full sm:w-auto flex-1 ${cardBgClass}`}>
          <button
            onClick={() => setActiveCategory('academico')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'academico'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Académico</span>
          </button>

          <button
            onClick={() => setActiveCategory('lenguaje')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'lenguaje'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Habla & Lenguaje</span>
          </button>

          <button
            onClick={() => setActiveCategory('social')}
            className={`flex-1 min-w-[130px] py-2.5 px-4 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeCategory === 'social'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Historias Sociales</span>
          </button>
        </div>

        {/* Badge Recompensa de Puntos */}
        <div className="flex items-center gap-2 py-2 px-4 bg-amber-400/20 border border-amber-300 dark:border-amber-500/40 rounded-2xl shadow-sm shrink-0">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
          <div className="text-right">
            <span className="block text-[10px] uppercase font-black text-amber-700 dark:text-amber-400 leading-tight">Estrellas</span>
            <span className="text-lg font-black text-stone-900 dark:text-white leading-none">{points} ⭐</span>
          </div>
        </div>
      </div>

      {/* Categoria: Académico */}
      {activeCategory === 'academico' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Matemáticas Adaptadas */}
          <div className={`p-5 rounded-3xl border shadow-sm ${cardBgClass}`}>
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-indigo-500" />
              <h4 className="font-bold text-sm">Matemáticas Adaptadas</h4>
            </div>
            <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
              Juegos de asociación numérica y lógica cotidiana.
            </p>
            <div className="space-y-2">
              {ACADEMIC_TASKS.filter(t => t.category === 'math').map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id, task.speechText)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                    isCompleted(task.id)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span>{task.title}</span>
                  {isCompleted(task.id) ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">+10 ⭐</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Lectoescritura Divergente */}
          <div className={`p-5 rounded-3xl border shadow-sm ${cardBgClass}`}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h4 className="font-bold text-sm">Lectoescritura Divergente</h4>
            </div>
            <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
              Lectura con apoyo de pictogramas y discriminación visual.
            </p>
            <div className="space-y-2">
              {ACADEMIC_TASKS.filter(t => t.category === 'literacy').map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id, task.speechText)}
                  className={`w-full p-3 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                    isCompleted(task.id)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 line-through'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span>{task.title}</span>
                  {isCompleted(task.id) ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="text-[10px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">+10 ⭐</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Categoria: Lenguaje */}
      {activeCategory === 'lenguaje' && (
        <div className={`p-5 rounded-3xl border shadow-sm ${cardBgClass}`}>
          <h4 className="font-bold text-base flex items-center gap-2 mb-1">
            <Mic className="w-5 h-5 text-indigo-500" /> Terapia de Habla & Articulación
          </h4>
          <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
            Ejercicios breves de modulación, praxias y articulación de fonemas difíciles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SPEECH_EXERCISES.map((exercise, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 dark:bg-slate-800 dark:border-slate-700 text-center flex flex-col justify-between">
                <div>
                  <span className={`text-2xl font-black block mb-1 ${exercise.colorClass}`}>
                    {exercise.title}
                  </span>
                  <p className="text-xs text-stone-600 dark:text-slate-300 font-medium mb-3">
                    {exercise.description}
                  </p>
                </div>
                <button
                  onClick={() => speak(exercise.speechText)}
                  className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${exercise.btnClass}`}
                >
                  <Volume2 className="w-3.5 h-3.5" /> Escuchar y Practicar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categoria: Historias Sociales */}
      {activeCategory === 'social' && (
        <div className={`p-5 rounded-3xl border shadow-sm ${cardBgClass}`}>
          <h4 className="font-bold text-base mb-1 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Historias Sociales & Autorregulación
          </h4>
          <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">
            Guías visuales sobre cómo actuar en entornos comunes para reducir la ansiedad.
          </p>

          <div className="space-y-3">
            {SOCIAL_STORIES.map(story => (
              <div key={story.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 dark:bg-slate-800 dark:border-slate-700 flex justify-between items-start gap-3">
                <div>
                  <h5 className="font-bold text-xs text-stone-900 dark:text-white">{story.title}</h5>
                  <p className="text-xs text-stone-600 dark:text-slate-300 mt-1">{story.steps}</p>
                </div>
                <button
                  onClick={() => speak(story.speechText)}
                  className="p-2 rounded-xl bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 cursor-pointer shrink-0"
                  aria-label="Escuchar historia social"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen de Logros */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${
        isHighContrast ? 'bg-slate-800 border-slate-700' : 'bg-amber-400/20 border-amber-300'
      }`}>
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-amber-500" />
          <div>
            <h5 className="font-bold text-xs">¡Tus Logros de Hoy!</h5>
            <p className="text-xs text-stone-600 dark:text-slate-300">
              Has completado {completedTasks.length} misiones y acumulado {completedTasks.length * 10} estrellas en esta sección.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};