import OnboardingForm from "@/components/onboarding/onboarding-form";
/* import SignInForm from "@/features/auth/ui/components/forms/SignInForm"; */

export default function Home() {
  return (
   

  <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="w-full h-full">
        {/* <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Personaliza tu experiencia de aprendizaje Scrum
        </h1> */}
        <OnboardingForm />
      </div>
    </main>
  );
}
 {/* <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div className="w-full max-w-sm">
      <SignInForm />
    </div>
  </div> */}