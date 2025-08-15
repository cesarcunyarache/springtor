import { redirect } from "next/navigation";


import { Sidebar } from "@/components/dashboard/Sidebar";

import { getCourseById, getCourseProgress } from "@/moks/data";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
/*   const user = await currentUser(); */
  const { courseId } = await params;

  /* if (!user?.id) {
    return redirect("/");
  } */

/*   const authResult = await checkCourseAccess(1 || null, courseId); */
 /*  if (!authResult.isAuthorized || !user?.id) {
    return redirect(authResult.redirect!);
  }
 */
  const [course, progress] = await Promise.all([
    getCourseById(Number(courseId)),
    getCourseProgress(1, Number(courseId)),
  ]);

  if (!course) {
    return redirect("/my-courses");
  }

  return (
    <div className="h-full">
      <Sidebar course={course} completedLessons={progress.completedLessons} />
      <main className="h-full lg:pt-[64px] pl-20 lg:pl-96">{children}</main>
    </div>
  );
}
