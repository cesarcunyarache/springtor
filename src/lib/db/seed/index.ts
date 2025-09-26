// scripts/resetAndSeed.ts

import { Client } from "pg";
import * as schema from "../schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { db } from "../index";
import dotenv from "dotenv";
import { Assessment } from "../schema";
import { features } from "process";
import { getTableColumns, SQL, sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { SQLiteTable } from "drizzle-orm/sqlite-core";
import { sl } from "date-fns/locale";

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
        name: "Fundamentos de la Agilidad",
        level: 1,
        topics: [
          {
            id: "3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f",
            title: "Agilidad en proyectos",
            subtitle: "",
            slug: "agilidad-en-proyectos",
            description:
              "Aprende los valores y fundamentos que impulsan la agilidad en proyectos y equipos.",
            content: "",
            icon: "rocket",
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
                title: "Fundamentos de Agilidad",
                level: 1,
                lessons: [
                  {
                    id: "922cba69-3abf-4d65-8aee-07e57b1a89b0",
                    title: "¿Qué es la agilidad?",
                    slug: "que-es-la-agilidad",
                    level: 1,
                    content: `
> **⚠️ Importante:**  
> Recuerda que la agilidad no elimina la planificación, solo la hace más flexible.

![imagen de agilidad](https://blog.wearedrew.co/hs-fs/hubfs/metodolog%C3%ADa%20scrum.png?width=600&height=2000&name=metodolog%C3%ADa%20scrum.png)
# Saberes Previos
- Conceptos básicos sobre la gestión de proyectos tradicionales.  
- Familiaridad con la idea de trabajo en equipo y colaboración.  

# Objetivo
- Comprender el concepto de agilidad y cómo se aplica en la gestión de proyectos.  

# Definición
Es una filosofía que permite a los equipos de trabajo adaptarse rápidamente a los cambios mediante entregas incrementales del producto.  
En lugar de seguir un plan rígido, los equipos ágiles entregan valor constantemente, aprendiendo y adaptándose con cada ciclo o iteración.  

# ¿De qué trata?

## Conceptos a Cubrir
- **Valor al cliente:** El enfoque ágil se centra en entregar valor de manera constante al cliente, asegurando que sus necesidades sean atendidas en cada ciclo.  
- **Iteración e incremento:** El trabajo se organiza en ciclos cortos (llamados sprints) donde se entrega una versión funcional del producto.  
- **Retroalimentación y aprendizaje validado:** Los equipos obtienen retroalimentación del cliente y la incorporan en el siguiente ciclo de trabajo, asegurando que el producto se ajusta a las expectativas del cliente.  
- **Adaptación al cambio:** Los equipos ágiles están preparados para adaptarse a los cambios a medida que surgen, ajustando el trabajo según el feedback o nuevas necesidades.  
- **Colaboración y autoorganización:** Los equipos ágiles se organizan de manera autónoma, colaborando estrechamente para encontrar soluciones a los problemas que surgen durante el ciclo de trabajo.  
- **Visualización del trabajo:** Se utilizan herramientas visuales como tableros (Kanban, Scrum boards) para mostrar el progreso y la carga de trabajo del equipo.  
- **Métricas ligeras:** Se miden parámetros clave como *lead time* (tiempo entre la solicitud y entrega de un elemento) y *throughput* (número de elementos completados en un periodo).  
- **Anti-patrones comunes:** Son prácticas que obstaculizan el rendimiento ágil, como la falta de comunicación, la sobrecarga de trabajo o la falta de retroalimentación regular.  

# Contenido

## 1. Propósito de la Agilidad
La agilidad se centra en entregar valor de manera continua, permitiendo que los equipos se adapten a las necesidades cambiantes del cliente y los requisitos del proyecto.  
En lugar de seguir un plan estricto, los equipos ágiles ajustan su trabajo a medida que avanzan.  

## 2. Contextos VUCA
En entornos **VUCA** (Volátil, Incierto, Complejo y Ambiguo), los enfoques ágiles son ideales, ya que permiten a los equipos reaccionar rápidamente a los cambios y ajustarse a nuevas circunstancias.  

## 3. Entrega temprana de valor
Los equipos ágiles entregan productos o características funcionales al final de cada iteración, lo que permite que el cliente vea el progreso rápidamente y proporcione retroalimentación.
                    `,
                  },
                  {
                    id: "b21ac7f9-df71-42c6-b836-6fbca5aef8f7",
                    title: "Manifiesto Ágil",
                    slug: "manifiesto-agil",
                    level: 2,
                    content: ``,
                  },
                  {
                    id: "c6a0e214-45f1-44b1-8f34-6a2b5207c91b",
                    title: "¿Cuándo usar enfoques ágiles?",
                    slug: "cuando-usar-enfoques-agiles",
                    level: 3,
                    content: ``,
                  },
                ],
              },
            ],
          },
          {
            id: "3f2eeb9f-5dc0-4b77-8c1f-68e1e8a728a4",
            title: "Visión General de Scrum",
            subtitle: "",
            slug: "vision-general-de-scrum",
            description:
              "Tema introductorio que explica Scrum, sus fundamentos, comparación con la gestión tradicional y otras metodologías.",
            content: "",
            icon: "brain",
            level: 1,
            features: [
              "Roles, eventos y artefactos de Scrum",
              "Comparación Scrum vs Gestión Tradicional",
              "Comparación Scrum vs otras metodologías",
              "Valores fundamentales de Scrum",
            ],
            modules: [
              {
                id: "0a4394e3-3e84-4aa4-9f9b-fd6f19db239d",
                title: "Scrum",
                level: 1,
                lessons: [
                  {
                    id: "5f8d23c0-84b9-4b7c-8c7c-7e7a8c4fdd01",
                    title: "¿Qué es Scrum?",
                    slug: "que-es-scrum",
                    level: 1,
                    content: ``,
                  },
                  {
                    id: "0d6b4cb9-8c27-40c4-bd1d-36cc4b2fdc84",
                    title: "Scrum vs. Gestión Tradicional",
                    slug: "scrum-vs-gestion-tradicional",
                    level: 2,
                    content: ``,
                  },
                  {
                    id: "32abf4f4-8b0d-4ed5-95b6-bf804c8f46d2",
                    title: "Scrum vs Otras Metodologías",
                    slug: "scrum-vs-otras-metodologias",
                    level: 3,
                    content: ``,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "e8a3d5ab-9c44-4a56-92a8-4c61f51c7c9e",
        name: "Principios de Scrum",
        level: 2,
        topics: [
          {
            id: "7b2e9f3c-5b0d-4e47-97f8-3823b1c23891",
            title: "Control del Proceso empírico",
            subtitle: "",
            slug: "control-del-proceso-empirico",
            description:
              "Explora cómo Scrum se basa en la transparencia, inspección y adaptación para gestionar proyectos de manera efectiva.",
            content: "",
            icon: "search-check",
            level: 1,
            features: [
              "Transparencia en la información",
              "Inspección continua del progreso",
              "Adaptación frente a cambios",
            ],
            modules: [
              {
                id: "c4a92d78-66f0-4a0f-9b07-50c71294eb12",
                title: "Transparencia, Inspección y Adaptación",
                level: 1,
                lessons: [
                  {
                    id: "2fd2a2c9-35e8-4213-8b0d-5bfb083c212a",
                    title: "Transparencia",
                    slug: "transparencia",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "a7b4f60d-4b75-4879-8e1a-3fd9ecb72a53",
                    title: "Inspección",
                    slug: "inspeccion",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "0f3e51cd-9c45-42af-8f45-318aeb77088e",
                    title: "Adaptación",
                    slug: "adaptacion",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "8c391d5b-bd59-4a31-967a-16a3f3d4969f",
            title: "Personas y flujo de valor",
            subtitle: "",
            slug: "personas-y-flujo-de-valor",
            description:
              "Descubre cómo la autoorganización, la colaboración y la multifuncionalidad impulsan la entrega de valor en Scrum.",
            content: "",
            icon: "users",
            level: 1,
            features: [
              "Autoorganización de equipos",
              "Colaboración efectiva",
              "Equipos multifuncionales",
            ],
            modules: [
              {
                id: "71a02aaf-9e1c-4e02-889f-9d93f2b81df1",
                title: "Autoorganización y colaboración",
                level: 1,
                lessons: [
                  {
                    id: "0cfe0de8-38bb-44b5-bdb4-2d1a2e8eb2f7",
                    title: "Autoorganización",
                    slug: "autoorganizacion",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "51c622b1-84a3-4c0a-bc69-2a2a91c6f54e",
                    title: "Colaboración Efectiva",
                    slug: "colaboracion-efectiva",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "1f34209a-f08d-45d2-b8e3-2106bc229573",
                    title: "Equipos multifuncionales",
                    slug: "equipos-multifuncionales",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "f16e2b6c-561f-4f9b-8d44-1c509c82f3d1",
            title: "Entrega temprana y cadencia",
            subtitle: "",
            slug: "entrega-temprana-y-cadencia",
            description:
              "Aprende cómo priorizar, usar time-boxing y fomentar la experimentación para generar valor de forma temprana y continua.",
            content: "",
            icon: "clock",
            level: 1,
            features: [
              "Priorización por valor",
              "Gestión con time-boxing",
              "Hipótesis y aprendizaje",
            ],
            modules: [
              {
                id: "ab41b1f9-2fc1-4f5d-97cf-8e4d73f14b83",
                title: "Priorización",
                level: 1,
                lessons: [
                  {
                    id: "7f90225c-c1cd-4b61-9a54-99fa9787d5b0",
                    title:
                      "Priorización por Valor (técnicas: MoSCoW, WSJF simple)",
                    slug: "priorizacion-por-valor",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "7c21a473-9a8f-4a65-9cb0-5bb79d95c4a7",
                    title: "Time-boxing (propósito y límites)",
                    slug: "time-boxing",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "8d14e41b-7b6c-4e1b-8358-f02c1d7f0f42",
                    title: "Equipos multifuncionales (hipótesis y aprendizaje)",
                    slug: "equipos-multifuncionales-hipotesis-aprendizaje",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "e8f1d9f7-2b34-42bb-87d9-8a21d2e8c33f",
        name: "El Sprint en profundidad",
        level: 3,
        topics: [
          {
            id: "54f16c2a-2a3d-4a1d-9cb4-4738e3ef26f1",
            title: "Sprint como contenedor de Valor",
            subtitle: "",
            slug: "sprint-como-contenedor-de-valor",
            description:
              "Explora el Sprint como la unidad central de trabajo en Scrum, su mecánica, cadencia, flujo y métricas clave.",
            content: "",
            icon: "clock",
            level: 1,
            features: [
              "Mecánica del Sprint",
              "Cadencia y duración del Sprint",
              "Flujo dentro del Sprint",
              "Métricas del Sprint",
            ],
            modules: [
              {
                id: "ad4dbf19-7a46-46b7-9c85-7d348d5d1b4b",
                title: "Mecánica del Sprint",
                level: 1,
                lessons: [
                  {
                    id: "aa9a3c8a-6dfb-4f48-9e1b-2767d5df8c01",
                    title: "¿Qué es un Sprint?",
                    slug: "que-es-un-sprint",
                    level: 1,
                    content:
                      "Definición, propósito, objetivos, cambios permitidos/no permitidos, cancelación del Sprint. Incluye ilustraciones, evaluaciones y un caso práctico.",
                  },
                  {
                    id: "7f37d8d2-5f51-4c9d-bb6c-ef2f45c27d63",
                    title: "Cadencia y duración",
                    slug: "cadencia-y-duracion",
                    level: 2,
                    content:
                      "Explicación sobre cómo la cadencia y la duración de los Sprints influyen en la entrega de valor. Factores clave: riesgo, feedback, tamaño del equipo, complejidad del producto.",
                  },
                  {
                    id: "c3f21a84-19bb-45fd-9ea3-0e68f34a58af",
                    title: "Flujo dentro del Sprint",
                    slug: "flujo-dentro-del-sprint",
                    level: 3,
                    content:
                      "Gestión del Sprint Backlog, Definition of Done, Daily Scrum y revisión de progreso. Incluye evaluaciones y ejemplos prácticos.",
                  },
                  {
                    id: "f1b7c21e-7e1a-4c28-97f8-83f3c3bdf39f",
                    title: "Métricas del Sprint",
                    slug: "metricas-del-sprint",
                    level: 4,
                    content:
                      "Descripción y análisis de métricas como Burndown Chart, velocidad, lead time y throughput. Interpretación, límites y anti-patrones comunes.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "3c1bdf0c-45e0-4b64-9d0c-b62f0f14b7a9",
        name: "Roles en Scrum",
        level: 4,
        topics: [
          {
            id: "4f94b0f1-11b1-4b59-9b92-d3e2b9c0e11a",
            title: "Product Owner",
            subtitle: "",
            slug: "product-owner",
            description:
              "Comprende el rol del Product Owner y sus responsabilidades en Scrum.",
            content: "",
            icon: "user",
            level: 1,
            features: [
              "Visión del producto",
              "Gestión del backlog",
              "Valor entregado",
              "Priorización efectiva",
            ],
            modules: [
              {
                id: "6f834a31-7ddb-4f19-a2be-60945e646606",
                title: "Rol de Product Owner (PO)",
                level: 1,
                lessons: [
                  {
                    id: "a22cba69-3abf-4d65-8aee-07e57b1a89b1",
                    title: "Responsabilidades del PO",
                    slug: "responsabilidades-po",
                    level: 1,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "5f2eeb9f-6dc0-4b77-8c1f-68e1e8a728b5",
            title: "Scrum Master",
            subtitle: "",
            slug: "scrum-master",
            description:
              "Explora el rol del Scrum Master y su aporte al equipo y la organización.",
            content: "",
            icon: "users",
            level: 1,
            features: [
              "Facilitación de eventos",
              "Eliminación de impedimentos",
              "Mejora continua",
              "Coaching ágil",
            ],
            modules: [
              {
                id: "7a4394e3-3e84-4aa4-9f9b-fd6f19db239e",
                title: "Rol de Scrum Master (SM)",
                level: 1,
                lessons: [
                  {
                    id: "b33d23c0-84b9-4b7c-8c7c-7e7a8c4fdd02",
                    title: "Servicio al equipo y a la organización",
                    slug: "servicio-equipo-organizacion",
                    level: 1,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "6f3aeb9f-7ec0-4b77-8c1f-68e1e8a728c6",
            title: "Developers",
            subtitle: "",
            slug: "developers",
            description:
              "Descubre el rol de los Developers y su responsabilidad en la entrega de incrementos de calidad.",
            content: "",
            icon: "code",
            level: 1,
            features: [
              "Incrementos de calidad",
              "Trabajo colaborativo",
              "Autoorganización",
              "Responsabilidad compartida",
            ],
            modules: [
              {
                id: "8b834a31-7ddb-4f19-a2be-60945e646607",
                title: "Rol de Developers",
                level: 1,
                lessons: [
                  {
                    id: "c44cba69-3abf-4d65-8aee-07e57b1a89c2",
                    title: "Entrega de incrementos de calidad",
                    slug: "entrega-incrementos-calidad",
                    level: 1,
                    content: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "4c1bdf0c-55e0-4b64-9d0c-b62f0f14b7b0",
        name: "Eventos",
        level: 5,
        topics: [
          {
            id: "7f94b0f1-21b1-4b59-9b92-d3e2b9c0e21a",
            title: "Sprint Planning",
            subtitle: "",
            slug: "sprint-planning",
            description:
              "Evento de Scrum enfocado en planificar el trabajo del Sprint.",
            content: "",
            icon: "calendar",
            level: 1,
            features: [
              "Definir Sprint Goal",
              "Plan de trabajo",
              "Propósito claro",
              "Evitar anti-patrones",
            ],
            modules: [
              {
                id: "9f834a31-7ddb-4f19-a2be-60945e646608",
                title: "Planificar con propósito",
                level: 1,
                lessons: [
                  {
                    id: "d11cba69-3abf-4d65-8aee-07e57b1a89d3",
                    title: "Propósito, entradas y salidas",
                    slug: "proposito-entradas-salidas",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "d12cba69-3abf-4d65-8aee-07e57b1a89d4",
                    title: "Definir Sprint Goal",
                    slug: "definir-sprint-goal",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "d13cba69-3abf-4d65-8aee-07e57b1a89d5",
                    title: "Plan de Trabajo y capacidad",
                    slug: "plan-trabajo-capacidad",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "d14cba69-3abf-4d65-8aee-07e57b1a89d6",
                    title: "Anti-patrones",
                    slug: "anti-patrones-sprint-planning",
                    level: 1,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "8f2eeb9f-7dc0-4b77-8c1f-68e1e8a728d7",
            title: "Daily Scrum",
            subtitle: "",
            slug: "daily-scrum",
            description:
              "Evento diario para sincronizar al equipo y planificar las siguientes 24 horas.",
            content: "",
            icon: "clock",
            level: 1,
            features: [
              "Sincronización diaria",
              "Gestión de impedimentos",
              "Evitar anti-patrones",
              "Seguimiento del objetivo",
            ],
            modules: [
              {
                id: "af4394e3-3e84-4aa4-9f9b-fd6f19db239f",
                title: "Sincronización efectiva",
                level: 1,
                lessons: [
                  {
                    id: "e21d23c0-84b9-4b7c-8c7c-7e7a8c4fdd03",
                    title: "Objetivo de la Daily Scrum",
                    slug: "objetivo-daily-scrum",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "e22d23c0-84b9-4b7c-8c7c-7e7a8c4fdd04",
                    title: "Gestión de Impedimentos",
                    slug: "gestion-impedimentos",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "e23d23c0-84b9-4b7c-8c7c-7e7a8c4fdd05",
                    title: "Anti-patrones",
                    slug: "anti-patrones-daily-scrum",
                    level: 1,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "9f3aeb9f-8ec0-4b77-8c1f-68e1e8a728e8",
            title: "Sprint Review",
            subtitle: "",
            slug: "sprint-review",
            description:
              "Evento para inspeccionar el incremento y adaptar el Product Backlog.",
            content: "",
            icon: "eye",
            level: 1,
            features: [
              "Inspección del incremento",
              "Feedback del cliente",
              "Decisiones del backlog",
            ],
            modules: [
              {
                id: "bf834a31-7ddb-4f19-a2be-60945e646609",
                title: "Orientada al Valor",
                level: 1,
                lessons: [
                  {
                    id: "f31cba69-3abf-4d65-8aee-07e57b1a89f7",
                    title: "Propósito",
                    slug: "proposito-sprint-review",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "f32cba69-3abf-4d65-8aee-07e57b1a89f8",
                    title: "Demostración y Feedback",
                    slug: "demostracion-feedback",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "f33cba69-3abf-4d65-8aee-07e57b1a89f9",
                    title: "Decisiones sobre el Product Backlog",
                    slug: "decisiones-product-backlog",
                    level: 1,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "af4beb9f-9fc0-4b77-8c1f-68e1e8a728f9",
            title: "Sprint Retrospective",
            subtitle: "",
            slug: "sprint-retrospective",
            description:
              "Evento para reflexionar y mejorar continuamente como equipo.",
            content: "",
            icon: "refresh-cw",
            level: 1,
            features: [
              "Mejora continua",
              "Selección de acciones",
              "Seguimiento de mejoras",
              "Formatos efectivos",
            ],
            modules: [
              {
                id: "cf834a31-7ddb-4f19-a2be-60945e646610",
                title: "Mejora Continua",
                level: 1,
                lessons: [
                  {
                    id: "g41cba69-3abf-4d65-8aee-07e57b1a89g1",
                    title: "Propósito",
                    slug: "proposito-retrospective",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "g42cba69-3abf-4d65-8aee-07e57b1a89g2",
                    title: "Formatos (Start-Stop-Continue, 4L, 5-Whys)",
                    slug: "formatos-retrospective",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "g43cba69-3abf-4d65-8aee-07e57b1a89g3",
                    title: "Selección de acciones SMART",
                    slug: "acciones-smart",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "g44cba69-3abf-4d65-8aee-07e57b1a89g4",
                    title: "Seguimiento de mejoras",
                    slug: "seguimiento-mejoras",
                    level: 1,
                    content: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "d25f6a3e-1b4c-4d6f-9f3a-2e1b7c8d9f4a",
        name: "Artefactos de Scrum",
        level: 6,
        topics: [
          {
            id: "a7c8d9e0-2f3b-4c5d-8a9b-1e2f3a4b5c6d",
            title: "Product Backlog",
            subtitle: "",
            slug: "product-backlog",
            description:
              "Artefacto central en Scrum que contiene todos los elementos de trabajo que el equipo de desarrollo debe abordar para crear un producto funcional.",
            content: "",
            icon: "list",
            level: 1,
            features: [
              "Fuente única de trabajo",
              "Transparencia y visibilidad",
              "Evolución continua",
              "Priorización basada en valor de negocio",
            ],
            modules: [
              {
                id: "b1c2d3e4-5f6a-7b8c-9d0e-1f2a3b4c5d6e",
                title: "Valor y Ordenamiento",
                level: 1,
                lessons: [
                  {
                    id: "c1d2e3f4-5a6b-7c8d-9e0f-1a2b3c4d5e6f",
                    title: "Propósito",
                    slug: "product-backlog-proposito",
                    level: 1,
                    content:
                      "El Product Backlog sirve como fuente de trabajo para el equipo, facilita la transparencia, y está en constante evolución para adaptarse a cambios del negocio. Un Product Backlog bien gestionado garantiza alineación del equipo con las prioridades del negocio.",
                  },
                  {
                    id: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
                    title: "Historias de usuario y criterios de aceptación",
                    slug: "historias-usuario-criterios-aceptacion",
                    level: 1,
                    content:
                      "Las historias de usuario son descripciones breves de requerimientos desde la perspectiva del usuario. Incluyen criterios de aceptación que definen las condiciones de completitud. Mejoran la comunicación y aseguran que el equipo entregue valor.",
                  },
                  {
                    id: "c3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
                    title: "Refinamiento continuo",
                    slug: "refinamiento-continio-product-backlog",
                    level: 1,
                    content:
                      "El refinamiento del Product Backlog es un proceso continuo de revisión, ajuste de prioridades y descomposición de épicas en historias manejables. Permite al equipo enfocarse en los ítems más valiosos y mantener visibilidad y transparencia.",
                  },
                  {
                    id: "c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f",
                    title: "Técnicas de priorización",
                    slug: "tecnicas-priorizacion-product-backlog",
                    level: 1,
                    content:
                      "Las técnicas de priorización ordenan los ítems del Product Backlog según valor y urgencia. Ejemplos: MoSCoW, Kano Model, Valor vs Esfuerzo. Ayudan a maximizar el valor entregado al cliente.",
                  },
                ],
              },
            ],
          },
          {
            id: "d1e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a",
            title: "Sprint Backlog",
            subtitle: "",
            slug: "sprint-backlog",
            description:
              "Lista de ítems del Product Backlog elegidos para el Sprint, incluyendo el plan de trabajo. Propiedad del equipo de Developers y se actualiza durante el Sprint.",
            content: "",
            icon: "clipboard",
            level: 1,
            features: [
              "Conexión con Sprint Goal",
              "Plan detallado de trabajo",
              "Evolución diaria",
              "Transparencia y visibilidad",
            ],
            modules: [
              {
                id: "e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
                title: "Plan del Sprint",
                level: 1,
                lessons: [
                  {
                    id: "f1a2b3c4-5d6e-7f8a-9b0c-1d2e3f4a5b6c",
                    title: "Propósito",
                    slug: "sprint-backlog-proposito",
                    level: 1,
                    content:
                      "El Sprint Backlog guía al equipo durante el Sprint, mostrando qué se hará y cómo. Facilita el cumplimiento del Sprint Goal y permite ajustes durante el Sprint según el progreso real.",
                  },
                  {
                    id: "f2a3b4c5-6d7e-8f9a-0b1c-2d3e4f5a6b7c",
                    title: "Selección de ítems",
                    slug: "sprint-backlog-seleccion-items",
                    level: 1,
                    content:
                      "Los ítems se seleccionan en función del valor de negocio, capacidad del equipo y alineación con el Sprint Goal. La selección es colaborativa entre Product Owner y Developers.",
                  },
                  {
                    id: "f3a4b5c6-7d8e-9f0a-1b2c-3d4e5f6a7b8c",
                    title: "Plan 'cómo' y descomposición",
                    slug: "plan-como-descomposicion",
                    level: 1,
                    content:
                      "Descomponer historias de usuario en tareas claras, pequeñas y verificables. Asignación según habilidades y capacidad del equipo. Cada tarea tiene criterios de aceptación para asegurar completitud y calidad.",
                  },
                  {
                    id: "f4a5b6c7-8d9e-0f1a-2b3c-4d5e6f7a8b9c",
                    title: "Actualización diaria y transparencia",
                    slug: "actualizacion-diaria-transparencia",
                    level: 1,
                    content:
                      "Actualizar el Sprint Backlog diariamente durante el Daily Scrum para reflejar progreso real y ajustes necesarios. Permite identificar impedimentos y mantener visibilidad y adaptación continua.",
                  },
                ],
              },
            ],
          },
          {
            id: "e2f3a4b5-6c7d-8e9f-0a1b-2c3d4e5f6a7b",
            title: "Incremento y Definition of Done",
            subtitle: "",
            slug: "incremento-definition-of-done",
            description:
              "Garantiza la calidad del trabajo y que cada entrega es funcional, cumpliendo con criterios de aceptación y Definition of Done.",
            content: "",
            icon: "check-square",
            level: 1,
            features: [
              "Entrega de valor continuo",
              "Cumplimiento de criterios de aceptación",
              "Calidad asegurada",
              "Preparado para liberación",
            ],
            modules: [
              {
                id: "f5a6b7c8-9d0e-1f2a-3b4c-5d6e7f8a9b0c",
                title: "Calidad y finalización",
                level: 1,
                lessons: [
                  {
                    id: "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
                    title: "Incremento",
                    slug: "incremento",
                    level: 1,
                    content:
                      "El Incremento es trabajo completado durante el Sprint, funcional y potencialmente liberable. Debe cumplir criterios de aceptación y Definition of Done.",
                  },
                  {
                    id: "a2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d",
                    title: "Definition of Done y calidad",
                    slug: "definition-of-done",
                    level: 1,
                    content:
                      "La Definition of Done (DoD) es un conjunto de criterios claros que asegura la calidad de entregables. Incluye pruebas, revisiones de código, integración y documentación según sea necesario.",
                  },
                  {
                    id: "a3b4c5d6-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
                    title: "Integración continua/automatización",
                    slug: "integracion-continua",
                    level: 1,
                    content:
                      "La integración continua asegura que el código se integre y pruebe frecuentemente, detectando errores tempranos y manteniendo la calidad del Incremento. Herramientas como Jenkins o Travis CI automatizan este proceso.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "5f3b2d1a-8c4f-4e9a-9b2c-1d7e8f4a9b5c",
        name: "Aspectos clave en Scrum",
        level: 7,
        topics: [
          {
            id: "d1a2b3c4-5e6f-7a8b-9c0d-e1f2a3b4c5d6",
            title: "Justificación del Negocio",
            subtitle: "",
            slug: "justificacion-del-negocio",
            description:
              "Asegura que el proyecto se mantenga enfocado en entregar valor al negocio y se adapte a cambios durante su ciclo de vida.",
            content: "",
            icon: "briefcase",
            level: 1,
            features: [
              "Caso de negocio vivo",
              "Alineación con objetivos estratégicos",
              "Entrega de valor continuo",
              "Priorización basada en impacto",
            ],
            modules: [
              {
                id: "m1-justificacion",
                title: "Caso de Negocio",
                level: 1,
                lessons: [
                  {
                    id: "l1-proposito",
                    title: "Propósito",
                    slug: "proposito",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "l2-vision-metricas",
                    title: "Visión y métricas de valor",
                    slug: "vision-metricas-de-valor",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "l3-viabilidad-seguimiento",
                    title: "Viabilidad y seguimiento del caso",
                    slug: "viabilidad-seguimiento-del-caso",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "d2b3c4d5-6e7f-8a9b-0c1d-f2a3b4c5d6e7",
            title: "Calidad",
            subtitle: "",
            slug: "calidad",
            description:
              "Garantiza que los entregables del proyecto cumplen con estándares definidos y contribuyen al Sprint Goal.",
            content: "",
            icon: "check-circle",
            level: 1,
            features: [
              "Calidad integrada en el Sprint",
              "Prevención sobre detección",
              "Medición de calidad",
              "Incrementos consistentes",
            ],
            modules: [
              {
                id: "m1-calidad",
                title: "Calidad Integrada",
                level: 1,
                lessons: [
                  {
                    id: "l1-proposito-sprint-backlog",
                    title: "Propósito",
                    slug: "proposito-sprint-backlog",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "l2-prevencion-deteccion",
                    title: "Prevención > Detección",
                    slug: "prevencion-deteccion",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "l3-medidas-calidad",
                    title: "Medidas de calidad",
                    slug: "medidas-de-calidad",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "d3c4d5e6-7f8a-9b0c-1d2e-f3a4b5c6d7e8",
            title: "Cambio",
            subtitle: "",
            slug: "cambio",
            description:
              "Manejo de cambios y entregables incrementales para asegurar la adaptación y continuidad de valor en Scrum.",
            content: "",
            icon: "refresh-cw",
            level: 1,
            features: [
              "Gestión de cambio ágil",
              "Incrementos liberables",
              "Adaptación continua",
              "Integración y automatización",
            ],
            modules: [
              {
                id: "m1-cambio",
                title: "Gestión del Cambio",
                level: 1,
                lessons: [
                  {
                    id: "l1-proposito-incremento",
                    title: "Propósito",
                    slug: "proposito-incremento",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "l2-impacto-alcance-valor",
                    title: "Impacto en alcance y valor",
                    slug: "impacto-alcance-valor",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "l3-integracion-continua",
                    title: "Cambios durante el Sprint",
                    slug: "cambios-durante-el-sprint",
                    level: 3,
                    content: "",
                  },
                ],
              },
            ],
          },
          {
            id: "d4e5f6a7-8b9c-0d1e-2f3a-b4c5d6e7f8a9",
            title: "Riesgo",
            subtitle: "",
            slug: "riesgo",
            description:
              "Identificación y manejo de riesgos de manera ágil para asegurar el éxito y la continuidad de valor del proyecto.",
            content: "",
            icon: "alert-triangle",
            level: 1,
            features: [
              "Riesgos visibles",
              "Identificación continua",
              "Radiadores de riesgo",
              "Mitigación temprana",
            ],
            modules: [
              {
                id: "m1-riesgo",
                title: "Riesgo Ágil",
                level: 1,
                lessons: [
                  {
                    id: "l1-proposito-riesgo",
                    title: "Propósito",
                    slug: "proposito-riesgo",
                    level: 1,
                    content: "",
                  },
                  {
                    id: "l2-identificacion-continua",
                    title: "Identificación continua",
                    slug: "identificacion-continua",
                    level: 2,
                    content: "",
                  },
                  {
                    id: "l3-radiadores-riesgo",
                    title: "Radiadores de Riesgo",
                    slug: "radiadores-de-riesgo",
                    level: 3,
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

function buildConflictUpdateAllExceptIdAndCreatedAt<
  T extends PgTable | SQLiteTable
>(table: T) {
  const columns = getTableColumns(table);
  return Object.keys(columns).reduce((acc, key) => {
    if (key === "id" || key === "createdAt") return acc;
    const colName = columns[key].name;
    acc[key] = sql.raw(`excluded."${colName}"`);
    return acc;
  }, {} as Record<string, SQL>);
}

async function main() {
  dotenv.config();
  /*  console.log("🗑️ Limpiando base de datos..."); */

  // El orden importa por las FK: primero hijos, luego padres
  /* await db.delete(schema.lessons);
  await db.delete(schema.modules);
  await db.delete(schema.topics);
  await db.delete(schema.learningSteps);
  await db.delete(schema.roadmaps);
  await db.delete(schema.questions);
  await db.delete(schema.assessments); */

  console.log("🌱 Seeding...");

  const { roadmaps, steps, topics, modules, lessons } = flattenSeed(seed);

  await db
    .insert(schema.roadmaps)
    .values(roadmaps)
    .onConflictDoUpdate({
      target: schema.roadmaps.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.roadmaps),
    });
  await db
    .insert(schema.learningSteps)
    .values(steps)
    .onConflictDoUpdate({
      target: schema.learningSteps.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.learningSteps),
    });
  await db
    .insert(schema.topics)
    .values(topics)
    .onConflictDoUpdate({
      target: schema.topics.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.topics),
    });
  await db
    .insert(schema.modules)
    .values(modules)
    .onConflictDoUpdate({
      target: schema.modules.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.modules),
    });
  await db
    .insert(schema.lessons)
    .values(lessons)
    .onConflictDoUpdate({
      target: schema.lessons.id,
      set: buildConflictUpdateAllExceptIdAndCreatedAt(schema.lessons),
    });

  /* 
  await db.insert(schema.assessments).values(assessmentLesson).onConflictDoUpdate({
    target: schema.assessments.id,
    set: buildConflictUpdateAllExceptId(schema.assessments),
  });;
  await db.insert(schema.questions).values(questionsData).onConflictDoUpdate({
    target: schema.questions.id,
    set: buildConflictUpdateAllExceptId(schema.questions),
  }); */

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
      ...roadmap,
    });

    for (const step of roadmap.learningSteps) {
      steps.push({
        roadmapId: roadmap.id,
        ...step,
      });

      for (const topic of step.topics) {
        topics.push({
          stepId: step.id,
          roadmapId: roadmap.id,
          ...topic,
        });

        for (const moduleObjec of topic.modules) {
          modules.push({
            topicId: topic.id,
            ...moduleObjec,
          });

          for (const lesson of moduleObjec.lessons) {
            lessons.push({
              moduleId: moduleObjec.id,
              ...lesson,
            });
          }
        }
      }
    }
  }

  return { roadmaps, steps, topics, modules, lessons };
}
