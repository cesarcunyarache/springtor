"use client";

import ExamTimerDisplay from "@/app/(app)/scrum/evaluacion-practica/components/exam-timer";
import FaceMonitor from "@/app/(app)/scrum/evaluacion-practica/components/face-monitor";
import { useProctoring } from "@/app/(app)/scrum/evaluacion-practica/hooks/useProctoring";
import { useExamTimer } from "@/app/(app)/scrum/evaluacion-practica/store";
import Quiz, { QuizResult } from "@/components/quizz";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { saveUserResponsePostTest } from "@/lib/db/queries/user";
import { Question } from "@/type";
import { AlertTriangle, BookOpenCheck, OctagonAlert } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useExamStore } from "../store/examStore";


const EXAM_TYPE = 'post-test' as const;
const EXAM_DURATION = 2700; // 45 minutos

export default function ClientPage({ questions, isCompleted }: { questions: Question[], isCompleted: boolean }) {
    const router = useRouter();
    const { start, reset, status } = useExamTimer();
    const { startExam, endExam, isExamInProgress } = useExamStore();

    const proctoringData = useProctoring({
        forceFullScreen: true,
        preventTabSwitch: true,
        preventContextMenu: true,
        preventUserSelection: true,
        preventCopy: true,
    });

    const [showInitialAlert, setShowInitialAlert] = useState(false);
    const [isHideExamen, setIsHideExamen] = useState(false);
    const [isInitial, setIsInitial] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isDifferentExamInProgress, setIsDifferentExamInProgress] = useState(false);

    useEffect(() => {
        // Verificar si hay otro examen en progreso
        const anotherExamInProgress = isExamInProgress('pre-test');
        setIsDifferentExamInProgress(anotherExamInProgress);

        // Mostrar alerta inicial si puede empezar el examen
        const canStartExam = !isCompleted && !isInitial && !anotherExamInProgress;
        setShowInitialAlert(canStartExam);

        // Si el timer termina, marcar como enviado
        if (status === "finished" && !isCompleted && isInitial) {
            setIsSubmitted(true);
            reset();
        }

        // Detectar si se perdió fullscreen o focus
        const isHidden = proctoringData.fullScreen.status === 'off' || proctoringData.tabFocus.status === false;
        if (isHidden && isInitial && !isCompleted) {
            setIsHideExamen(true);
        }

    }, [status, isCompleted, isInitial, proctoringData.fullScreen.status, proctoringData.tabFocus.status, reset, isExamInProgress]);

    const handleSubmit = async (answers: QuizResult[]) => {
        setIsSubmitted(true);
        endExam();
        
        toast.promise(saveUserResponsePostTest(answers), {
            loading: 'Enviando respuestas...',
            success: (res: boolean) => {
                reset();
                return res ? 'Respuestas enviadas con éxito' : 'Error al enviar las respuestas';
            },
            error: 'Error al enviar las respuestas',
            finally: () => {
                setTimeout(() => {
                    redirect('/scrum/roadmap');
                }, 1500);
            }
        });
    };

    const handleStartExam = () => {
        setIsInitial(true);
        startExam(EXAM_TYPE);
        start(EXAM_DURATION, EXAM_TYPE);
        proctoringData.fullScreen.trigger();
    };

    return (
        <div className="h-screen w-full bg-background flex justify-center items-center">
            {!isCompleted && isInitial && <FaceMonitor />}

            <div>
                <ExamTimerDisplay className="fixed top-8 right-5 z-50 w-36" />
            </div>

            <Quiz
                title="Evaluación Final"
                questions={questions}
                isViewingResults={false}
                onSubmit={handleSubmit}
                isOmitted={false}
                isTerminated={isSubmitted}
            />

            {/* Alerta inicial - Comenzar examen */}
            <AlertDialog open={showInitialAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>
                            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
                                <AlertTriangle className="h-7 w-7 text-amber-500" />
                            </div>
                            ¿Deseas iniciar el examen?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px] text-center">
                            El examen tiene una duración de <strong>45 minutos</strong>.
                            Evalúa de manera teórica tus conocimientos de Scrum.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => router.back()}>
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleStartExam}>
                            Comenzar examen
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Alerta - Examen ya completado */}
            <AlertDialog open={isCompleted}>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>
                            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600/10">
                                <BookOpenCheck className="w-8 h-8 text-center text-green-600" />
                            </div>
                            ¡Ya completaste este examen!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px] text-center">
                            Has completado este examen previamente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-2 sm:justify-center">
                        <AlertDialogAction onClick={() => router.back()}>
                            Entendido
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Alerta - Examen oculto por supervisión */}
            <AlertDialog open={isHideExamen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>
                            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                                <OctagonAlert className="h-7 w-7 text-destructive" />
                            </div>
                            El examen está temporalmente bloqueado
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px] text-center">
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
                        >
                            Continuar examen
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Alerta - Otro examen en progreso */}
            <AlertDialog open={isDifferentExamInProgress}>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>
                            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                                <OctagonAlert className="h-7 w-7 text-destructive" />
                            </div>
                            Ya tienes un examen en curso
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px] text-center">
                            Tienes el examen de pre-test activo. Finaliza o cierra ese examen antes de comenzar este.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => router.back()}>
                            Entendido
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}