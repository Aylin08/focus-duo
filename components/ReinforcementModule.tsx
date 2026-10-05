'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Mic, Heart, Trophy, Star, Plus, Sparkles, Trash2, CheckCircle2, Circle, Volume2, UserCheck } from 'lucide-react';
import { Category } from '@/types/reinforcement';
import { useSpeech } from '@/hooks/useSpeech';
import { usePoints } from '@/hooks/usePoints';
import { useUser } from '@/context/UserContext';

export interface CustomAssignment {
  id: string;
  category: Category;
  subject: string;       // Ej: "Practicar la letra R"
  title: string;         // Ej: "Tres tristes tigres tragan trigo en un trigal"
  stars: number;
}

const DEFAULT_ASSIGNMENTS: CustomAssignment[] = [
  { 
    id: '1', 
    category: 'academico', 
    subject: 'Matemáticas Adaptadas', 
    title: 'Misión: Conteo visual de bloques (1 al 20)', 
    stars: 10 
  },
  { 
    id: '2', 
    category: 'academico', 
    subject: 'Lectoescritura Divergente', 
    title: 'Diferenciar letras espejo (b, d, p, q)', 
    stars: 10 
  },
  { 
    id: '3', 
    category: 'lenguaje', 
    subject: 'Practicar la letra "R"', 
    title: 'Tres tristes tigres tragan trigo en un trigal', 
    stars: 10 
  },
  { 
    id: '4', 
    category: 'lenguaje', 
    subject: 'Practicar la letra "S"', 
    title: 'El perro de San Roque no tiene rabo', 
    stars: 10 
  },
  { 
    id: '5', 
    category: 'social', 
    subject: 'Gestión Emocional', 
    title: 'Reconocer emociones con pictogramas', 
    stars: 10 
  },
  { 
    id: '6', 
    category: 'autonomia', 
    subject: 'Rutinas Diarias', 
    title: 'Paso a paso para lavarse las manos de forma autónoma', 
    stars: 10 
  },
];

interface ReinforcementModuleProps {
  isHighContrast?: boolean;
}

export const ReinforcementModule: React.FC<ReinforcementModuleProps> = ({ isHighContrast = false }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('academico');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<CustomAssignment[]>(DEFAULT_ASSIGNMENTS);

  const { speak } = useSpeech();
  const { points, addPoints, removePoints } = usePoints();
  const { currentUser } = useUser();

  // EXCLUSIVO PARA TERAPEUTA (Se remueve la condición de 'docente')
  const isTherapist = currentUser?.role === 'terapeuta';

  // Formulario de Asignación Terapéutica
  const [newSubject, setNewSubject] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [selectedCategoryForm, setSelectedCategoryForm] = useState<Category>('academico');

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

  const toggleTask = (id: string, text: string) => {
    const isAlreadyCompleted = completedTasks.includes(id);
    const updatedTasks = isAlreadyCompleted
      ? completedTasks.filter((item) => item !== id)
      : [...completedTasks, id];

    if (isAlreadyCompleted) {
      removePoints(10);
    } else {
      addPoints(10);
      speak(`¡Excelente trabajo! Completaste la práctica.`);
    }

    setCompletedTasks(updatedTasks);
    localStorage.setItem('aula_reinforcement_tasks', JSON.stringify(updatedTasks));
  };

  const handleSpeakText = (e: React.MouseEvent, item: CustomAssignment) => {
    e.stopPropagation();
    speak(`${item.subject}. Escucha atentamente: ${item.title}`);
  };

  const handleAddAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMission: CustomAssignment = {
      id: Date.now().toString(),
      category: selectedCategoryForm,
      subject: newSubject.trim() || (selectedCategoryForm === 'lenguaje' ? 'Práctica de Pronunciación' : 'Actividad Personalizada'),
      title: newTitle.trim(),
      stars: 10,
    };

    const updated = [newMission, ...assignments];
    setAssignments(updated);
    localStorage.setItem('aula_custom_assignments', JSON.stringify(updated));

    setActiveCategory(selectedCategoryForm);
    speak(`Nueva práctica asignada.`);

    setNewTitle('');
    setNewSubject('');
  };

  const handleDeleteAssignment = (id: string) => {
    const updated = assignments.filter((a) => a.id !== id);
    setAssignments(updated);
    localStorage.setItem('aula_custom_assignments', JSON.stringify(updated));
  };

  const isCompleted = (id: string) => completedTasks.includes(id);

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

      {/* PANEL ÚNICAMENTE PARA EL TERAPEUTA */}
      {isTherapist && (
        <div className={`p-5 rounded-3xl border shadow-sm space-y-4 ${cardBgClass}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-white">
                Panel Terapéutico
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Asigna ejercicios de articulación, habla, historias sociales o autonomía.
              </p>
            </div>
          </div>

          <form onSubmit={handleAddAssignment} className="space-y-3 pt-2 border-t border-stone-100 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategoryForm}
                onChange={(e) => setSelectedCategoryForm(e.target.value as Category)}
                className="px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 font-bold outline-none"
              >
                <option value="academico">📘 Académico</option>
                <option value="lenguaje">🎙️ Habla & Lenguaje</option>
                <option value="social">❤️ Historias Sociales</option>
                <option value="autonomia">⭐ Autonomía</option>
              </select>

              <input
                type="text"
                placeholder="Área (Ej. Practicar la letra 'R')"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="flex-1 min-w-[200px] px-3.5 py-2 text-xs rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 outline-none"
              />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enunciado, trabalenguas o instrucción..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" /> + Asignar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4 APARTADOS / CATEGORÍAS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`p-2 rounded-3xl border flex flex-wrap gap-2 shadow-sm w-full sm:w-auto flex-1 ${cardBgClass}`}>
          <button
            onClick={() => setActiveCategory('academico')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
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
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
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
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeCategory === 'social'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Historias Sociales</span>
          </button>

          <button
            onClick={() => setActiveCategory('autonomia')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeCategory === 'autonomia'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Autonomía</span>
          </button>
        </div>

        {/* PUNTOS Y ESTRELLAS */}
        <div className="flex items-center gap-2 py-2 px-4 bg-amber-400/20 border border-amber-300 dark:border-amber-500/40 rounded-2xl shadow-sm shrink-0">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
          <div className="text-right">
            <span className="block text-[10px] uppercase font-black text-amber-700 dark:text-amber-400 leading-tight">
              Estrellas
            </span>
            <span className="text-lg font-black text-stone-900 dark:text-white leading-none">
              {points} ⭐
            </span>
          </div>
        </div>
      </div>

      {/* ÁREA DE ACTIVIDADES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.keys(groupedSubjects).length === 0 ? (
          <div className="col-span-2 p-8 text-center text-xs text-stone-400 border border-dashed rounded-2xl">
            No hay tareas asignadas para esta categoría.
          </div>
        ) : (
          Object.entries(groupedSubjects).map(([subject, list]) => (
            <div
              key={subject}
              className={`p-5 rounded-3xl border space-y-3 ${cardBgClass}`}
            >
              <h4 className="font-bold text-sm text-stone-900 dark:text-white flex items-center justify-between">
                <span>{subject}</span>
              </h4>

              <div className="space-y-2.5">
                {list.map((item) => {
                  const completed = isCompleted(item.id);
                  const isSpeechCategory = activeCategory === 'lenguaje';

                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition ${
                        completed
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                          : 'bg-stone-50 border-stone-200 dark:bg-slate-800 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          type="button"
                          onClick={(e) => handleSpeakText(e, item)}
                          className="p-2 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-slate-700 dark:text-indigo-300 transition cursor-pointer shrink-0 flex items-center gap-1 font-bold text-xs"
                          title="Escuchar modelo de pronunciación"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        <span className={`text-xs font-medium min-w-0 break-words ${completed ? 'line-through opacity-70' : ''}`}>
                          {item.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isSpeechCategory ? (
                          <button
                            type="button"
                            onClick={() => toggleTask(item.id, item.title)}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                              completed
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>{completed ? 'Repetido' : 'Repetir'}</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleTask(item.id, item.title)}
                            className="cursor-pointer"
                          >
                            {completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-stone-300 dark:text-slate-600" />
                            )}
                          </button>
                        )}

                        <span className="px-2 py-1 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold">
                          +10 ⭐
                        </span>

                        {isTherapist && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAssignment(item.id)}
                            className="p-1 text-stone-400 hover:text-rose-500 transition cursor-pointer"
                            title="Eliminar asignación"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* RESUMEN DE LOGROS */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between ${
          isHighContrast ? 'bg-slate-800 border-slate-700' : 'bg-amber-400/20 border-amber-300'
        }`}
      >
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