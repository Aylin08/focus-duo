// components/UserActionBar.tsx
import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Student, UserProfile } from '../types/user';

interface UserActionBarProps {
  user: UserProfile;
  activeStudent: Student | null;
  onOpenStudentModal: () => void;
  onLogout: () => void;
}

export const UserActionBar: React.FC<UserActionBarProps> = ({
  user,
  activeStudent,
  onOpenStudentModal,
  onLogout,
}) => {
  return (
    <div className="max-w-4xl mx-auto my-3 flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 shadow-sm flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <span className="text-xs text-stone-500 dark:text-slate-400">
          {user.role === 'familia'
            ? 'Hijo/a en seguimiento:'
            : user.role === 'estudiante'
            ? 'Estudiante:'
            : 'Alumno/a en sesión:'}
        </span>
        <span className="text-xs font-bold text-stone-800 dark:text-white">
          {user.role === 'estudiante'
            ? user.name
            : activeStudent
            ? activeStudent.name
            : 'Ninguno seleccionado'}
        </span>

        {user.role !== 'estudiante' && (
          <button
            onClick={onOpenStudentModal}
            className="ml-2 px-3 py-1 text-xs font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 rounded-xl transition cursor-pointer"
          >
            {activeStudent ? 'Cambiar' : 'Seleccionar'}
          </button>
        )}
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition cursor-pointer"
        title="Cerrar sesión"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Salir</span>
      </button>
    </div>
  );
};