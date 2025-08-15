
import { getCourseById } from "@/moks/data";
import { redirect } from "next/navigation";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const courseId = parseInt((await params).courseId);
  const course = getCourseById(courseId);

  if (!course) {
    redirect("/");
  }

  // Redirect to the first lesson of the first module if available
  if (course.modules?.[0]?.lessons?.[0]?.id) {
    redirect(
      `/dashboard/courses/${courseId}/lessons/${course.modules[0].lessons[0].id}`
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to {course.title}</h2>
        <p className="text-muted-foreground">
          This course has no content yet. Please check back later.
        </p>
      </div>
    </div>
  );
}
