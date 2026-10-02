export type UserRole = 'docente' | 'tutor' | 'estudiante' | 'terapeuta';

export type AppSection = 'aula' | 'hogar' | 'refuerzo' | 'comunicacion';

export interface UserProfile {
  name: string;
  role: UserRole;
  grade?: string;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  avatar?: string;
  notes?: string;
  supportLevel?: 'bajo' | 'medio' | 'alto';
}