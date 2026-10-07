export type UserRole = 'docente' | 'familia' | 'estudiante' | 'terapeuta';

export type AppSection = 'aula' | 'hogar' | 'refuerzo' | 'comunicacion';

export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
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
  stars?: number;
  supportLevel?: 'bajo' | 'medio' | 'alto';
}

export interface SensorialAlert {
  id: string;
  studentId: string;
  studentName: string;
  type: 'routine_completed' | 'pictogram_used' | 'semaphore_signal';
  message: string;
  timestamp: string;
  read: boolean;
}