import SignInForm from "@/features/auth/ui/components/forms/SignInForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div className="w-full max-w-sm">
      <SignInForm />
    </div>
  </div>
  );
}
