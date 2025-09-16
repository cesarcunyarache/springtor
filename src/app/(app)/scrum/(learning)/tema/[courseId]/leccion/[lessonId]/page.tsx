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
import LessonNavbar from "../../../../components/lesson-navbar";



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

  return (
    <div className="">

      

      <LessonNavbar lesson={lesson} />

      <div className="flex flex-col flex-1 w-full ml-1 overflow-auto h-[92vh]">

        <ClientLessonPage lesson={lesson} />
      </div>
    </div>
  );
}
