import {
  Category,
  Instructor,
  Course,
  Module,
  Lesson,
  Student,
  Enrollment,
  LessonCompletion
} from "../type";

// ----- Categorías -----
export const categories: Category[] = [
  { id: 1, name: "Desarrollo Web", slug: "desarrollo-web", color: "#FF0000" },
  { id: 2, name: "Diseño UX", slug: "diseno-ux", color: "#00FF00" }
];

// ----- Instructores -----
export const instructors: Instructor[] = [
  { id: 1, name: "Juan Pérez", bio: "Experto en React", photo: "/images/juan.png" },
  { id: 2, name: "Ana Torres", bio: "Especialista en UX", photo: "/images/ana.png" }
];

// ----- Lecciones -----
export const lessons: Lesson[] = [
  
];

// ----- Módulos -----
export const modules: Module[] = [
 
];

// ----- Cursos -----
export const courses: Course[] = [
  {
    id: 1,
    title: "Curso de React",
    price: 49.99,
    slug: "curso-react",
    description: "Aprende React desde cero",
    image: "/images/react.png",
    category: categories[0],
    instructor: instructors[0],
    modules: modules
  }
];

// ----- Estudiantes -----
export const students: Student[] = [
  {
    id: 1,
    firstName: "Carlos",
    lastName: "Ramírez",
    email: "carlos@example.com",
    clerkId: "clerk_123",
    imageUrl: "/images/carlos.png"
  }
];

// ----- Inscripciones -----
export const enrollments: Enrollment[] = [
  {
    id: 1,
    student: students[0],
    course: courses[0],
    amount: 49.99,
    paymentId: "pay_123",
    enrolledAt: new Date().toISOString()
  }
];

// ----- Lecciones completadas -----
export const lessonCompletions: LessonCompletion[] = [
  {
    id: 1,
    student: students[0],
    lesson: lessons[0],
    module: modules[0],
    course: courses[0],
    completedAt: new Date().toISOString()
  },
  {
    id: 2,
    student: students[0],
    lesson: lessons[1],
    module: modules[0],
    course: courses[0],
    completedAt: new Date().toISOString()
  },
   {
    id: 2,
    student: students[0],
    lesson: lessons[2],
    module: modules[0],
    course: courses[0],
    completedAt: new Date().toISOString()
  }
];

// ================= MÉTODOS =================

// Obtener curso por ID
export function getCourseById(courseId: number): Course | null {
  return courses.find((c) => c.id === courseId) || null;
}

// Obtener todos los cursos
export function getAllCourses(): Course[] {
  return courses;
}

// Obtener módulos de un curso
export function getModulesByCourseId(courseId: number): Module[] {
  const course = getCourseById(courseId);
  return course ? course.modules : [];
}

// Obtener lecciones de un módulo
export function getLessonsByModuleId(moduleId: number): Lesson[] {
  return [];
}

// Obtener inscripciones por estudiante
export function getEnrollmentsByStudentId(studentId: number): Enrollment[] {
  return enrollments.filter((enroll) => enroll.student.id === studentId);
}

// Obtener lecciones completadas por estudiante
export function getLessonCompletionsByStudentId(studentId: number): LessonCompletion[] {
  return lessonCompletions.filter((completion) => completion.student.id === studentId);
}



interface CourseProgressResult {
  percentage: number;
  completedLessons: LessonCompletion[];
}

export async function getCourseProgress(
  studentId: number,
  courseId: number
): Promise<CourseProgressResult> {
  const course: Course | null = await getCourseById(courseId);
  if (!course) {
    return { percentage: 0, completedLessons: [] };
  }

  // Todas las lecciones del curso
  const totalLessons = course.modules.reduce(
    (acc, mod) => acc,
  );

  // Lecciones completadas por el estudiante
  const completedLessons = lessonCompletions.filter(
    (c) => c.student.id === studentId && c.course.id === courseId
  );

  // Porcentaje de progreso
  const percentage = Math.round((completedLessons.length / 0) * 100);
  return { percentage, completedLessons };
}


let lessonCompletionId = lessonCompletions.length + 1;


export async function getLessonCompletionStatusAction(
  lessonId: number,
  clerkId: string
): Promise<boolean> {
  const student = students.find((s) => s.clerkId === clerkId);
  if (!student) return false;

  return lessonCompletions.some(
    (lc) => lc.student.id === student.id && lc.lesson.id === "sjjs"
  );
}


export async function completeLessonAction(
  lessonId: number,
  clerkId: string
): Promise<LessonCompletion | null> {
  const student = students.find((s) => s.clerkId === clerkId);
  const lesson = lessons.find((l) => l.id === "e");
  if (!student || !lesson) return null;

  const moduleVar = "jjd"
  const course = courses.find((c) =>
    c.modules.some((m) => m.id === "ksks")
  );

  if (!moduleVar || !course) return null;

  // Evitar duplicados
  const alreadyCompleted = lessonCompletions.find(
    (lc) =>
      lc.student.id === student.id &&
      "jdjd" &&
      lc.course.id === course.id
  );
  if (alreadyCompleted) return alreadyCompleted;

  const newCompletion: LessonCompletion = {
    id: lessonCompletionId++,
    student,
    lesson,
    module: { id: "ksks" } as Module,
    course,
    completedAt: new Date().toISOString(),
  };
  lessonCompletions.push(newCompletion);
  return newCompletion;
}


export async function uncompleteLessonAction(
  lessonId: number,
  clerkId: string
): Promise<boolean> {
  const student = students.find((s) => s.clerkId === clerkId);
  if (!student) return false;

  const index = lessonCompletions.findIndex(
    (lc) => lc.student.id === student.id && lc.lesson.id === "j"
  );

  if (index === -1) return false;

  lessonCompletions.splice(index, 1);
  return true;
}

export function getLessonById(lessonId: number) {
  const lesson = lessons.find((l) => l.id === "ee");
  if (!lesson) return null;

  // Buscar módulo
  const moduleVar = "jjd"

  // Buscar curso
  const course = courses.find((c) =>
    c.modules.some((m) => m.id === "ksks")
  );

  return {
    ...lesson,
    module: moduleVar,
    course,
  };
}