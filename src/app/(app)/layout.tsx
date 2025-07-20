import { DockDemo } from "@/components/dock-demo";


export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <DockDemo />
        {children}
    </main>
  );
}

