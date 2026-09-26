
import { auth } from "@/auth";
import PracticeEvaluationPreTestClient from "../scrum/evaluacion-practica/practice-evaluation-pre-test-client";
import { isUserResponsePracticePreTest } from "@/lib/db/queries/user";
import { redirect } from "next/navigation";



export default async function page() {

   const session = await auth();
    const userId = session?.user?.id;

    if ( !userId ) {
        return redirect('/scrum/roadmap');
    }

    const isCompleted =  await isUserResponsePracticePreTest(userId);
  return (
    <PracticeEvaluationPreTestClient isCompleted={isCompleted} />
  )
}
