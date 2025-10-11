import { PracticeCase } from "../types";

export const teamMembers: string[] = [
  "Thalia",
  "César",
  "María",
  "Pedro",
  "Ana",
  "Luis",
];

export const questions: {
  id: number;
  question: string;
  type: "multiple" | "text";
  options?: string[];
}[] = [
  {
    id: 1,
    question:
      "¿Cuál es la duración recomendada para un Sprint en un equipo nuevo?",
    type: "multiple",
    options: ["1 semana", "2 semanas", "4 semanas", "6 semanas"],
  },
  {
    id: 2,
    question: "Explica la diferencia entre Product Backlog y Sprint Backlog",
    type: "text",
  },
  {
    id: 3,
    question: "¿Quién es responsable de priorizar el Product Backlog?",
    type: "multiple",
    options: [
      "Scrum Master",
      "Product Owner",
      "Development Team",
      "Stakeholders",
    ],
  },
  {
    id: 4,
    question:
      "¿Por qué es importante descomponer las historias de usuario en tareas técnicas?",
    type: "text",
  },
];

export const assesmentPractice: PracticeCase = {
  id: "60be01ff-2d07-459f-8da1-9b18299ae43b",
  slug: "sprint-planning-practice",
  title: "Examen Práctico: Problemas en la Gestión de un Proyecto Scrum",
  description: "Metodología Scrum",
  context: `Una **empresa de software en Piura** fue contratada para crear un **sistema de gestión de inventarios** para un **restaurante local**. El cliente necesita una solución que le permita **registrar productos**, **controlar el inventario**, **generar reportes automáticos** y **facilitar las compras**.  
El cliente desea que el sistema esté listo en **6 meses**.

La empresa decidió usar la **metodología Scrum** para asegurarse de que el proyecto avance **rápidamente**, con **buena comunicación** y **entregas constantes**.  
El equipo está compuesto por **desarrolladores**, **diseñadores**, **personas encargadas de las pruebas** y un **Scrum Master**, quien se asegura de que todos sigan el proceso.  
El **Product Owner** es el responsable de **representar al cliente** y **establecer las prioridades del proyecto**.
`,

  content: `# 🧩 Fase de Implementación

Durante las primeras etapas del proyecto, el equipo comenzó a trabajar en las **funcionalidades básicas del sistema**, como **registrar productos** y **diseñar la interfaz**.  
Sin embargo, a pesar de seguir la metodología **Scrum**, comenzaron a surgir varios **problemas** que hicieron que el proyecto no avanzara como se esperaba.

---

## ⚠️ Problema 1: Prioridades Confusas y No Alineadas con el Cliente

El equipo empezó a trabajar en varias tareas, pero **no tenían claro qué era lo más importante para el cliente**.  
Aunque el **Product Owner** entregó una lista de cosas por hacer (**Product Backlog**), **no se discutieron adecuadamente las prioridades**.

Por ejemplo, el equipo mejoró el **rendimiento del sistema**, pero el cliente necesitaba con urgencia la **función para generar reportes automáticos**.  
Al final del sprint, el reporte no estaba listo, lo que **molestó y frustró al cliente**.

---

## ⚠️ Problema 2: Estimaciones de Tiempo Incorrectas

El equipo tuvo **problemas al estimar el tiempo de cada tarea**.  
Aunque se asignaron puntos a cada una, las **estimaciones fueron poco precisas**.

Por ejemplo, conectar el sistema con una base de datos externa se estimó en **5 días**, pero tomó **el doble de tiempo** debido a la complejidad técnica.  
Esto causó **retrasos y presión** para cumplir con los plazos.

---

## ⚠️ Problema 3: Falta de Claridad en los Objetivos del Sprint

El equipo realizó reuniones de planificación, pero el **Sprint Goal** no estaba bien definido.  
Durante la **revisión del sprint**, se dieron cuenta de que **no existía un objetivo específico** para medir el éxito del trabajo.

Además, el **Definition of Done (DoD)** no era comprendido por todos, lo que causó **entregas incompletas y confusión**.  
El cliente, por tanto, **no quedó satisfecho con los resultados**.

---

## ⚠️ Problema 4: No se Resuelven los Bloqueos Rápidamente

Durante los **Daily Stand-ups**, el equipo mencionaba bloqueos, pero **no se resolvían a tiempo**.  
Por ejemplo, el equipo de diseño no tenía especificaciones completas para avanzar con la interfaz, y aun así el desarrollo continuó con otras tareas, generando **tiempos muertos y tareas incompletas**.

---

## ⚠️ Problema 5: Poca Reflexión y Mejora Continua

En la **retrospectiva**, el equipo reconoció problemas como la **mala priorización** y las **estimaciones erróneas**,  
pero **no se definieron acciones concretas** para mejorar en el siguiente sprint.  
Como resultado, **los mismos errores se repitieron** en los sprints posteriores.

---

## ⚠️ Problema 6: Roles Confusos y Mala Coordinación

El equipo no tiene **claridad en la asignación de roles**, lo que genera **desorganización**.

- El **Product Owner** realiza tareas técnicas, como **revisar código**, en lugar de **priorizar el trabajo del cliente**.  
- Los **desarrolladores** se comunican directamente con el cliente, lo cual **rompe el flujo de comunicación de Scrum**.  
- El **Scrum Master** no interviene adecuadamente para corregir estas desviaciones ni mejorar la organización del equipo.

---

## ⚠️ Problema 7: Historias de Usuario Mal Definidas

Las **historias de usuario** entregadas por el Product Owner son **demasiado generales** o **carecen de detalles**.  

Ejemplo:  
> “Como usuario, quiero registrar un producto en el sistema.”

No se especifican **validaciones, flujos de acción** o **comportamientos esperados**.  
Esto causa **confusión y retrabajos** en el desarrollo, afectando la calidad de las entregas.

---

## ⚠️ Problema 8: Falta de Uso de Herramientas de Gestión

El equipo no utiliza **herramientas de gestión de proyectos** como **Jira o Trello**.  
Esto impide tener una **visión clara del avance**, los **plazos** y las **tareas pendientes**.  
Como consecuencia, se pierden asignaciones y **no se hace seguimiento adecuado al progreso**.

---

## ⚠️ Problema 9: Omisión de Fases de Scrum

El equipo no está aplicando correctamente **todas las fases de Scrum**.  
Las **retrospectivas** se realizan de forma incompleta o se omiten.  
Además, las **reuniones de planificación** carecen de estructura, lo que genera **falta de claridad sobre las prioridades del sprint**.

---

## ⚠️ Problema 10: Falta de Comprensión del Propósito

Los **desarrolladores no comprenden el propósito de las funcionalidades**.  
Trabajan de forma mecánica, sin entender **por qué** o **para qué** se implementan ciertas tareas.  

Por ejemplo, se enfocan en detalles técnicos sin valor para el cliente, mientras **funciones críticas** como la gestión de inventarios y reportes **quedan incompletas**.  
Esto provoca **productos finales que no satisfacen las necesidades reales del cliente**.

---

# 🧭 Conclusión del Caso

Aunque el equipo intenta implementar **Scrum**, enfrenta múltiples **problemas de comunicación, priorización y definición de roles**.  
La **falta de herramientas**, la **mala definición de historias de usuario** y la **ausencia de mejora continua** han causado **retrasos y entregables incompletos**.

Para mejorar, el equipo debe:
- **Usar herramientas de gestión** adecuadas (Jira, Trello).  
- **Definir correctamente las historias de usuario**.  
- **Establecer objetivos claros y medibles** por sprint.  
- **Fortalecer la comunicación** entre los roles de Scrum.  
- **Aplicar todas las ceremonias** del marco Scrum.

Solo así podrán **organizar su trabajo** y **cumplir las expectativas del cliente**.
`,
};

export const completePracticeCase = {
  metadata: {
    examName: "Examen Práctico: Sprint Planning Completo",
    projectName: "EcoMarket",
    sprintNumber: 3,
    sprintDuration: "2 semanas",
    previousVelocity: 34,
    submittedAt: "2025-10-11T20:27:02.383Z",
  },
  userStories: [
    {
      id: 1760213776213,
      title: "Autenticación de usuarios",
      asA: "usuario nuevo",
      iWant: "registrarme con correo y contraseña",
      soThat: "pueda acceder al sistema de forma segura",
      acceptanceCriteria: [
        "Debe validar que el correo sea único",
        "La contraseña debe tener mínimo 8 caracteres",
        "Debe mostrar mensaje de confirmación tras el registro",
      ],
      priority: "Alta",
      priorityJustification:
        "Sin autenticación no se puede acceder al resto de funcionalidades del sistema.",
    },
    {
      id: 1760213776214,
      title: "Creación de tareas",
      asA: "usuario autenticado",
      iWant: "crear nuevas tareas con título y descripción",
      soThat: "pueda organizar mis pendientes",
      acceptanceCriteria: [
        "El título es obligatorio",
        "La descripción es opcional",
        "Debe guardar automáticamente en la base de datos",
      ],
      priority: "Media",
      priorityJustification:
        "Es parte del flujo principal, pero depende de la autenticación.",
    },
  ],

  productBacklog: [
    {
      id: 1760213776213,
      title: "Autenticación de usuarios",
      asA: "usuario nuevo",
      iWant: "registrarme con correo y contraseña",
      soThat: "pueda acceder al sistema de forma segura",
      acceptanceCriteria: [
        "Debe validar que el correo sea único",
        "La contraseña debe tener mínimo 8 caracteres",
        "Debe mostrar mensaje de confirmación tras el registro",
      ],
      priority: "Alta",
      priorityJustification:
        "Sin autenticación no se puede acceder al resto de funcionalidades del sistema.",
    },
    {
      id: 1760213776214,
      title: "Creación de tareas",
      asA: "usuario autenticado",
      iWant: "crear nuevas tareas con título y descripción",
      soThat: "pueda organizar mis pendientes",
      acceptanceCriteria: [
        "El título es obligatorio",
        "La descripción es opcional",
        "Debe guardar automáticamente en la base de datos",
      ],
      priority: "Media",
      priorityJustification:
        "Es parte del flujo principal, pero depende de la autenticación.",
    },
    {
      id: 1760213776215,
      title: "Filtrado de tareas",
      asA: "usuario autenticado",
      iWant: "filtrar tareas por estado y prioridad",
      soThat: "pueda enfocarme en lo más urgente",
      acceptanceCriteria: [
        "Debe permitir filtrar por 'Pendiente', 'En progreso' y 'Completada'",
        "Debe permitir filtrar por prioridad",
        "El filtro debe persistir entre sesiones",
      ],
      priority: "Baja",
      priorityJustification:
        "Es una mejora de usabilidad, no bloquea el flujo principal.",
    },
  ],
  sprintPlanning: {
    sprintGoal: "",
    sprintGoalSMART: {
      specific: "",
      measurable: "",
      achievable: "",
      relevant: "",
      timeBound: "",
    },
    selectedStoryIds: [],
    sprintBacklog: [],
  },
  estimations: {
    stories: [],
    tasks: [],
    totalStoryPoints: 0,
    totalTaskHours: 0,
  },
  impediments: [],
  sprintReview: {
    incrementDelivered: "",
    feedback: [""],
    goalComparison: "",
    dodComparison: "",
  },
  retrospective: {
    learnings: ["", "", "", ""],
    improvements: ["", ""],
  },
  theoreticalQuestions: [
    {
      question:
        "¿Cuál es la duración recomendada para un Sprint en un equipo nuevo?",
      answer: "",
    },
    {
      question: "Explica la diferencia entre Product Backlog y Sprint Backlog",
      answer: "",
    },
    {
      question: "¿Quién es responsable de priorizar el Product Backlog?",
      answer: "",
    },
    {
      question:
        "¿Por qué es importante descomponer las historias de usuario en tareas técnicas?",
      answer: "",
    },
  ],
  summary: {
    totalStoriesCreated: 1,
    totalStoriesSelected: 0,
    totalTasksCreated: 0,
    totalImpediments: 0,
    questionsAnswered: 0,
    totalQuestions: 4,
    completionPercentage: 0,
  },
};
