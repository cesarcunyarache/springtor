"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Card } from "@/components/ui/card"
/* import { Button } from "@/components/ui/button" */
import { Award, Rocket, Calendar, Users, BookOpen, Bell } from "lucide-react"

type FormData = {
  experienceLevel: string
  learningTopics: string[]
  otherTopic?: string
  explanationPreference: string
}

interface SuccessScreenProps {
  data: FormData
}

export default function SuccessScreen({ data }: SuccessScreenProps) {
  const [, setShowConfetti] = useState(false)

  useEffect(() => {
    // Lanzar confetti después de un pequeño retraso
    const timer = setTimeout(() => {
      setShowConfetti(true)
      const duration = 3 * 1000
      const end = Date.now() + duration

      const colors = ["#0284c7", "#0ea5e9", "#38bdf8", "#7dd3fc"]
      ;(function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Mapeo de niveles de experiencia a textos amigables
  const experienceLevelText =
    {
      "no-experience": "principiante",
      basic: "nivel básico",
      intermediate: "nivel intermedio",
      advanced: "nivel avanzado",
    }[data.experienceLevel] || "personalizado"

  // Mapeo de preferencias de explicación
  const explanationText =
    {
      detailed: "explicaciones detalladas",
      summary: "resúmenes concisos",
    }[data.explanationPreference] || "personalizado"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-8 shadow-xl bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden rounded-xl border-0 text-white relative">
        <div className="absolute inset-0 bg-blue-600 opacity-20">
          <div
            className="w-full h-full"
            
          ></div>
        </div>

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            {/* AQUÍ ESTÁ EL ERROR - Modificado para usar 'tween' en lugar de 'spring' */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                type: "tween", // Cambiado de "spring" a "tween"
              }}
              className="bg-white text-blue-600 p-4 rounded-full shadow-lg"
            >
              <Rocket size={48} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center mb-2">¡Gracias por tu interés!</h1>
            <p className="text-xl text-center text-blue-100 mb-8">
              Hemos registrado tus preferencias para ScrumMaster AI
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="mr-2" /> Tu perfil de aprendizaje
            </h2>
            <ul className="space-y-3">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="flex items-start"
              >
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <BookOpen size={16} />
                </div>
                <div>
                  <span className="font-medium">Nivel:</span> Contenido adaptado para {experienceLevelText}
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="flex items-start"
              >
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="font-medium">Formato:</span> Preferencia por {explanationText}
                </div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                className="flex items-start"
              >
                <div className="bg-blue-500 p-2 rounded-full mr-3">
                  <Users size={16} />
                </div>
                <div>
                  <span className="font-medium">Enfoque:</span> Interés en{" "}
                  {data.learningTopics.length > 0
                    ? data.learningTopics.length === 1
                      ? "1 área clave"
                      : `${data.learningTopics.length} áreas clave`
                    : "todas las áreas"}
                </div>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="bg-primary/50 p-4 rounded-xl mb-6 flex items-center">
              <Bell className="text-blue-200 mr-3 flex-shrink-0" />
              <p className="text-blue-100 text-sm">
                Te notificaremos cuando ScrumMaster AI esté listo para su lanzamiento. ¡Serás de los primeros en
                probarlo!
              </p>
            </div>

          {/*   <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center"
            >
              Volver al inicio <ArrowRight className="ml-2" />
            </Button> */}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
