import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { SprintGoalSMART } from "../types"

interface SprintGoalSectionProps {
  sprintGoalSMART: SprintGoalSMART
  onChange: (updated: SprintGoalSMART) => void
}

export default function SprintGoalSection({ sprintGoalSMART, onChange }: SprintGoalSectionProps) {
  const handleChange = (key: keyof SprintGoalSMART, value: string) => {
    onChange({ ...sprintGoalSMART, [key]: value })
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-200 gap-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
            3
          </span>
          Sprint Goal (Objetivo SMART del Sprint)
        </CardTitle>
        <CardDescription>
          Define el objetivo del sprint siguiendo los criterios SMART
        </CardDescription>
      </CardHeader>

      <CardContent className="grid md:grid-cols-2 gap-4">
        {/* Specific */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-1 block">
            <span className="text-blue-600">S</span>pecífico - ¿Qué exactamente se va a lograr?
          </Label>
          <Textarea
            value={sprintGoalSMART.specific}
            onChange={(e) => handleChange("specific", e.target.value)}
            placeholder="Ej: Implementar registro de usuarios con email y carrito básico"
            rows={2}
          />
        </div>

        {/* Measurable */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-1 block">
            <span className="text-blue-600">M</span>edible - ¿Cómo se medirá el éxito?
          </Label>
          <Textarea
            value={sprintGoalSMART.measurable}
            onChange={(e) => handleChange("measurable", e.target.value)}
            placeholder="Ej: 3 historias completadas, 21 story points, tests al 80%"
            rows={2}
          />
        </div>

        {/* Achievable */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-1 block">
            <span className="text-blue-600">A</span>lcanzable - ¿Es realista con los recursos?
          </Label>
          <Textarea
            value={sprintGoalSMART.achievable}
            onChange={(e) => handleChange("achievable", e.target.value)}
            placeholder="Ej: Equipo completo disponible, sin dependencias externas críticas"
            rows={2}
          />
        </div>

        {/* Relevant */}
        <div>
          <Label className="text-xs font-medium text-gray-700 mb-1 block">
            <span className="text-blue-600">R</span>elevante - ¿Por qué es importante?
          </Label>
          <Textarea
            value={sprintGoalSMART.relevant}
            onChange={(e) => handleChange("relevant", e.target.value)}
            placeholder="Ej: Funcionalidades base para MVP, requeridas para launch"
            rows={2}
          />
        </div>

        {/* TimeBound */}
        <div className="md:col-span-2">
          <Label className="text-xs font-medium text-gray-700 mb-1 block">
            <span className="text-blue-600">T</span>emporal - ¿Cuándo se completará?
          </Label>
          <Input
            value={sprintGoalSMART.timeBound}
            onChange={(e) => handleChange("timeBound", e.target.value)}
            placeholder="Ej: Final del Sprint 3 - 14 días (del 01/01 al 14/01)"
          />
        </div>
      </CardContent>
    </Card>
  )
}
