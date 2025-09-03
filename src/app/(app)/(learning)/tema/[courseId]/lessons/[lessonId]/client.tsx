"use client";
import { redirect } from "next/navigation";

import { PortableText } from "@portabletext/react";

import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import { LoomEmbed } from "@/components/LoomEmbed";
import { getLessonById } from "@/moks/data";
import { getLessionById } from "@/lib/db/queries/learning";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, Send, Sparkles, StickyNote, Target } from "lucide-react";
import { cn } from "@udecode/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Lesson } from "@/type";
import AnimatedAIChat from "@/components/chat/input-chat";
import Quiz from "@/components/quiz";
import { Question } from "@/lib/schemas";
import { MarkdownView } from "@/components/markdown/index";


interface LessonPageProps {
  lesson: Lesson;
}

export default function ClientLessonPage({ lesson }: LessonPageProps) {
  /*   const user = await currentUser(); */


  const [lessonStarted, setLessonStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSection, setCurrentSection] = useState<"learning" | "questions" | "evaluation">("learning")
  const [currentStrategy, setCurrentStrategy] = useState<string | null>(null)
  const [userQuestion, setUserQuestion] = useState("")
  const [questionHistory, setQuestionHistory] = useState<Array<{ question: string; answer: string; id: string }>>([])
  const [aiResponses, setAiResponses] = useState<
    Array<{ id: string; content: string; type: "explanation" | "strategy" | "question" }>
  >([])
  const [evaluationAnswers, setEvaluationAnswers] = useState<{ [key: string]: number }>({})
  const [evaluationResults, setEvaluationResults] = useState<{ score: number; feedback: string } | null>(null)


  const handleEvaluationAnswer = (questionId: string, answer: number) => {
    setEvaluationAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const submitEvaluation = () => {
    const totalQuestions = 3
    const correctAnswers = [1, 0, 1] // Correct answer indices
    const correctAnswersCount = Object.values(evaluationAnswers).filter(
      (answer, index) => answer === correctAnswers[index],
    ).length

    const score = Math.round((correctAnswersCount / totalQuestions) * 100)

    setEvaluationResults({
      score,
      feedback:
        score >= 70
          ? "¡Excelente! Has demostrado una comprensión sólida del Daily Scrum."
          : "Buen intento. Te recomiendo revisar algunos conceptos antes de continuar.",
    })
  }


  const scrumQuestions: Question[] = [
    {
      question: "¿Cuál es el rol principal del Scrum Master en un equipo Scrum?",
      options: [
        "Asegurarse de que se cumplan los plazos",
        "Eliminar impedimentos y facilitar el marco de trabajo",
        "Asignar tareas a cada miembro del equipo",
        "Supervisar y evaluar el desempeño individual",
      ],
      answer: "B",
    },
    {
      question: "¿Qué artefacto de Scrum representa el trabajo pendiente del producto?",
      options: [
        "Product Backlog",
        "Sprint Backlog",
        "Incremento",
        "Burndown Chart",
      ],
      answer: "A",
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
    },
    {
      question: "¿Qué evento de Scrum se utiliza para inspeccionar el incremento y adaptar el Product Backlog si es necesario?",
      options: [
        "Daily Scrum",
        "Sprint Retrospective",
        "Sprint Review",
        "Refinamiento del Backlog",
      ],
      answer: "C",
    },
  ];

  return (
    <div className="mt-20 m-6">
      <section className="">
        <MarkdownView content={lesson!.content!} />
      </section>

      <section>
        <AnimatedAIChat />
      </section>

      <section>
        <Quiz title={"Quiz"} questions={scrumQuestions} clearPDF={() => { }} />
      </section>
    </div>
  );
}
