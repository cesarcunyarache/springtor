
/* import { useState } from "react" */
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Bird, Target, FileIcon, CogIcon, HelpCircleIcon, Home, MessageCircleMore, GitMerge, Calendar, BookCheck } from "lucide-react"

import { ScrumRoadmap } from "@/components/roadmap/scrum-roadmap"
import { TopicDetail } from "@/components/roadmap/topic-detail"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FloatingDock } from "@/components/floating-dock"
import { Dock } from "@/components/dock"
import { DockDemo } from "@/components/dock-demo"
import { ReactFlowProvider } from "@xyflow/react"
import FlowWithProvider from "@/providers/reactflow-provider"
import { getLearningSteps, getStepsByRoadmapBySlug, getTopicsByRoadmapId } from "@/lib/db/queries/learning"
import { TimelineDemo } from "@/components/roadmap/timeline-scrum"
import { auth } from "@/auth"
import { isUserResponsePreTest } from "@/lib/db/queries/user"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

export default async function Page() {
  /* const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set()) */

  /* const handleTopicComplete = (topicId: string) => {
    setCompletedTopics((prev) => new Set([...prev, topicId]))
  } */


  const steps = await getStepsByRoadmapBySlug("scrum")


  /*   const totalTopics = 12
    const progress = (completedTopics.size / totalTopics) * 100 */

  let totalTopics = 0;
  let completedTopics = 0;
  let totalProgress = 0;

  steps.forEach((step) => {
    step?.topics?.forEach((topic) => {
      const progress = topic.topicCompletions?.[0]?.progress ?? 0;
      totalTopics++;
      totalProgress += progress;
      if (progress >= 100) completedTopics++;
    });
  });

  const overallPercentage = totalTopics > 0 ? totalProgress / totalTopics : 0;


  return (
    <div className=" ">
      <div className=" backdrop-blur-sm border-b bg-background/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Bird className="w-6 h-6 text-white" />
              </div>
              <h1 className="hidden sm:block text-xl font-bold bg-gradient-to-r bg-clip-text">
                Springtor
              </h1>

            </div>
            <div className="flex items-center space-x-4 gap-4">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <BookCheck className="h-5 w-5" />
                    Evaluaciones
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>Mis evaluaciones</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Evaluación Teorica</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem asChild>
                            <Link href="/evaluacion-teorica-pre-test" className="" >
                              Pre Test
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/evaluacion-teorica-post-test" className="" >
                              Post Test
                            </Link>
                          </DropdownMenuItem>

                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Evaluación Practica</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem asChild>
                            <Link href="/evaluacion-practica-pre-test" className="" >
                              Pre Test
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/evaluacion-practica-post-test" className="" >
                              Post Test
                            </Link>
                          </DropdownMenuItem>

                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>

                </DropdownMenuContent>
              </DropdownMenu>

              {/*   <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/practice-evaluation-post-test" className="" >

                    <Button variant="ghost" size="icon" className="hidden sm:flex items-center gap-2">
                      <BookCheck className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Examen Práctico</p>
                </TooltipContent>
              </Tooltip>
 */}


              {/*  <div className="flex items-center space-x-4">

                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  {completedTopics}/{totalTopics}
                </span>
                <Progress value={overallPercentage} className="w-32" />
                <span className="text-sm font-bold ">{Math.round(overallPercentage)}%</span>
              </div> */}

               <Separator orientation="vertical"  />

              <div className="flex items-center space-x-4">
               
                <div className="hidden sm:flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {completedTopics}/{totalTopics}
                  </span>
                </div>

             
                <Progress value={overallPercentage} className="w-32" />

              
                <span className="hidden sm:block text-sm font-bold">
                  {Math.round(overallPercentage)}%
                </span>
              </div>



            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mb-24">

        <TimelineDemo

          steps={steps}
        />
      </div>
    </div>
  )
}
