"use client";
import React, { useState } from 'react';
import { Target, Plus, Trash2, ArrowRight, CheckCircle } from 'lucide-react';

interface UserStory {
  id: number;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  acceptanceCriteria: string[];
  priority: 'Alta' | 'Media' | 'Baja';
  priorityJustification: string;
}

interface Task {
  id: number;
  name: string;
  responsible: string;
}

interface Impediment {
  id: number;
  description: string;
  responsible: string;
  action: string;
  deadline: string;
  status: 'Abierto' | 'En Progreso' | 'Resuelto';
}

interface Question {
  id: number;
  question: string;
  type: 'multiple' | 'text';
  options?: string[];
}

type StoryPoints = 1 | 2 | 3 | 5 | 8 | 13 | 21 | '?';

const App: React.FC = () => {
  const teamMembers: string[] = ['Thalia', 'César', 'María', 'Pedro', 'Ana', 'Luis'];

  const [newStory, setNewStory] = useState({
    title: '',
    asA: '',
    iWant: '',
    soThat: '',
    acceptanceCriteria: [''],
    priority: 'Media' as 'Alta' | 'Media' | 'Baja',
    priorityJustification: ''
  });

  const [productBacklog, setProductBacklog] = useState<UserStory[]>([]);
  const [sprintGoal, setSprintGoal] = useState('');
  const [sprintGoalSMART, setSprintGoalSMART] = useState({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  });
  const [selectedStories, setSelectedStories] = useState<number[]>([]);
  const [storyEstimations, setStoryEstimations] = useState<Record<number, StoryPoints>>({});
  const [storyTasks, setStoryTasks] = useState<Record<number, Task[]>>({});
  const [taskEstimations, setTaskEstimations] = useState<Record<number, number>>({});
  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [newImpediment, setNewImpediment] = useState({
    description: '',
    responsible: '',
    action: '',
    deadline: ''
  });
  const [sprintReview, setSprintReview] = useState({
    incrementDelivered: '',
    feedback: [''],
    goalComparison: '',
    dodComparison: ''
  });
  const [retrospective, setRetrospective] = useState({
    learnings: ['', '', '', ''],
    improvements: ['', '']
  });
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions: Question[] = [
    {
      id: 1,
      question: "¿Cuál es la duración recomendada para un Sprint en un equipo nuevo?",
      type: "multiple",
      options: ["1 semana", "2 semanas", "4 semanas", "6 semanas"]
    },
    {
      id: 2,
      question: "Explica la diferencia entre Product Backlog y Sprint Backlog",
      type: "text"
    },
    {
      id: 3,
      question: "¿Quién es responsable de priorizar el Product Backlog?",
      type: "multiple",
      options: ["Scrum Master", "Product Owner", "Development Team", "Stakeholders"]
    },
    {
      id: 4,
      question: "¿Por qué es importante descomponer las historias de usuario en tareas técnicas?",
      type: "text"
    }
  ];

  const addCriterion = () => {
    setNewStory({ ...newStory, acceptanceCriteria: [...newStory.acceptanceCriteria, ''] });
  };

  const updateCriterion = (index: number, value: string) => {
    const updated = [...newStory.acceptanceCriteria];
    updated[index] = value;
    setNewStory({ ...newStory, acceptanceCriteria: updated });
  };

  const removeCriterion = (index: number) => {
    const updated = newStory.acceptanceCriteria.filter((_, i) => i !== index);
    setNewStory({ ...newStory, acceptanceCriteria: updated });
  };

  const addStoryToBacklog = () => {
    if (newStory.title && newStory.asA && newStory.iWant && newStory.soThat && newStory.priorityJustification) {
      const story: UserStory = {
        id: Date.now(),
        ...newStory,
        acceptanceCriteria: newStory.acceptanceCriteria.filter(c => c.trim() !== '')
      };
      setProductBacklog([...productBacklog, story]);
      setNewStory({
        title: '',
        asA: '',
        iWant: '',
        soThat: '',
        acceptanceCriteria: [''],
        priority: 'Media',
        priorityJustification: ''
      });
    }
  };

  const addStoryToSprint = (storyId: number) => {
    if (!selectedStories.includes(storyId)) {
      setSelectedStories([...selectedStories, storyId]);
      setStoryTasks({ ...storyTasks, [storyId]: [] });
    }
  };

  const removeStoryFromSprint = (storyId: number) => {
    setSelectedStories(selectedStories.filter(id => id !== storyId));
    const newEstimations = { ...storyEstimations };
    delete newEstimations[storyId];
    setStoryEstimations(newEstimations);
    const newTasks = { ...storyTasks };
    delete newTasks[storyId];
    setStoryTasks(newTasks);
  };

  const addTask = (storyId: number, taskName: string) => {
    if (taskName.trim()) {
      const task: Task = {
        id: Date.now(),
        name: taskName,
        responsible: ''
      };
      setStoryTasks({
        ...storyTasks,
        [storyId]: [...(storyTasks[storyId] || []), task]
      });
    }
  };

  const updateTaskResponsible = (storyId: number, taskId: number, responsible: string) => {
    setStoryTasks({
      ...storyTasks,
      [storyId]: storyTasks[storyId].map(t =>
        t.id === taskId ? { ...t, responsible } : t
      )
    });
  };

  const removeTask = (storyId: number, taskId: number) => {
    setStoryTasks({
      ...storyTasks,
      [storyId]: storyTasks[storyId].filter(t => t.id !== taskId)
    });
    const newTaskEst = { ...taskEstimations };
    delete newTaskEst[taskId];
    setTaskEstimations(newTaskEst);
  };

  const setStoryEstimation = (storyId: number, points: StoryPoints) => {
    setStoryEstimations({ ...storyEstimations, [storyId]: points });
  };

  const setTaskEstimation = (taskId: number, hours: number) => {
    setTaskEstimations({ ...taskEstimations, [taskId]: hours });
  };

  const getTotalStoryPoints = () => {
    return Object.values(storyEstimations)
      .filter(p => p !== '?')
      .reduce((sum, points) => sum + (typeof points === 'number' ? points : 0), 0);
  };

  const getTotalTaskHours = () => {
    return Object.values(taskEstimations)
      .reduce((sum, hours) => sum + (typeof hours === 'number' ? hours : 0), 0);
  };

  const addImpediment = () => {
    if (newImpediment.description && newImpediment.responsible && newImpediment.action && newImpediment.deadline) {
      const impediment: Impediment = {
        id: Date.now(),
        ...newImpediment,
        status: 'Abierto'
      };
      setImpediments([...impediments, impediment]);
      setNewImpediment({
        description: '',
        responsible: '',
        action: '',
        deadline: ''
      });
    }
  };

  const updateImpedimentStatus = (id: number, status: 'Abierto' | 'En Progreso' | 'Resuelto') => {
    setImpediments(impediments.map(imp =>
      imp.id === id ? { ...imp, status } : imp
    ));
  };

  const removeImpediment = (id: number) => {
    setImpediments(impediments.filter(imp => imp.id !== id));
  };

  const addFeedbackItem = () => {
    setSprintReview({
      ...sprintReview,
      feedback: [...sprintReview.feedback, '']
    });
  };

  const updateFeedback = (index: number, value: string) => {
    const updated = [...sprintReview.feedback];
    updated[index] = value;
    setSprintReview({ ...sprintReview, feedback: updated });
  };

  const removeFeedback = (index: number) => {
    const updated = sprintReview.feedback.filter((_, i) => i !== index);
    setSprintReview({ ...sprintReview, feedback: updated });
  };

  const updateLearning = (index: number, value: string) => {
    const updated = [...retrospective.learnings];
    updated[index] = value;
    setRetrospective({ ...retrospective, learnings: updated });
  };

  const addLearning = () => {
    setRetrospective({
      ...retrospective,
      learnings: [...retrospective.learnings, '']
    });
  };

  const updateImprovement = (index: number, value: string) => {
    const updated = [...retrospective.improvements];
    updated[index] = value;
    setRetrospective({ ...retrospective, improvements: updated });
  };

  const addImprovement = () => {
    setRetrospective({
      ...retrospective,
      improvements: [...retrospective.improvements, '']
    });
  };

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Examen Práctico: Sprint Planning Completo</h1>
                <p className="text-sm text-gray-600">Metodología Scrum - EcoMarket • Sprint 3 • 2 semanas</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Enviar Examen
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* PASO 1: Crear Historias de Usuario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
            Crear Historias de Usuario
          </h2>
          <p className="text-gray-600 text-sm mb-6">Crea historias de usuario que serán agregadas al Product Backlog</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título de la Historia</label>
                <input
                  type="text"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Registro de usuarios con email"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-blue-900 text-sm">Formato: Como [rol], quiero [funcionalidad], para [beneficio]</h3>

                <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">Como un/una...</label>
                  <input
                    type="text"
                    value={newStory.asA}
                    onChange={(e) => setNewStory({ ...newStory, asA: e.target.value })}
                    className="w-full p-2 border border-blue-200 rounded text-sm"
                    placeholder="usuario nuevo del sitio"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">Quiero...</label>
                  <input
                    type="text"
                    value={newStory.iWant}
                    onChange={(e) => setNewStory({ ...newStory, iWant: e.target.value })}
                    className="w-full p-2 border border-blue-200 rounded text-sm"
                    placeholder="poder registrarme con mi email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-blue-800 mb-1">Para que...</label>
                  <input
                    type="text"
                    value={newStory.soThat}
                    onChange={(e) => setNewStory({ ...newStory, soThat: e.target.value })}
                    className="w-full p-2 border border-blue-200 rounded text-sm"
                    placeholder="pueda acceder a funciones personalizadas"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                <select
                  value={newStory.priority}
                  onChange={(e) => setNewStory({ ...newStory, priority: e.target.value as 'Alta' | 'Media' | 'Baja' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Justificación de Prioridad*</label>
                <textarea
                  value={newStory.priorityJustification}
                  onChange={(e) => setNewStory({ ...newStory, priorityJustification: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Explica por qué tiene esta prioridad (valor de negocio, riesgo, dependencias, urgencia...)"
                  rows={3}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">Criterios de Aceptación</label>
                <button
                  onClick={addCriterion}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar criterio
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {newStory.acceptanceCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-gray-500 text-sm mt-3">#{index + 1}</span>
                    <textarea
                      value={criterion}
                      onChange={(e) => updateCriterion(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg text-sm resize-none"
                      placeholder="Ej: El usuario recibe un email de confirmación"
                      rows={2}
                    />
                    {newStory.acceptanceCriteria.length > 1 && (
                      <button
                        onClick={() => removeCriterion(index)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addStoryToBacklog}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Agregar al Product Backlog
              </button>
            </div>
          </div>
        </div>

        {/* PASO 2: Product Backlog */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
            Product Backlog
          </h2>
          <p className="text-gray-600 text-sm mb-4">Todas las historias de usuario creadas y priorizadas</p>

          {productBacklog.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No hay historias en el Product Backlog. Crea historias de usuario arriba.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {productBacklog.map(story => (
                <div key={story.id} className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 flex-1">{story.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                      story.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                      story.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {story.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 italic">
                    Como <strong>{story.asA}</strong>, quiero <strong>{story.iWant}</strong> para <strong>{story.soThat}</strong>
                  </p>

                  {story.acceptanceCriteria.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Criterios de Aceptación:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {story.acceptanceCriteria.map((criterion, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-600 mr-1">✓</span>
                            <span>{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gray-50 p-2 rounded mt-2">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Justificación de Prioridad:</p>
                    <p className="text-xs text-gray-700">{story.priorityJustification}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PASO 3: Sprint Goal SMART */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
            Sprint Goal (Objetivo SMART del Sprint)
          </h2>
          <p className="text-gray-600 text-sm mb-4">Define el objetivo del sprint siguiendo criterios SMART</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo General del Sprint</label>
            <textarea
              value={sprintGoal}
              onChange={(e) => setSprintGoal(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Resumen del objetivo..."
              rows={2}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <span className="text-blue-600">S</span>pecífico - ¿Qué exactamente se va a lograr?
              </label>
              <textarea
                value={sprintGoalSMART.specific}
                onChange={(e) => setSprintGoalSMART({ ...sprintGoalSMART, specific: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                placeholder="Ej: Implementar registro de usuarios con email y carrito básico"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <span className="text-blue-600">M</span>edible - ¿Cómo se medirá el éxito?
              </label>
              <textarea
                value={sprintGoalSMART.measurable}
                onChange={(e) => setSprintGoalSMART({ ...sprintGoalSMART, measurable: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                placeholder="Ej: 3 historias completadas, 21 story points, tests al 80%"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <span className="text-blue-600">A</span>lcanzable - ¿Es realista con los recursos?
              </label>
              <textarea
                value={sprintGoalSMART.achievable}
                onChange={(e) => setSprintGoalSMART({ ...sprintGoalSMART, achievable: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                placeholder="Ej: Equipo completo disponible, sin dependencias externas críticas"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <span className="text-blue-600">R</span>elevante - ¿Por qué es importante?
              </label>
              <textarea
                value={sprintGoalSMART.relevant}
                onChange={(e) => setSprintGoalSMART({ ...sprintGoalSMART, relevant: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                placeholder="Ej: Funcionalidades base para MVP, requeridas para launch"
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                <span className="text-blue-600">T</span>emporal - ¿Cuándo se completará?
              </label>
              <input
                type="text"
                value={sprintGoalSMART.timeBound}
                onChange={(e) => setSprintGoalSMART({ ...sprintGoalSMART, timeBound: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Ej: Final del Sprint 3 - 14 días (del 01/01 al 14/01)"
              />
            </div>
          </div>
        </div>

        {/* PASO 4: Selección para Sprint Backlog */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Historias Disponibles */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
              Seleccionar Historias
            </h2>
            <p className="text-gray-600 text-sm mb-4">Haz clic para agregar historias al Sprint</p>
            {productBacklog.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Primero crea historias de usuario</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {productBacklog.map(story => (
                  <div
                    key={story.id}
                    className={`border-2 rounded-lg p-3 transition-all ${
                      selectedStories.includes(story.id)
                        ? 'border-gray-300 bg-gray-50 opacity-50'
                        : 'border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer'
                    }`}
                    onClick={() => !selectedStories.includes(story.id) && addStoryToSprint(story.id)}
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm flex-1">{story.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                        story.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                        story.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {story.priority}
                      </span>
                    </div>
                    {selectedStories.includes(story.id) ? (
                      <div className="text-xs text-gray-500 font-medium mt-2">✓ En el Sprint</div>
                    ) : (
                      <div className="text-xs text-blue-600 font-medium flex items-center mt-2">
                        <Plus className="w-3 h-3 mr-1" />
                        Agregar
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sprint Backlog con Tareas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
              Sprint Backlog + Tareas
            </h2>
            <p className="text-gray-600 text-sm mb-4">Descomponer historias en tareas técnicas</p>

            {selectedStories.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ArrowRight className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Selecciona historias primero</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedStories.map(storyId => {
                  const story = productBacklog.find(s => s.id === storyId);
                  const tasks = storyTasks[storyId] || [];
                  return (
                    <div key={storyId} className="border-2 border-green-200 bg-green-50 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm flex-1">{story!.title}</h3>
                        <button
                          onClick={() => removeStoryFromSprint(storyId)}
                          className="text-red-600 hover:text-red-800 ml-2"
                          title="Remover"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="mb-2">
                        <input
                          type="text"
                          placeholder="Agregar tarea técnica (Enter para agregar)..."
                          className="w-full p-2 border border-green-300 rounded text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                              addTask(storyId, e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                      </div>

                      {tasks.length > 0 && (
                        <div className="space-y-2">
                          {tasks.map(task => (
                            <div key={task.id} className="bg-white rounded p-2 text-xs">
                              <div className="flex items-center justify-between mb-1">
                                <span className="flex-1 font-medium text-gray-900">{task.name}</span>
                                <button
                                  onClick={() => removeTask(storyId, task.id)}
                                  className="text-red-500 hover:text-red-700 ml-2"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="flex items-center space-x-2">
                                <label className="text-gray-600 text-xs">Responsable:</label>
                                <select
                                  value={task.responsible || ''}
                                  onChange={(e) => updateTaskResponsible(storyId, task.id, e.target.value)}
                                  className="flex-1 p-1 border border-gray-300 rounded text-xs"
                                >
                                  <option value="">Sin asignar</option>
                                  {teamMembers.map(member => (
                                    <option key={member} value={member}>{member}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* PASO 6: Estimaciones */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">6</span>
            Estimaciones (Planning Poker)
          </h2>
          <p className="text-gray-600 text-sm mb-6">Estima cada historia del Sprint Backlog usando la secuencia de Fibonacci</p>

          {selectedStories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Primero agrega historias al Sprint Backlog</p>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedStories.map(storyId => {
                const story = productBacklog.find(s => s.id === storyId);
                return (
                  <div key={storyId} className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-1">{story!.title}</h3>
                  {/*   <p className="text-sm text-gray-600 mb-4">{story!.description}</p> */}

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm font-medium text-gray-700">Story Points:</span>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 5, 8, 13, 21, '?'].map(point => (
                          <button
                            key={point}
                            onClick={() => setStoryEstimation(storyId, point as StoryPoints)}
                            className={`w-10 h-12 rounded-lg border-2 font-bold transition-all ${
                              storyEstimations[storyId] === point
                                ? 'border-blue-600 bg-blue-600 text-white scale-110 shadow-lg'
                                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700'
                            }`}
                          >
                            {point}
                          </button>
                        ))}
                      </div>
                    </div>

                    {storyEstimations[storyId] && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
                        <span className="font-medium text-blue-900">Estimación: </span>
                        <span className="text-blue-800">{storyEstimations[storyId]} story points</span>
                      </div>
                    )}

                    {storyTasks[storyId] && storyTasks[storyId].length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Estimación de Tareas (en horas):</p>
                        <div className="space-y-2">
                          {storyTasks[storyId].map(task => (
                            <div key={task.id} className="flex items-center justify-between text-sm">
                              <span className="flex-1 text-gray-700">{task.name}</span>
                              <input
                                type="number"
                                min="0"
                                max="40"
                                step="0.5"
                                placeholder="hrs"
                                value={taskEstimations[task.id] || ''}
                                onChange={(e) => setTaskEstimation(task.id, parseFloat(e.target.value) || 0)}
                                className="w-16 p-1 border border-gray-300 rounded text-center text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">Total de Story Points:</span>
                    <p className="text-3xl font-bold text-gray-900">{getTotalStoryPoints()} pts</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">Velocidad Anterior:</span>
                    <p className="text-3xl font-bold text-gray-400">34 pts</p>
                  </div>
                </div>
                {getTotalStoryPoints() > 34 && (
                  <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
                    ⚠️ El total estimado supera la velocidad del sprint anterior
                  </div>
                )}
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Horas (Tareas):</span>
                    <span className="font-bold text-gray-900">{getTotalTaskHours()} hrs</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PASO 7: Gestión de Impedimentos */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">7</span>
            Gestión de Impedimentos
          </h2>
          <p className="text-gray-600 text-sm mb-4">Identificar bloqueos, asignar responsable y plan de acción</p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Descripción del Impedimento*</label>
                <textarea
                  value={newImpediment.description}
                  onChange={(e) => setNewImpediment({ ...newImpediment, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                  placeholder="Ej: Servicio de correo SMTP no está configurado"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Responsable*</label>
                <select
                  value={newImpediment.responsible}
                  onChange={(e) => setNewImpediment({ ...newImpediment, responsible: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                >
                  <option value="">Seleccionar...</option>
                  {teamMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Plan de Acción*</label>
                <textarea
                  value={newImpediment.action}
                  onChange={(e) => setNewImpediment({ ...newImpediment, action: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                  placeholder="Ej: Configurar credenciales SMTP en servidor de producción"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Fecha Límite*</label>
                <input
                  type="date"
                  value={newImpediment.deadline}
                  onChange={(e) => setNewImpediment({ ...newImpediment, deadline: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>

          <button
            onClick={addImpediment}
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm flex items-center justify-center mb-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Impedimento
          </button>

          {impediments.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">Impedimentos Registrados:</h3>
              {impediments.map(imp => (
                <div key={imp.id} className="border-2 border-orange-200 bg-orange-50 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm mb-1">{imp.description}</p>
                      <p className="text-xs text-gray-600 mb-1"><strong>Responsable:</strong> {imp.responsible}</p>
                      <p className="text-xs text-gray-600 mb-1"><strong>Acción:</strong> {imp.action}</p>
                      <p className="text-xs text-gray-600"><strong>Plazo:</strong> {imp.deadline}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-3">
                      <select
                        value={imp.status}
                        onChange={(e) => updateImpedimentStatus(imp.id, e.target.value as 'Abierto' | 'En Progreso' | 'Resuelto')}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Abierto">Abierto</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Resuelto">Resuelto</option>
                      </select>
                      <button
                        onClick={() => removeImpediment(imp.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PASO 8: Sprint Review */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">8</span>
            Sprint Review
          </h2>
          <p className="text-gray-600 text-sm mb-4">Presentación del incremento, feedback y comparación con objetivos</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Incremento Entregado</label>
              <textarea
                value={sprintReview.incrementDelivered}
                onChange={(e) => setSprintReview({ ...sprintReview, incrementDelivered: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Describe qué funcionalidades se completaron y están listas para producción..."
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Feedback Recibido</label>
                <button
                  onClick={addFeedbackItem}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar feedback
                </button>
              </div>
              <div className="space-y-2">
                {sprintReview.feedback.map((feedback, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feedback}
                      onChange={(e) => updateFeedback(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      placeholder="Ej: Los usuarios quieren poder editar productos en el carrito"
                    />
                    {sprintReview.feedback.length > 1 && (
                      <button
                        onClick={() => removeFeedback(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comparación con Sprint Goal</label>
              <textarea
                value={sprintReview.goalComparison}
                onChange={(e) => setSprintReview({ ...sprintReview, goalComparison: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="¿Se cumplió el Sprint Goal? ¿Qué se logró y qué quedó pendiente?"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Comparación con Definition of Done (DoD)</label>
              <textarea
                value={sprintReview.dodComparison}
                onChange={(e) => setSprintReview({ ...sprintReview, dodComparison: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="¿Las historias completadas cumplen con todos los criterios del DoD? (tests, documentación, code review...)"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* PASO 9: Retrospective */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">9</span>
            Sprint Retrospective
          </h2>
          <p className="text-gray-600 text-sm mb-4">Lecciones aprendidas y acciones de mejora para el próximo sprint</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Lecciones Aprendidas (mínimo 4)</label>
                <button
                  onClick={addLearning}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3">¿Qué funcionó bien? ¿Qué no funcionó? ¿Qué aprendimos?</p>
              <div className="space-y-2">
                {retrospective.learnings.map((learning, index) => (
                  <textarea
                    key={index}
                    value={learning}
                    onChange={(e) => updateLearning(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                    placeholder={`Lección ${index + 1}: Ej: La comunicación diaria mejoró el flujo de trabajo`}
                    rows={2}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Acciones de Mejora (mínimo 2)</label>
                <button
                  onClick={addImprovement}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-3">¿Qué vamos a hacer diferente en el próximo sprint?</p>
              <div className="space-y-2">
                {retrospective.improvements.map((improvement, index) => (
                  <textarea
                    key={index}
                    value={improvement}
                    onChange={(e) => updateImprovement(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
                    placeholder={`Acción ${index + 1}: Ej: Implementar pair programming en tareas complejas`}
                    rows={2}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PASO 10: Preguntas Teóricas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
            <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">10</span>
            Preguntas Teóricas
          </h2>
          <p className="text-gray-600 text-sm mb-6">Responde las siguientes preguntas sobre Scrum y Sprint Planning</p>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-5">
                <div className="flex items-start space-x-3 mb-4">
                  <span className="bg-gray-100 text-gray-700 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-medium text-gray-900 flex-1">{question.question}</h3>
                </div>

                {question.type === 'multiple' ? (
                  <div className="space-y-2 ml-10">
                    {question?.options?.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                          className="text-blue-600 w-4 h-4"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={answers[question.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    className="w-full ml-10 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Escribe tu respuesta aquí..."
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resumen Final */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Resumen del Examen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{sprintGoal ? '✓' : '○'}</div>
              <div className="text-sm mt-1">Sprint Goal</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{selectedStories.length}</div>
              <div className="text-sm mt-1">Historias Seleccionadas</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{productBacklog.length}</div>
              <div className="text-sm mt-1">Historias Creadas</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{Object.keys(answers).length}/{questions.length}</div>
              <div className="text-sm mt-1">Preguntas Respondidas</div>
            </div>
          </div>
          <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            Enviar Examen Completo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;






