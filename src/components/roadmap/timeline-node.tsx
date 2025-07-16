"use client"

import { Handle, Position } from "reactflow"

interface TimelineNodeProps {
  data: {
    label: string
  }
}

export function TimelineNode({ data }: TimelineNodeProps) {
  return (
    <div className="relative">
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-blue-600 border-2 border-white" />

      {/* Timeline point */}
      <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>

      {/* Label */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md border border-gray-200">
        <span className="text-sm font-semibold text-gray-700">{data.label}</span>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-blue-600 border-2 border-white" />
    </div>
  )
}
