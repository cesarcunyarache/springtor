
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
import { getLearningSteps, getTopicsByRoadmapId } from "@/lib/db/queries/learning"

export default async function Page() {
  /* const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set()) */

  /* const handleTopicComplete = (topicId: string) => {
    setCompletedTopics((prev) => new Set([...prev, topicId]))
  } */

  const topics = await getTopicsByRoadmapId("3f94b0f1-89b1-4b59-9b92-d3e2b9c0e19f")

  const learningSteps = await getLearningSteps()

/*   console.log(topics); */

/*   const totalTopics = 12
  const progress = (completedTopics.size / totalTopics) * 100 */

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className=" backdrop-blur-sm border-b bg-background/30 border-foreground sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-950 rounded-xl flex items-center justify-center">
                <Bird className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-950 bg-clip-text text-transparent">
                Springtor
              </h1>
            </div>
           {/*  <div className="flex items-center space-x-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium ">
                {completedTopics.size}/{totalTopics}
              </span>
              <Progress value={progress} className="w-32" />
              <span className="text-sm font-bold ">{Math.round(progress)}%</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Roadmap */}
          {/*  <div className="xl:col-span-3">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ruta de Aprendizaje</h2>
                <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-blue-500"></div>
                    <span>Línea principal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-1 bg-gray-400 border-dashed border-t-2"></div>
                    <span>Ramas de aprendizaje</span>
                  </div>
                </div>
              </div>
              
            </Card>
          </div> */}


 

             <ScrumRoadmap

             topics={topics}
             learningSteps={learningSteps}
             
            /*   onTopicSelect={(topicId) => {}} */
            /*   completedTopics={completedTopics} */
            />
  



          {/* Placeholder */}
          {/*  <div className="xl:col-span-1">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl sticky top-24">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Explora la Timeline!</h3>
                <p className="text-gray-600 mb-4">
                  Haz clic en cualquier nodo de la línea de tiempo para comenzar tu aprendizaje
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                  💡 Tip: Sigue la línea vertical principal y explora cada rama lateral
                </div>
              </div>
            </Card>
          </div> */}
        </div>
      </div>

      {/* Modal de Detalle del Tema */}
     {/*  <Dialog open={!!selectedTopic} onOpenChange={(open) => !open && setSelectedTopic(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] w-96 h-[60vh] overflow-y-auto md:h-[60vh] md:w-[2xl]">
          {selectedTopic && (
            <TopicDetail
              topicId={selectedTopic}
              onComplete={handleTopicComplete}
              isCompleted={completedTopics.has(selectedTopic)}
            /* onClose={() => setSelectedTopic(null)} 
            />
          )}
        </DialogContent>
      </Dialog> */}

      {/*  <FloatingDock items={[
        { title: 'Home', icon: <Home />, href: '/home' },
        { title: 'Chat', icon: <MessageCircleMore />, href: '/chat' },
        { title: 'Ruta de aprendizaje', icon: <GitMerge />, href: '/roadmap' },
        { title: 'Notas', icon: <FileIcon />, href: '/notes' },
        { title: 'Calendario', icon: <Calendar />, href: '/calendar' },
        { title: 'Configuración', icon: <CogIcon />, href: '/settings' },

      ]}
        mobileClassName="fixed left-1/2 -translate-x-1/2 bottom-4 z-50"
        desktopClassName="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 backdrop-blur-lg bg-white/30 backdrop-blur-sm border border-gray-200 rounded-lg"
      />
 */}
    </div>
  )
}
