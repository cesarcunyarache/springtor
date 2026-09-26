"use client"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { motion } from "framer-motion"
/* import { Checkbox } from "@/components/ui/checkbox" */
import { Label } from "@/components/ui/label"
/* import { Input } from "@/components/ui/input" */
import { Users, Calendar, FileText, PenToolIcon as Tool } from "lucide-react"

interface TopicsStepProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  form: UseFormReturn<any>
}

const learningTopics = [
  {
    id: "roles",
    label: "Roles y responsabilidades",
    description: "Scrum Master, Product Owner, Equipo",
    icon: Users,
  },
  {
    id: "events",
    label: "Eventos y ceremonias",
    description: "Sprint Planning, Daily, Review, Retrospective",
    icon: Calendar,
  },
  {
    id: "artifacts",
    label: "Artefactos y documentación",
    description: "Product Backlog, Sprint Backlog, Incremento",
    icon: FileText,
  },
  {
    id: "tools",
    label: "Herramientas y prácticas recomendadas",
    description: "Software y técnicas para implementar Scrum",
    icon: Tool,
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

export default function TopicsStep({ form }: TopicsStepProps) {
  const {  setValue, watch } = form
  const selectedTopics = watch("learningTopics") || []
  /* const otherTopic = watch("otherTopic") || "" */
  const [, setShowOtherField] = useState(selectedTopics.includes("other"))

  const handleTopicChange = (topicId: string, checked: boolean) => {
    const updatedTopics = checked ? [...selectedTopics, topicId] : selectedTopics.filter((id: string) => id !== topicId)

    setValue("learningTopics", updatedTopics, { shouldValidate: true })

    if (topicId === "other") {
      setShowOtherField(checked)
      if (!checked) {
        setValue("otherTopic", "")
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-primary-foreground p-6 rounded-xl mb-4 mx-5"
      >
        <h2 className="text-2xl font-bold text-primary mb-2">¿Qué aspectos de Scrum deseas aprender o mejorar?</h2>
        <p className="text-primary font-light mb-0">Selecciona todos los temas que te interesen</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-y-auto p-5"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="grid grid-cols-1 gap-4 pb-4">
          {learningTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`flex items-start p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedTopics.includes(topic.id)
                    ? "border-primary bg-primary-foreground shadow-md shadow-primary-foreground"
                    : "border-border hover:border-primary/30 hover:bg-primary-foreground/30"
                }`}
                onClick={() => handleTopicChange(topic.id, !selectedTopics.includes(topic.id))}
              >
               {/*  <div className="flex h-5 items-center">
                  <Checkbox
                    id={topic.id}
                    checked={selectedTopics.includes(topic.id)}
                    onCheckedChange={(checked) => {
                      handleTopicChange(topic.id, checked as boolean)
                    }}
                    className="mr-3 text-blue-600 border-blue-300"
                  />
                </div> */}
                <div className="mr-4">
                  <div
                    className={`p-3 rounded-full ${
                      selectedTopics.includes(topic.id) ? "bg-primary/20 text-primary" : "bg-accent text-muted-foreground"
                    }`}
                  >
                    <topic.icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor={topic.id} className="text-base font-medium cursor-pointer">
                    {topic.label}
                  </Label>
                  <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

       {/*    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <div
              className={`flex items-start p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedTopics.includes("other")
                  ? "border-primary bg-primary-foreground shadow-md shadow-primary-foreground"
                  : "border-border hover:border-primary/30 hover:bg-primary-foreground/30"
              }`}
              onClick={() => handleTopicChange("other", !selectedTopics.includes("other"))}
            >
              <div className="flex h-5 items-center">
                <Checkbox
                  id="other"
                  checked={selectedTopics.includes("other")}
                  onCheckedChange={(checked) => {
                    handleTopicChange("other", checked as boolean)
                  }}
                  className="mr-3 text-blue-600 border-blue-300"
                />
              </div>
              <div>
                <Label htmlFor="other" className="text-base font-medium cursor-pointer">
                  Otros
                </Label>
                <p className="text-sm text-gray-500 mt-1">Especifica otros temas que te interesen</p>
              </div>
            </div>
          </motion.div>

          {showOtherField && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 ml-8"
            >
              <Input
                placeholder="Especifica otros temas que te interesen"
                value={otherTopic}
                onChange={(e) => setValue("otherTopic", e.target.value)}
                className="w-full "
              />
            </motion.div>
          )} */}
        </div>
      </motion.div>
    </div>
  )
}
