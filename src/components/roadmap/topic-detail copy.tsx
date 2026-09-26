"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, BookOpen, HelpCircle, Star } from "lucide-react"

interface TopicDetailProps {
  topicId: string
  onComplete: (topicId: string) => void
  isCompleted: boolean
}


const topicContent: Record<string, any> = {
  "intro-scrum": {
    title: "Introducción a Scrum",
    icon: "🎯",
    content: [
      "Scrum es un marco de trabajo ágil para desarrollar productos complejos.",
      "Se basa en equipos auto-organizados que entregan valor iterativamente.",
      "Utiliza sprints de duración fija para crear incrementos de producto.",
      "Promueve transparencia, inspección y adaptación continua.",
    ],
    quiz: {
      question: "¿Cuál es la duración típica de un Sprint?",
      options: ["1-4 semanas", "1-2 meses", "6 meses", "1 año"],
      correct: 0,
    },
  },
  "agile-mindset": {
    title: "Mentalidad Ágil",
    icon: "🧠",
    content: [
      "Los individuos e interacciones sobre procesos y herramientas.",
      "Software funcionando sobre documentación extensiva.",
      "Colaboración con el cliente sobre negociación contractual.",
      "Respuesta ante el cambio sobre seguir un plan.",
    ],
    quiz: {
      question: "¿Cuál es el primer valor del Manifiesto Ágil?",
      options: [
        "Software funcionando",
        "Individuos e interacciones",
        "Colaboración con el cliente",
        "Respuesta ante el cambio",
      ],
      correct: 1,
    },
  },
  "product-owner": {
    title: "Product Owner",
    icon: "👑",
    content: [
      "Responsable de maximizar el valor del producto.",
      "Gestiona y prioriza el Product Backlog.",
      "Define criterios de aceptación claros.",
      "Representa la voz del cliente y stakeholders.",
    ],
    quiz: {
      question: "¿Cuál es la principal responsabilidad del Product Owner?",
      options: ["Gestionar el equipo", "Maximizar el valor del producto", "Escribir código", "Facilitar reuniones"],
      correct: 1,
    },
  },
  "scrum-master": {
    title: "Scrum Master",
    icon: "🎓",
    content: [
      "Facilita el proceso Scrum y elimina impedimentos.",
      "Ayuda al equipo a ser auto-organizado y multifuncional.",
      "Protege al equipo de distracciones externas.",
      "Promueve la mejora continua del proceso.",
    ],
    quiz: {
      question: "¿Qué NO es responsabilidad del Scrum Master?",
      options: ["Eliminar impedimentos", "Facilitar reuniones", "Asignar tareas al equipo", "Promover mejora continua"],
      correct: 2,
    },
  },
  "dev-team": {
    title: "Development Team",
    icon: "👥",
    content: [
      "Equipo multifuncional que desarrolla el producto.",
      "Auto-organizado y responsable de entregar el incremento.",
      "Tamaño óptimo de 3-9 personas.",
      "Todos los miembros son 'Developers' sin jerarquías.",
    ],
    quiz: {
      question: "¿Cuál es el tamaño óptimo del Development Team?",
      options: ["1-3 personas", "3-9 personas", "10-15 personas", "No hay límite"],
      correct: 1,
    },
  },
  "sprint-planning": {
    title: "Sprint Planning",
    icon: "📋",
    content: [
      "Reunión donde se planifica el trabajo del Sprint.",
      "Se define QUÉ se va a construir y CÓMO.",
      "Participa todo el Scrum Team.",
      "Duración máxima: 8 horas para Sprint de 1 mes.",
    ],
    quiz: {
      question: "¿Cuánto dura máximo el Sprint Planning para un Sprint de 1 mes?",
      options: ["4 horas", "6 horas", "8 horas", "12 horas"],
      correct: 2,
    },
  },
  "daily-scrum": {
    title: "Daily Scrum",
    icon: "☀️",
    content: [
      "Reunión diaria de 15 minutos para el Development Team.",
      "Se sincroniza el trabajo y se identifican impedimentos.",
      "Cada miembro comparte: ¿Qué hice? ¿Qué haré? ¿Impedimentos?",
      "Misma hora y lugar todos los días.",
    ],
    quiz: {
      question: "¿Cuánto dura el Daily Scrum?",
      options: ["15 minutos", "30 minutos", "1 hora", "Variable"],
      correct: 0,
    },
  },
  "sprint-review": {
    title: "Sprint Review",
    icon: "👀",
    content: [
      "Reunión al final del Sprint para inspeccionar el incremento.",
      "Se presenta lo completado durante el Sprint.",
      "Los stakeholders dan feedback sobre el producto.",
      "Se adapta el Product Backlog según sea necesario.",
    ],
    quiz: {
      question: "¿Cuál es el objetivo principal del Sprint Review?",
      options: [
        "Evaluar al equipo",
        "Inspeccionar el incremento",
        "Planificar el siguiente Sprint",
        "Documentar el trabajo",
      ],
      correct: 1,
    },
  },
  "sprint-retrospective": {
    title: "Sprint Retrospective",
    icon: "🔄",
    content: [
      "Reunión para que el Scrum Team reflexione sobre el proceso.",
      "Se identifica qué funcionó bien y qué mejorar.",
      "Se crean acciones concretas para el siguiente Sprint.",
      "Oportunidad para la mejora continua del equipo.",
    ],
    quiz: {
      question: "¿Cuándo se realiza la Sprint Retrospective?",
      options: ["Al inicio del Sprint", "Durante el Sprint", "Al final del Sprint", "Cuando hay problemas"],
      correct: 2,
    },
  },
  "sprint-concept": {
    title: "El Sprint",
    icon: "⚡",
    content: [
      "Corazón de Scrum, contenedor de todos los eventos.",
      "Duración fija de 1 mes o menos.",
      "Crea un incremento de producto potencialmente entregable.",
      "No se pueden hacer cambios que pongan en peligro el objetivo.",
    ],
    quiz: {
      question: "¿Cuál es la duración máxima de un Sprint?",
      options: ["2 semanas", "1 mes", "2 meses", "3 meses"],
      correct: 1,
    },
  },
  "product-backlog": {
    title: "Product Backlog",
    icon: "📊",
    content: [
      "Lista ordenada de todo lo necesario en el producto.",
      "Única fuente de requisitos para cambios en el producto.",
      "Gestionado por el Product Owner.",
      "Evoluciona constantemente durante la vida del producto.",
    ],
    quiz: {
      question: "¿Quién es responsable del Product Backlog?",
      options: ["Scrum Master", "Product Owner", "Development Team", "Stakeholders"],
      correct: 1,
    },
  },
  "sprint-backlog": {
    title: "Sprint Backlog",
    icon: "📈",
    content: [
      "Elementos del Product Backlog seleccionados para el Sprint.",
      "Plan para entregar el incremento y alcanzar el objetivo.",
      "Propiedad del Development Team.",
      "Se actualiza durante todo el Sprint.",
    ],
    quiz: {
      question: "¿De quién es propiedad el Sprint Backlog?",
      options: ["Product Owner", "Scrum Master", "Development Team", "Todo el Scrum Team"],
      correct: 2,
    },
  },
  increment: {
    title: "Increment",
    icon: "🚀",
    content: [
      "Suma de todos los elementos completados durante el Sprint.",
      "Debe estar en condición 'Done' según la Definition of Done.",
      "Debe ser potencialmente entregable.",
      "Se inspecciona en el Sprint Review.",
    ],
    quiz: {
      question: "¿Qué característica debe tener el Increment?",
      options: [
        "Estar documentado",
        "Ser potencialmente entregable",
        "Tener todos los features",
        "Estar aprobado por el cliente",
      ],
      correct: 1,
    },
  },
}

export function TopicDetail({ topicId, onComplete, isCompleted }: TopicDetailProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const topic = topicContent[topicId]
  if (!topic) return null

  const steps = ["Contenido", "Quiz"]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleQuizSubmit = () => {
    setShowResult(true)
    if (selectedAnswer === topic.quiz.correct) {
      setTimeout(() => {
        onComplete(topicId)
      }, 1500)
    }
  }

  const resetTopic = () => {
    setCurrentStep(0)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  if (isCompleted) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl sticky top-24">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="text-2xl">{topic.icon}</div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{topic.title}</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">¡Completado!</h3>
            <p className="text-gray-600 mb-4">Dominas este tema de Scrum</p>
            <Button variant="outline" onClick={resetTopic} className="w-full bg-transparent">
              Revisar contenido
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="text-2xl">{topic.icon}</div>
          <div>
            <div className="text-lg">{topic.title}</div>
            {currentStep === 0 ? (
              <div className="flex items-center space-x-1 text-blue-600">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Aprendiendo</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-purple-600">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">Quiz</span>
              </div>
            )}
          </div>
        </CardTitle>
        <Progress value={progress} className="mt-2" />
      </CardHeader>

      <CardContent className="space-y-4">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="space-y-3">
              {topic.content.map((item: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
            <Button onClick={() => setCurrentStep(1)} className="w-full">
              Tomar Quiz →
            </Button>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900 mb-4 text-sm">{topic.quiz.question}</p>
              <div className="space-y-2">
                {topic.quiz.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-3 text-left rounded-lg border transition-all text-sm ${
                      selectedAnswer === index ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {showResult && (
              <div
                className={`p-4 rounded-lg ${
                  selectedAnswer === topic.quiz.correct
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <p
                  className={`font-medium text-sm ${
                    selectedAnswer === topic.quiz.correct ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {selectedAnswer === topic.quiz.correct
                    ? "¡Correcto! 🎉"
                    : `Incorrecto. Respuesta: ${topic.quiz.options[topic.quiz.correct]}`}
                </p>
              </div>
            )}

            <Button onClick={handleQuizSubmit} disabled={selectedAnswer === null || showResult} className="w-full">
              Enviar Respuesta
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
