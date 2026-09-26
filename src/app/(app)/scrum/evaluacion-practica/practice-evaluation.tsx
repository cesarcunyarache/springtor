"use client";

import { useEffect, useState } from "react";
import {
  Target, Plus, Trash2, ArrowRight, CheckCircle, Download, X, BookOpenCheck, AlertTriangle, Loader2, OctagonAlert
} from 'lucide-react';
import {
  UserStory, Priority, AcceptanceCriterion, SprintGoalSMART, Task, ImpedimentStatus, Impediment, SprintReview, Retrospective, Question, Answer, ExamData,
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
import { evaluateScrumPractice } from "../../api/practice/actions";
import { savePrestestPracticeResponses } from "@/lib/db/queries/user";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useExamTimer } from "./store";
import ExamTimerDisplay from "./components/exam-timer";
import { toast } from "sonner";
import { useProctoring } from "./hooks/useProctoring";
import CamaraFeed from "./components/camara-feed";
import FaceMonitor from "./components/face-monitor";
import { useExamStore } from "@/app/(before)/store/examStore";


interface PracticeEvaluationProps {
  onSubmit: (answers: any) => Promise<void>;
  isCompleted: boolean;
  isInitialized: boolean;
  keyEvaluation: string;
}

export default function PracticeEvaluation({ onSubmit, isCompleted, isInitialized, keyEvaluation }: PracticeEvaluationProps) {
  const practice = assesmentPractice;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(false);

  // Store global para exámenes
  const { startExam, endExam, isExamInProgress, hasAnyExamActive } = useExamStore();

  // Estados del producto
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

  const [productBacklog, setProductBacklog] = useState<UserStory[]>([]);
  const [sprintGoal, setSprintGoal] = useState<string>('');
  const [sprintGoalSMART, setSprintGoalSMART] = useState<SprintGoalSMART>({
    specific: '',
    measurable: '',
    achievable: '',
    relevant: '',
    timeBound: '',
  });

  const [selectedStories, setSelectedStories] = useState<number[]>([]);
  const [storyEstimations, setStoryEstimations] = useState<Record<number, number | string>>([]);
  const [storyTasks, setStoryTasks] = useState<Record<number, Task[]>>([]);
  const [taskEstimations, setTaskEstimations] = useState<Record<number, number>>([]);

  const [impediments, setImpediments] = useState<Impediment[]>([]);
  const [newImpediment, setNewImpediment] = useState<Omit<Impediment, 'id' | 'status'>>({
    description: '',
    responsible: '',
    action: '',
    deadline: '',
  });

  const [sprintReview, setSprintReview] = useState<SprintReview>({
    incrementDelivered: '',
    feedback: [''],
    goalComparison: '',
    dodComparison: ''
  });

  const [retrospective, setRetrospective] = useState<Retrospective>({
    learnings: ['', '', '', ''],
    improvements: ['', '']
  });

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showInitialAlert, setShowInitialAlert] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHideExamen, setIsHideExamen] = useState(false);
  const [isDifferentExamInProgress, setIsDifferentExamInProgress] = useState(false);

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
        deadline: '',
      });
    }
  };

  const updateImpedimentStatus = (id: number, status: ImpedimentStatus): void => {
    setImpediments(impediments.map(imp =>
      imp.id === id ? { ...imp, status } : imp
    ));
  };

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

  // Generar resultado del examen
  const generateResult = (): ExamData => {
    const sprintBacklog = selectedStories.map(storyId => {
      const story = productBacklog.find(s => s.id === storyId);
      return {
        storyId,
        story: story!,
        tasks: storyTasks[storyId] || []
      };
    });

    const storyEstimationsArray = Object.entries(storyEstimations).map(([storyId, points]) => ({
      storyId: parseInt(storyId),
      storyPoints: typeof points === 'number' ? points : 0
    }));

    const taskEstimationsArray = Object.entries(taskEstimations).map(([taskId, hours]) => ({
      taskId: parseInt(taskId),
      hours
    }));

    const totalTasksCreated = Object.values(storyTasks).reduce((sum, tasks) => sum + tasks.length, 0);
    const completionPercentage = Math.round(
      ((selectedStories.length > 0 ? 100 : 0) +
        (sprintGoal ? 100 : 0)) / 2
    );

    const examData: ExamData = {
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
      summary: {
        totalStoriesCreated: productBacklog.length,
        totalStoriesSelected: selectedStories.length,
        totalTasksCreated,
        totalImpediments: impediments.length,
        completionPercentage
      }
    };

    return examData;
  };

  const handleSubmitExam = async () => {
    setIsLoading(true);
    setIsSubmitted(true);
    endExam();

    const response = generateResult();
    await onSubmit(response);
    setIsLoading(false);
  };

  const { start, pause, resume, reset, status, finish, name } = useExamTimer();

  const proctoringData = useProctoring({
    forceFullScreen: true,
    preventTabSwitch: true,
    preventContextMenu: true,
    preventUserSelection: true,
    preventCopy: true,
  });

  // Effect para manejar la lógica del examen
  useEffect(() => {
    // Verificar si otro examen está en progreso
    const otherExamActive = hasAnyExamActive() && !isExamInProgress(keyEvaluation as any);
    setIsDifferentExamInProgress(otherExamActive);

    // Mostrar alerta inicial
    const canStartExam = !isCompleted && !isInitial && !otherExamActive;
    setShowInitialAlert(canStartExam);

    // Manejar cuando el timer termina
    if (status === "finished" && !isCompleted && isInitial) {
      setIsSubmitted(true);
      endExam();
      handleSubmitExam();
      reset();
    }

    // Detectar pérdida de fullscreen o focus
    const isHidden = proctoringData.fullScreen.status === 'off' || proctoringData.tabFocus.status === false;
    if (isHidden && isInitial && !isCompleted) {
      setIsHideExamen(true);
    }

  }, [status, isCompleted, isInitial, proctoringData.fullScreen.status, proctoringData.tabFocus.status, hasAnyExamActive, isExamInProgress, keyEvaluation]);

  const handleStartExam = () => {
    setIsInitial(true);
    startExam(keyEvaluation as any);
    start(5400, keyEvaluation);
    proctoringData.fullScreen.trigger();
  };

  return (
    <div className="min-h-screen bg-background">
      <FaceMonitor />

      <div className="bg-background border-b sticky top-0 z-10">
        <div className="flex flex-row container mx-auto px-6 py-4 justify-between">
          <div className="flex justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold">Evaluación Práctica</h1>
              </div>
            </div>
          </div>
          <ExamTimerDisplay />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl space-y-6">
        <ContentPractice practice={practice} />

        <UserStoryForm onAddStory={(story) => {
          setProductBacklog([...productBacklog, story]);
        }} />

        <ProductBacklog productBacklog={productBacklog} />

        <SprintGoalSection sprintGoalSMART={sprintGoalSMART} onChange={setSprintGoalSMART} />

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

        <SprintImpedimentsSection
          teamMembers={teamMembers}
          impediments={impediments}
          newImpediment={newImpediment}
          setNewImpediment={setNewImpediment}
          addImpediment={addImpediment}
          removeImpediment={removeImpediment}
          updateImpedimentStatus={updateImpedimentStatus}
        />

        <SprintReviewSection
          sprintReview={sprintReview}
          setSprintReview={setSprintReview}
          addFeedbackItem={addFeedbackItem}
          updateFeedback={updateFeedback}
          removeFeedback={removeFeedback}
        />

        <SprintRetrospectiveSection
          retrospective={retrospective}
          updateLearning={updateLearning}
          addLearning={addLearning}
          updateImprovement={updateImprovement}
          addImprovement={addImprovement}
        />

        <Button
          onClick={handleSubmitExam}
          disabled={isLoading}
          className="w-full bg-primary text-white text-lg font-bold py-3 transition-colors"
        >
          {isLoading ? 'Evaluando...' : 'Enviar Examen'}
        </Button>
      </div>

      {/* Alerta inicial - Comenzar examen */}
      <AlertDialog open={showInitialAlert}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <AlertDialogTitle>
              <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10">
                <AlertTriangle className="h-7 w-7 text-amber-500" />
              </div>
              ¿Deseas iniciar el examen?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[15px] text-center">
              El examen tiene una duración de <strong>1 hora con 30 minutos</strong>.
              Evalúa de manera práctica tus conocimientos de Scrum.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => router.back()}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleStartExam}>
              Comenzar examen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alerta - Examen ya completado */}
      <AlertDialog open={isCompleted}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <AlertDialogTitle>
              <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-600/10">
                <BookOpenCheck className="w-8 h-8 text-center text-green-600" />
              </div>
              ¡Ya completaste este examen!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[15px] text-center">
              Has completado este examen previamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2 sm:justify-center">
            <AlertDialogAction onClick={() => router.back()}>
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alerta - Examen oculto por supervisión */}
      <AlertDialog open={isHideExamen}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <AlertDialogTitle>
              <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                <OctagonAlert className="h-7 w-7 text-destructive" />
              </div>
              El examen está temporalmente bloqueado
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[15px] text-center">
              El examen ha sido bloqueado por el sistema de supervisión.
              No podrás continuar hasta que se restablezcan las condiciones requeridas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setIsHideExamen(false);
                proctoringData.fullScreen.trigger();
              }}
            >
              Continuar examen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alerta - Otro examen en progreso */}
      <AlertDialog open={isDifferentExamInProgress}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <AlertDialogTitle>
              <div className="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                <OctagonAlert className="h-7 w-7 text-destructive" />
              </div>
              Ya tienes un examen en curso
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[15px] text-center">
              Tienes otro examen activo. Finaliza o cierra ese examen antes de comenzar este.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.back()}>
              Entendido
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alerta - Cargando respuestas */}
      <AlertDialog open={isLoading}>
        <AlertDialogContent className="flex flex-col justify-center items-center text-center space-y-4">
          <div className="bg-accent rounded-full w-20 h-20 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Evaluando tus respuestas...</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              La IA está analizando y evaluando tus respuestas.
              Este proceso puede tardar unos segundos.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}