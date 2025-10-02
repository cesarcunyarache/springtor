"use client";
import { redirect, useRouter } from "next/navigation";

import { PortableText } from "@portabletext/react";

/* import { LessonCompleteButton } from "@/components/LessonCompleteButton"; */
import { LoomEmbed } from "@/components/LoomEmbed";

import { getLessionById } from "@/lib/db/queries/learning";
import { Button } from "@/components/ui/button";
import { BookOpen, Check, MessageSquare, Send, Sparkles, StickyNote, Target } from "lucide-react";
import { cn } from "@udecode/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Lesson, Question, TheoryLessonAnswer } from "@/type";
import AnimatedAIChat from "@/components/chat/input-chat";
import Quiz, { QuizResult } from "@/components/quizz";

import { MarkdownView } from "@/components/markdown/index";
import { toast } from "sonner";
import { completeLesson, saveUserResponseLessonAnswers } from "@/lib/db/queries/user";
import LessonNavbar from "../../../../components/lesson-navbar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useChatStore } from "@/hooks/use-chat-store";


interface LessonPageProps {
  lesson: Lesson;
  chat: React.ReactNode;
}

export default function ClientLessonPage({ lesson, chat }: LessonPageProps) {
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

  const handleOnSubmit = async (answers: QuizResult[]) => {
    toast.promise(saveUserResponseLessonAnswers(answers, lesson?.assessment?.id), {
      loading: 'Enviando...',
      success: (res: boolean) => {
        return res ? 'Respuestas enviada con éxito' : 'Algo salió mal. Por favor, inténtalo de nuevo';
      },
      error: 'Algo salió mal. Por favor, inténtalo de nuevo.',
    });
  }

  const router = useRouter();

  const handleCompleteLesson = async () => {

    await completeLesson(
      {
        moduleId: lesson.moduleId,
        lessonId: lesson.id,
        topicId: lesson.module?.topicId ?? "",
      }
    );

    router.refresh();

  }

  const { isChatOpen } = useChatStore()

  return (




    <ResizablePanelGroup direction="horizontal" className="h-screen" autoSaveId="persitence">
      <ResizablePanel
        minSize={2}
      >

        <div className="">



          <LessonNavbar lesson={lesson} />

          <div className="flex flex-col flex-1 w-full ml-1 overflow-auto h-[92vh]">

            {/*     <ClientLessonPage lesson={lesson} /> */}
            <div className="m-6">

              
              <section className="">
                <MarkdownView content={lesson!.content!} />
              </section>

              <section>
                <AnimatedAIChat />
              </section>

              <section>
                <Quiz title={"Quiz"} questions={lesson?.assessment?.questions ?? []}
                  isOmitted={false}
                  onSubmit={handleOnSubmit}
                  isViewingResults={true}
                  questionResults={
                    lesson?.assessment?.theoryLessonAnswers?.map((a) => ({
                      questionId: a.questionId,
                      selectedOption: a.selectedOption,
                      isCorrect: a.isCorrect,
                    }))
                  }
                  allowReset={true}
                />
              </section>
            </div>
          </div>
        </div>
      </ResizablePanel>

      {isChatOpen &&
        (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel
              minSize={30}
              maxSize={90}
            >
              {chat}
            </ResizablePanel>
          </>
        )}
    </ResizablePanelGroup>
  );
}
