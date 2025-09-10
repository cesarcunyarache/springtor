"use client";

import Quiz, { QuizResult } from '@/components/quizz'
import { saveUserResponseLessonAnswers, saveUserResponseTheoryAnswers } from '@/lib/db/queries/user';
import { Lesson, Topic } from '@/type'
import React from 'react'
import { toast } from 'sonner';

export default function ClientPage({ topic }: { topic: Topic }) {

    const handleOnSubmit = async (answers: QuizResult[]) => {
        toast.promise(saveUserResponseTheoryAnswers(answers, topic?.assessment?.id), {
            loading: 'Enviando...',
            success: (res: boolean) => {
                return res ? 'Respuestas enviada con éxito' : 'Algo salió mal. Por favor, inténtalo de nuevo';
            },
            error: 'Algo salió mal. Por favor, inténtalo de nuevo.',
        });
    }
    return (
        <div className="overflow-auto h-screen">
            <Quiz title={"Quiz"} questions={topic?.assessment?.questions ?? []}
                isOmitted={false}
                onSubmit={handleOnSubmit}
                isViewingResults={true}
                questionResults={
                    topic?.assessment?.theoryAnswers?.map((a) => ({
                        questionId: a.questionId,
                        selectedOption: a.selectedOption,
                        isCorrect: a.isCorrect,
                    }))
                }
                allowReset={true}
            />

        </div>
    )
}
