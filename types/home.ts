export interface RoutineItem {
  id: string;
  text: string;
  completed: boolean;
  timeOfDay: 'manana' | 'tarde' | 'noche';
}

export interface MemoryItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface Coords {
  lat: number;
  lng: number;
}