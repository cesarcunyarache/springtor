import { isUserResponsePracticePostTest } from "@/lib/db/queries/user";
import PracticeEvaluationPostTestClient from "../scrum/evaluacion-practica/practice-evaluation-post-test-client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {

    const session = await auth();
    const userId = session?.user?.id;

    if ( !userId ) {
        return redirect('/scrum/roadmap');
    }

    const isCompleted =  await isUserResponsePracticePostTest(userId);

    return (
        <PracticeEvaluationPostTestClient isCompleted={isCompleted} />
    )
}