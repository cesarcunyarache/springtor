import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Retrospective } from "../types"


interface SprintRetrospectiveSectionProps {
  retrospective: Retrospective
  updateLearning: (index: number, value: string) => void
  addLearning: () => void
  updateImprovement: (index: number, value: string) => void
  addImprovement: () => void
}

export const SprintRetrospectiveSection = ({
  retrospective,
  updateLearning,
  addLearning,
  updateImprovement,
  addImprovement,
}: SprintRetrospectiveSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-gray-900">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
            9
          </span>
          Sprint Retrospective
        </CardTitle>
        <CardDescription>
          Lecciones aprendidas y acciones de mejora para el próximo sprint
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Lecciones aprendidas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Lecciones Aprendidas (mínimo 4)</Label>
              <Button
                onClick={addLearning}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              ¿Qué funcionó bien? ¿Qué no funcionó? ¿Qué aprendimos?
            </p>
            <div className="space-y-2">
              {retrospective.learnings.map((learning, index) => (
                <Textarea
                  key={index}
                  value={learning}
                  onChange={(e) => updateLearning(index, e.target.value)}
                  placeholder={`Lección ${index + 1}: Ej: La comunicación diaria mejoró el flujo de trabajo`}
                  rows={2}
                />
              ))}
            </div>
          </div>

          {/* Acciones de mejora */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-medium">Acciones de Mejora (mínimo 2)</Label>
              <Button
                onClick={addImprovement}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              ¿Qué vamos a hacer diferente en el próximo sprint?
            </p>
            <div className="space-y-2">
              {retrospective.improvements.map((improvement, index) => (
                <Textarea
                  key={index}
                  value={improvement}
                  onChange={(e) => updateImprovement(index, e.target.value)}
                  placeholder={`Acción ${index + 1}: Ej: Implementar pair programming en tareas complejas`}
                  rows={2}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
