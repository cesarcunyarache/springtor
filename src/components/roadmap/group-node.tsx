"use client"

import { Card } from "@/components/ui/card"

interface GroupNodeProps {
  data: {
    label: string
  }
}

export function GroupNode({ data }: GroupNodeProps) {
  return (
    <Card className="p-4 bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-300 shadow-none">
      <h3 className="text-lg font-bold text-gray-700 text-center">{data.label}</h3>
    </Card>
  )
}
