'use client';

import React from 'react';
import { useUser } from '@/context/UserContext';
import { Bell, Heart } from 'lucide-react';

export const HeaderNav: React.FC = () => {
  const {
    currentUser,
    selectedStudent,
    studentsList,
    setSelectedStudent,
    canSelectStudent,
    canReceiveRealTimeAlerts,
    alerts,
  } = useUser();

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  return (
    <header className="flex flex-wrap items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-stone-200 dark:border-slate-800 rounded-3xl shadow-sm mb-6">
      {/* Título y Rol del Usuario */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
          <Heart className="w-6 h-6 fill-amber-500 text-amber-500" />
        </div>
        <div>
          <h1 className="text-lg font-black text-stone-900 dark:text-white leading-tight">
            Aula con Corazón
          </h1>
          <p className="text-xs font-semibold text-stone-500 dark:text-slate-400 capitalize">
            Usuario: <span className="text-indigo-600 dark:text-indigo-400">{currentUser.name}</span> ({currentUser.role})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-3 sm:mt-0">
        {/* Selector de Alumnos (Oculto automáticamente para el Estudiante) */}
        {canSelectStudent && (
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-slate-800 px-3 py-1.5 rounded-2xl border border-stone-200 dark:border-slate-700 text-xs">
            <span className="font-bold text-stone-500 dark:text-slate-400">Alumno:</span>
            <select
              value={selectedStudent?.id || ''}
              onChange={(e) => {
                const found = studentsList.find((s) => s.id === e.target.value);
                if (found) setSelectedStudent(found);
              }}
              className="bg-transparent font-bold text-stone-800 dark:text-white focus:outline-none cursor-pointer"
            >
              {studentsList.map((student) => (
                <option key={student.id} value={student.id} className="dark:bg-slate-900">
                  {student.avatar} {student.name} ({student.grade})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Campanita de Notificaciones (Solo para Docentes y Terapeutas) */}
        {canReceiveRealTimeAlerts && (
          <button className="relative p-2.5 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 text-stone-700 dark:text-slate-200 rounded-2xl transition cursor-pointer">
            <Bell className="w-5 h-5" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center rounded-full animate-pulse">
                {unreadAlertsCount}
              </span>
            )}
          </button>
        )}
      </div>
    </header>
  );
};