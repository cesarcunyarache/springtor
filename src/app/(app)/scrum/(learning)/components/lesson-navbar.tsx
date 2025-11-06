"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Lesson } from '@/type'
import { cn } from '@udecode/cn'
import { BookOpen, Check, MessageCircleMore, MessageSquare, StickyNote } from 'lucide-react'
import { useChatStore } from '@/hooks/use-chat-store'
import { Tooltip } from '@radix-ui/react-tooltip'
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useSession } from 'next-auth/react'

import { completeLesson } from '@/lib/db/queries/user'
import { useRouter } from 'next/navigation'

interface LessonNavbarProps {
    lesson: Lesson
}

export default function LessonNavbar({ lesson }: LessonNavbarProps) {

    const session = useSession();
    const { openChat, toggleChat } = useChatStore();

    const router = useRouter();

    const handleCompleteLesson = async () => {

        await completeLesson(
            {
                moduleId: lesson.moduleId,
                lessonId: lesson.id,
                topicId: lesson.module?.topicId ?? "",
            }
        );

        router.refresh();

    }

    return (
        <div className="flex flex-col flex-1 w-full ml-1 overflow-auto">
            <nav
                className={cn(
                    " top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  "
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
                        {
                            session?.data?.user?.email === "cesarcunyarache@gmail.com" &&
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2"
                                        onClick={handleCompleteLesson}
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Completar</p>
                                </TooltipContent>
                            </Tooltip>
                        }
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2"
                                    onClick={() => {
                                        toggleChat()
                                    }}
                                >
                                    <MessageCircleMore className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Preguntar</p>
                            </TooltipContent>
                        </Tooltip>

                       {/*  <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2"
                                    onClick={() => {

                                    }}
                                >
                                    <StickyNote className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Notas</p>
                            </TooltipContent>
                        </Tooltip> */}
                    </div>
                </div>
            </nav>
        </div>
    )
}
