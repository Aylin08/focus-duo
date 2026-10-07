import React from 'react';
import { ShieldCheck, HeartHandshake, GraduationCap, Sparkles } from 'lucide-react';
import { UserRole } from '../../types/user';

export interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export const ROLES: RoleOption[] = [
  {
    id: 'docente',
    title: 'Docente / Educación',
    description: 'Acceso a gestión de aula, adaptaciones visuales y rutinas de grado.',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-emerald-500 text-white',
  },
  {
    id: 'terapeuta',
    title: 'Terapeuta / Especialista',
    description: 'Seguimiento de autorregulación, pausas sensoriales y reportes.',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'bg-indigo-500 text-white',
  },
  {
    id: 'familia',
    title: 'Familia / Tutor',
    description: 'Acompañamiento en el hogar, canal de comunicación y hábitos.',
    icon: <HeartHandshake className="w-6 h-6" />,
    color: 'bg-amber-500 text-white',
  },
  {
    id: 'estudiante',
    title: 'Estudiante',
    description: 'Modo visual simplificado con apoyos, pictogramas y temporizadores.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'bg-sky-500 text-white',
  },
];