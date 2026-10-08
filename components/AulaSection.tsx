// components/AulaSection.tsx
import React from 'react';
import { GradeSelector } from './GradeSelector';
import { GradeInfoCard } from './GradeInfoCard';
import { HealthTracker } from './HealthTracker';
import { SensoryTrafficLight } from './SensoryTrafficLight';
import { SensorTimer } from './SensorTimer';
import { TaskList } from './TaskList';
import { SensoryCalmModule } from '@/components/SensoryCalmModule';
import { VisualSupports } from './VisualSupports';
import { Student, UserRole } from '../types/user';
import { GraduationCap } from 'lucide-react';

interface AulaSectionProps {
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
  currentGradeInfo: any;
  activeStudent: Student | null;
  isHighContrast: boolean;
  onToggleTask: (taskId: string | number) => void;
  userRole?: UserRole; // 👈 Agregado para detectar el rol del usuario
}

export const AulaSection: React.FC<AulaSectionProps> = ({
  selectedGrade,
  onSelectGrade,
  currentGradeInfo,
  activeStudent,
  isHighContrast,
  onToggleTask,
  userRole,
}) => {
  const isStudent = userRole === 'estudiante';

  return (
    <>
      {/* Si es estudiante, muestra su grado fijo; de lo contrario, muestra el selector */}
      {isStudent ? (
        <div className="max-w-4xl mx-auto mb-4">
          <div
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              isHighContrast
                ? 'bg-slate-900 border-amber-400 text-white'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider opacity-75 block">
                  Tu Nivel Educativo Asignado
                </span>
                <h3 className="text-lg font-bold">
                  {currentGradeInfo?.label || selectedGrade}
                </h3>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-emerald-200/60 text-emerald-800 rounded-full">
              Grado Fijo
            </span>
          </div>
        </div>
      ) : (
        <GradeSelector
          selectedGrade={selectedGrade}
          onSelectGrade={onSelectGrade}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-5 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          <GradeInfoCard
            gradeInfo={currentGradeInfo}
            studentStatus={
              activeStudent
                ? `Sesión activa con ${activeStudent.name} 📚`
                : 'En jornada escolar 📚'
            }
          />
          <HealthTracker isHighContrast={isHighContrast} />
          <SensoryTrafficLight isHighContrast={isHighContrast} />
          <SensorTimer isHighContrast={isHighContrast} />

          <TaskList
            gradeTitle={currentGradeInfo?.label || selectedGrade}
            tasks={currentGradeInfo?.tasks || currentGradeInfo?.rutina}
            onToggleTask={onToggleTask}
            isHighContrast={isHighContrast}
          />

          <SensoryCalmModule isHighContrast={isHighContrast} />
        </div>

        <div className="w-full">
          <VisualSupports isHighContrast={isHighContrast} />
        </div>
      </div>
    </>
  );
};