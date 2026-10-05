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