import { PracticalCase, UserStory, BacklogItem } from '../types';

export const practicalCases: PracticalCase[] = [
  {
    id: 'ecommerce-sprint-planning',
    title: 'Planificación de Sprint - E-commerce',
    description: 'Analiza y mejora la planificación de un Sprint para una plataforma de e-commerce',
    scenario: `
      Eres el Scrum Master de un equipo que desarrolla una plataforma de e-commerce. 
      El equipo tiene 6 desarrolladores y trabaja en Sprints de 2 semanas. 
      El Product Owner ha preparado historias de usuario para el próximo Sprint, 
      pero hay varios problemas que necesitas identificar y corregir.
    `,
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
        description: 'Evalúa estas historias de usuario según los criterios INVEST y propón mejoras',
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
              description: 'Como usuario quiero un carrito de compras que me permita agregar productos, modificar cantidades, aplicar cupones de descuento, calcular impuestos según mi ubicación, guardar para más tarde, compartir mi carrito, sincronizar entre dispositivos y recibir recomendaciones personalizadas',
              acceptanceCriteria: [
                'Agregar productos al carrito',
                'Modificar cantidades',
                'Aplicar cupones',
                'Calcular impuestos',
                'Guardar carrito',
                'Compartir carrito',
                'Sincronización',
                'Recomendaciones'
              ],
              storyPoints: 21,
              priority: 'medium',
              issues: ['Muy grande', 'Múltiples funcionalidades', 'Debe dividirse']
            }
          ]
        }
      },
      {
        id: 'backlog-prioritization',
        type: 'backlog-prioritization',
        title: 'Priorización del Sprint Backlog',
        description: 'Reorganiza las tareas según dependencias, valor de negocio y capacidad del equipo',
        maxScore: 25,
        data: {
          items: [
            {
              id: 'TASK-001',
              title: 'Implementar notificaciones push',
              description: 'Sistema de notificaciones para promociones',
              storyPoints: 5,
              priority: 1,
              dependencies: ['TASK-003'],
              status: 'todo',
              assignee: undefined
            },
            {
              id: 'TASK-002',
              title: 'Optimizar base de datos',
              description: 'Mejorar rendimiento de consultas',
              storyPoints: 8,
              priority: 2,
              dependencies: [],
              status: 'todo',
              assignee: undefined
            },
            {
              id: 'TASK-003',
              title: 'Configurar servidor de notificaciones',
              description: 'Setup inicial del servicio',
              storyPoints: 3,
              priority: 3,
              dependencies: [],
              status: 'todo',
              assignee: undefined
            },
            {
              id: 'TASK-004',
              title: 'Diseño de interfaz de admin',
              description: 'Mockups y prototipos',
              storyPoints: 13,
              priority: 4,
              dependencies: ['TASK-005'],
              status: 'todo',
              assignee: undefined
            },
            {
              id: 'TASK-005',
              title: 'Investigación UX para admin',
              description: 'Análisis de necesidades de usuarios admin',
              storyPoints: 5,
              priority: 5,
              dependencies: [],
              status: 'todo',
              assignee: undefined
            }
          ],
          teamCapacity: 40,
          sprintGoal: 'Mejorar la experiencia de administración y notificaciones'
        }
      },
      {
        id: 'retrospective-analysis',
        type: 'retrospective-analysis',
        title: 'Análisis de Retrospectiva',
        description: 'Identifica problemas en esta retrospectiva y propón mejoras para la facilitación',
        maxScore: 25,
        data: {
          scenario: `
            Durante la retrospectiva del Sprint pasado ocurrieron los siguientes eventos:
            
            1. El Product Owner dominó la conversación durante 20 minutos explicando por qué ciertas funcionalidades no se completaron.
            2. Dos desarrolladores se culparon mutuamente por un bug crítico que apareció en producción.
            3. El Scrum Master no intervino y permitió que la discusión se volviera personal.
            4. No se definieron acciones concretas para el próximo Sprint.
            5. La reunión duró 2 horas (el doble del tiempo planificado).
            6. Algunos miembros del equipo no participaron y se veían desinteresados.
          `,
          questions: [
            'Identifica al menos 3 problemas principales en esta retrospectiva',
            'Como Scrum Master, ¿qué técnicas usarías para mejorar la participación?',
            '¿Cómo manejarías el conflicto entre los desarrolladores?',
            'Propón una estructura mejorada para la próxima retrospectiva'
          ]
        }
      },
      {
        id: 'story-improvement',
        type: 'text-improvement',
        title: 'Mejora de Historia de Usuario',
        description: 'Reescribe esta historia de usuario siguiendo el formato INVEST',
        maxScore: 20,
        data: {
          originalStory: {
            title: 'Búsqueda',
            description: 'Los usuarios necesitan buscar productos',
            acceptanceCriteria: ['Que funcione la búsqueda']
          },
          context: 'E-commerce con 10,000+ productos, usuarios frecuentes que buscan productos específicos',
          hints: [
            'Define quién es el usuario específico',
            'Explica el valor de negocio',
            'Detalla criterios de aceptación medibles',
            'Considera diferentes escenarios de búsqueda'
          ]
        }
      }
    ]
  }
];

export const getPracticalCase = (caseId: string): PracticalCase | undefined => {
  return practicalCases.find(c => c.id === caseId);
};