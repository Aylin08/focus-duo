'use client';

import React, { useState, useEffect } from 'react';
import { UserPlus, User, GraduationCap, X, Check, Trash2, Users } from 'lucide-react';
import { Student, UserRole } from '@/types/user';

interface StudentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  selectedStudentId: string | null;
  onSelectStudent: (student: Student) => void;
  isHighContrast?: boolean;
}

export const StudentManagerModal: React.FC<StudentManagerModalProps> = ({
  isOpen,
  onClose,
  userRole,
  selectedStudentId,
  onSelectStudent,
  isHighContrast = false,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('1º Primaria');

  // Cargar lista desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aula_students_list');
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        console.error('Error al cargar alumnos:', e);
      }
    } else {
      // Alumnos iniciales de ejemplo
      const initialStudents: Student[] = [
        { id: '1', name: 'Mateo González', grade: '1º Primaria', stars: 12 },
        { id: '2', name: 'Sofia López', grade: '2º Primaria', stars: 8 },
      ];
      setStudents(initialStudents);
      localStorage.setItem('aula_students_list', JSON.stringify(initialStudents));
    }
  }, []);

  const saveStudents = (updated: Student[]) => {
    setStudents(updated);
    localStorage.setItem('aula_students_list', JSON.stringify(updated));
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStudent: Student = {
      id: Date.now().toString(),
      name: name.trim(),
      grade,
      stars: 0,
    };

    const updated = [...students, newStudent];
    saveStudents(updated);
    onSelectStudent(newStudent);
    setName('');
    setIsAdding(false);
  };

  const handleDeleteStudent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = students.filter((s) => s.id !== id);
    saveStudents(updated);
    if (selectedStudentId === id && updated.length > 0) {
      onSelectStudent(updated[0]);
    }
  };

  if (!isOpen) return null;

  const roleTitle = userRole === 'docente' ? 'Gestión de Alumnos (Grupo)' : 'Gestión de Hijos (Familia)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl transition-all ${
          isHighContrast
            ? 'bg-slate-900 border-2 border-slate-700 text-white'
            : 'bg-white text-stone-800'
        }`}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{roleTitle}</h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Selecciona un perfil para adaptar las herramientas y métricas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Alumnos/Hijos */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {students.map((student) => {
            const isSelected = student.id === selectedStudentId;
            return (
              <div
                key={student.id}
                onClick={() => {
                  onSelectStudent(student);
                  onClose();
                }}
                className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-900 dark:bg-indigo-950/50 dark:border-indigo-400 dark:text-indigo-200 shadow-sm'
                    : 'bg-stone-50 dark:bg-slate-800/60 border-stone-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-stone-200 dark:bg-slate-700 text-stone-700 dark:text-slate-200'
                    }`}
                  >
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{student.name}</h4>
                    <span className="text-xs text-stone-500 dark:text-slate-400 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> {student.grade}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSelected && (
                    <span className="px-2.5 py-1 text-[10px] font-extrabold bg-indigo-600 text-white rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Activo
                    </span>
                  )}
                  <button
                    onClick={(e) => handleDeleteStudent(student.id, e)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formulario para Dar de Alta Nuevo Alumno/Hijo */}
        {isAdding ? (
          <form onSubmit={handleAddStudent} className="mt-5 p-4 rounded-2xl bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-stone-700 dark:text-slate-300">
              {userRole === 'docente' ? ' Registrar Nuevo Alumno' : ' Registrar Nuevo Hijo'}[cite: 7]
            </h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo"
              required
              className="w-full px-3 py-2 rounded-xl border text-sm outline-none dark:bg-slate-900 dark:border-slate-700"
            />
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border text-sm outline-none dark:bg-slate-900 dark:border-slate-700"
            >
              <option value="1º Primaria">1º Primaria</option>
              <option value="2º Primaria">2º Primaria</option>
              <option value="3º Primaria">3º Primaria</option>
              <option value="4º Primaria">4º Primaria</option>
              <option value="5º Primaria">5º Primaria</option>
              <option value="6º Primaria">6º Primaria</option>
            </select>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-xs text-stone-500 font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700"
              >
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full mt-4 py-3 rounded-2xl border-2 border-dashed border-stone-300 dark:border-slate-700 hover:border-indigo-500 text-stone-600 dark:text-slate-300 hover:text-indigo-600 text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>{userRole === 'docente' ? 'Dar de Alta Nuevo Alumno' : 'Dar de Alta Nuevo Hijo'}[cite: 7]</span>
          </button>
        )}
      </div>
    </div>
  );
};