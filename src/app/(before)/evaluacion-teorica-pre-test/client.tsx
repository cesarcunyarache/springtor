"use client";

import Quiz, { QuizResult } from "@/components/quizz";
import { saveUserResponsePostTest, saveUserResponsePreTest } from "@/lib/db/queries/user";
import { Question } from "@/type";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

    useEffect (() => {
        if (isCompleted) {
            toast.success("Este examen ya se ha completado");
            redirect('/scrum/roadmap');
        }
    }, [isCompleted]);

    return (
        <Quiz
            title="Evalució Inicial"
            questions={questions}
            isViewingResults={false}
            onSubmit={handleSubmit} 
 
        />
    );
}