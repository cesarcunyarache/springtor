import { useState } from "react"
import { Plus, Trash2, CheckCircle } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select"
import { Priority, UserStory } from "../types"


interface UserStoryFormProps {
    onAddStory: (story: UserStory) => void
}

export default function UserStoryForm({ onAddStory }: UserStoryFormProps) {
    const [newStory, setNewStory] = useState<UserStory>({
        id: Date.now(),
        title: "",
        asA: "",
        iWant: "",
        soThat: "",
        acceptanceCriteria: [""],
        priority: "Media",
        priorityJustification: "",
    })

    const addCriterion = () => {
        setNewStory((prev) => ({
            ...prev,
            acceptanceCriteria: [...prev.acceptanceCriteria, ""],
        }))
    }

    const updateCriterion = (index: number, value: string) => {
        const updated = [...newStory.acceptanceCriteria]
        updated[index] = value
        setNewStory({ ...newStory, acceptanceCriteria: updated })
    }

    const removeCriterion = (index: number) => {
        setNewStory({
            ...newStory,
            acceptanceCriteria: newStory.acceptanceCriteria.filter((_, i) => i !== index),
        })
    }

    const handleSubmit = () => {
        if (!newStory.title.trim()) return
        onAddStory(newStory)
        // Reset form
        setNewStory({
            id: Date.now(),
            title: "",
            asA: "",
            iWant: "",
            soThat: "",
            acceptanceCriteria: [""],
            priority: "Media",
            priorityJustification: "",
        })
    }

    return (
        <Card className="p-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                    Crear Historias de Usuario
                </CardTitle>
                <CardDescription>
                    Crea historias de usuario que serán agregadas al Product Backlog
                </CardDescription>
            </CardHeader>

            <CardContent className="grid md:grid-cols-2 gap-6">
                {/* IZQUIERDA */}
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title" className="">Título de la Historia</Label>
                        <Input
                            id="title"
                            value={newStory.title}
                            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                           
                        />
                    </div>

                    <Card className="bg-blue-50 p-4 border border-blue-100 gap-2">
                        <h3 className="font-semibold text-blue-900 text-sm mb-2">
                            Formato: Como [rol], quiero [funcionalidad], para [beneficio]
                        </h3>

                        <Label htmlFor="asA" className="text-blue-900">Como un/una...</Label>
                        <Input
                            id="asA"
                            value={newStory.asA}
                            onChange={(e) => setNewStory({ ...newStory, asA: e.target.value })}

                        />


                        <Label htmlFor="iWant" className="text-blue-900">Quiero...</Label>
                        <Input
                            id="iWant"
                            value={newStory.iWant}
                            onChange={(e) => setNewStory({ ...newStory, iWant: e.target.value })}

                        />


                        <Label htmlFor="soThat" className="text-blue-900">Para que...</Label>
                        <Input
                            id="soThat"
                            value={newStory.soThat}
                            onChange={(e) => setNewStory({ ...newStory, soThat: e.target.value })}

                        />
                    </Card>

                    <div>
                        <Label>Prioridad</Label>
                        <Select
                            value={newStory.priority}
                            onValueChange={(value: Priority) =>
                                setNewStory({ ...newStory, priority: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona prioridad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Alta">Alta</SelectItem>
                                <SelectItem value="Media">Media</SelectItem>
                                <SelectItem value="Baja">Baja</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Justificación de Prioridad*</Label>
                        <Textarea
                            value={newStory.priorityJustification}
                            onChange={(e) => setNewStory({ ...newStory, priorityJustification: e.target.value })}
                            placeholder="Explica por qué tiene esta prioridad (valor de negocio, riesgo, dependencias, urgencia...)"
                            rows={3}
                        />
                    </div>
                </div>

                {/* DERECHA */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <Label>Criterios de Aceptación</Label>
                        <Button variant="ghost" size="sm" onClick={addCriterion} className="text-primary hover:text-primary/90 hidden:bg-transparent">
                            <Plus className="w-4 h-4 mr-1" /> Agregar criterio
                        </Button>
                    </div>

                    <div className="space-y-3 mb-4">
                        {newStory.acceptanceCriteria.map((criterion, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <span className="text-gray-500 text-sm mt-3">{index + 1}</span>
                                <Textarea
                                    value={criterion}
                                    onChange={(e) => updateCriterion(index, e.target.value)}
                                   
                                    rows={2}
                                />
                                {newStory.acceptanceCriteria.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeCriterion(index)}
                                        className="text-red-500 hover:text-red-700 mt-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    <Button
                        onClick={handleSubmit}
                        className="w-full"
                    >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Agregar al Product Backlog
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
