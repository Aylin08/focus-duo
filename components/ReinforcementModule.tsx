'use client';

import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { Category, CustomAssignment } from '@/types/reinforcement';
import { UserProfile, Student } from '@/types/user';
import { useReinforcementTasks } from '../hooks/useReinforcementTasks';
import { TherapistPanel } from './TherapistPanel';
import { CategoryTabs } from './CategoryTabs';
import { TaskCard } from './TaskCard';

interface ReinforcementModuleProps {
  isHighContrast?: boolean;
  user?: UserProfile | null;
  activeStudent?: Student | null;
}

export const ReinforcementModule: React.FC<ReinforcementModuleProps> = ({
  isHighContrast = false,
  user,
  activeStudent,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('academico');

  // Permite gestión tanto a Docentes como a Terapeutas según la prop user
  const canManageTasks = user?.role === 'docente' || user?.role === 'terapeuta';
  const isStudent = user?.role === 'estudiante';

  const { assignments, completedTasks, points, toggleTask, addAssignment, deleteAssignment } = useReinforcementTasks();

  const cardBgClass = isHighContrast
    ? 'bg-slate-900 border-slate-700 text-white'
    : 'bg-white border-stone-200 text-stone-800';

  // Filtrar asignaciones por categoría y por destinatario (Grupo / Alumno)
  const categoryAssignments = assignments.filter((a) => {
    if (a.category !== activeCategory) return false;

    // Si es ESTUDIANTE: solo ve tareas para su grado (general) o dirigidas a su ID (individual)
    if (isStudent) {
      const isMyGrade = user?.grade ? a.grade === user.grade : true;
      const isForMe = a.assignmentType === 'general' || a.studentId === user?.id;
      return isMyGrade && isForMe;
    }

    // Si el Docente/Terapeuta seleccionó un alumno activo en sesión
    if (activeStudent) {
      const isForActiveStudent = a.assignmentType === 'general' || a.studentId === activeStudent.id;
      return (a.grade === activeStudent.grade || !a.grade) && isForActiveStudent;
    }

    return true;
  });

  const groupedSubjects = categoryAssignments.reduce((acc, curr) => {
    const subjectKey = curr.subject || 'Refuerzo General';
    if (!acc[subjectKey]) acc[subjectKey] = [];
    acc[subjectKey].push(curr);
    return acc;
  }, {} as Record<string, CustomAssignment[]>);

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      {/* Panel de Gestión (Docente y Terapeuta) */}
      {canManageTasks && (
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
                    isTherapist={canManageTasks}
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