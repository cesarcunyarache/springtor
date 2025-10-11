export type Priority = 'Alta' | 'Media' | 'Baja';

export interface AcceptanceCriterion {
  id: number;
  description: string;
}

export interface UserStory {
  id: number;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  acceptanceCriteria: string[];
  priority: Priority;
  priorityJustification: string;
}

export interface SprintGoalSMART {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
}

export interface Task {
  id: number;
  name: string;
  responsible: string;
  estimation: number | null;
}

export type ImpedimentStatus = 'Abierto' | 'En Progreso' | 'Resuelto';

export interface Impediment {
  id: number;
  description: string;
  responsible: string;
  action: string;
  deadline: string;
/*   status: ImpedimentStatus; */
}

export interface SprintReview {
  incrementDelivered: string;
  feedback: string[];
  goalComparison: string;
  dodComparison: string;
}

export interface Retrospective {
  learnings: string[];
  improvements: string[];
}

export interface Question {
  id: number;
  question: string;
  type: 'multiple' | 'text';
  options?: string[];
}

export interface Answer {
  questionId: number;
  answer: string;
}

export interface ExamData {
  metadata: {
    examName: string;
    projectName: string;
    sprintNumber: number;
    sprintDuration: string;
    previousVelocity: number;
    submittedAt: string;
  };
  userStories: UserStory[];
  productBacklog: UserStory[];
  sprintPlanning: {
    sprintGoal: string;
    sprintGoalSMART: SprintGoalSMART;
    selectedStoryIds: number[];
    sprintBacklog: {
      storyId: number;
      story: UserStory;
      tasks: Task[];
    }[];
  };
  estimations: {
    stories: {
      storyId: number;
      storyPoints: number | string;
    }[];
    tasks: {
      taskId: number;
      hours: number;
    }[];
    totalStoryPoints: number;
    totalTaskHours: number;
  };
  impediments: Impediment[];
  sprintReview: SprintReview;
  retrospective: Retrospective;
  theoreticalQuestions: {
    question: string;
    answer: string;
  }[];
  summary: {
    totalStoriesCreated: number;
    totalStoriesSelected: number;
    totalTasksCreated: number;
    totalImpediments: number;
    questionsAnswered: number;
    totalQuestions: number;
    completionPercentage: number;
  };
}


export type PracticeCase = {
  id: string;
  slug: string;
  title: string;
  description: string;
  context: string;
  content: string;
}