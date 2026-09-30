'use client';

import React, { useState, useEffect } from 'react';
import { GRADE_DATA } from '../data/gradesData';
import { Header } from '../components/Header';
import { AccessibilityToolbar } from '../components/AccessibilityToolbar';
import { GradeSelector } from '../components/GradeSelector';
import { GradeInfoCard } from '../components/GradeInfoCard';
import { HealthTracker } from '../components/HealthTracker';
import { SensoryTrafficLight } from '../components/SensoryTrafficLight';
import { VisualSupports } from '../components/VisualSupports';
import { TaskList } from '../components/TaskList';

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState('1er-grado');
  
  // Estados de Accesibilidad
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Cargar grado guardado al iniciar
  useEffect(() => {
    const savedGrade = localStorage.getItem('aula_selectedGrade');
    if (savedGrade && GRADE_DATA[savedGrade]) {
      setSelectedGrade(savedGrade);
    }
  }, []);

  // Guardar grado cuando cambie
  const handleSelectGrade = (gradeKey: string) => {
    setSelectedGrade(gradeKey);
    localStorage.setItem('aula_selectedGrade', gradeKey);
  };

  const currentGradeInfo = GRADE_DATA[selectedGrade];

  const accessibilityClasses = [
    'min-h-screen p-4 sm:p-6 transition-colors duration-300',
    isHighContrast ? 'high-contrast' : 'bg-[#f7f5f0] text-stone-800',
    isDyslexic ? 'dyslexia-font' : 'font-sans',
    reduceMotion ? 'reduce-motion' : '',
  ].join(' ');

  return (
    <main className={accessibilityClasses}>
      {/* Encabezado */}
      <Header />

      {/* Barra de Accesibilidad */}
      <AccessibilityToolbar
        isDyslexic={isDyslexic}
        setIsDyslexic={setIsDyslexic}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        reduceMotion={reduceMotion}
        setReduceMotion={setReduceMotion}
      />

      {/* Selector de Grados */}
      <GradeSelector
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
      />

      {/* Grid Principal */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <GradeInfoCard
          gradeInfo={currentGradeInfo}
          studentStatus="En jornada escolar / sesión 📚"
        />
        <HealthTracker />
        <SensoryTrafficLight />
        <VisualSupports />
        <TaskList
          gradeLabel={currentGradeInfo.label}
          tasks={currentGradeInfo.tasks}
        />
      </div>
    </main>
  );
}