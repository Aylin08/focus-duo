'use client';

import React, { useState } from 'react';
import { ClipboardList, Check } from 'lucide-react';

interface TaskListProps {
  gradeTitle?: string;
  tasks?: any[];
  onToggleTask?: (id: any) => void;
  isHighContrast?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  gradeTitle = 'Grado Seleccionado',
  tasks,
  onToggleTask,
  isHighContrast = false,
}) => {
  const defaultTasks = [
    { id: 1, label: 'Resolución de problemas con apoyos gráficos', completed: false },
    { id: 2, label: 'Actividad de expresión emocional / semáforo', completed: false },
    { id: 3, label: 'Toma de agua/electrolitos antes del recreo', completed: false },
  ];

  const listToRender = Array.isArray(tasks) && tasks.length > 0 ? tasks : defaultTasks;

  // Estado interno para alternar la selección localmente si no hay manejador global
  const [localCompleted, setLocalCompleted] = useState<Record<string | number, boolean>>({});

  const handleTaskClick = (taskId: any, currentCompleted: boolean) => {
    // Si la página principal envió la función onToggleTask, la ejecutamos
    if (onToggleTask) {
      onToggleTask(taskId);
    }
    
    // Cambiamos el estado local para asegurar que se marque visualmente
    setLocalCompleted((prev) => ({
      ...prev,
      [taskId]: !(prev[taskId] ?? currentCompleted),
    }));
  };

  return (
    <section 
      className={`h-full border rounded-3xl p-5 shadow-sm flex flex-col justify-between transition-colors ${
        isHighContrast 
          ? 'bg-slate-900 border-slate-700 text-white' 
          : 'bg-white/90 border-stone-200/80 text-stone-800'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-lg font-bold ${isHighContrast ? 'text-white' : 'text-stone-800'}`}>
              Rutina del Día ({gradeTitle})
            </h2>
            <p className={`text-xs mt-0.5 ${isHighContrast ? 'text-slate-400' : 'text-stone-500'}`}>
              Actividades pedagógicas y terapéuticas sugeridas
            </p>
          </div>
          <ClipboardList className={`w-6 h-6 shrink-0 ${isHighContrast ? 'text-amber-400' : 'text-amber-600'}`} />
        </div>

        <div className="space-y-2.5">
          {listToRender.map((task: any, index: number) => {
            const taskId = task?.id ?? index;
            const taskText =
              typeof task === 'string'
                ? task
                : task?.label || task?.title || task?.text || task?.activity || `Tarea ${index + 1}`;
            
            // Determina si está completada evaluando el estado local o la prop recibida
            const initialCompleted = Boolean(task?.completed);
            const isCompleted = localCompleted[taskId] ?? initialCompleted;

            return (
              <div
                key={taskId}
                onClick={() => handleTaskClick(taskId, initialCompleted)}
                className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isCompleted
                    ? isHighContrast ? 'bg-emerald-950/60 border-emerald-700' : 'bg-emerald-50/80 border-emerald-300'
                    : isHighContrast ? 'bg-slate-800/80 border-slate-700 hover:border-amber-400' : 'bg-stone-50/80 border-stone-200/80 hover:border-amber-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isHighContrast ? 'border-slate-500 bg-slate-700' : 'border-stone-400 bg-white'
                  }`}
                >
                  {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3] text-white" />}
                </div>

                <span
                  className={`text-sm font-bold transition-colors ${
                    isCompleted
                      ? isHighContrast 
                        ? 'line-through text-emerald-400/80' 
                        : 'line-through text-stone-400'
                      : isHighContrast ? 'text-slate-100' : 'text-stone-800'
                  }`}
                >
                  {taskText}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};