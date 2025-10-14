import { getAssessmentBySlug } from "@/lib/db/queries/learning";
import ClientPage from "./client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isUserResponsePreTest } from "@/lib/db/queries/user";

export default async function Page() {

  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

  const isCompleted = await isUserResponsePreTest(session.user.id);
  
  if (isCompleted) {
    return <h1>Assessment already completed</h1>
  }

  const assement = await getAssessmentBySlug("pre-post-test")

  if (!assement) {
    return <h1>Assessment not found</h1>
  }

  return (
    <ClientPage questions={assement?.questions ?? []} />
  );
}