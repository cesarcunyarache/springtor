import { BookOpen, CalendarCheck, CctvIcon, CloudLightning, Container, GlobeIcon, Home, ListTodo, Lock, MagnetIcon, MailWarningIcon, RefreshCcw, RocketIcon, StarHalf, StarIcon, Target, Trophy, User, Users } from "lucide-react";
import { ArcTimeline, ArcTimelineItem } from "./ui/arc-timeline";
import { Highlighter } from "./ui/highlighter";


export function ArcTimelineDemo() {
    return (

        <div className="my-20 max-w-7xl mx-auto">

            <div className="text-center">
                <p className="leading-relaxed">
                    La{" "}
                    <Highlighter action="underline" color="#FF9800">
                        Ruta de Aprendizaje
                    </Highlighter>{" "}
                    en{" "}
                    <Highlighter action="highlight" color="#87CEFA">
                        Scrum
                    </Highlighter>{" "}
                    paso a paso.
                </p>
            </div>



            <ArcTimeline
                // className={cn(
                //   "[--step-line-active-color:#888888] dark:[--step-line-active-color:#9780ff]",
                //   "[--step-line-inactive-color:#b1b1b1] dark:[--step-line-inactive-color:#737373]",
                //   "[--placeholder-line-color:#a1a1a1] dark:[--placeholder-line-color:#737373]",
                //   "[--icon-active-color:#555555] dark:[--icon-active-color:#d4d4d4]",
                //   "[--icon-inactive-color:#a3a3a3] dark:[--icon-inactive-color:#a3a3a3]",
                //   "[--time-active-color:#555555] dark:[--time-active-color:#d4d4d4]",
                //   "[--time-inactive-color:#a3a3a3] dark:[--time-inactive-color:#a3a3a3]",
                //   "[--description-color:#555555] dark:[--description-color:#d4d4d4]"
                // )}
                data={TIMELINE}
                defaultActiveStep={{ time: "Eventos", stepIndex: 0 }}
                arcConfig={{
                    circleWidth: 4500,
                    angleBetweenMinorSteps: 0.4,
                    lineCountFillBetweenSteps: 8,
                    boundaryPlaceholderLinesCount: 50,
                }}
            />

        </div>
    );
}
const TIMELINE: ArcTimelineItem[] = [
    {
        time: "Inicio",
        steps: [
            {
                icon: <RocketIcon width={20} height={20} />,
                content: "Introducción a la Agilidad y principios básicos de Scrum.",
            },
            {
                icon: <BookOpen width={20} height={20} />,
                content: "Fundamentos del marco Scrum y valores ágiles.",
            },
        ],
    },
    {
        time: "Fundamentos",
        steps: [
            {
                icon: <Users width={20} height={20} />,
                content: "Roles en Scrum: Product Owner, Scrum Master y Equipo de Desarrollo.",
            },
            {
                icon: <ListTodo width={20} height={20} />,
                content: "Artefactos: Product Backlog, Sprint Backlog e Incremento.",
            },
        ],
    },
    {
        time: "Eventos",
        steps: [
            {
                icon: <CalendarCheck width={20} height={20} />,
                content: "Eventos clave: Sprint, Sprint Planning, Daily Scrum, Review y Retrospectiva.",
            },
            {
                icon: <RefreshCcw width={20} height={20} />,
                content: "La importancia del time-boxing en cada evento.",
            },
        ],
    },
    {
        time: "Práctica",
        steps: [
            {
                icon: <Target width={20} height={20} />,
                content: "Aplicación de Scrum en proyectos reales y simulaciones.",
            },
            {
                icon: <Trophy width={20} height={20} />,
                content: "Mejora continua y métricas para equipos ágiles.",
            },
        ],
    },
];