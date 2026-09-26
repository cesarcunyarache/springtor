import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SprintExamSummaryProps {
  sprintGoalCompleted: boolean;
  selectedStoriesCount: number;
  productBacklogCount: number;
  answeredQuestionsCount: number;
  totalQuestionsCount: number;
  onSubmitExam: () => void;
}

export default function SprintExamSummary({
  sprintGoalCompleted,
  selectedStoriesCount,
  productBacklogCount,
  answeredQuestionsCount,
  totalQuestionsCount,
  onSubmitExam,
}: SprintExamSummaryProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg rounded-lg p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-bold">Resumen del Examen</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">
              {sprintGoalCompleted ? "✓" : "○"}
            </div>
            <div className="text-sm mt-1">Sprint Goal</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{selectedStoriesCount}</div>
            <div className="text-sm mt-1">Historias Seleccionadas</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">{productBacklogCount}</div>
            <div className="text-sm mt-1">Historias Creadas</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold">
              {answeredQuestionsCount}/{totalQuestionsCount}
            </div>
            <div className="text-sm mt-1">Preguntas Respondidas</div>
          </div>
        </div>

        <Button
          onClick={onSubmitExam}
          variant="secondary"
          className="w-full bg-white text-blue-600 hover:bg-gray-100 text-lg font-bold py-3 transition-colors"
        >
          Enviar Examen Completo
        </Button>
      </CardContent>
    </Card>
  );
}
