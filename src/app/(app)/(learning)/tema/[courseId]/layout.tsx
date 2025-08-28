import { redirect } from "next/navigation";


import { Sidebar } from "@/components/dashboard/Sidebar";

import { getCourseById, getCourseProgress } from "@/moks/data";
import { getTopicById } from "@/lib/db/queries/learning";
import { db } from "@/lib/db";
import { topics } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft, HelpCircle, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
/*   const user = await currentUser(); */
  const { courseId } = await params;

  /* if (!user?.id) {
    return redirect("/");
  } */

/*   const authResult = await checkCourseAccess(1 || null, courseId); */
 /*  if (!authResult.isAuthorized || !user?.id) {
    return redirect(authResult.redirect!);
  }
 */
  const [course, progress] = await Promise.all([
    getTopicById(courseId),
    getCourseProgress(1, Number(courseId)),
  ]);


   

  if (!course) {
    return <h1>Course not found</h1>
  }

  return (
    <div className="h-full">
      <Sidebar course={course} completedLessons={progress.completedLessons} />
      <main className="h-full  pl-16 lg:pl-96">{children}</main>
    </div>
  );
}
