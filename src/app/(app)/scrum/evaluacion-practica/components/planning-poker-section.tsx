"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Task, UserStory } from "../types"

interface PlanningPokerSectionProps {
  productBacklog: UserStory[]
  selectedStories: number[]
  storyTasks: Record<number, Task[]>
  storyEstimations: Record<number, number | string>
  taskEstimations: Record<number, number>
  setStoryEstimation: (storyId: number, value: number | string) => void
  setTaskEstimation: (taskId: number, value: number) => void
  getTotalStoryPoints: () => number
  getTotalTaskHours: () => number
}

export default function PlanningPokerSection({
  productBacklog,
  selectedStories,
  storyTasks,
  storyEstimations,
  taskEstimations,
  setStoryEstimation,
  setTaskEstimation,
  getTotalStoryPoints,
  getTotalTaskHours,
}: PlanningPokerSectionProps) {
  return (
    <Card className="bg-white shadow-md mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
            6
          </span>
          Estimaciones (Planning Poker)
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Estima cada historia del Sprint Backlog usando la secuencia de Fibonacci
        </p>
      </CardHeader>

      <CardContent>
        {selectedStories.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Primero agrega historias al Sprint Backlog</p>
          </div>
        ) : (
          <div className="space-y-6">
            {selectedStories.map((storyId) => {
              const story = productBacklog.find((s) => s.id === storyId)
              if (!story) return null

              return (
                <Card key={storyId} className="border border-gray-200 rounded-lg p-5">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-sm font-semibold text-gray-900">
                      {story.title}
                    </CardTitle>
                  </CardHeader>

                  <p className="text-sm text-gray-600 mb-4 italic">
                    Como {story.asA}, quiero {story.iWant} para {story.soThat}
                  </p>

                  <div className="flex items-center flex-wrap gap-2 mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Story Points:
                    </span>
                    {[1, 2, 3, 5, 8, 13, 21, "?"].map((point) => (
                      <Button
                        key={point}
                        onClick={() => setStoryEstimation(storyId, point)}
                        variant={
                          storyEstimations[storyId] === point ? "default" : "outline"
                        }
                        className={`w-10 h-12 font-bold ${
                          storyEstimations[storyId] === point
                            ? "bg-blue-600 text-white shadow-md scale-110"
                            : "text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                        }`}
                      >
                        {point}
                      </Button>
                    ))}
                  </div>

                  {storyEstimations[storyId] && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                      <span className="font-medium text-blue-900">Estimación: </span>
                      <span className="text-blue-800">
                        {storyEstimations[storyId]} story points
                      </span>
                    </div>
                  )}

                  {storyTasks[storyId] && storyTasks[storyId].length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Estimación de Tareas (en horas):
                      </p>
                      <div className="space-y-2">
                        {storyTasks[storyId].map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="flex-1 text-gray-700">{task.name}</span>
                            <Input
                              type="number"
                              min="0"
                              max="40"
                              step="0.5"
                              placeholder="hrs"
                              value={taskEstimations[task.id] || ""}
                              onChange={(e) =>
                                setTaskEstimation(
                                  task.id,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-16 text-xs text-center"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}

            {/* Totales */}
            <Card className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm text-gray-600">
                    Total de Story Points:
                  </span>
                  <p className="text-3xl font-bold text-gray-900">
                    {getTotalStoryPoints()} pts
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Velocidad Anterior:</span>
                  <p className="text-3xl font-bold text-gray-400">34 pts</p>
                </div>
              </div>

              {getTotalStoryPoints() > 34 && (
                <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
                  ⚠️ El total estimado supera la velocidad del sprint anterior
                </div>
              )}

              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Horas (Tareas):</span>
                  <span className="font-bold text-gray-900">
                    {getTotalTaskHours()} hrs
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
