"use client"

import type { UseFormReturn } from "react-hook-form"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { BookOpen, Briefcase, Award, HelpCircle } from "lucide-react"

interface ExperienceStepProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form: UseFormReturn<any>
}

const experienceLevels = [
  {
    id: "no-experience",
    label: "No tengo experiencia",
    description: "Nunca he trabajado con Scrum",
    icon: HelpCircle,
  },
  {
    id: "basic",
    label: "Básico",
    description: "Conozco los conceptos",
    icon: BookOpen,
  },
  {
    id: "intermediate",
    label: "Intermedio",
    description: "He participado en proyectos Scrum",
    icon: Briefcase,
  },
  {
    id: "advancede",
    label: "Avanzado",
    description: "Soy Scrum Master o similar",
    icon: Award,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export default function ExperienceStep({ form }: ExperienceStepProps) {
  const {  setValue, watch } = form
  const experienceLevel = watch("experienceLevel")

  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-primary-foreground p-6 rounded-xl mb-4 mx-5"
      >
        <h2 className="text-2xl font-bold text-primary mb-2">¿Cuál es tu nivel de experiencia con Scrum?</h2>
        <p className="text-primary font-light mb-0">Selecciona la opción que mejor describa tu conocimiento actual</p>
      </motion.div>

      {/* Contenedor con scroll */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto p-5"
        style={{ scrollbarWidth: "thin" }}
      >
        <RadioGroup
          value={experienceLevel}
          onValueChange={(value) => setValue("experienceLevel", value, { shouldValidate: true })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4"
        >
          {experienceLevels.map((level, index) => (
            <motion.div
              key={level.id}
              custom={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`relative flex items-start p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  experienceLevel === level.id
                    ? "border-primary bg-primary-foreground shadow-md shadow-primary-foreground"
                    : "border-border hover:border-primary/30 hover:bg-primary-foreground/30"
                }`}
                onClick={() => setValue("experienceLevel", level.id, { shouldValidate: true })}
              >
                <RadioGroupItem value={level.id} id={level.id} className="sr-only" />
                <div className="mr-4">
                  <div
                    className={`p-3 rounded-full ${
                      experienceLevel === level.id ? "bg-primary/20 text-primary" : 
                      "bg-accent text-muted-foreground"
                    }`}
                  >
                    <level.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <Label htmlFor={level.id} className="text-base font-medium cursor-pointer">
                    {level.label}
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">{level.description}</p>
                </div>
                {experienceLevel === level.id && (
                  <motion.div
                    className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>
    </div>
  )
}
