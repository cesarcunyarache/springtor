// scripts/resetAndSeed.ts

import { Client } from "pg";
import * as schema from "../schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { db } from "../index";
import dotenv from "dotenv";
import { Assessment } from "../schema";

// Datos iniciales
const roadmaps = [
  {
    id: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    slug: "scrum-roadmap",
    title: "Roadmap de Scrum",
    description: "Aprende Scrum desde los fundamentos hasta la maestría.",
  },
];

const learningSteps = [
  {
    id: "8d4c5c27-32d6-4b5b-b24b-bb8c7c3d7c91",
    name: "Inicio",
    description: "Punto de partida del aprendizaje de Scrum.",
  },
  {
    id: "3fa0c25f-b87b-47f4-a763-b9d1d487ef51",
    name: "Fundamentos",
    description: "Principios y valores esenciales de Scrum.",
  },
  {
    id: "13f7cf90-7357-4b9a-8f67-99a1e92d8b2b",
    name: "Roles",
    description: "Roles esenciales dentro de Scrum.",
  },
  {
    id: "a4a226d6-ef16-4b52-8b28-d7cf22992eb1",
    name: "Eventos",
    description: "Eventos clave para el desarrollo ágil.",
  },
  {
    id: "29b5c88b-23e8-4e69-8d4a-3b0b0e62a8e5",
    name: "Artefactos",
    description: "Artefactos que ayudan a gestionar el trabajo.",
  },
  {
    id: "f25b62ff-3f15-4829-9238-780cc5464971",
    name: "Maestría",
    description: "Dominio completo del marco Scrum.",
  },
];

const topics = [
  {
    id: "intro-scrum",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "intro-scrum",
    title: "Introducción a Scrum",
    description: "Principios y valores ágiles",
    content: null,
    icon: "🎯",
    level: 1,
    stepId: "8d4c5c27-32d6-4b5b-b24b-bb8c7c3d7c91",
  },
  {
    id: "agile-mindset",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "agile-mindset",
    title: "Mentalidad Ágil",
    description: "Manifiesto y valores",
    content: null,
    icon: "🧠",
    level: 1,
    stepId: "8d4c5c27-32d6-4b5b-b24b-bb8c7c3d7c91",
  },
  {
    id: "product-owner",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "product-owner",
    title: "Product Owner",
    description: "Dueño del producto",
    content: null,
    icon: "👑",
    level: 2,
    stepId: "13f7cf90-7357-4b9a-8f67-99a1e92d8b2b",
  },
  {
    id: "scrum-master",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "scrum-master",
    title: "Scrum Master",
    description: "Facilitador del proceso",
    content: null,
    icon: "🎓",
    level: 2,
    stepId: "13f7cf90-7357-4b9a-8f67-99a1e92d8b2b",
  },
  {
    id: "dev-team",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "dev-team",
    title: "Development Team",
    description: "Equipo de desarrollo",
    content: null,
    icon: "👥",
    level: 2,
    stepId: "13f7cf90-7357-4b9a-8f67-99a1e92d8b2b",
  },
  {
    id: "sprint-planning",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "sprint-planning",
    title: "Sprint Planning",
    description: "Planificación del Sprint",
    content: null,
    icon: "📋",
    level: 3,
    stepId: "a4a226d6-ef16-4b52-8b28-d7cf22992eb1",
  },
  {
    id: "daily-scrum",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "daily-scrum",
    title: "Daily Scrum",
    description: "Reunión diaria",
    content: null,
    icon: "☀️",
    level: 3,
    stepId: "a4a226d6-ef16-4b52-8b28-d7cf22992eb1",
  },
  {
    id: "sprint-review",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "sprint-review",
    title: "Sprint Review",
    description: "Revisión del Sprint",
    content: null,
    icon: "👀",
    level: 3,
    stepId: "a4a226d6-ef16-4b52-8b28-d7cf22992eb1",
  },
  {
    id: "sprint-retrospective",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "sprint-retrospective",
    title: "Sprint Retrospective",
    description: "Retrospectiva del equipo",
    content: null,
    icon: "🔄",
    level: 3,
    stepId: "a4a226d6-ef16-4b52-8b28-d7cf22992eb1",
  },
  {
    id: "product-backlog",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "product-backlog",
    title: "Product Backlog",
    description: "Lista de funcionalidades",
    content: null,
    icon: "📊",
    level: 4,
    stepId: "29b5c88b-23e8-4e69-8d4a-3b0b0e62a8e5",
  },
  {
    id: "increment",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "increment",
    title: "Increment",
    description: "Producto funcional",
    content: null,
    icon: "🚀",
    level: 4,
    stepId: "29b5c88b-23e8-4e69-8d4a-3b0b0e62a8e5",
  },
  {
    id: "sprint-backlog",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "sprint-backlog",
    title: "Sprint Backlog",
    description: "Trabajo del Sprint",
    content: null,
    icon: "📈",
    level: 4,
    stepId: "29b5c88b-23e8-4e69-8d4a-3b0b0e62a8e5",
  },
  {
    id: "scrum-mastery",
    roadmapId: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    parentId: null,
    slug: "scrum-mastery",
    title: "Maestría en Scrum",
    description: "Dominio completo",
    content: null,
    icon: "🏆",
    level: 5,
    stepId: "f25b62ff-3f15-4829-9238-780cc5464971",
  },
];

const modules = [
  {
    id: "mod-intro-scrum-1",
    topicId: "intro-scrum",
    title: "Introducción a Scrum - Módulo 1",
    description: "Primer módulo de Introducción a Scrum",
  },
  {
    id: "mod-intro-scrum-2",
    topicId: "intro-scrum",
    title: "Introducción a Scrum - Módulo 2",
    description: "Segundo módulo de Introducción a Scrum",
  },
  {
    id: "mod-agile-mindset-1",
    topicId: "agile-mindset",
    title: "Mentalidad Ágil - Módulo 1",
    description: "Primer módulo de Mentalidad Ágil",
  },
  {
    id: "mod-agile-mindset-2",
    topicId: "agile-mindset",
    title: "Mentalidad Ágil - Módulo 2",
    description: "Segundo módulo de Mentalidad Ágil",
  },
];

const lessons = [
  {
    id: "lesson-intro-scrum-1-1",
    moduleId: "mod-intro-scrum-1",
    title: "Lección 1 - Conceptos básicos",
    slug: "intro-scrum-mod1-lesson1",
    description: "Primera lección del módulo 1 de Introducción a Scrum",
    videoUrl: null,
    loomUrl: null,
    content: "",
  },
  {
    id: "lesson-intro-scrum-1-2",
    moduleId: "mod-intro-scrum-1",
    title: "Lección 2 - Valores ágiles",
    slug: "intro-scrum-mod1-lesson2",
    description: "Segunda lección del módulo 1 de Introducción a Scrum",
    videoUrl: null,
    loomUrl: null,
    content: "",
  },
  {
    id: "lesson-intro-scrum-1-3",
    moduleId: "mod-intro-scrum-1",
    title: "Lección 3 - Principios de Scrum",
    slug: "intro-scrum-mod1-lesson3",
    description: "Tercera lección del módulo 1 de Introducción a Scrum",
    videoUrl: null,
    loomUrl: null,
    content: "",
  },

  {
    id: "lesson-intro-scrum-2-1",
    moduleId: "mod-intro-scrum-2",
    title: "Lección 1 - Historia de Scrum",
    slug: "intro-scrum-mod2-lesson1",
    description: "Primera lección del módulo 2 de Introducción a Scrum",
    videoUrl: null,
    loomUrl: null,
    content: "",
  },
  {
    id: "lesson-intro-scrum-2-2",
    moduleId: "mod-intro-scrum-2",
    title: "Lección 2 - Marcos ágiles relacionados",
    slug: "intro-scrum-mod2-lesson2",
    description: "Segunda lección del módulo 2 de Introducción a Scrum",
    videoUrl: null,
    loomUrl: null,
    content: "",
  },
  {
    id: "lesson-intro-scrum-2-3",
    moduleId: "mod-intro-scrum-2",
    title: "Lección 3 - Aplicaciones de Scrum",
    slug: "intro-scrum-mod2-lesson3",
    description: "Tercera lección del módulo 2 de Introducción a Scrum",
    videoUrl: null,
    loomUrl: null,
    content: "",
  },
];

const assessment = {
  id: crypto.randomUUID(),
  title: "Examen de Conocimientos Scrum",
  description: "Pre-Test/Post-Test sobre comprensión de roles, eventos y artefactos del marco Scrum.",
};

const questionsData = [
  {
    assessmentId: assessment.id,
    question: "¿Quién facilita el cumplimiento de las reglas de Scrum y ayuda a eliminar impedimentos?",
    options: ["Scrum Master", "Product Owner", "Stakeholders"],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cuál es la responsabilidad principal del Product Owner?",
    options: ["Guiar la Daily Scrum", "Eliminar impedimentos", "Asegurar el valor del producto"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿Qué rol es el único responsable de ordenar y priorizar el Product Backlog?",
    options: ["Developers", "Scrum Master", "Product Owner"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿Quién modera y guía los eventos de Scrum cuando el equipo lo solicita?",
    options: ["Gerencia de TI", "Product Owner", "Scrum Master"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿Qué debe quedar claro al término de la Sprint Planning?",
    options: ["Cuántos días dura el proyecto", "Qué se entregará en el Sprint y cómo se trabajará", "Cuántos días dura el proyecto"],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question: "Si en la mitad de la ejecución de un Sprint surge un problema de alta prioridad, ¿qué hace el equipo?",
    options: [
      "Pide al Scrum Master que suspenda todo y lo atiende el mismo",
      "Pide al Product Owner ajustar meta o contenidos del Sprint",
      "Pide al Product Owner terminar lo planificado y luego lo atiende",
    ],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cuál es el objetivo de la Daily Scrum?",
    options: ["Inspeccionar el avance hacia la meta del Sprint y ajustar el plan", "Asignar tareas al equipo", "Presentar el incremento terminado"],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "En la Sprint Review se inspecciona principalmente:",
    options: ["El incremento terminado", "El código fuente", "Las métricas de rendimiento"],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cuál es la duración máxima recomendada de la Daily Scrum?",
    options: ["1 hora", "30 min", "15 min"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cuál de estos NO es un evento oficial de Scrum?",
    options: ["Sprint Execution Meeting", "Sprint Retrospective", "Sprint Review"],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Para qué sirve la Sprint Retrospective?",
    options: [
      "Revisar el incremento con clientes",
      "Planificar el siguiente Sprint",
      "Inspeccionar el proceso y acordar mejoras",
    ],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿En qué caso se puede cancelar un Sprint?",
    options: [
      "Solo si el Product Owner lo decide y lo justifica",
      "A mitad de Sprint sin diálogo",
      "Cuando el líder del equipo lo pida",
    ],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "Al final de la Sprint Planning el equipo debe tener:",
    options: ["Un incremento entregable", "Solo una lista de tareas terminadas", "Un objetivo claro de Sprint y un plan para lograrlo"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "¿Qué artefacto muestra en tiempo real el trabajo que queda por hacer en el Sprint?",
    options: ["Product Backlog", "Sprint Backlog", "Release Plan"],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question: "¿Qué garantiza que el incremento cumple con el nivel de calidad acordado?",
    options: ["Definition of Done", "Sprint Backlog", "Product Backlog"],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Con qué frecuencia el equipo debe refinar el Product Backlog?",
    options: ["Seguidamente, según lo necesite el equipo", "Solo al inicio del proyecto", "Una vez a la semana"],
    answer: "A",
  },
  {
    assessmentId: assessment.id,
    question: "¿Quién puede proponer cambios al Sprint Backlog durante el Sprint?",
    options: [
      "El Scrum Master con los Developers",
      "El Product Owner junto con los Developers",
      "El Product Owner junto con el Scrum Master",
    ],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question: "Durante el Backlog Refinement el equipo actualiza principalmente:",
    options: [
      "Ítems del Product Backlog con más detalle para el Sprint Goal",
      "Ítems del Product Backlog con más detalle y estimaciones",
      "Ítems del Product Backlog con más detalle para la Definition of Done",
    ],
    answer: "B",
  },
  {
    assessmentId: assessment.id,
    question: "¿Cómo se describe mejor al Product Backlog?",
    options: ["Documento de planificación general", "Registro de horas trabajadas", "Lista ordenada con lo necesario para el producto"],
    answer: "C",
  },
  {
    assessmentId: assessment.id,
    question: "El Sprint Backlog está compuesto por:",
    options: ["Objetivos del Sprint y trabajo seleccionado", "Cronograma de proyecto", "Lista de todos los ítems del Product Backlog"],
    answer: "A",
  },
].map((q) => ({
  ...q,
  id: crypto.randomUUID(),
}));


async function main() {
  dotenv.config();
  console.log("🌱 Seeding...");
/*   await db.insert(schema.roadmaps).values(roadmaps);
  await db.insert(schema.learningSteps).values(learningSteps);
  await db.insert(schema.topics).values(topics); */
  /* await db.insert(schema.modules).values(modules);
  await db.insert(schema.lessons).values(lessons); */

  await db.insert(schema.assessments).values(assessment);
  await db.insert(schema.questions).values(questionsData);
  console.log("✅ Seed successful");
  /* await client.end(); */
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
