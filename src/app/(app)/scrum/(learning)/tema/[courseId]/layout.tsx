

import { Sidebar } from "@/components/dashboard/Sidebar";

import { getCompletedLessonsByUserId, getTopicById } from "@/lib/db/queries/learning";
import { db } from "@/lib/db";
import { topics } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft, HelpCircle, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { LessonLayout } from "../../components/lesson-layout";
import LessonChat from "../../server/lesson-chat";

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
    getCompletedLessonsByUserId(courseId),
  ]);

  if (!course) {
    return <h1>Course not found</h1>
  }




  return (
    <div className="h-full ">
      <Sidebar course={course} completedLessons={progress} />
        <LessonLayout chat={<LessonChat lessonId={""} />}>
          {children}
        </LessonLayout>

    </div>
  );
}
