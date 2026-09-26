import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { SprintReview } from "../types"

interface SprintReviewSectionProps {
  sprintReview: SprintReview
  setSprintReview: (value: SprintReview) => void
  addFeedbackItem: () => void
  updateFeedback: (index: number, value: string) => void
  removeFeedback: (index: number) => void
}

export const SprintReviewSection = ({
  sprintReview,
  setSprintReview,
  addFeedbackItem,
  updateFeedback,
  removeFeedback,
}: SprintReviewSectionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-gray-900">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
            8
          </span>
          Sprint Review
        </CardTitle>
        <CardDescription>
          Presentación del incremento, feedback y comparación con objetivos
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Incremento entregado */}
        <div>
          <Label className="text-sm font-medium mb-2">Incremento Entregado</Label>
          <Textarea
            value={sprintReview.incrementDelivered}
            onChange={(e) => setSprintReview({ ...sprintReview, incrementDelivered: e.target.value })}
            placeholder="Describe qué funcionalidades se completaron y están listas para producción..."
            rows={3}
          />
        </div>

        {/* Feedback recibido */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium">Feedback Recibido</Label>
            <Button
              onClick={addFeedbackItem}
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-1" />
              Agregar feedback
            </Button>
          </div>

          <div className="space-y-2">
            {sprintReview.feedback.map((feedback, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={feedback}
                  onChange={(e) => updateFeedback(index, e.target.value)}
                  placeholder="Ej: Los usuarios quieren poder editar productos en el carrito"
                />
                {sprintReview.feedback.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFeedback(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comparación con Sprint Goal */}
        <div>
          <Label className="text-sm font-medium mb-2">Comparación con Sprint Goal</Label>
          <Textarea
            value={sprintReview.goalComparison}
            onChange={(e) => setSprintReview({ ...sprintReview, goalComparison: e.target.value })}
            placeholder="¿Se cumplió el Sprint Goal? ¿Qué se logró y qué quedó pendiente?"
            rows={3}
          />
        </div>

        {/* Comparación con Definition of Done */}
        <div>
          <Label className="text-sm font-medium mb-2">Comparación con Definition of Done (DoD)</Label>
          <Textarea
            value={sprintReview.dodComparison}
            onChange={(e) => setSprintReview({ ...sprintReview, dodComparison: e.target.value })}
            placeholder="¿Las historias completadas cumplen con todos los criterios del DoD? (tests, documentación, code review...)"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}


export default SprintReviewSection;