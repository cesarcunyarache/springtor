"use client"

import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Target,
  CheckCircle,
  FileText,
  Download,
  Play,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

// Tipos
type Priority = "Alta" | "Media" | "Baja";
type Story = { id: number; title: string; priority: Priority; points: number | null };
type Task = { id: number; text: string; status: "todo" | "progress" | "done" };

type SprintData = {
  goal: string;
  selectedStories: number[]; // ids
  tasks: Record<number, Task[]>;
  estimations: Record<number, number | string>;
};

type UserStoryData = {
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  acceptanceCriteria: string[];
};

type BasicQuestion =
  | { id: number; question: string; type: "multiple"; options: string[] }
  | { id: number; question: string; type: "text" };

export default function App(){
  const [currentInterface, setCurrentInterface] = useState<
    "menu" | "sprint" | "userstory" | "basic" | "estimation"
  >("menu");

  const [sprintData, setSprintData] = useState<SprintData>({
    goal: "",
    selectedStories: [],
    tasks: {},
    estimations: {},
  });

  const [userStoryData, setUserStoryData] = useState<UserStoryData>({
    title: "",
    asA: "",
    iWant: "",
    soThat: "",
    acceptanceCriteria: [""],
  });

  const [basicAnswers, setBasicAnswers] = useState<Record<number, string>>({});
  const [estimationData, setEstimationData] = useState<Record<number, number | string>>({});

  // Datos de ejemplo
  const productBacklog: Story[] = [
    { id: 1, title: "Registro de usuarios con email", priority: "Alta", points: null },
    { id: 2, title: "Carrito de compras básico", priority: "Alta", points: null },
    { id: 3, title: "Sistema de pagos con Stripe", priority: "Media", points: null },
    { id: 4, title: "Búsqueda de productos", priority: "Media", points: null },
    { id: 5, title: "Perfil de usuario", priority: "Baja", points: null },
  ];

  const basicQuestions: BasicQuestion[] = [
    {
      id: 1,
      question: "¿Cuál es la duración recomendada para un Sprint en un equipo nuevo?",
      type: "multiple",
      options: ["1 semana", "2 semanas", "4 semanas", "6 semanas"],
    },
    {
      id: 2,
      question: "Explica la diferencia entre Product Backlog y Sprint Backlog",
      type: "text",
    },
    {
      id: 3,
      question: "¿Quién es responsable de priorizar el Product Backlog?",
      type: "multiple",
      options: ["Scrum Master", "Product Owner", "Development Team", "Stakeholders"],
    },
  ];

  // Helpers / Handlers
  const addStoryToSprint = (storyId: number) => {
    setSprintData((prev) => {
      if (prev.selectedStories.includes(storyId)) return prev;
      return { ...prev, selectedStories: [...prev.selectedStories, storyId] };
    });
  };

  const removeStoryFromSprint = (storyId: number) => {
    setSprintData((prev) => ({
      ...prev,
      selectedStories: prev.selectedStories.filter((id) => id !== storyId),
      tasks: Object.fromEntries(
        Object.entries(prev.tasks)
          .filter(([key]) => parseInt(key, 10) !== storyId)
          .map(([k, v]) => [Number(k), v])
      ),
    }));
  };

  const handleTaskKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, storyId: number) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = e.currentTarget.value.trim();
    if (!value) return;
    const task: Task = { id: Date.now() + Math.floor(Math.random() * 1000), text: value, status: "todo" };
    setSprintData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [storyId]: [...(prev.tasks[storyId] || []), task],
      },
    }));
    e.currentTarget.value = "";
  };

  const handleTaskStatusChange = (storyId: number, taskId: number, status: Task["status"]) => {
    setSprintData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [storyId]: prev.tasks[storyId].map((t) => (t.id === taskId ? { ...t, status } : t)),
      },
    }));
  };

  const addAcceptanceCriteria = () =>
    setUserStoryData((prev) => ({ ...prev, acceptanceCriteria: [...prev.acceptanceCriteria, ""] }));

  const removeAcceptanceCriteria = (index: number) =>
    setUserStoryData((prev) => ({ ...prev, acceptanceCriteria: prev.acceptanceCriteria.filter((_, i) => i !== index) }));

  const handleAcceptanceCriteriaChange = (index: number, value: string) =>
    setUserStoryData((prev) => {
      const copy = [...prev.acceptanceCriteria];
      copy[index] = value;
      return { ...prev, acceptanceCriteria: copy };
    });

  const setEstimation = (storyId: number, points: number | string) =>
    setEstimationData((prev) => ({ ...prev, [storyId]: points }));

  const totalEstimation = Object.values(estimationData)
    .filter((p): p is number => typeof p === "number")
    .reduce((sum, p) => sum + p, 0);

  // Component renderers
  const MenuInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interfaces Interactivas de Scrum</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Practica con casos reales de metodologías ágiles</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div
            onClick={() => setCurrentInterface("sprint")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold">Sprint Planning</h3>
            </div>
            <p className="text-gray-600 mb-4">Planifica un sprint completo seleccionando historias y definiendo tareas</p>
            <button className="flex items-center text-blue-500 font-medium">
              Comenzar <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div
            onClick={() => setCurrentInterface("userstory")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-l-4 border-green-500"
          >
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-xl font-semibold">Historia de Usuario</h3>
            </div>
            <p className="text-gray-600 mb-4">Crea historias de usuario completas con criterios de aceptación</p>
            <button className="flex items-center text-green-500 font-medium">
              Comenzar <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div
            onClick={() => setCurrentInterface("basic")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-l-4 border-purple-500"
          >
            <div className="flex items-center mb-4">
              <CheckCircle className="w-8 h-8 text-purple-500 mr-3" />
              <h3 className="text-xl font-semibold">Preguntas Básicas</h3>
            </div>
            <p className="text-gray-600 mb-4">Responde preguntas fundamentales sobre Scrum</p>
            <button className="flex items-center text-purple-500 font-medium">
              Comenzar <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div
            onClick={() => setCurrentInterface("estimation")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow border-l-4 border-orange-500"
          >
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-orange-500 mr-3" />
              <h3 className="text-xl font-semibold">Estimación</h3>
            </div>
            <p className="text-gray-600 mb-4">Estima story points usando Planning Poker</p>
            <button className="flex items-center text-orange-500 font-medium">
              Comenzar <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SprintPlanningInterface = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setCurrentInterface("menu")} className="text-gray-600 hover:text-gray-900 mr-4">
              ← Volver
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Sprint Planning - EcoMarket</h1>
          </div>
          <div className="text-sm text-gray-600">Sprint 3 • 2 semanas • Velocidad anterior: 34 pts</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Product Backlog */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Product Backlog</h2>
            <div className="space-y-3">
              {productBacklog.map((story) => (
                <div key={story.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{story.title}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        story.priority === "Alta" ? "bg-red-100 text-red-800" : story.priority === "Media" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {story.priority}
                    </span>
                  </div>
                  <button
                    onClick={() => addStoryToSprint(story.id)}
                    className="text-blue-500 text-sm hover:text-blue-700"
                    disabled={sprintData.selectedStories.includes(story.id)}
                  >
                    {sprintData.selectedStories.includes(story.id) ? "Agregada" : "Agregar al Sprint"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sprint Backlog */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Sprint Backlog</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sprint Goal</label>
              <textarea
                value={sprintData.goal}
                onChange={(e) => setSprintData((prev) => ({ ...prev, goal: e.target.value }))}
                className="w-full p-3 border rounded-lg"
                placeholder="Define el objetivo del sprint..."
                rows={3}
              />
            </div>

            <div className="space-y-4">
              {sprintData.selectedStories.map((storyId) => {
                const story = productBacklog.find((s) => s.id === storyId);
                return (
                  <div key={storyId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{story?.title}</h3>
                      <button
                        onClick={() => removeStoryFromSprint(storyId)}
                        className="text-red-500 text-sm"
                      >
                        Remover
                      </button>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Agregar tarea..."
                        className="w-full p-2 border rounded text-sm"
                        onKeyDown={(e) => handleTaskKeyDown(e, storyId)}
                      />

                      {(sprintData.tasks[storyId] || []).map((task) => (
                        <div key={task.id} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                          <span>{task.text}</span>
                          <select
                            value={task.status}
                            onChange={(e) => handleTaskStatusChange(storyId, task.id, e.target.value as Task["status"])}
                            className="text-xs border rounded px-2 py-1"
                          >
                            <option value="todo">To Do</option>
                            <option value="progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sprint Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Información del Sprint</h2>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Sprint Goal</h3>
                <p className="text-blue-800 text-sm">{sprintData.goal || "No definido aún"}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Historias Seleccionadas</h3>
                <p className="text-green-800 text-sm">{sprintData.selectedStories.length} historias</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-orange-900 mb-2">Tareas Creadas</h3>
                <p className="text-orange-800 text-sm">{Object.values(sprintData.tasks).flat().length} tareas</p>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                Finalizar Sprint Planning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const UserStoryInterface = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button onClick={() => setCurrentInterface("menu")} className="text-gray-600 hover:text-gray-900 mr-4">
            ← Volver
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Creador de Historias de Usuario</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nueva Historia de Usuario</h2>
            <p className="text-gray-600">Completa todos los campos para crear una historia de usuario efectiva</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título de la Historia</label>
              <input
                type="text"
                value={userStoryData.title}
                onChange={(e) => setUserStoryData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border rounded-lg"
                placeholder="Ej: Registro de usuario con email"
              />
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-4">Formato de Historia de Usuario</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-2">Como un/una...</label>
                  <input
                    type="text"
                    value={userStoryData.asA}
                    onChange={(e) => setUserStoryData((prev) => ({ ...prev, asA: e.target.value }))}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ej: usuario nuevo del sitio web"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-2">Quiero...</label>
                  <input
                    type="text"
                    value={userStoryData.iWant}
                    onChange={(e) => setUserStoryData((prev) => ({ ...prev, iWant: e.target.value }))}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ej: poder registrarme con mi email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-2">Para que...</label>
                  <input
                    type="text"
                    value={userStoryData.soThat}
                    onChange={(e) => setUserStoryData((prev) => ({ ...prev, soThat: e.target.value }))}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Ej: pueda acceder a mi cuenta personalizada"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Criterios de Aceptación</label>
                <button onClick={addAcceptanceCriteria} className="flex items-center text-green-600 text-sm hover:text-green-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar criterio
                </button>
              </div>

              <div className="space-y-3">
                {userStoryData.acceptanceCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-gray-500 text-sm">#{index + 1}</span>
                    <input
                      type="text"
                      value={criteria}
                      onChange={(e) => handleAcceptanceCriteriaChange(index, e.target.value)}
                      className="flex-1 p-3 border rounded-lg"
                      placeholder="Ej: El usuario debe recibir un email de confirmación"
                    />
                    {userStoryData.acceptanceCriteria.length > 1 && (
                      <button onClick={() => removeAcceptanceCriteria(index)} className="text-red-500 hover:text-red-700">
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Vista Previa</h3>
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">{userStoryData.title || "Título de la historia"}</h4>
                <p className="text-gray-700 mb-4">
                  <strong>Como un/una</strong> {userStoryData.asA || "[rol]"}, <strong>quiero</strong> {userStoryData.iWant || "[funcionalidad]"} <strong>para que</strong> {userStoryData.soThat || "[beneficio]"}.
                </p>

                <div>
                  <strong className="text-sm">Criterios de Aceptación:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {userStoryData.acceptanceCriteria.filter((c) => c.trim()).map((criteria, index) => (
                      <li key={index} className="text-sm text-gray-600">{criteria}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">Guardar Historia</button>
              <button
                onClick={() => setUserStoryData({ title: "", asA: "", iWant: "", soThat: "", acceptanceCriteria: [""] })}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BasicQuestionsInterface = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button onClick={() => setCurrentInterface("menu")} className="text-gray-600 hover:text-gray-900 mr-4">
            ← Volver
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Preguntas Básicas de Scrum</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {basicQuestions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">{index + 1}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h3>

                  {question.type === "multiple" ? (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            onChange={(e) => setBasicAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                            className="text-purple-600"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={basicAnswers[question.id] || ""}
                      onChange={(e) => setBasicAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                      className="w-full p-3 border rounded-lg"
                      rows={4}
                      placeholder="Escribe tu respuesta aquí..."
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Progreso</h3>
              <p className="text-gray-600">{Object.keys(basicAnswers).length} de {basicQuestions.length} preguntas respondidas</p>
            </div>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700">Enviar Respuestas</button>
          </div>
        </div>
      </div>
    </div>
  );

  const EstimationInterface = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button onClick={() => setCurrentInterface("menu")} className="text-gray-600 hover:text-gray-900 mr-4">
            ← Volver
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Planning Poker - Estimación</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Historias para estimar */}
          <div className="lg:col-span-2 space-y-4">
            {productBacklog.map((story) => (
              <div key={story.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{story.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${story.priority === "Alta" ? "bg-red-100 text-red-800" : story.priority === "Media" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                    {story.priority}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-3">Selecciona los story points:</p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 5, 8, 13, 21, "?"].map((point) => (
                      <button
                        key={String(point)}
                        onClick={() => setEstimation(story.id, point)}
                        className={`w-12 h-16 rounded-lg border-2 font-bold transition-colors ${
                          estimationData[story.id] === point
                            ? "border-orange-500 bg-orange-100 text-orange-800"
                            : "border-gray-300 hover:border-orange-300 hover:bg-orange-50"
                        }`}
                      >
                        {point}
                      </button>
                    ))}
                  </div>
                </div>

                {estimationData[story.id] && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-orange-800 text-sm"><strong>Estimación seleccionada:</strong> {estimationData[story.id]} story points</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Panel de información */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Escala de Fibonacci</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">1 punto:</span>
                  <span className="text-gray-600">Muy simple</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">2 puntos:</span>
                  <span className="text-gray-600">Simple</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">3 puntos:</span>
                  <span className="text-gray-600">Moderado</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">5 puntos:</span>
                  <span className="text-gray-600">Complejo</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">8 puntos:</span>
                  <span className="text-gray-600">Muy complejo</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">13+ puntos:</span>
                  <span className="text-gray-600">Épica</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Resumen de Estimaciones</h3>
              <div className="space-y-2">
                {Object.entries(estimationData).map(([storyId, points]) => {
                  const story = productBacklog.find((s) => s.id === parseInt(storyId, 10));
                  return (
                    <div key={storyId} className="flex justify-between text-sm">
                      <span className="truncate mr-2">{story?.title}</span>
                      <span className="font-medium">{points} pts</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{totalEstimation} pts</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700">Finalizar Estimación</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentInterface = () => {
    switch (currentInterface) {
      case "sprint":
        return <SprintPlanningInterface />;
      case "userstory":
        return <UserStoryInterface />;
      case "basic":
        return <BasicQuestionsInterface />;
      case "estimation":
        return <EstimationInterface />;
      default:
        return <MenuInterface />;
    }
  };

  return renderCurrentInterface();
}
