'use client';

import React, { useEffect } from 'react';
import { School, Home, BookOpen, MessageSquare, User } from 'lucide-react';
import { AppSection, UserProfile } from '../types/user';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  user: UserProfile | null;
  onChangeUser: () => void;
  onOpenProfile?: () => void;
  isHighContrast?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  user,
  onChangeUser,
  onOpenProfile,
  isHighContrast = false,
}) => {
  const isDocente = user?.role === 'docente';
  const isTherapist = user?.role === 'terapeuta';
  const isStudent = user?.role === 'estudiante';

  // Si el docente está en 'hogar', enviarlo a 'aula'
  useEffect(() => {
    if (isDocente && activeSection === 'hogar') {
      setActiveSection('aula');
    }
  }, [isDocente, activeSection, setActiveSection]);

  // Si el usuario cambia a terapeuta y estaba en una sección no permitida, enviarlo a 'refuerzo'
  useEffect(() => {
    if (isTherapist && (activeSection === 'aula' || activeSection === 'hogar')) {
      setActiveSection('refuerzo');
    }
  }, [isTherapist, activeSection, setActiveSection]);

  // Si el usuario es estudiante y está en 'comunicacion', enviarlo a 'aula'
  useEffect(() => {
    if (isStudent && activeSection === 'comunicacion') {
      setActiveSection('aula');
    }
  }, [isStudent, activeSection, setActiveSection]);

  const navItems = [
    {
      id: 'aula' as AppSection,
      label: 'Aula & Terapia',
      icon: School,
      show: !isTherapist // 👈 Oculto para Terapeuta
    },
    {
      id: 'hogar' as AppSection,
      label: 'Hogar & Vida Diaria',
      icon: Home,
      show: !isTherapist && !isDocente // 👈 Oculto para Terapeuta y Docente
    },
    {
      id: 'refuerzo' as AppSection,
      label: 'Rincón de Refuerzo',
      icon: BookOpen,
      show: true
    },
    {
      id: 'comunicacion' as AppSection,
      label: 'Escuela-Familia',
      icon: MessageSquare,
      show: !isStudent // 👈 Oculto para Estudiante
    },
  ];

  return (
    <header className="max-w-4xl mx-auto pt-4 px-2">
      <div className={`p-2 rounded-3xl border flex flex-wrap items-center justify-between gap-2 shadow-sm ${isHighContrast ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white/90 border-stone-200 text-stone-800'
        }`}>
        {/* Pestañas de Navegación */}
        <nav className="flex flex-wrap items-center gap-1.5">
          {navItems
            .filter((item) => item.show) // Filtra para mostrar únicamente las permitidas
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${isActive
                    ? isHighContrast
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-indigo-600 text-white shadow-sm'
                    : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-600 dark:text-slate-300'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
        </nav>

        {/* Perfil Actual */}
        {user && (
          <button
            onClick={onOpenProfile || onChangeUser}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer border ${isHighContrast
                ? 'border-slate-700 hover:bg-slate-800 text-amber-300'
                : 'border-stone-200 hover:bg-stone-100 text-stone-700'
              }`}
            title="Abrir configuración de perfil"
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
            ) : (
              <User className="w-3.5 h-3.5" />
            )}
            <span className="capitalize">{user.name} ({user.role})</span>
          </button>
        )}
      </div>
    </header>
  );
};