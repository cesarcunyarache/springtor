import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface QuizScoreProps {
  correctAnswers: number
  totalQuestions: number
}

export default function QuizScore({ correctAnswers, totalQuestions }: QuizScoreProps) {
  const score = (correctAnswers / totalQuestions) * 100
  const roundedScore = Math.round(score)

  const getMessage = () => {
    if (score === 100) return "¡Puntaje perfecto! ¡Felicitaciones!"
    if (score >= 80) return "¡Muy bien! ¡Lo hiciste excelente!"
    if (score >= 60) return "¡Buen esfuerzo! Vas por buen camino."
    if (score >= 40) return "No está mal, pero hay espacio para mejorar."
    return "¡Sigue practicando, vas a mejorar!"
  }


  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-8">
        <div className="text-center">
          <p className="text-4xl font-bold">{roundedScore}%</p>
          <p className="text-sm text-muted-foreground">
            {correctAnswers} de {totalQuestions} correctas
          </p>
        </div>
        <p className="text-center font-medium">{getMessage()}</p>
      </CardContent>
    </Card>
  )
}
