'use client';

import React, { useState } from 'react';
import { Sparkles, Users, User } from 'lucide-react';
import { GRADE_DATA } from '@/data/gradesData';
import { Category, CustomAssignment } from '@/types/reinforcement';

interface AssignmentFormProps {
  studentsList: Array<{ id: string; name: string; grade?: string }>;
  onAddAssignment?: (assignment: Partial<CustomAssignment>) => void;
  onClose: () => void;
}

export const AssignmentForm: React.FC<AssignmentFormProps> = ({
  studentsList,
  onAddAssignment,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [subject] = useState('Lectura & Lenguaje');
  const [category, setCategory] = useState<Category>('academico');
  const [selectedGrade, setSelectedGrade] = useState('1er-grado');
  const [assignmentType, setAssignmentType] = useState<'general' | 'individual'>('general');
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const filteredStudents = studentsList.filter(
    (s) => s.grade === selectedGrade || !s.grade
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const studentObj = studentsList.find((s) => s.id === selectedStudentId);

    if (onAddAssignment) {
      onAddAssignment({
        title: title.trim(),
        subject,
        category,
        stars: 10,
        grade: selectedGrade,
        assignmentType,
        studentId: assignmentType === 'individual' ? selectedStudentId : null,
        studentName: assignmentType === 'individual' ? studentObj?.name : undefined,
      });
    }

    setTitle('');
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/80 border border-stone-200 dark:border-slate-700 space-y-4 animate-fadeIn"
    >
      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
        <Sparkles className="w-4 h-4" /> Configurar Tarea / Historia Social
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-bold uppercase mb-1 opacity-75">
            Título de la Actividad:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Guía de fonemas / Historia sobre compartir"
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase mb-1 opacity-75">
            Categoría:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
          >
            <option value="academico">Académico</option>
            <option value="lenguaje">Habla & Lenguaje</option>
            <option value="social">Historias Sociales</option>
            <option value="autonomia">Autonomía</option>
          </select>
        </div>
      </div>

      {/* Selección Grupo / Grado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-stone-200/60 dark:border-slate-700/60">
        <div>
          <label className="block text-[11px] font-bold uppercase mb-1 opacity-75">
            Grupo / Grado Objetivo:
          </label>
          <select
            value={selectedGrade}
            onChange={(e) => {
              setSelectedGrade(e.target.value);
              setSelectedStudentId('');
            }}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
          >
            {Object.keys(GRADE_DATA).map((gradeKey) => (
              <option key={gradeKey} value={gradeKey}>
                {(GRADE_DATA as Record<string, any>)[gradeKey]?.label || gradeKey}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Destinatario */}
        <div>
          <label className="block text-[11px] font-bold uppercase mb-1 opacity-75">
            Tipo de Destinatario:
          </label>
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => setAssignmentType('general')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 border transition cursor-pointer ${
                assignmentType === 'general'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Todo el Grupo
            </button>
            <button
              type="button"
              onClick={() => setAssignmentType('individual')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 border transition cursor-pointer ${
                assignmentType === 'individual'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-slate-900 border-stone-200 dark:border-slate-700'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Alumno Específico
            </button>
          </div>

          {assignmentType === 'individual' && (
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 font-bold"
            >
              <option value="">-- Seleccionar Alumno --</option>
              {filteredStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="submit"
          disabled={assignmentType === 'individual' && !selectedStudentId}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition cursor-pointer shadow"
        >
          Guardar Asignación
        </button>
      </div>
    </form>
  );
};