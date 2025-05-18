"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ExperienceStep from "./steps/experience-step"
import TopicsStep from "./steps/topics-step"
import PreferenceStep from "./steps/preference-step"
import SuccessScreen from "./success-screen"

type FormData = {
  experienceLevel: string
  learningTopics: string[]
  otherTopic?: string
  explanationPreference: string
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const [isCompleted, setIsCompleted] = useState(false)
  const [formData, setFormData] = useState<FormData | null>(null)

  const form = useForm<FormData>({
    defaultValues: {
      experienceLevel: "",
      learningTopics: [],
      otherTopic: "",
      explanationPreference: "",
    },
  })

  const { handleSubmit, watch } = form
  const currentValues = watch()

  const isFirstStepValid = !!currentValues.experienceLevel
  const isSecondStepValid = currentValues.learningTopics.length > 0
  const isThirdStepValid = !!currentValues.explanationPreference

  const canProceed =
    (step === 1 && isFirstStepValid) || (step === 2 && isSecondStepValid) || (step === 3 && isThirdStepValid)

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    setFormData(data)
    setIsCompleted(true)
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit(onSubmit)()
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  }

  if (isCompleted && formData) {
    return <SuccessScreen data={formData} />
  }

  return (
      <Card className="shadow-none py-0 bg-background overflow-hidden gap-0 rounded-xl border-0 w-full h-[100vh]">
        <div className="m-6">
          <div className="flex justify-center items-center mb-2">
            <span className="text-sm font-medium text-primary bg-primary-foreground p-2 rounded-xl">
              Pregunta {step}/{totalSteps}
            </span>
          </div>
          <div className="w-full h-2 bg-primary-foreground rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="relative h-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait" custom={step}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-full h-full"
              >
                <ExperienceStep form={form} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-full h-full"
              >
                <TopicsStep form={form} />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-full h-full"
              >
                <PreferenceStep form={form} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>



        <div className="flex justify-between pt-2 mx-6 mb-4">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === 1}
            className="px-6  hover:bg-blue-50"
          >
            Atrás
          </Button>

          <Button
            onClick={nextStep}
            disabled={!canProceed}
            className=" bg-primary hover:bg-primary rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-foreground hover:scale-105"
          >
            {step === totalSteps ? "Finalizar" : "Siguiente"}
          </Button>
        </div>

      </Card>
  )
}
