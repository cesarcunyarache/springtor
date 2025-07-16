"use client"

import { Handle, Position } from "reactflow"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface CustomNodeProps {
  data: {
    label: string
    description: string
    icon: string
    category: string
    level: number
    completed?: boolean
    position: Position
  }
}

export function CustomNode({ data }: CustomNodeProps) {
  const { label, description, icon, category, level, completed, position } = data

  const categoryColors = {
    foundation: "from-blue-400 to-blue-600",
    roles: "from-green-400 to-green-600",
    events: "from-purple-400 to-purple-600",
    artifacts: "from-yellow-400 to-yellow-600",
    mastery: "from-red-400 to-red-600",
  }

  const categoryBadgeColors = {
    foundation: "bg-blue-100 text-blue-800 border-blue-200",
    roles: "bg-green-100 text-green-800 border-green-200",
    events: "bg-purple-100 text-purple-800 border-purple-200",
    artifacts: "bg-yellow-100 text-yellow-800 border-yellow-200",
    mastery: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <div className="relative">
      <Handle type="target" position={position} className="w-3 h-3 border-2 border-white" />

      <Card
        className={`
        p-4 w-[180px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl
        ${completed ? "bg-green-50 border-green-300 shadow-green-200/50" : "bg-white/90 backdrop-blur-sm border-gray-200"}
        hover:border-blue-400 shadow-xl
      `}
      >
        <div className="space-y-3">
          {/* Icon and completion status */}
          <div className="flex items-center justify-between">
            <div
              className={`
              w-12 h-12 rounded-full flex items-center justify-center text-xl
              bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]}
              shadow-lg transform transition-transform hover:rotate-12
            `}
            >
              {icon}
            </div>
            {completed && (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-gray-900 leading-tight">{label}</h3>

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>

          {/* Level and Category */}
          <div className="flex items-center justify-between">
            <Badge
              className={`text-xs ${categoryBadgeColors[category as keyof typeof categoryBadgeColors]} ${
                completed ? "bg-green-100 text-green-800 border-green-200" : ""
              }`}
            >
              Nivel {level}
            </Badge>
            <span className="text-xs text-gray-500 capitalize">{category}</span>
          </div>
        </div>

        {/* Glow effect for completed */}
        {completed && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-100/40 to-emerald-100/40 rounded-lg pointer-events-none animate-pulse" />
        )}

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/0 to-purple-400/0 hover:from-blue-400/10 hover:to-purple-400/10 transition-all duration-300 pointer-events-none" />
      </Card>

      <Handle type="source" position={position} className="w-3 h-3 border-2 border-white" />
    </div>
  )
}
