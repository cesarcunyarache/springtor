"use client";

import { useState } from "react";

import { Target, Plus, Trash2, ArrowRight, CheckCircle, Download, X } from 'lucide-react';

import {
  UserStory,
  Priority,
  AcceptanceCriterion,
  SprintGoalSMART,
  Task,
  ImpedimentStatus,
  Impediment,
  SprintReview,
  Retrospective,
  Question,
  Answer,
  ExamData,

} from "./types";
import { assesmentPractice, completePracticeCase, questions, teamMembers } from "./mocks/data";
import { Markdown } from "@/components/markdown";
import { sanitizeText } from "@/lib/utils";
import HeaderPractice from "./components/header-practice";
import ContentPractice from "./components/content-practice";
import UserStoryForm from "./components/user-story-form";
import ProductBacklog from "./components/product-backlog";
import SprintGoalSection from "./components/sprint-goal";
import SprintBacklogSection from "./components/sprint-backlog-section";
import PlanningPokerSection from "./components/planning-poker-section";
import SprintImpedimentsSection from "./components/sprint-impediments-section";
import SprintReviewSection from "./components/sprint-review-section";
import { SprintRetrospectiveSection } from "./components/sprint-retrospective-section";
import SprintTheoreticalQuestionsSection from "./components/questions-section";
import SprintExamSummary from "./components/sprint-summary-section";
import { Button } from "@/components/ui/button";



function App() {

  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);
  const [generatedJson, setGeneratedJson] = useState<string>('');

  // Estado para historias de usuario
  const [newStory, setNewStory] = useState<Omit<UserStory, 'id'>>({
    title: '',
    asA: '',
    iWant: '',
    soThat: '',
    acceptanceCriteria: [''],
    priority: 'Media' as Priority,
    priorityJustification: ''
  });

  const completationPractice = completePracticeCase;

  // Product Backlog
  const [productBacklog, setProductBacklog] = useState<UserStory[]>(completationPractice.productBacklog as UserStory[]);

  // Sprint Planning
  const [sprintGoal, setSprintGoal] = useState<string>('');
  const [sprintGoalSMART, setSprintGoalSMART] = useState<SprintGoalSMART>({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: ''
  });
  const [selectedStories, setSelectedStories] = useState<number[]>([]);
  const [storyEstimations, setStoryEstimations] = useState<Record<number, number | string>>({});
  const [storyTasks, setStoryTasks] = useState<Record<number, Task[]>>({});
  const [taskEstimations, setTaskEstimations] = useState<Record<number, number>>({});

  // Impedimentos
  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [newImpediment, setNewImpediment] = useState<Omit<Impediment, 'id'>>({
    description: '',
    responsible: '',
    action: '',
    deadline: ''
  });

  // Sprint Review
  const [sprintReview, setSprintReview] = useState<SprintReview>({
    incrementDelivered: '',
    feedback: [''],
    goalComparison: '',
    dodComparison: ''
  });

  // Retrospective
  const [retrospective, setRetrospective] = useState<Retrospective>({
    learnings: ['', '', '', ''],
    improvements: ['', '']
  });

  // Preguntas
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Funciones para Sprint Planning
  const addStoryToSprint = (storyId: number): void => {
    if (!selectedStories.includes(storyId)) {
      setSelectedStories([...selectedStories, storyId]);
      setStoryTasks({ ...storyTasks, [storyId]: [] });
    }
  };

  const removeStoryFromSprint = (storyId: number): void => {
    setSelectedStories(selectedStories.filter(id => id !== storyId));
    const newEstimations = { ...storyEstimations };
    delete newEstimations[storyId];
    setStoryEstimations(newEstimations);

    const newTasks = { ...storyTasks };
    delete newTasks[storyId];
    setStoryTasks(newTasks);
  };

  const addTask = (storyId: number, taskName: string, responsible: string = ''): void => {
    if (taskName.trim()) {
      const task = {
        id: Date.now(),
        name: taskName,
        responsible: responsible,
        estimation: null
      };
      setStoryTasks({
        ...storyTasks,
        [storyId]: [...(storyTasks[storyId] || []), task]
      });
    }
  };

  const updateTaskResponsible = (storyId: number, taskId: number, responsible: string): void => {
    setStoryTasks({
      ...storyTasks,
      [storyId]: storyTasks[storyId].map(t =>
        t.id === taskId ? { ...t, responsible } : t
      )
    });
  };

  const removeTask = (storyId: number, taskId: number): void => {
    setStoryTasks({
      ...storyTasks,
      [storyId]: storyTasks[storyId].filter(t => t.id !== taskId)
    });
    const newTaskEst = { ...taskEstimations };
    delete newTaskEst[taskId];
    setTaskEstimations(newTaskEst);
  };

  const setStoryEstimation = (storyId: number, points: number | string): void => {
    setStoryEstimations({ ...storyEstimations, [storyId]: points });
  };

  const setTaskEstimation = (taskId: number, hours: number): void => {
    setTaskEstimations({ ...taskEstimations, [taskId]: hours });
  };

  const getTotalStoryPoints = (): number => {
    return Object.values(storyEstimations)
      .filter((p): p is number => p !== '?' && typeof p === 'number')
      .reduce((sum, points) => sum + points, 0);
  };

  const getTotalTaskHours = (): number => {
    return Object.values(taskEstimations)
      .reduce((sum, hours) => sum + hours, 0);
  };

  // Funciones para impedimentos
  const addImpediment = (): void => {
    if (newImpediment.description && newImpediment.responsible && newImpediment.action && newImpediment.deadline) {
      const impediment: Impediment = {
        id: Date.now(),
        ...newImpediment,
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

  /*  const updateImpedimentStatus = (id: number, status: ImpedimentStatus): void => {
     setImpediments(impediments.map(imp =>
       imp.id === id ? { ...imp, status } : imp
     ));
   }; */

  const removeImpediment = (id: number): void => {
    setImpediments(impediments.filter(imp => imp.id !== id));
  };

  // Funciones para Sprint Review
  const addFeedbackItem = (): void => {
    setSprintReview({
      ...sprintReview,
      feedback: [...sprintReview.feedback, '']
    });
  };

  const updateFeedback = (index: number, value: string): void => {
    const updated = [...sprintReview.feedback];
    updated[index] = value;
    setSprintReview({ ...sprintReview, feedback: updated });
  };

  const removeFeedback = (index: number): void => {
    const updated = sprintReview.feedback.filter((_, i) => i !== index);
    setSprintReview({ ...sprintReview, feedback: updated });
  };

  // Funciones para Retrospective
  const updateLearning = (index: number, value: string): void => {
    const updated = [...retrospective.learnings];
    updated[index] = value;
    setRetrospective({ ...retrospective, learnings: updated });
  };

  const addLearning = (): void => {
    setRetrospective({
      ...retrospective,
      learnings: [...retrospective.learnings, '']
    });
  };

  const updateImprovement = (index: number, value: string): void => {
    const updated = [...retrospective.improvements];
    updated[index] = value;
    setRetrospective({ ...retrospective, improvements: updated });
  };

  const addImprovement = (): void => {
    setRetrospective({
      ...retrospective,
      improvements: [...retrospective.improvements, '']
    });
  };

  // Función para generar el JSON completo del examen
  const generateExamJson = (): ExamData => {
    const now = new Date().toISOString();

    // Construir Sprint Backlog detallado
    const sprintBacklog = selectedStories.map(storyId => {
      const story = productBacklog.find(s => s.id === storyId);
      return {
        storyId,
        story: story!,
        tasks: storyTasks[storyId] || []
      };
    });

    // Construir estimaciones de historias
    const storyEstimationsArray = Object.entries(storyEstimations).map(([storyId, points]) => ({
      storyId: parseInt(storyId),
      storyPoints: typeof points === 'number' ? points : 0
    }));

    // Construir estimaciones de tareas
    const taskEstimationsArray = Object.entries(taskEstimations).map(([taskId, hours]) => ({
      taskId: parseInt(taskId),
      hours
    }));

    // Construir preguntas con respuestas
    const theoreticalQuestionsAnswered = questions.map(q => ({
      question: q.question,
      answer: answers[q.id] || ''
    }));

    // Calcular estadísticas de resumen
    const totalTasksCreated = Object.values(storyTasks).reduce((sum, tasks) => sum + tasks.length, 0);
    const questionsAnswered = Object.keys(answers).length;
    const completionPercentage = Math.round(
      ((questionsAnswered / questions.length) * 100 +
        (selectedStories.length > 0 ? 100 : 0) +
        (sprintGoal ? 100 : 0)) / 3
    );

    const examData: ExamData = {
      metadata: {
        examName: "Examen Práctico: Sprint Planning Completo",
        projectName: "EcoMarket",
        sprintNumber: 3,
        sprintDuration: "2 semanas",
        previousVelocity: 34,
        submittedAt: now
      },
      userStories: productBacklog,
      productBacklog: productBacklog,
      sprintPlanning: {
        sprintGoal,
        sprintGoalSMART,
        selectedStoryIds: selectedStories,
        sprintBacklog
      },
      estimations: {
        stories: storyEstimationsArray,
        tasks: taskEstimationsArray,
        totalStoryPoints: getTotalStoryPoints(),
        totalTaskHours: getTotalTaskHours()
      },
      impediments,
      sprintReview,
      retrospective,
      theoreticalQuestions: theoreticalQuestionsAnswered,
      summary: {
        totalStoriesCreated: productBacklog.length,
        totalStoriesSelected: selectedStories.length,
        totalTasksCreated,
        totalImpediments: impediments.length,
        questionsAnswered,
        totalQuestions: questions.length,
        completionPercentage
      }
    };

    return examData;
  };

  const handleSubmitExam = (): void => {
    const examData = generateExamJson();
    const jsonString = JSON.stringify(examData, null, 2);
    setGeneratedJson(jsonString);
    console.log(generatedJson);
   /*  setShowJsonModal(true); */
  };

  const downloadJson = (): void => {
    const examData = generateExamJson();
    const jsonString = JSON.stringify(examData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sprint-planning-exam-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(generatedJson);
    alert('JSON copiado al portapapeles');
  };

  const practice = assesmentPractice;

  return (
    <div className="min-h-screen bg-background">

    {/*   <HeaderPractice practice={practice} /> */}

      <div className="container mx-auto px-6 py-8 max-w-7xl space-y-6">

        <ContentPractice practice={practice} />

        {/* PASO 1: Crear Historias de Usuario */}
        <UserStoryForm onAddStory={(story) => {
          setProductBacklog([...productBacklog, story]);
        }} />

        {/* PASO 2: Product Backlog */}
        <ProductBacklog productBacklog={productBacklog} />

        {/* PASO 3: Sprint Goal SMART */}
        <SprintGoalSection sprintGoalSMART={sprintGoalSMART} onChange={setSprintGoalSMART} />

        {/* PASO 4 y 5: Selección para Sprint Backlog */}
        <SprintBacklogSection
          productBacklog={productBacklog}
          selectedStories={selectedStories}
          storyTasks={storyTasks}
          teamMembers={teamMembers}
          addStoryToSprint={addStoryToSprint}
          removeStoryFromSprint={removeStoryFromSprint}
          addTask={addTask}
          removeTask={removeTask}
          updateTaskResponsible={updateTaskResponsible}
        />

        {/* PASO 6: Estimaciones */}
        <PlanningPokerSection
          selectedStories={selectedStories}
          productBacklog={productBacklog}
          storyEstimations={storyEstimations}
          storyTasks={storyTasks}
          taskEstimations={taskEstimations}
          setStoryEstimation={setStoryEstimation}
          setTaskEstimation={setTaskEstimation}
          getTotalStoryPoints={getTotalStoryPoints}
          getTotalTaskHours={getTotalTaskHours}
        />


        {/* PASO 7: Gestión de Impedimentos */}
        <SprintImpedimentsSection
          teamMembers={teamMembers}
          impediments={impediments}
          newImpediment={newImpediment}
          setNewImpediment={setNewImpediment}
          addImpediment={addImpediment}
          removeImpediment={removeImpediment}
        />



        {/* PASO 8: Sprint Review */}

        <SprintReviewSection
          sprintReview={sprintReview}
          setSprintReview={setSprintReview}
          addFeedbackItem={addFeedbackItem}
          updateFeedback={updateFeedback}
          removeFeedback={removeFeedback}
        />


        {/* PASO 9: Retrospective */}
        <SprintRetrospectiveSection
          retrospective={retrospective}
          updateLearning={updateLearning}
          addLearning={addLearning}
          updateImprovement={updateImprovement}
          addImprovement={addImprovement}
        />



        {/* PASO 10: Preguntas Teóricas */}

        {/*  <SprintTheoreticalQuestionsSection
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
        />; */}


        {/* Resumen Final */}
        {/* <SprintExamSummary
          sprintGoalCompleted={!!sprintGoal}
          selectedStoriesCount={selectedStories.length}
          productBacklogCount={productBacklog.length}
          answeredQuestionsCount={Object.keys(answers).length}
          totalQuestionsCount={questions.length}
          onSubmitExam={handleSubmitExam}
        /> */}

         <Button
          onClick={handleSubmitExam}
          
          className="w-full bg-primary text-white  text-lg font-bold py-3 transition-colors"
        >
          Enviar Examen
        </Button>
        
      </div>

    
    </div>
  );
}

export default App;