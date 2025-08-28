import { redirect } from "next/navigation";

import { PortableText } from "@portabletext/react";

import { LessonCompleteButton } from "@/components/LessonCompleteButton";
import { LoomEmbed } from "@/components/LoomEmbed";
import { getLessonById } from "@/moks/data";
import { getLessionById } from "@/lib/db/queries/learning";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageSquare, StickyNote } from "lucide-react";
import { cn } from "@udecode/cn";


interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
/*   const user = await currentUser(); */
  const { courseId, lessonId } = await params;

  const lesson = await getLessionById(lessonId);

  if (!lesson) {
    return <h1>Lesson not found</h1>
  }

  return (
    <>


      <div className="flex flex-col flex-1 ml-1 ">
        <nav
          className={cn(
            "sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
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
      
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>

          {lesson.description && (
            <p className="text-muted-foreground mb-8">{lesson.description} </p>
          )}

          <div className="space-y-8">
            {/* Video Section */}
            {/* {lesson.videoUrl && <VideoPlayer url={lesson.videoUrl} />} */}

            {/* Loom Embed Video if loomUrl is provided */}
            {lesson.loomUrl && <LoomEmbed shareUrl={lesson.loomUrl} />}

            {/* Lesson Content */}
            {lesson.content && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Lesson Notes</h2>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                 {/*  <PortableText value={JSON.parse(lesson.content)} /> */}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <LessonCompleteButton lessonId={String(lesson.id)} clerkId={"1"} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
