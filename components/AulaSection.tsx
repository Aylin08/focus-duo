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
import { Student } from '../types/user';

interface AulaSectionProps {
  selectedGrade: string;
  onSelectGrade: (grade: string) => void;
  currentGradeInfo: any;
  activeStudent: Student | null;
  isHighContrast: boolean;
  onToggleTask: (taskId: string | number) => void;
}

export const AulaSection: React.FC<AulaSectionProps> = ({
  selectedGrade,
  onSelectGrade,
  currentGradeInfo,
  activeStudent,
  isHighContrast,
  onToggleTask,
}) => {
  return (
    <>
      <GradeSelector
        selectedGrade={selectedGrade}
        onSelectGrade={onSelectGrade}
      />

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