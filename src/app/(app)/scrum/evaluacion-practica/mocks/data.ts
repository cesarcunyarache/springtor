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
  title: "Examen Práctico: Problemas en la Gestión de Proyecto en una Empresa de Desarrollo Tecnológico.",
  description: "Metodología Scrum",
  context: ``,
  content: `
>
> 📘 **Proyecto:** Sistema de Gestión de Inventarios  
> 📍 **Ubicación:** Piura, Perú  
> 🕓 **Duración estimada:** 6 meses


Una **empresa de software en Piura** fue contratada para crear un **sistema de gestión de inventarios** para un **restaurante local**.  
El cliente necesita una solución que le permita:

- 📦 Registrar productos  
- 📉 Controlar el inventario  
- 📊 Generar reportes automáticos  
- 🛒 Facilitar las compras  

El cliente espera que el sistema esté **listo en 6 meses**.

---
---

## ⚙️ **Metodología Adoptada: Scrum**

> La empresa decidió usar **Scrum** para garantizar:  
> - ✅ Avance rápido  
> - 🗣️ Buena comunicación  
> - 🔁 Entregas constantes

### 👥 Equipo del Proyecto

| Rol | Responsabilidad principal |
|------|-----------------------------|
| **Scrum Master** | Asegurar el cumplimiento del proceso Scrum |
| **Product Owner** | Representar al cliente y definir prioridades |
| **Desarrolladores** | Implementar las funcionalidades del sistema |
| **Diseñadores** | Crear la interfaz de usuario |
| **QA/Testers** | Validar la calidad del producto |

---

## 🚀 **Fase de Implementación**

Durante las primeras etapas, el equipo comenzó con:

- 🧱 Funcionalidades básicas (registro de productos)  
- 🎨 Diseño de la interfaz  

> A pesar de seguir la metodología Scrum, **surgieron varios problemas** que impidieron el avance esperado.

---

# ⚠️ **Principales Problemas Identificados**

---

## ❌ **Problema 1: Prioridades Confusas y No Alineadas con el Cliente**
  
> El Product Owner entregó una lista de tareas (Product Backlog), pero no se discutieron las prioridades correctamente.

**Consecuencias:**

- Se trabajó en tareas no urgentes (como optimización del rendimiento).  
- Se descuidaron funciones prioritarias (como generación de reportes automáticos).  
- 🧾 El cliente se mostró **molesto** al final del sprint por no obtener lo que más necesitaba.

---

## ⏱️ **Problema 2: Estimaciones de Tiempo Incorrectas**

> Las tareas fueron mal estimadas en duración y complejidad, lo que afectó los plazos.

**Ejemplo:**

| Tarea | Estimación | Tiempo real | Diferencia |
|-------|-------------|-------------|-------------|
| Conectar base de datos externa | 5 días | 10 días | +100% |

**Efecto:**  
⏳ Retrasos en las entregas → 😣 Presión por cumplir los plazos.

---

## 🎯 **Problema 3: Falta de Claridad en los Objetivos del Sprint**

- No se definió un **Sprint Goal** claro.  
- El equipo no tenía una referencia para medir el éxito del sprint.  
- ❌ El **Definition of Done** era ambiguo y no comprendido por todos.  

> Resultado: El cliente recibió entregas **incompletas** y **fuera de sus expectativas**.

---

## 🧱 **Problema 4: No se Resuelven los Bloqueos Rápidamente**

> Los bloqueos se mencionaban en los *daily stand-ups*, pero no se solucionaban de inmediato.

**Ejemplo:**  
🎨 El equipo de diseño no podía avanzar sin las especificaciones,  
pero los desarrolladores continuaron con otras tareas sin resolver el problema.

**Consecuencia:**  
- ⏰ Tiempos muertos  
- 🧩 Tareas incompletas  

---

## 🔁 **Problema 5: Poca Reflexión y Mejora Continua**

> Durante la **retrospectiva**, el equipo identificó problemas, pero **no tomó acciones concretas** para solucionarlos.

➡️ Los mismos errores se repitieron en los siguientes sprints.

---

## 👥 **Problema 6: Roles Confusos y Mala Coordinación**

| Situación | Problema |
|------------|-----------|
| 🧑‍💼 El Product Owner revisa código | Está haciendo tareas técnicas en lugar de priorizar |
| 👨‍💻 Desarrolladores hablan directamente con el cliente | Descoordinación en expectativas |
| 🧭 Scrum Master pasivo | No corrige la mala asignación de roles |

> Resultado: **Confusión, desorganización y pérdida de enfoque**.

---

## 🧩 **Problema 7: Historias de Usuario Mal Definidas**

> Las historias de usuario carecen de detalles y contexto técnico, dificultando el desarrollo correcto.

**Ejemplo de historia deficiente:**
> “Como usuario, quiero registrar un producto en el sistema.”

**Faltó especificar:**
- 🔢 Validaciones de datos  
- ⚙️ Comportamiento ante errores  
- 🔁 Flujo cuando el producto ya existe  

**Consecuencia:**  
- 🔄 Confusión y retrabajo  
- 🚫 Implementaciones incompletas

---

## 🧰 **Problema 8: Falta de Uso de Herramientas de Gestión**

> El equipo **no utiliza herramientas como Jira o Trello**, lo que genera desorganización.

**Efectos:**
- 🔍 Dificultad para seguir el progreso  
- 📋 Tareas olvidadas o mal asignadas  
- ❌ Falta de visibilidad general del sprint

---

## 📆 **Problema 9: Omisión de Fases de Scrum**

> Aunque existen reuniones, **no se cumplen correctamente** las fases de Scrum.

| Fase de Scrum | Estado Actual | Problema |
|----------------|----------------|-----------|
| 📅 Sprint Planning | Incompleta | No se definen objetivos claros |
| ☀️ Daily Stand-up | Presente | No se resuelven bloqueos |
| 🧪 Sprint Review | Presente | Falta de criterios de aceptación claros |
| 🔄 Retrospectiva | Parcial | No se generan acciones de mejora |

---

## 💭 **Problema 10: Falta de Comprensión del Propósito**

> Los desarrolladores desconocen **el impacto de sus tareas** en el negocio.

**Ejemplo:**
> Se desarrolla la función de registro sin saber cómo influye en la gestión del restaurante.

**Consecuencias:**
- 💻 Trabajo mecánico sin propósito  
- 🧩 Funcionalidades irrelevantes  
- 😞 Cliente insatisfecho con los resultados  

---

# 🧠 **Conclusión del Caso**

> A pesar de implementar Scrum, el equipo enfrenta múltiples dificultades que limitan el éxito del proyecto.

### 🔍 Principales causas:

- ❌ Falta de comprensión del propósito del proyecto  
- 🔄 Mala asignación de roles  
- ⚠️ Priorización incorrecta  
- 📋 Historias de usuario mal definidas  
- 🧰 Ausencia de herramientas de gestión  
- 🧩 Falta de adherencia a las fases de Scrum  

---

> **Conclusión final:**  
> Si el equipo mejora la comunicación, organiza sus roles, utiliza herramientas adecuadas y sigue correctamente las fases de Scrum, podrá avanzar de forma más estructurada y cumplir con las expectativas del cliente.
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
