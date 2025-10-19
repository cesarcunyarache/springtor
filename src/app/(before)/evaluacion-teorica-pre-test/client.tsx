"use client";

import { useProctoring } from "@/app/(app)/scrum/evaluacion-practica/hooks/useProctoring";
import Quiz, { QuizResult } from "@/components/quizz";
import { saveUserResponsePostTest, saveUserResponsePreTest } from "@/lib/db/queries/user";
import { Question } from "@/type";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertTriangle, BookOpenCheck, OctagonAlert } from "lucide-react";
import FaceMonitor from "@/app/(app)/scrum/evaluacion-practica/components/face-monitor";
import ExamTimerDisplay from "@/app/(app)/scrum/evaluacion-practica/components/exam-timer";
import { useExamTimer } from "@/app/(app)/scrum/evaluacion-practica/store";

export default function ClientPage({ questions, isCompleted }: { questions: Question[], isCompleted: boolean }) {

    const key = "teoria-pre-test";

    const handleSubmit = async (answers: QuizResult[]) => {
        toast.promise(saveUserResponsePreTest(answers), {
            loading: 'Enviando...',
            success: (res: boolean) => {
                reset();
                return res ? 'Respuestas enviada con éxito' : 'Algo salió mal. Por favor, inténtalo de nuevo';
            },
            error: 'Algo salió mal. Por favor, inténtalo de nuevo.',
            finally: () => {
                redirect('/scrum/roadmap');
            }
        });
    }

    const { start, pause, resume, reset, status, finish, name } = useExamTimer();
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
    const [isSameExam, setIsSameExam] = useState(false);

    useEffect(() => {

        setIsSameExam(name !== key && name !== "");
        setShowInitialAlert((name === key || name === "") && !isCompleted && !isInitial);

        if (status === "finished" && !isCompleted) {
            setIsSubmitted(true);
            reset();
        }

        const isHidden = proctoringData.fullScreen.status == 'off' || proctoringData.tabFocus.status === false

        if (isHidden && !isCompleted && isInitial) {
            setIsHideExamen(true);
        }


    }, [
        name,
        key,
        status,
        isCompleted,
        isInitial,
        proctoringData.fullScreen.status,
        proctoringData.tabFocus.status,
        reset,
        showInitialAlert,
        isHideExamen,
    ]);


    const router = useRouter();


    return (
        <div className="h-screen w-full bg-background flex justify-center items-center">
            {
                !isCompleted && isInitial && (
                    <FaceMonitor />
                )
            }
            <button onClick={() => reset()}>Stop</button>



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
                            Y evalua de manera teorica tus conocimientos de Scrum.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">
                        <AlertDialogCancel
                            onClick={() => {
                                router.back();
                            }}
                        >Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                setIsInitial(true);
                                start(2700, key);
                                proctoringData.fullScreen.trigger();
                            }}
                        >Comenzar examen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>



            <AlertDialog open={isCompleted} >
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>
                            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600/10">
                                <BookOpenCheck className="w-8 h-8 text-center text-green-600" />
                            </div>
                            ¡Ya desarrollaste este examen!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px] text-center">
                            Has completado este examen previamente.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-2 sm:justify-center">

                        <AlertDialogAction
                            onClick={() => {
                                router.back();
                            }}
                        >
                            Entendido
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>




            <AlertDialog open={isHideExamen}>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>
                            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                                <OctagonAlert className="h-7 w-7 text-destructive" />
                            </div>
                            El examen está temporalmente oculto
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px] text-center">
                            El examen ha sido bloqueado por el sistema de supervisión.
                            No podrás continuar hasta que se restablezcan las condiciones requeridas.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">

                        <AlertDialogAction
                            onClick={() => {
                                setIsHideExamen(false);
                                proctoringData.fullScreen.trigger();
                            }}
                        >Continuar examen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <AlertDialog open={isSameExam}>
                <AlertDialogContent>
                    <AlertDialogHeader className="items-center">
                        <AlertDialogTitle>
                            <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                                <OctagonAlert className="h-7 w-7 text-destructive" />
                            </div>
                            Ya tienes un examen en curso
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-[15px] text-center">
                            Parece que tienes un examen activo. Finaliza o cierra el examen en curso antes de comenzar uno nuevo.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">

                        <AlertDialogAction
                            onClick={() => {
                                router.back();
                            }}
                        >Entendido</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>



    );
}