import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, ArrowRight } from "lucide-react"
import { Task, UserStory } from "../types"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface SprintBacklogProps {
  productBacklog: UserStory[]
  selectedStories: number[]
  storyTasks: Record<number, Task[]>
  teamMembers: string[]
  addStoryToSprint: (id: number) => void
  removeStoryFromSprint: (id: number) => void
  addTask: (storyId: number, taskName: string) => void
  removeTask: (storyId: number, taskId: number) => void
  updateTaskResponsible: (
    storyId: number,
    taskId: number,
    responsible: string
  ) => void
}

export default function SprintBacklogSection({
  productBacklog,
  selectedStories,
  storyTasks,
  teamMembers,
  addStoryToSprint,
  removeStoryFromSprint,
  addTask,
  removeTask,
  updateTaskResponsible,
}: SprintBacklogProps) {
  const [taskInputs, setTaskInputs] = useState<Record<number, string>>({})

  const handleAddTask = (storyId: number) => {
    const taskName = taskInputs[storyId]?.trim()
    if (taskName) {
      addTask(storyId, taskName)
      setTaskInputs((prev) => ({ ...prev, [storyId]: "" }))
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-6">
      {/* 🧩 Historias Disponibles */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-bold text-gray-900">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
              4
            </span>
            Seleccionar Historias
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Haz clic para agregar historias al Sprint
          </p>
        </CardHeader>
        <CardContent>
          {productBacklog.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Primero crea historias de usuario</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {productBacklog.map((story) => (
                <div
                  key={story.id}
                  className={`border rounded-lg p-3 transition-all ${
                    selectedStories.includes(story.id)
                      ? "border-gray-300 bg-gray-50 opacity-60"
                      : "border-gray-200 hover:border-primary hover:shadow-md cursor-pointer"
                  }`}
                  onClick={() =>
                    !selectedStories.includes(story.id) &&
                    addStoryToSprint(story.id)
                  }
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm flex-1">
                      {story.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
                        story.priority === "Alta"
                          ? "bg-red-100 text-red-700"
                          : story.priority === "Media"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {story.priority}
                    </span>
                  </div>

                  {selectedStories.includes(story.id) ? (
                    <p className="text-xs text-gray-500 font-medium mt-2">
                      ✓ En el Sprint
                    </p>
                  ) : (
                    <div className="text-xs text-primary font-medium flex items-center mt-2">
                      <Plus className="w-3 h-3 mr-1" />
                      Agregar
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🧩 Sprint Backlog + Tareas */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-bold text-gray-900">
            <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
              5
            </span>
            Sprint Backlog + Tareas
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Descomponer historias en tareas técnicas
          </p>
        </CardHeader>
        <CardContent>
          {selectedStories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ArrowRight className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Selecciona historias primero</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedStories.map((storyId) => {
                const story = productBacklog.find((s) => s.id === storyId)
                if (!story) return null
                const tasks = storyTasks[storyId] || []

                return (
                  <Card key={storyId} className="border rounded-lg p-3 gap-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm flex-1">
                        {story.title}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeStoryFromSprint(storyId)}
                        title="Remover historia"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* input + botón */}
                    <div className="flex items-center gap-2 mb-3">
                      <Input
                        placeholder="Nueva tarea técnica..."
                        className="flex-1 text-xs"
                        value={taskInputs[storyId] || ""}
                        onChange={(e) =>
                          setTaskInputs((prev) => ({
                            ...prev,
                            [storyId]: e.target.value,
                          }))
                        }
                      />
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => handleAddTask(storyId)}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Agregar
                      </Button>
                    </div>

                    {/* lista de tareas */}
                    {tasks.length > 0 && (
                      <div className="space-y-2">
                        {tasks.map((task) => (
                          <Card key={task.id} className="bg-white rounded-b-md p-2 text-xs gap-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">
                                {task.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTask(storyId, task.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>

                            <div className="flex items-center space-x-2">
                              <label className="text-gray-600 text-xs">
                                Responsable:
                              </label>
                              <Select
                                value={task.responsible || "none"}
                                onValueChange={(value) =>
                                  updateTaskResponsible(storyId, task.id, value)
                                }
                              >
                                <SelectTrigger className="h-7 text-xs flex-1 border-gray-300">
                                  <SelectValue placeholder="Sin asignar" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">Sin asignar</SelectItem>
                                  {teamMembers.map((member) => (
                                    <SelectItem key={member} value={member}>
                                      {member}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
