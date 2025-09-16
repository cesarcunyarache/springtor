"use client"

import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { useChatStore } from "@/hooks/use-chat-store"
import LessonChat from "../server/lesson-chat"
import dynamic from "next/dynamic"

interface LessonLayoutProps {
  children: React.ReactNode
  chat: React.ReactNode
}


export function LessonLayout({ children, chat }: LessonLayoutProps) {
  const { isChatOpen } = useChatStore()
  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen" autoSaveId="persitence">
      <ResizablePanel >
        <main className="h-full pl-16 lg:pl-96">{children}</main>
      </ResizablePanel>

      {isChatOpen &&
        (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel
              minSize={20}
              maxSize={40}
            >
             {chat}
            </ResizablePanel>
          </>
        )}
    </ResizablePanelGroup>
  )
}
