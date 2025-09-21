// scripts/resetAndSeed.ts

import { Client } from "pg";
import * as schema from "../schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { db } from "../index";
import dotenv from "dotenv";
import { Assessment } from "../schema";
import { features } from "process";


const assessmentPreTest = {
  id: "60be81ff-2d07-4599-8da1-9b18099ae43b",
  title: "Examen de Conocimientos Scrum",
  description:
    "Pre-Test/Post-Test sobre comprensión de roles, eventos y artefactos del marco Scrum.",
};

const assessmentLesson = {
  id: "60be01ff-2d07-459f-8da1-9b18299ae43b",
  title: "Lession test",
  description: "Lession test",
};

/* const questionsData = [
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
})); */

const questionsData = [
  {
    question: "¿Cuál es el rol principal del Scrum Master en un equipo Scrum?",
    options: [
      "Asegurarse de que se cumplan los plazos",
      "Eliminar impedimentos y facilitar el marco de trabajo",
      "Asignar tareas a cada miembro del equipo",
      "Supervisar y evaluar el desempeño individual",
    ],
    answer: "B",
    assessmentId: assessmentLesson.id,
  },
  {
    question:
      "¿Qué artefacto de Scrum representa el trabajo pendiente del producto?",
    options: [
      "Product Backlog",
      "Sprint Backlog",
      "Incremento",
      "Burndown Chart",
    ],
    answer: "A",
    assessmentId: assessmentLesson.id,
  },
  {
    question: "¿Cuál es la duración recomendada para un Sprint en Scrum?",
    options: [
      "Un máximo de un mes",
      "Exactamente dos semanas",
      "Entre uno y seis meses",
      "El tiempo que el Product Owner considere necesario",
    ],
    answer: "A",
    assessmentId: assessmentLesson.id,
  },
  {
    question:
      "¿Qué evento de Scrum se utiliza para inspeccionar el incremento y adaptar el Product Backlog si es necesario?",
    options: [
      "Daily Scrum",
      "Sprint Retrospective",
      "Sprint Review",
      "Refinamiento del Backlog",
    ],
    answer: "C",
    assessmentId: assessmentLesson.id,
  },
];

const seed = [
  {
    id: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
    slug: "scrum",
    title: "Scrum",
    description: "Aprende Scrum desde los fundamentos hasta la maestría.",
    learningSteps: [
      {
        id: "8d4c5c27-32d6-4b5b-b24b-bb8c7c3d7c91",
        name: "Introducción a Scrum",
        level: 1,
        topics: [
          {
            id: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
            title: "Fundamentos de la Agilidad",
            subtitle: "",
            slug: "fundamentos-de-la-agilidad",
            description:
              "Aprende los valores y fundamentos que impulsan la agilidad en proyectos y equipos.",
            content: "",
            icont: "rocket",
            level: 1,
            features: [
              "Valores del Manifiesto Ágil",
              "Principios de la agilidad",
              "Beneficios de la agilidad",
              "Colaboración y adaptación",
            ],
            modules: [
              {
                id: "5f834a31-7ddb-4f19-a2be-60945e646605",
                title: "¿Qué es la Agilidad?",
                level: 1,
                lessons: [
                  {
                    id: "922cba69-3abf-4d65-8aee-07e57b1a89b0",
                    title: "Introducción  a la Agilidad",
                    slug: "introducción-a-la-gilidad",
                    level: 1,
                    content: "",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];


async function main() {
  dotenv.config();
 console.log("🗑️ Limpiando base de datos...");

  // El orden importa por las FK: primero hijos, luego padres
  await db.delete(schema.lessons);
  await db.delete(schema.modules);
  await db.delete(schema.topics);
  await db.delete(schema.learningSteps);
  await db.delete(schema.roadmaps);
  await db.delete(schema.questions);
  await db.delete(schema.assessments);

  console.log("🌱 Seeding...");

  const { roadmaps, steps, topics, modules, lessons } = flattenSeed(seed);

  await db.insert(schema.roadmaps).values(roadmaps);
  await db.insert(schema.learningSteps).values(steps);
  await db.insert(schema.topics).values(topics);
  await db.insert(schema.modules).values(modules);
  await db.insert(schema.lessons).values(lessons);

  await db.insert(schema.assessments).values(assessmentLesson);
  await db.insert(schema.questions).values(questionsData);

  console.log("✅ Seed successful");
  /* await client.end(); */
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


function flattenSeed(seed: any) {
  const roadmaps: any[] = [];
  const steps: any[] = [];
  const topics: any[] = [];
  const modules: any[] = [];
  const lessons: any[] = [];

  for (const roadmap of seed) {
    roadmaps.push({
      id: roadmap.id,
      slug: roadmap.slug,
      title: roadmap.title,
      description: roadmap.description,
    });

    for (const step of roadmap.learningSteps) {
      steps.push({
        id: step.id,
        roadmapId: roadmap.id, // 🔑 relación
        name: step.name,
        level: step.level,
      });

      for (const topic of step.topics) {
        topics.push({
          id: topic.id,
          stepId: step.id, // 🔑 relación
          roadmapId: roadmap.id, // 🔑 relación
          title: topic.title,
          slug: topic.slug,
          description: topic.description,
          level: topic.level,
          features: topic.features,
          icon: topic.icon,
        });

        for (const module of topic.modules) {
          modules.push({
            id: module.id,
            topicId: topic.id, // 🔑 relación
            title: module.title,
            level: module.level,
          });

          for (const lesson of module.lessons) {
            lessons.push({
              id: lesson.id,
              moduleId: module.id, // 🔑 relación
              title: lesson.title,
              slug: lesson.slug,
              level: lesson.level,
              content: lesson.content,
            });
          }
        }
      }
    }
  }

  return { roadmaps, steps, topics, modules, lessons };
}
