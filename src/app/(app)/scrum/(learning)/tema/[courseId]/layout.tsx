

import { Sidebar } from "@/components/dashboard/Sidebar";

import { getCourseById, getCourseProgress } from "@/moks/data";
import { getCompletedLessonsByUserId, getTopicById } from "@/lib/db/queries/learning";
import { db } from "@/lib/db";
import { topics } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ArrowLeft, HelpCircle, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

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

      {/*  <ResizablePanelGroup direction="horizontal" className="h-screen">
        <ResizablePanel defaultSize={25} minSize={5} maxSize={40} className="min-w-[60px]">
          <Sidebar course={course} completedLessons={progress}  />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={75} minSize={30}>
          <main className="h-screen overflow-auto">{children}</main>
        </ResizablePanel>

      {isChatOpen && <ResizableHandle withHandle />}

        <ResizablePanel
          ref={chatPanelRef}
          defaultSize={0}
          minSize={0}
          maxSize={40}
          collapsible
          collapsedSize={0}
          className={isChatOpen ? "min-w-[300px]" : "w-0"}
        >
          {isChatOpen && (
            <div className="h-full">
              <ChatPanel />
            </div>
          )}
        </ResizablePanel> 
      </ResizablePanelGroup>*/}
      <Sidebar course={course} completedLessons={progress} />
      <main className="h-full pl-16 lg:pl-96">{children}</main>

    </div>
  );
}
