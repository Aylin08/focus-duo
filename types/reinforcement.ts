// En src/types/reinforcement.ts
export type Category = 'academico' | 'lenguaje' | 'social' | 'autonomia';

export interface AcademicTask {
  id: string;
  category: 'math' | 'literacy';
  title: string;
  speechText: string;
}

export interface SpeechExercise {
  title: string;
  description: string;
  speechText: string;
  colorClass: string;
  btnClass: string;
}

export interface SocialStory {
  id: string;
  title: string;
  steps: string;
  speechText: string;
}

export interface CustomAssignment {
  id: string;
  category: Category;
  subject: string;
  title: string;
  stars: number;
  grade?: string;                          // 👈 Agregado opcional
  assignmentType?: 'general' | 'individual'; // 👈 Agregado opcional
  studentId?: string | null;               // 👈 Agregado opcional
  studentName?: string;                    // 👈 Agregado opcional
}