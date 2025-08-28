
import { getTopicById } from "@/lib/db/queries/learning";
import { getCourseById } from "@/moks/data";
import { redirect } from "next/navigation";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const courseId = (await params).courseId;
  const course = await getTopicById(courseId);

  if (!course) {
    redirect("/");
  }

  if (course.modules?.[0]?.lessons?.[0]?.id) {
    redirect(
      `/tema/${courseId}/lessons/${course.modules[0].lessons[0].id}`
    );
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to {course?.title}</h2>
        <p className="text-muted-foreground">
          This course has no content yet. Please check back later.
        </p>
      </div>
    </div>
  );
}
