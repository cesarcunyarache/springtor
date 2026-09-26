"use client"

import { Progress } from "@/components/ui/progress"
import { Trophy } from "lucide-react"

interface ProgressTrackerProps {
  completed: number
  total: number
}

export function ProgressTracker({ completed, total }: ProgressTrackerProps) {
  const percentage = (completed / total) * 100

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <span className="text-sm font-medium text-gray-700">
          {completed}/{total}
        </span>
      </div>
      <Progress value={percentage} className="w-32 h-2" />
      <span className="text-sm text-gray-600">{Math.round(percentage)}%</span>
    </div>
  )
}
