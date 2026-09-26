import { getAssessmentBySlug } from "@/lib/db/queries/learning";
import ClientPage from "./client";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isUserResponsePostTest } from "@/lib/db/queries/user";
import { toast } from "sonner";


export default async function Page() {

  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

  const isCompleted = await isUserResponsePostTest(session.user.id);

  const assement = await getAssessmentBySlug("pre-post-test")

  if (!assement) {
    return <h1>Assessment not found</h1>
  }

  return (
    <ClientPage questions={assement?.questions ?? []} isCompleted={isCompleted} />
  );
}