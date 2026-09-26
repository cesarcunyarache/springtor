export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  level: 'basico' | 'intermedio' | 'avanzado';
  icon: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  description: string;
  prerequisites: string[];
  learningObjectives: string[];
  keyConceptsCount: number;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  isCompleted: boolean;
  isInProgress: boolean;
  content: LessonContent;
}

export interface LessonContent {
  priorKnowledge: string[];
  topicsToAddress: TopicToAddress[];
  keyConcepts: KeyConcept[];
  learningOutcomes: string[];
  initialQuiz: Quiz;
}

export interface TopicToAddress {
  title: string;
  description: string;
  subtopics: string[];
}

export interface KeyConcept {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LearningSession {
  id: string;
  topicId: string;
  title: string;
  sections: LearningSection[];
  assessments: Assessment[];
  progress: SessionProgress;
}

export interface LearningSection {
  id: string;
  title: string;
  type: 'content' | 'activity' | 'assessment';
  isCompleted: boolean;
  isActive: boolean;
  content?: SectionContent;
  duration: number; // en minutos
}

export interface SectionContent {
  text: string;
  visualizations: Visualization[];
  keyConcepts: KeyConcept[];
  examples: string[];
}

export interface Visualization {
  id: string;
  type: ViewMode;
  title: string;
  data: any;
}

export interface SessionProgress {
  completedSections: string[];
  currentSection: string | null;
  timeSpent: number;
  assessmentScores: Record<string, number>;
  overallProgress: number;
}

export interface Assessment {
  id: string;
  type: 'initial' | 'final' | 'practical';
  title: string;
  questions: Quiz[];
  passingScore: number;
  attempts: number;
  bestScore: number;
  isCompleted: boolean;
  timeLimit?: number; // en minutos
  practicalCase?: PracticalCase;
}

export interface PracticalCase {
  id: string;
  title: string;
  description: string;
  scenario: string;
  tasks: PracticalTask[];
  context: CaseContext;
}

export interface PracticalTask {
  id: string;
  type: 'user-story-analysis' | 'backlog-prioritization' | 'retrospective-analysis' | 'text-improvement';
  title: string;
  description: string;
  data: any;
  maxScore: number;
}

export interface CaseContext {
  teamSize: number;
  sprintDuration: string;
  projectType: string;
  stakeholders: string[];
}

export interface UserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  storyPoints: number;
  priority: 'high' | 'medium' | 'low';
  issues?: string[];
}

export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  storyPoints: number;
  priority: number;
  dependencies: string[];
  status: 'todo' | 'in-progress' | 'done';
  assignee?: string;
}

export interface UserProgress {
  completedTopics: string[];
  currentTopic: string | null;
  assessmentScores: Record<string, number>;
  totalProgress: number;
}

export type DifficultyLevel = 'basico' | 'intermedio' | 'avanzado';
export type ViewMode = 'mindmap' | 'diagram' | 'comparison' | 'flowchart';