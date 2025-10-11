import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "../types";


interface SprintTheoreticalQuestionsSectionProps {
  questions: Question[];
  answers: Record<string, string>;
  setAnswers: (answers: Record<string, string>) => void;
}

export default function SprintTheoreticalQuestionsSection({
  questions,
  answers,
  setAnswers,
}: SprintTheoreticalQuestionsSectionProps) {
  return (
    <Card className="p-6 mb-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="flex items-center text-xl font-bold text-gray-900">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
            10
          </span>
          Preguntas Teóricas
        </CardTitle>
        <p className="text-gray-600 text-sm mt-2">
          Responde las siguientes preguntas sobre Scrum y Sprint Planning
        </p>
      </CardHeader>

      <CardContent className="space-y-6 p-0">
        {questions.map((question, index) => (
          <Card key={question.id} className="p-5 border border-gray-200 rounded-lg">
            <div className="flex items-start space-x-3 mb-4">
              <span className="bg-gray-100 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                {index + 1}
              </span>
              <h3 className="text-base font-medium text-gray-900 flex-1">
                {question.question}
              </h3>
            </div>

            {question.type === "multiple" && question.options ? (
              <RadioGroup
                value={answers[question.id] || ""}
                onValueChange={(value) =>
                  setAnswers({ ...answers, [question.id]: value })
                }
                className="ml-10 space-y-2"
              >
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option}
                      id={`q-${question.id}-${optionIndex}`}
                    />
                    <Label
                      htmlFor={`q-${question.id}-${optionIndex}`}
                      className="text-gray-700 text-sm cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <Textarea
                value={answers[question.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [question.id]: e.target.value })
                }
                className="w-full ml-10 p-4 text-sm resize-none"
                rows={4}
                placeholder="Escribe tu respuesta aquí..."
              />
            )}
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
