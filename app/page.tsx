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
import { SensorTimer } from '../components/SensorTimer'; // 1. Importación agregada

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState('1er-grado');
  
  // Estados de Accesibilidad
  const [isDyslexic, setIsDyslexic] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const savedGrade = localStorage.getItem('aula_selectedGrade');
    if (savedGrade && (GRADE_DATA as Record<string, any>)[savedGrade]) {
      setSelectedGrade(savedGrade);
    }
  }, []);

  const handleSelectGrade = (gradeKey: string) => {
    setSelectedGrade(gradeKey);
    localStorage.setItem('aula_selectedGrade', gradeKey);
  };

  const handleToggleTask = (taskId: string | number) => {
    console.log('Tarea conmutada:', taskId);
  };

  const currentGradeInfo: any = (GRADE_DATA as Record<string, any>)[selectedGrade] || {};

  return (
    <main 
      className={`min-h-screen p-4 sm:p-6 transition-colors duration-300 ${
        isHighContrast 
          ? 'high-contrast bg-slate-950 text-white' 
          : 'bg-[#f7f5f0] text-stone-800'
      } ${isDyslexic ? 'dyslexia-font' : 'font-sans'} ${reduceMotion ? 'reduce-motion' : ''}`}
    >
      {/* Encabezado */}
      <Header />

      {/* Barra de Accesibilidad */}
      <AccessibilityToolbar
        isDyslexic={isDyslexic}
        setIsDyslexic={setIsDyslexic}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        isReducedMotion={reduceMotion}
        setIsReducedMotion={setReduceMotion}
      />

      {/* Selector de Grados */}
      <GradeSelector
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
      />

      {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto space-y-5 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          <GradeInfoCard
            gradeInfo={currentGradeInfo}
            studentStatus="En jornada escolar / sesión 📚"
          />
          <HealthTracker isHighContrast={isHighContrast} />
          <SensoryTrafficLight isHighContrast={isHighContrast} />
          
          {/* 2. Temporizador Sensorial agregado en la grilla */}
          <SensorTimer isHighContrast={isHighContrast} />

          <TaskList 
            gradeTitle={currentGradeInfo?.label || selectedGrade} 
            tasks={currentGradeInfo?.tasks || currentGradeInfo?.rutina}
            onToggleTask={handleToggleTask}
          />
        </div>

        {/* Apoyos Visuales */}
        <div className="w-full">
          <VisualSupports isHighContrast={isHighContrast} />
        </div>
      </div>
    </main>
  );
}