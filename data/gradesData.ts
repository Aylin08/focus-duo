export interface GradeInfo {
  label: string;
  focus: string;
  tasks: string[];
}

export const GRADE_DATA: Record<string, GradeInfo> = {
  '1er-grado': {
    label: '1.º de Primaria',
    focus: 'Lectoescritura adaptada, estimulación sensorial y motricidad fina.',
    tasks: [
      'Asociación de pictogramas con fonemas (15 min)',
      'Ejercicio de motricidad fina / trazado adaptado',
      'Pausa de integración sensorial y postura',
    ],
  },
  '2do-grado': {
    label: '2.º de Primaria',
    focus: 'Comprensión lectora básica, conteo concreto y regulación.',
    tasks: [
      'Lectura guiada con apoyos visuales',
      'Matemáticas con material manipulativo',
      'Pausa de estiramiento y control postural',
    ],
  },
  '3er-grado': {
    label: '3.er de Primaria',
    focus: 'Razonamiento lógico, rutinas de autonomía y socialización.',
    tasks: [
      'Resolución de problemas con apoyos gráficos',
      'Actividad de expresión emocional / semáforo',
      'Toma de agua/electrolitos antes del recreo',
    ],
  },
  '4to-grado': {
    label: '4.º de Primaria',
    focus: 'Estructura de tareas, memoria de trabajo e investigación.',
    tasks: [
      'Lectura de textos informativos breves',
      'Organización de pasos para proyecto en equipo',
      'Pausa de des-masking y regulación auditiva',
    ],
  },
  '5to-grado': {
    label: '5.º de Primaria',
    focus: 'Pensamiento crítico, autorregulación y autonomía.',
    tasks: [
      'Desglose de tarea compleja en 3 micro-pasos',
      'Módulo de habilidades sociales y empatía',
      'Registro personal de nivel de energía y fatiga',
    ],
  },
  '6to-grado': {
    label: '6.º de Primaria',
    focus: 'Transición a secundaria, proyecto de vida y autorregulación alta.',
    tasks: [
      'Planificación autónoma de la jornada escolar',
      'Manejo de agenda visual digital/física',
      'Estrategias de autorregulación pre-evaluación',
    ],
  },
  'terapias': {
    label: 'Centro Terapéutico',
    focus: 'Terapia ocupacional, lenguaje, integración sensorial y fisioterapia.',
    tasks: [
      'Sesión de Integración Sensorial (Ocupacional)',
      'Ejercicios de habla y comunicación alternativa (AAC)',
      'Ejercicios de propiocepción y balance (POTS/Disautonomía)',
    ],
  },
};