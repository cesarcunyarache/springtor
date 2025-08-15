// scripts/resetAndSeed.ts

import { Client } from "pg";
import * as schema from "../schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { db } from "../index";
import dotenv from "dotenv";


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

async function main() {
  
 dotenv.config();
  console.log("🌱 Seeding...");
  await db.insert(schema.roadmaps).values(roadmaps);
  await db.insert(schema.learningSteps).values(learningSteps);
  await db.insert(schema.topics).values(topics);

  console.log("✅ Seed successful");
  /* await client.end(); */
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
