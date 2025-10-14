import { auth } from "@/auth";
import { DockDemo } from "@/components/dock-demo";
import { getAssessmentBySlug } from "@/lib/db/queries/learning";

import { getUserById, isUserResponsePreTest } from "@/lib/db/queries/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }
  const user = await getUserById(session.user.id);

  if (!user?.preferences) {
    redirect('/onboarding');
  }

  /* const assement = await getAssessmentBySlug("pre-test")

  if (assement) {
    if (!await isUserResponsePreTest(session.user.id)) redirect('/pre-test');
  } */

  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  

  return (
/*     <SidebarProvider defaultOpen={!isCollapsed}> */
    <main>
      <DockDemo />
      {children}
    </main>
  /*   </SidebarProvider> */
  );
}

