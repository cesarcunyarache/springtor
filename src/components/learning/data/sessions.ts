import { LearningSession, Assessment, Quiz } from '../types';

export const createLearningSession = (topicId: string, topicTitle: string): LearningSession => {
  const sessionId = `${topicId}-session`;
  
  return {
    id: sessionId,
    topicId,
    title: `Sesión: ${topicTitle}`,
    sections: [
      {
        id: `${sessionId}-intro`,
        title: 'Introducción y Conceptos Base',
        type: 'content',
        isCompleted: false,
        isActive: true,
        duration: 15,
        content: {
          text: `Bienvenido a la sesión de ${topicTitle}. En esta sección exploraremos los fundamentos y conceptos clave que necesitas dominar.`,
          visualizations: [
            {
              id: 'mindmap-1',
              type: 'mindmap',
              title: 'Mapa Mental - Conceptos Clave',
              data: generateMindMapData(topicTitle)
            },
            {
              id: 'diagram-1',
              type: 'diagram',
              title: 'Diagrama de Proceso',
              data: generateDiagramData(topicTitle)
            },
            {
              id: 'comparison-1',
              type: 'comparison',
              title: 'Cuadro Comparativo',
              data: generateComparisonData(topicTitle)
            },
            {
              id: 'flowchart-1',
              type: 'flowchart',
              title: 'Diagrama de Flujo',
              data: generateFlowchartData(topicTitle)
            }
          ],
          keyConcepts: [],
          examples: []
        }
      },
      {
        id: `${sessionId}-practice`,
        title: 'Práctica y Aplicación',
        type: 'activity',
        isCompleted: false,
        isActive: false,
        duration: 20,
        content: {
          text: 'Aplica los conceptos aprendidos a través de ejercicios prácticos y casos de estudio.',
          visualizations: [],
          keyConcepts: [],
          examples: [
            'Caso de estudio: Implementación en startup tecnológica',
            'Ejercicio práctico: Planificación de sprint',
            'Simulación: Reunión de retrospectiva'
          ]
        }
      },
      {
        id: `${sessionId}-assessment`,
        title: 'Evaluación Final',
        type: 'assessment',
        isCompleted: false,
        isActive: false,
        duration: 10
      }
    ],
    assessments: [
      {
        id: `${sessionId}-initial-quiz`,
        type: 'initial',
        title: 'Quiz Inicial',
        questions: generateQuizQuestions(topicTitle, 'initial'),
        passingScore: 60,
        attempts: 0,
        bestScore: 0,
        isCompleted: false,
        timeLimit: 5
      },
      {
        id: `${sessionId}-final-quiz`,
        type: 'final',
        title: 'Evaluación Final',
        questions: generateQuizQuestions(topicTitle, 'final'),
        passingScore: 70,
        attempts: 0,
        bestScore: 0,
        isCompleted: false,
        timeLimit: 15
      },
      {
        id: `${sessionId}-practical`,
        type: 'practical',
        title: 'Evaluación Práctica',
        questions: [],
        passingScore: 80,
        attempts: 0,
        bestScore: 0,
        isCompleted: false,
        timeLimit: 60,
        practicalCase: {
          id: 'ecommerce-sprint-planning',
          title: 'Taller Práctico - Planificación de Sprint E-commerce',
          description: 'Analiza y mejora la planificación de un Sprint real',
          scenario: `Eres el Scrum Master de un equipo que desarrolla una plataforma de e-commerce. 
                    El equipo tiene 6 desarrolladores y trabaja en Sprints de 2 semanas. 
                    El Product Owner ha preparado historias de usuario para el próximo Sprint, 
                    pero hay varios problemas que necesitas identificar y corregir.`,
          context: {
            teamSize: 6,
            sprintDuration: '2 semanas',
            projectType: 'E-commerce Platform',
            stakeholders: ['Product Owner', 'UX Designer', 'Marketing Team', 'Customer Support']
          },
          tasks: [
            {
              id: 'user-story-review',
              type: 'user-story-analysis',
              title: 'Análisis de Historias de Usuario',
              description: 'Evalúa estas historias según INVEST y propón mejoras',
              maxScore: 30,
              data: {
                stories: [
                  {
                    id: 'US-001',
                    title: 'Login de usuario',
                    description: 'Como usuario quiero hacer login',
                    acceptanceCriteria: ['El usuario puede ingresar email y contraseña'],
                    storyPoints: 8,
                    priority: 'high',
                    issues: ['Muy vaga', 'Falta valor de negocio', 'Criterios incompletos']
                  },
                  {
                    id: 'US-002',
                    title: 'Carrito de compras avanzado',
                    description: 'Como usuario quiero un carrito que me permita agregar productos, modificar cantidades, aplicar cupones, calcular impuestos, guardar para más tarde, compartir y recibir recomendaciones',
                    acceptanceCriteria: ['Agregar productos', 'Modificar cantidades', 'Aplicar cupones', 'Calcular impuestos', 'Guardar carrito', 'Compartir', 'Recomendaciones'],
                    storyPoints: 21,
                    priority: 'medium',
                    issues: ['Muy grande', 'Múltiples funcionalidades', 'Debe dividirse']
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    progress: {
      completedSections: [],
      currentSection: `${sessionId}-intro`,
      timeSpent: 0,
      assessmentScores: {},
      overallProgress: 0
    }
  };
};

const generateMindMapData = (topicTitle: string) => {
  const mindMaps: Record<string, any> = {
    'Mentalidad Ágil': {
      center: 'Mentalidad Ágil',
      branches: [
        {
          title: 'Valores',
          items: ['Individuos', 'Software funcionando', 'Colaboración', 'Respuesta al cambio']
        },
        {
          title: 'Principios',
          items: ['Entrega temprana', 'Cambios bienvenidos', 'Colaboración diaria', 'Motivación']
        },
        {
          title: 'Beneficios',
          items: ['Flexibilidad', 'Calidad', 'Satisfacción', 'Productividad']
        }
      ]
    },
    'Roles en Scrum': {
      center: 'Roles Scrum',
      branches: [
        {
          title: 'Product Owner',
          items: ['Visión del producto', 'Backlog', 'Stakeholders', 'ROI']
        },
        {
          title: 'Scrum Master',
          items: ['Facilitador', 'Coach', 'Impedimentos', 'Proceso']
        },
        {
          title: 'Development Team',
          items: ['Autoorganizado', 'Multifuncional', 'Entrega', 'Calidad']
        }
      ]
    }
  };
  
  return mindMaps[topicTitle] || mindMaps['Mentalidad Ágil'];
};

const generateDiagramData = (topicTitle: string) => {
  return {
    nodes: [
      { id: '1', label: 'Inicio', type: 'start' },
      { id: '2', label: 'Planificación', type: 'process' },
      { id: '3', label: 'Ejecución', type: 'process' },
      { id: '4', label: 'Revisión', type: 'process' },
      { id: '5', label: 'Retrospectiva', type: 'process' },
      { id: '6', label: 'Siguiente Sprint', type: 'end' }
    ],
    connections: [
      { from: '1', to: '2' },
      { from: '2', to: '3' },
      { from: '3', to: '4' },
      { from: '4', to: '5' },
      { from: '5', to: '6' }
    ]
  };
};

const generateComparisonData = (topicTitle: string) => {
  return {
    title: 'Metodología Tradicional vs Ágil',
    columns: ['Aspecto', 'Tradicional', 'Ágil'],
    rows: [
      ['Planificación', 'Detallada y rígida', 'Adaptativa y flexible'],
      ['Documentación', 'Exhaustiva', 'Suficiente y útil'],
      ['Cambios', 'Costosos y evitados', 'Bienvenidos y gestionados'],
      ['Entrega', 'Al final del proyecto', 'Iterativa y frecuente'],
      ['Feedback', 'Tardío', 'Continuo y temprano']
    ]
  };
};

const generateFlowchartData = (topicTitle: string) => {
  return {
    steps: [
      { id: '1', text: 'Product Backlog', type: 'input' },
      { id: '2', text: 'Sprint Planning', type: 'process' },
      { id: '3', text: 'Sprint Backlog', type: 'data' },
      { id: '4', text: 'Daily Scrum', type: 'process' },
      { id: '5', text: 'Sprint Review', type: 'process' },
      { id: '6', text: 'Sprint Retrospective', type: 'process' },
      { id: '7', text: 'Incremento', type: 'output' }
    ]
  };
};

const generateQuizQuestions = (topicTitle: string, type: 'initial' | 'final' | 'practical'): Quiz[] => {
  const baseQuestions: Record<string, Quiz[]> = {
    initial: [
      {
        id: '1',
        question: `Antes de comenzar con ${topicTitle}, ¿cuál crees que es su principal beneficio?`,
        options: [
          'Reducir la documentación del proyecto',
          'Mejorar la adaptabilidad y entrega de valor',
          'Eliminar todas las reuniones del equipo',
          'Crear más roles de supervisión'
        ],
        correctAnswer: 1,
        explanation: 'El principal beneficio es mejorar la adaptabilidad y la entrega continua de valor al cliente.'
      }
    ],
    final: [
      {
        id: '1',
        question: `Después de estudiar ${topicTitle}, ¿cuál es el elemento más crítico para su éxito?`,
        options: [
          'Tener herramientas tecnológicas avanzadas',
          'La colaboración efectiva del equipo',
          'Documentación exhaustiva de procesos',
          'Supervisión constante del gerente'
        ],
        correctAnswer: 2,
        explanation: 'La colaboración efectiva del equipo es fundamental para el éxito de cualquier implementación ágil.'
      },
      {
        id: '2',
        question: `En la implementación de ${topicTitle}, ¿qué se debe priorizar según el Manifiesto Ágil?`,
        options: [
          'Procesos sobre individuos',
          'Documentación sobre software funcionando',
          'Contratos sobre colaboración',
          'Individuos e interacciones sobre procesos'
        ],
        correctAnswer: 3,
        explanation: 'El Manifiesto Ágil prioriza a los individuos e interacciones sobre procesos y herramientas.'
      }
    ],
    practical: [
      {
        id: '1',
        question: 'CASO: Tu equipo está desarrollando una app móvil. A mitad del Sprint de 2 semanas, el Product Owner solicita agregar una funcionalidad completamente nueva que requiere 1 semana de trabajo. El equipo ya comprometió el 80% de su capacidad. ¿Cuál es la mejor acción como Scrum Master?',
        options: [
          'Rechazar inmediatamente la solicitud para proteger el Sprint',
          'Agregar la funcionalidad y extender el Sprint a 3 semanas',
          'Facilitar una discusión entre el PO y el equipo sobre el impacto y alternativas',
          'Decidir unilateralmente qué elementos del Sprint Backlog remover'
        ],
        correctAnswer: 2,
        explanation: 'Como Scrum Master, debes facilitar la comunicación entre el PO y el equipo para evaluar opciones: agregar al siguiente Sprint, remover elementos actuales, o dividir la funcionalidad.'
      },
      {
        id: '2',
        question: 'CASO: Durante la Daily Scrum, un desarrollador menciona que está bloqueado hace 2 días esperando acceso a una API externa. El proveedor no responde emails. Otros miembros comienzan a sugerir soluciones técnicas y la reunión se extiende a 25 minutos. ¿Qué debes hacer?',
        options: [
          'Permitir que continúe la discusión hasta encontrar una solución',
          'Terminar la Daily y programar una reunión separada para resolver el impedimento',
          'Asignar la tarea de contactar al proveedor a otro miembro del equipo',
          'Documentar el problema y esperar a la próxima Daily Scrum'
        ],
        correctAnswer: 1,
        explanation: 'La Daily Scrum debe mantenerse enfocada y dentro del tiempo. Los impedimentos se identifican pero se resuelven fuera de la ceremonia.'
      },
      {
        id: '3',
        question: 'CASO: En la Sprint Review, el stakeholder principal critica duramente el incremento entregado, diciendo que "no es lo que pidió" aunque cumple con todos los criterios de aceptación definidos. El equipo se siente desmotivado. Como Scrum Master, ¿cuál es tu enfoque?',
        options: [
          'Defender al equipo y explicar que cumplieron con los requisitos',
          'Sugerir que el stakeholder no entendió los requisitos correctamente',
          'Facilitar una conversación constructiva sobre expectativas y mejorar la colaboración futura',
          'Proponer rehacer el trabajo en el próximo Sprint sin costo adicional'
        ],
        correctAnswer: 2,
        explanation: 'Es importante facilitar una conversación constructiva para entender las expectativas no expresadas y mejorar la colaboración entre el PO, stakeholders y equipo.'
      },
      {
        id: '4',
        question: 'CASO: Tu equipo ha completado 3 Sprints pero la velocidad es inconsistente: Sprint 1 (15 puntos), Sprint 2 (8 puntos), Sprint 3 (22 puntos). En la Retrospectiva, algunos miembros culpan a otros por la variabilidad. ¿Cómo facilitas esta situación?',
        options: [
          'Establecer una velocidad fija de 15 puntos para todos los Sprints futuros',
          'Identificar al miembro menos productivo y solicitar su reemplazo',
          'Facilitar una discusión sobre factores que afectan la velocidad y crear experimentos para mejorar',
          'Ignorar la velocidad y enfocarse solo en entregar funcionalidades'
        ],
        correctAnswer: 2,
        explanation: 'La Retrospectiva debe enfocarse en identificar factores sistémicos que afectan el rendimiento y crear experimentos para mejorar como equipo.'
      }
    ]
  };
  
  return baseQuestions[type] || baseQuestions.initial;
};