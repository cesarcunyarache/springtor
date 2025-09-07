import { cn } from "@/lib/utils";
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2,
} from "@tabler/icons-react";
import { BookOpen, Clock, GraduationCap, MessageSquare, Users, Workflow } from "lucide-react";

export function FeaturesSectionDemo() {
    const features = [
    {
      title: "Ruta de aprendizaje estructurada",
      description: "Avanza paso a paso con un camino diseñado para dominar Scrum de forma práctica.",
      icon: <GraduationCap />,
    },
    {
      title: "Material didáctico",
      description: "Accede a guías, ejemplos y recursos que facilitan la comprensión del marco Scrum.",
      icon: <BookOpen />,
    },
    {
      title: "Prácticas interactivas",
      description: "Refuerza tu aprendizaje con ejercicios aplicados a proyectos reales.",
      icon: <Workflow />,
    },
    {
      title: "Colaboración simulada",
      description: "Experimenta dinámicas de equipo y roles dentro de un entorno seguro.",
      icon: <Users />,
    },
    {
      title: "Mentoría virtual",
      description: "Recibe orientación personalizada de un agente de IA que actúa como tu coach.",
      icon: <MessageSquare />,
    },
    {
      title: "Flexibilidad de tiempo",
      description: "Aprende a tu propio ritmo, sin horarios fijos y con disponibilidad continua.",
      icon: <Clock />,
    },
  ];
    return (

        <div>
            <div className="px-8">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                  Repleto de funcionalidades para dominar Scrum
                </h4>

                <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
                    Desde la teoría hasta la práctica, nuestra plataforma combina rutas de aprendizaje, ejercicios interactivos y mentoría virtual para que domines Scrum de manera integral.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  relative z-10 py-10 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <Feature key={feature.title} {...feature} index={index} />
                ))}
            </div>

        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};
