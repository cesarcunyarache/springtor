"use client"

import PracticeEvaluation from './practice-evaluation';
import { evaluateScrumPractice } from '../../api/practice/actions';
import { savePrestestPracticeResponses } from '@/lib/db/queries/user';

interface PracticeEvaluationClientProps {
   isCompleted: boolean;
}
export default function PracticeEvaluationPreTestClient(
    { isCompleted }: PracticeEvaluationClientProps
) {

    const handleSubmitExam = async (response: any) => {
        const evaluation = await evaluateScrumPractice(response);
        await savePrestestPracticeResponses(response, evaluation.rubricScore, evaluation.checklistScore, evaluation.feedback, evaluation.justification);

    };
    return (
        <PracticeEvaluation
            onSubmit={handleSubmitExam}
            isCompleted={isCompleted}
            isInitialized={!isCompleted}

        />
    )
}
