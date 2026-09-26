"use client"

import type { UseFormReturn } from "react-hook-form"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { FileText, ListChecks } from "lucide-react"

interface PreferenceStepProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form: UseFormReturn<any>
}

const explanationPreferences = [
  {
    id: "detailed",
    label: "Explicaciones detalladas",
    description: "Información completa con ejemplos y contexto",
    icon: FileText,
  },
  {
    id: "summary",
    label: "Resúmenes o puntos clave",
    description: "Información concisa y directa",
    icon: ListChecks,
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

export default function PreferenceStep({ form }: PreferenceStepProps) {
  const {  setValue, watch } = form
  const explanationPreference = watch("explanationPreference")

  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-primary-foreground p-6 rounded-xl mb-4 mx-5"
      >
        <h2 className="text-2xl font-bold text-primary mb-2">¿Cómo prefieres que te expliquemos?</h2>
        <p className="text-primary font-light mb-0">Selecciona tu formato preferido de explicación</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto p-5"
        style={{ scrollbarWidth: "thin" }}
      >
        <RadioGroup
          value={explanationPreference}
          onValueChange={(value) => setValue("explanationPreference", value, { shouldValidate: true })}
          className="grid grid-cols-1 gap-4 pb-4"
        >
          {explanationPreferences.map((preference, index) => (
            <motion.div
              key={preference.id}
              custom={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`relative flex items-center p-6 rounded-xl border cursor-pointer transition-all duration-200 ${
                  explanationPreference === preference.id
                    ? "border-primary bg-primary-foreground shadow-md shadow-primary-foreground"
                    : "border-border hover:border-primary/30 hover:bg-primary-foreground/30"
                }`}
                onClick={() => setValue("explanationPreference", preference.id, { shouldValidate: true })}
              >
                <RadioGroupItem value={preference.id} id={preference.id} className="sr-only" />
                <div className="mr-6">
                  <div
                    className={`p-4 rounded-full ${
                      explanationPreference === preference.id
                        ? "bg-primary/20 text-primary"
                        : "bg-accent text-muted-foreground"
                    }`}
                  >
                    <preference.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <Label htmlFor={preference.id} className="text-lg font-medium cursor-pointer">
                    {preference.label}
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">{preference.description}</p>
                </div>
                {explanationPreference === preference.id && (
                  <motion.div
                    className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </RadioGroup>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-xl mb-4"
        >
          <p className="text-primary font-light text-sm">
            ¡Ya casi estamos! Con esta información personalizaremos tu experiencia de aprendizaje de Scrum.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
