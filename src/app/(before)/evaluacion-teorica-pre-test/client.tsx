"use client";

import { useProctoring } from "@/app/(app)/scrum/evaluacion-practica/hooks/useProctoring";
import Quiz, { QuizResult } from "@/components/quizz";
import { saveUserResponsePostTest, saveUserResponsePreTest } from "@/lib/db/queries/user";
import { Question } from "@/type";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertTriangle, BookOpenCheck } from "lucide-react";
import FaceMonitor from "@/app/(app)/scrum/evaluacion-practica/components/face-monitor";
import ExamTimerDisplay from "@/app/(app)/scrum/evaluacion-practica/components/exam-timer";
import { useExamTimer } from "@/app/(app)/scrum/evaluacion-practica/store";

export default function ClientPage({ questions, isCompleted }: { questions: Question[], isCompleted: boolean }) {

    const result: QuizResult[] = [
        { questionId: "1", selectedOption: "D", isCorrect: false },
        { questionId: "2", selectedOption: "D", isCorrect: false },
        { questionId: "3", selectedOption: "C", isCorrect: false },
        { questionId: "4", selectedOption: "C", isCorrect: true },
    ]

    const handleSubmit = async (answers: QuizResult[]) => {
        toast.promise(saveUserResponsePreTest(answers), {
            loading: 'Enviando...',
            success: (res: boolean) => {

                return res ? 'Respuestas enviada con éxito' : 'Algo salió mal. Por favor, inténtalo de nuevo';
            },
            error: 'Algo salió mal. Por favor, inténtalo de nuevo.',
            finally: () => {

                redirect('/scrum/roadmap');
            }
        });

    }

    /*  useEffect(() => {
         if (isCompleted) {
             toast.success("Este examen ya se ha completado");
             redirect('/scrum/roadmap');
         }
     }, [isCompleted]); */


    const { start, pause, resume, reset, status, finish } = useExamTimer();
    const proctoringData = useProctoring({
        forceFullScreen: true,
        preventTabSwitch: true,
        preventContextMenu: true,
        preventUserSelection: true,
        preventCopy: true,
    });

    const [isHideExamen, setIsHideExamen] = useState(false);
    const [isInitial, setIsInitial] = useState(!isCompleted);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (!isCompleted && !isInitial && (status != "running")) {
            start(2700);
            proctoringData.fullScreen.trigger();
        }
        if (status === "finished" && !isCompleted) {
            toast.success("⏰ ¡Tiempo terminado!", {
                description: "El examen ha finalizado automáticamente.",
            });
            setIsSubmitted(true);

            reset();

        }


        if ((proctoringData.fullScreen.status == 'off'
            || proctoringData.tabFocus.status === false
        ) &&
            !isCompleted) {
            setIsHideExamen(true);

        }


    }, [status, isCompleted, isInitial, proctoringData.fullScreen.status, proctoringData.tabFocus.status]);


    const router = useRouter();


    return (
        <div className="h-screen w-full bg-background flex justify-center items-center">
            {
                !isCompleted && (
                    <FaceMonitor />
                )
            }



            <div>
                <ExamTimerDisplay className="fixed top-8 right-5 z-50 w-36" />
            </div>

            <Quiz
                title="Evalución Final"
                questions={questions}
                isViewingResults={false}
                onSubmit={handleSubmit}
                isOmitted={false}
                isTerminated={isSubmitted}
            />


            <AlertDialog open={isInitial && status !== "running"}>

                <AlertDialogContent>
                    <div className="flex flex-col justify-center items-center">
                        <div className="bg-accent rounded-full w-20 h-20 flex items-center justify-center mb-4">
                            <AlertTriangle className="w-8 h-8 text-center text-amber-500" />
                        </div>
                    </div>

                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">¿Deseas iniciar el examen?</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            El examen tiene una duración de <strong>45 minutos</strong>.
                            Y evalua de manera teorica tus conocimientos de Scrum.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                router.back();
                            }}
                        >Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                setIsInitial(false);
                            }}
                        >Comenzar examen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <AlertDialog open={isCompleted}>
                <AlertDialogContent>
                    <div className="flex flex-col justify-center items-center">
                        <div className="bg-accent rounded-full w-20 h-20 flex items-center justify-center mb-4">
                            <BookOpenCheck className="w-8 h-8 text-center text-green-600" />
                        </div>
                    </div>

                    <AlertDialogHeader className="text-center">
                        <AlertDialogTitle className="text-center">¡Ya desarrollaste este examen!</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            Has completado este examen previamente.

                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => {
                            router.back();
                        }}>Entendido</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <AlertDialog open={isHideExamen}>

                <AlertDialogContent>
                    <div className="flex flex-col justify-center items-center">
                        <div className="bg-accent rounded-full w-20 h-20 flex items-center justify-center mb-w">
                            <AlertTriangle className="w-8 h-8 text-center text-amber-500" />
                        </div>
                    </div>

                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center"> El examen está temporalmente oculto</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            El examen ha sido bloqueado por el sistema de supervisión.
                            No podrás continuar hasta que se restablezcan las condiciones requeridas.

                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>

                        <AlertDialogAction
                            onClick={() => {
                                setIsHideExamen(false);
                                proctoringData.fullScreen.trigger();
                            }}
                        >Continuar examen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>


    );
}