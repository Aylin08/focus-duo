'use client';

import React, { useState, useEffect } from 'react';
import { RoutineItem, MemoryItem } from '@/types/home';
import { HomeRoutines } from './home/HomeRoutines';
import { AntiForgotList } from './home/AntiForgotList';
import { SosLocation } from './home/SosLocation';

interface HomeModuleProps {
  isHighContrast?: boolean;
}

const DEFAULT_MEMORY: MemoryItem[] = [
  { id: '1', name: 'Mochila y tareas', checked: false },
  { id: '2', name: 'Lonchera / Agua', checked: false },
  { id: '3', name: 'Llaves de casa', checked: false },
  { id: '4', name: 'Credencial / Cartera', checked: false },
];

const DEFAULT_ROUTINES: RoutineItem[] = [
  { id: 'r1', text: 'Lavarse la cara y dientes', completed: false, timeOfDay: 'manana' },
  { id: 'r2', text: 'Vestirse con ropa cómoda', completed: false, timeOfDay: 'manana' },
  { id: 'r3', text: 'Tomar desayuno', completed: false, timeOfDay: 'manana' },
  { id: 'r4', text: 'Hacer tareas / Refuerzo 20 min', completed: false, timeOfDay: 'tarde' },
  { id: 'r5', text: 'Guardar materiales en la mochila', completed: false, timeOfDay: 'tarde' },
  { id: 'r6', text: 'Pijama y cepillado nocturno', completed: false, timeOfDay: 'noche' },
  { id: 'r7', text: 'Dejar ropa lista para mañana', completed: false, timeOfDay: 'noche' },
];

export const HomeModule: React.FC<HomeModuleProps> = ({ isHighContrast = false }) => {
  const [memoryList, setMemoryList] = useState<MemoryItem[]>(DEFAULT_MEMORY);
  const [routines, setRoutines] = useState<RoutineItem[]>(DEFAULT_ROUTINES);

  useEffect(() => {
    const savedMemory = localStorage.getItem('aula_home_memory');
    const savedRoutines = localStorage.getItem('aula_home_routines');
    if (savedMemory) setMemoryList(JSON.parse(savedMemory));
    if (savedRoutines) setRoutines(JSON.parse(savedRoutines));
  }, []);

  // Handlers para Rutinas
  const toggleRoutineItem = (id: string) => {
    const updated = routines.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item));
    setRoutines(updated);
    localStorage.setItem('aula_home_routines', JSON.stringify(updated));
  };

  const addRoutineItem = (text: string, timeOfDay: 'manana' | 'tarde' | 'noche') => {
    const updated = [...routines, { id: Date.now().toString(), text, completed: false, timeOfDay }];
    setRoutines(updated);
    localStorage.setItem('aula_home_routines', JSON.stringify(updated));
  };

  const deleteRoutineItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = routines.filter((item) => item.id !== id);
    setRoutines(updated);
    localStorage.setItem('aula_home_routines', JSON.stringify(updated));
  };

  // Handlers para Lista Anti-Olvidos
  const toggleMemoryItem = (id: string) => {
    const updated = memoryList.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    setMemoryList(updated);
    localStorage.setItem('aula_home_memory', JSON.stringify(updated));
  };

  const addMemoryItem = (name: string) => {
    const updated = [...memoryList, { id: Date.now().toString(), name, checked: false }];
    setMemoryList(updated);
    localStorage.setItem('aula_home_memory', JSON.stringify(updated));
  };

  const deleteMemoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = memoryList.filter((item) => item.id !== id);
    setMemoryList(updated);
    localStorage.setItem('aula_home_memory', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* Bloque 1: Rutinas del Hogar */}
        <HomeRoutines
          routines={routines}
          isHighContrast={isHighContrast}
          onToggle={toggleRoutineItem}
          onAdd={addRoutineItem}
          onDelete={deleteRoutineItem}
        />

        {/* Bloque 2 y 3: Anti-Olvidos y Geolocalización */}
        <div className="space-y-5">
          <AntiForgotList
            memoryList={memoryList}
            isHighContrast={isHighContrast}
            onToggle={toggleMemoryItem}
            onAdd={addMemoryItem}
            onDelete={deleteMemoryItem}
          />
          <SosLocation isHighContrast={isHighContrast} />
        </div>
      </div>
    </div>
  );
};