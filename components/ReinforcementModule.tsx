'use client';

import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Category, CustomAssignment } from '@/types/reinforcement';
import { useUser } from '@/context/UserContext';
import { useReinforcementTasks } from '../hooks/useReinforcementTasks';
import { TherapistPanel } from './TherapistPanel';
import { CategoryTabs } from './CategoryTabs';
import { TaskCard } from './TaskCard';

interface ReinforcementModuleProps {
  isHighContrast?: boolean;
}

export const ReinforcementModule: React.FC<ReinforcementModuleProps> = ({ isHighContrast = false }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('academico');
  const { currentUser } = useUser();
  const isTherapist = currentUser?.role === 'terapeuta';

  const { assignments, completedTasks, points, toggleTask, addAssignment, deleteAssignment } = useReinforcementTasks();

  const cardBgClass = isHighContrast
    ? 'bg-slate-900 border-slate-700 text-white'
    : 'bg-white border-stone-200 text-stone-800';

  const categoryAssignments = assignments.filter((a) => a.category === activeCategory);

  const groupedSubjects = categoryAssignments.reduce((acc, curr) => {
    if (!acc[curr.subject]) acc[curr.subject] = [];
    acc[curr.subject].push(curr);
    return acc;
  }, {} as Record<string, CustomAssignment[]>);

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      {/* Panel Terapéutico */}
      {isTherapist && (
        <TherapistPanel
          cardBgClass={cardBgClass}
          onAdd={addAssignment}
          onSelectCategory={setActiveCategory}
        />
      )}

      {/* Navegación por Categorías */}
      <CategoryTabs
        activeCategory={activeCategory}
        cardBgClass={cardBgClass}
        points={points}
        onSelectCategory={setActiveCategory}
      />

      {/* Lista de Actividades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.keys(groupedSubjects).length === 0 ? (
          <div className="col-span-2 p-8 text-center text-xs text-stone-400 border border-dashed rounded-2xl">
            No hay tareas asignadas para esta categoría.
          </div>
        ) : (
          Object.entries(groupedSubjects).map(([subject, list]) => (
            <div key={subject} className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white">{subject}</h4>

              <div className="space-y-2.5">
                {list.map((item) => (
                  <TaskCard
                    key={item.id}
                    item={item}
                    isCompleted={completedTasks.includes(item.id)}
                    activeCategory={activeCategory}
                    isTherapist={isTherapist}
                    onToggle={toggleTask}
                    onDelete={deleteAssignment}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resumen de Logros */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between ${isHighContrast ? 'bg-slate-800 border-slate-700' : 'bg-amber-400/20 border-amber-300'}`}>
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-amber-500 shrink-0" />
          <div>
            <h5 className="font-bold text-xs">¡Tus Logros de Hoy!</h5>
            <p className="text-xs text-stone-600 dark:text-slate-300">
              Has completado {completedTasks.length} misiones y ganado {completedTasks.length * 10} estrellas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};