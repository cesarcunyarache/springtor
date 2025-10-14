"use client"

import PracticeEvaluation from './practice-evaluation';
import { evaluateScrumPractice } from '../../api/practice/actions';
import { savePostTestPracticeResponses } from '@/lib/db/queries/user';
import { useRouter } from 'next/navigation';

interface PracticeEvaluationClientProps {
   isCompleted: boolean;
}
export default function PracticeEvaluationPostTestClient(
    { isCompleted }: PracticeEvaluationClientProps
) {

    const router = useRouter();
    const handleSubmitExam = async (response: any) => {
        const evaluation = await evaluateScrumPractice(response);
        
        await savePostTestPracticeResponses(response, evaluation.rubricScore, evaluation.checklistScore, evaluation.feedback, evaluation.justification);

         router.refresh();

    };
    return (
        <PracticeEvaluation
            onSubmit={handleSubmitExam}
            isCompleted={isCompleted}
            isInitialized={!isCompleted}

        />
    )
}
