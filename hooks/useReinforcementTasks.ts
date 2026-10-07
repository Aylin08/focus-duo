import { useState, useEffect } from 'react';
import { CustomAssignment, Category } from '@/types/reinforcement';
import { useSpeech } from '@/hooks/useSpeech';
import { usePoints } from '@/hooks/usePoints';

const DEFAULT_ASSIGNMENTS: CustomAssignment[] = [
  { id: '1', category: 'academico', subject: 'Matemáticas Adaptadas', title: 'Misión: Conteo visual de bloques (1 al 20)', stars: 10 },
  { id: '2', category: 'academico', subject: 'Lectoescritura Divergente', title: 'Diferenciar letras espejo (b, d, p, q)', stars: 10 },
  { id: '3', category: 'lenguaje', subject: 'Practicar la letra "R"', title: 'Tres tristes tigres tragan trigo en un trigal', stars: 10 },
  { id: '4', category: 'lenguaje', subject: 'Practicar la letra "S"', title: 'El perro de San Roque no tiene rabo', stars: 10 },
  { id: '5', category: 'social', subject: 'Gestión Emocional', title: 'Reconocer emociones con pictogramas', stars: 10 },
  { id: '6', category: 'autonomia', subject: 'Rutinas Diarias', title: 'Paso a paso para lavarse las manos de forma autónoma', stars: 10 },
];

export const useReinforcementTasks = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<CustomAssignment[]>(DEFAULT_ASSIGNMENTS);

  const { speak } = useSpeech();
  const { points, addPoints, removePoints } = usePoints();

  useEffect(() => {
    const savedTasks = localStorage.getItem('aula_reinforcement_tasks');
    if (savedTasks) {
      try { setCompletedTasks(JSON.parse(savedTasks)); } catch (e) {}
    }

    const savedAssignments = localStorage.getItem('aula_custom_assignments');
    if (savedAssignments) {
      try { setAssignments(JSON.parse(savedAssignments)); } catch (e) {}
    }
  }, []);

  const toggleTask = (id: string) => {
    const isAlreadyCompleted = completedTasks.includes(id);
    const updatedTasks = isAlreadyCompleted
      ? completedTasks.filter((item) => item !== id)
      : [...completedTasks, id];

    if (isAlreadyCompleted) {
      removePoints(10);
    } else {
      addPoints(10);
      speak('¡Excelente trabajo! Completaste la práctica.');
    }

    setCompletedTasks(updatedTasks);
    localStorage.setItem('aula_reinforcement_tasks', JSON.stringify(updatedTasks));
  };

  const addAssignment = (category: Category, subject: string, title: string) => {
    const newMission: CustomAssignment = {
      id: Date.now().toString(),
      category,
      subject: subject.trim() || (category === 'lenguaje' ? 'Práctica de Pronunciación' : 'Actividad Personalizada'),
      title: title.trim(),
      stars: 10,
    };

    const updated = [newMission, ...assignments];
    setAssignments(updated);
    localStorage.setItem('aula_custom_assignments', JSON.stringify(updated));
    speak('Nueva práctica asignada.');
  };

  const deleteAssignment = (id: string) => {
    const updated = assignments.filter((a) => a.id !== id);
    setAssignments(updated);
    localStorage.setItem('aula_custom_assignments', JSON.stringify(updated));
  };

  return {
    assignments,
    completedTasks,
    points,
    toggleTask,
    addAssignment,
    deleteAssignment,
  };
};