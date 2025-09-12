import { redirect } from "next/navigation";

import { PortableText } from "@portabletext/react";

/* import { LessonCompleteButton } from "@/components/LessonCompleteButton"; */
import { LoomEmbed } from "@/components/LoomEmbed";

import { getLessionById } from "@/lib/db/queries/learning";
import { Button } from "@/components/ui/button";
import { BookOpen, Check, MessageSquare, Send, Sparkles, StickyNote, Target } from "lucide-react";
import { cn } from "@udecode/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ClientLessonPage from "./client";
import { MarkdownView } from "@/components/markdown/index";
import { completeLesson } from "@/lib/db/queries/user";



interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  /*   const user = await currentUser(); */
  const { courseId, lessonId, } = await params;

  const lesson = await getLessionById(lessonId);

  if (!lesson) {
    return <h1>Lesson not found</h1>
  }


  const handleCompleteLesson = async () => {

    await completeLesson(
      {
        moduleId: lesson.moduleId,
        lessonId: lesson.id,
        topicId: lesson.module?.topicId ?? "",
      }
    );

  }


  return (
    <>
      <div className="flex flex-col flex-1 w-full ml-1 overflow-auto">
        <nav
          className={cn(
            "fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:ml-96 ml-16"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <h1 className="font-semibold text-lg truncate">{lesson.title}</h1>
            </div>

            <div className="flex items-center gap-2">




              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden md:inline">Preguntar</span>
              </Button>

              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                <StickyNote className="h-4 w-4" />
                <span className="hidden md:inline">Notas</span>
              </Button>


              {/* Mobile action buttons */}
              <div className="flex sm:hidden items-center gap-1">
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <StickyNote className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>


      </div>

      <ClientLessonPage lesson={lesson} />
    </>
  );
}
