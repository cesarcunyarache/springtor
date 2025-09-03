export interface BaseModel {
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Roadmap extends BaseModel {
  id: string;
  slug: string;
  title: string;
  description?: string;
  topics?: Topic[];
}

export interface LearningStep extends BaseModel {
  id: string;
  name: string;
  description: string | null;
}

export interface Topic extends BaseModel {
  id: string;
  roadmapId: string;
  parentId: string | null;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  level: number;
  icon: string | null;
  stepId: string | null;
  learningStep?: LearningStep | null;
  modules?: Module[];
}

export interface Module extends BaseModel {
  id: string;
  topicId: string;
  title: string;
  description: string | null;
  lessons?: Lesson[];
}

export interface Lesson extends BaseModel {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  description: string | null;
  videoUrl: string | null;
  loomUrl: string | null;
  content: string | null;
  module?: Module | null;
}

export interface UserProgress {
  userId: number;
  roadmapId: number;
  topicsProgress: TopicProgress[];
}

export interface TopicProgress {
  topicId: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number; // % del tema
  lessonsProgress: LessonProgress[];
}

export interface LessonProgress {
  lessonId: number;
  isCompleted: boolean;
  completionDate?: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface Instructor {
  id: number;
  name: string;
  bio?: string;
  photo?: string;
}

export interface Course {
  id: number;
  title: string;
  price: number;
  slug: string;
  description?: string;
  image?: string;
  category: Category;
  instructor?: Instructor;
  modules: Module[];
}

export interface Student {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  clerkId: string;
  imageUrl?: string;
}

export interface Enrollment {
  id: number;
  student: Student;
  course: Course;
  amount: number;
  paymentId: string;
  enrolledAt: string; // ISO date string
}

export interface LessonCompletion {
  id: number;
  student: Student;
  lesson: Lesson;
  module: Module;
  course: Course;
  completedAt: string; // ISO date string
}
