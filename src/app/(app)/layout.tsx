import { auth } from "@/auth";
import { DockDemo } from "@/components/dock-demo";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  if (!session) {
    redirect('/sign-in');
  }

  session.user.id


  return (
    <main>
      <DockDemo />
      {children}
    </main>
  );
}

