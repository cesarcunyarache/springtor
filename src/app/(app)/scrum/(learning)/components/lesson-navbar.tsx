"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Lesson } from '@/type'
import { cn } from '@udecode/cn'
import { BookOpen, MessageSquare, StickyNote } from 'lucide-react'
import { useChatStore } from '@/hooks/use-chat-store'

interface LessonNavbarProps {
    lesson: Lesson
}

export default function LessonNavbar({ lesson }: LessonNavbarProps) {

    const { openChat, toggleChat } = useChatStore();

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

                        <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2"
                        
                        onClick={ () => {
 
                                toggleChat()
                            }}
                            >
                            <MessageSquare className="h-4 w-4" />
                            <span className="hidden md:inline">Preguntar</span>
                        </Button>

                        <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-2">
                            <StickyNote className="h-4 w-4" />
                            <span className="hidden md:inline">Notas</span>
                        </Button>


                        <div className="flex sm:hidden items-center gap-1">
                            <Button variant="ghost" size="icon" >
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
    )
}
