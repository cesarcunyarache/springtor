import { Topic, Lesson, Assessment } from '../types';

export const scrumTopics: Topic[] = [
  {
    id: 'agile-mindset',
    title: 'Mentalidad Ágil',
    subtitle: 'Manifiesto y Valores',
    level: 'basico',
    icon: 'Brain',
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    description: 'Fundamentos de la metodología ágil y el manifiesto',
    prerequisites: [],
    learningObjectives: [
      'Comprender los valores del manifiesto ágil',
      'Identificar los principios fundamentales'
    ],
    keyConceptsCount: 4
  },
  {
    id: 'scrum-roles',
    title: 'Roles en Scrum',
    subtitle: 'Product Owner, Scrum Master y Equipo',
    level: 'basico',
    icon: 'Users',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    description: 'Los tres roles fundamentales en Scrum',
    prerequisites: ['agile-mindset'],
    learningObjectives: [
      'Definir las responsabilidades de cada rol',
      'Entender la colaboración entre roles'
    ],
    keyConceptsCount: 5
  },
  {
    id: 'scrum-events',
    title: 'Eventos de Scrum',
    subtitle: 'Sprint, Planning, Daily, Review, Retrospective',
    level: 'intermedio',
    icon: 'Calendar',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    description: 'Las ceremonias y eventos clave de Scrum',
    prerequisites: ['scrum-roles'],
    learningObjectives: [
      'Planificar y ejecutar eventos efectivos',
      'Maximizar el valor de cada ceremonia'
    ],
    keyConceptsCount: 6
  },
  {
    id: 'scrum-artifacts',
    title: 'Artefactos',
    subtitle: 'Product Backlog, Sprint Backlog, Incremento',
    level: 'intermedio',
    icon: 'Package',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    description: 'Los artefactos que proporcionan transparencia',
    prerequisites: ['scrum-events'],
    learningObjectives: [
      'Gestionar backlogs efectivamente',
      'Crear incrementos de valor'
    ],
    keyConceptsCount: 4
  },
  {
    id: 'scaling-scrum',
    title: 'Escalado de Scrum',
    subtitle: 'SAFe, LeSS, Nexus',
    level: 'avanzado',
    icon: 'Layers',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    description: 'Frameworks para escalar Scrum en organizaciones grandes',
    prerequisites: ['scrum-artifacts'],
    learningObjectives: [
      'Aplicar frameworks de escalado',
      'Coordinar múltiples equipos Scrum'
    ],
    keyConceptsCount: 5
  },
  {
    id: 'metrics-improvement',
    title: 'Métricas y Mejora',
    subtitle: 'Velocity, Burndown, Retrospectivas',
    level: 'avanzado',
    icon: 'TrendingUp',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    description: 'Medición y mejora continua en Scrum',
    prerequisites: ['scaling-scrum'],
    learningObjectives: [
      'Implementar métricas efectivas',
      'Facilitar mejora continua'
    ],
    keyConceptsCount: 6
  },
  {
    id: 'advanced-practices',
    title: 'Prácticas Avanzadas',
    subtitle: 'DevOps, CI/CD, Definition of Done',
    level: 'avanzado',
    icon: 'Settings',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    description: 'Prácticas avanzadas para equipos Scrum maduros',
    prerequisites: ['metrics-improvement'],
    learningObjectives: [
      'Integrar prácticas DevOps',
      'Establecer estándares de calidad'
    ],
    keyConceptsCount: 7
  },
  {
    id: 'scrum-master-advanced',
    title: 'Scrum Master Avanzado',
    subtitle: 'Liderazgo Servicial y Coaching',
    level: 'avanzado',
    icon: 'Crown',
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    description: 'Habilidades avanzadas para Scrum Masters',
    prerequisites: ['advanced-practices'],
    learningObjectives: [
      'Desarrollar habilidades de coaching',
      'Liderar transformaciones ágiles'
    ],
    keyConceptsCount: 8
  }
];

export const mockAssessments: Assessment[] = [
 /*  {
    id: 'agile-mindset-initial',
    type: 'initial',
    title: 'Evaluación Inicial - Mentalidad Ágil',
    questions: [
      {
        id: '1',
        question: '¿Cuál es el valor principal del Manifiesto Ágil?',
        options: [
          'Documentación exhaustiva',
          'Individuos e interacciones sobre procesos y herramientas',
          'Seguir un plan estricto',
          'Contratos detallados'
        ],
        correctAnswer: 1,
        explanation: 'El Manifiesto Ágil prioriza a las personas y sus interacciones por encima de los procesos y herramientas.'
      }
    ],
    passingScore: 70,
    attempts: 0,
    bestScore: 0
  } */
];