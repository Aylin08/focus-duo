export type UserRole = 'docente' | 'familia' | 'estudiante' | 'terapeuta';

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

// Única adición para el sistema de alertas en tiempo real
export interface SensorialAlert {
  id: string;
  studentId: string;
  studentName: string;
  type: 'routine_completed' | 'pictogram_used' | 'semaphore_signal' | 'timer_finished' | 'sensorial_calm';
  message: string;
  timestamp: string;
  read: boolean;
}