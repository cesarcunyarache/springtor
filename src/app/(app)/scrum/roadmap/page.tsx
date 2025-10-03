
/* import { useState } from "react" */
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Bird, Target, FileIcon, CogIcon, HelpCircleIcon, Home, MessageCircleMore, GitMerge, Calendar } from "lucide-react"

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
import { redirect } from "next/navigation"
import { isUserResponsePreTest } from "@/lib/db/queries/user"

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
              <div className="w-10 h-10 bg-primary  rounded-xl flex items-center justify-center">
                <Bird className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r bg-clip-text">
                Springtor
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">
                {completedTopics}/{totalTopics}
              </span>
              <Progress value={overallPercentage} className="w-32" />
              <span className="text-sm font-bold ">{Math.round(overallPercentage)}%</span>
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
