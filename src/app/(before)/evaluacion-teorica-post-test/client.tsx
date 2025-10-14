"use client";

import Quiz, { QuizResult } from "@/components/quizz";
import { saveUserResponsePreTest } from "@/lib/db/queries/user";
import { Question } from "@/type";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function ClientPage({ questions }: { questions: Question[] }) {

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

    return (
        <Quiz
            title="Evalución Final"
            questions={questions}
            isViewingResults={false}
            onSubmit={handleSubmit}   
        />
    );
}