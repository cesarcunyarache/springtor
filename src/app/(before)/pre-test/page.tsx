import { getAssessmentBySlug } from "@/lib/db/queries/learning";
import ClientPage from "./client";

export default async function Page() {

  const assement = await getAssessmentBySlug("pre-test")

  if (!assement) {
    return <h1>Assessment not found</h1>
  }

  return (
    <ClientPage questions={assement?.questions ?? []} />
  );
}