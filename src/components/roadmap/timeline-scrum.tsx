import React from "react";
import { Timeline } from "@/components/ui/timeline";
import CardFlip from "./card-flip";
import CardFlip2 from "./card-flip copy";
import { LearningStep } from "@/type";
import { IconName } from "lucide-react/dynamic";

export function TimelineDemo({ steps }: { steps: LearningStep[] }) {

  const dataFound = steps.map((step) => ({
    title: step.name,
    content: (
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {
          step.topics?.map((topic) => (
            <CardFlip2 
              key={topic.id}
              title={topic.title}
              subtitle={topic.subtitle ?? ""}
              description={topic.description ?? ""}
              features={topic.features ?? []}
              icon={topic.icon as IconName ?? "rocket"}
              id={topic.id}
              color={topic.color ?? "blue"}
            />
          ))

        }
      </div>
    ),
  }));
  const data = [
    {
      title: "Inicio",
      content: (

        <div>

          <CardFlip2 
            title="Introducción a Scrum"
            subtitle="sus orígenes, valores ágiles y pilares" 
            icon="rocket"
            id="intro-scrum"
            color="blue"
          />
        </div>

      ),
    },
    {
      title: "Fundamentos",
      content: (
        <CardFlip
          title="Introducción a Scrum"
          subtitle="sus orígenes, valores ágiles y pilares"
          description="Introducción a Scrum: sus orígenes, valores ágiles y pilares"
          features={["UI/UX", "Modern Design", "Tailwind CSS", "Kokonut UI"]}
        />
      ),
    },
    {
      title: "Práctica",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Se aplica Scrum en proyectos reales: gestión del Product Backlog,
            creación de Historias de Usuario y uso de tableros como Jira o Trello
            para dar seguimiento al Sprint.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="Scrum práctica 1"
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="Scrum práctica 2"
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="Scrum práctica 3"
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="Scrum práctica 4"
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Avanzado y Escalado",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Scrum aplicado a grandes organizaciones. Optimización de equipos,
            entrega continua y marcos de escalado como SAFe o LeSS.
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Scrum en múltiples equipos
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Integración con DevOps
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              ✅ Entrega continua y métricas
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://assets.aceternity.com/pro/hero-sections.png"
              alt="Scrum escalado 1"
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/features-section.png"
              alt="Scrum escalado 2"
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/pro/bento-grids.png"
              alt="Scrum escalado 3"
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
            <img
              src="https://assets.aceternity.com/cards.png"
              alt="Scrum escalado 4"
              className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={dataFound} />
    </div>
  );
}
