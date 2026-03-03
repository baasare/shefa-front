/**
 * Onboarding Layout
 * Layout for onboarding flow with stepper
 */

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Simple header */}
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
          <span className="ml-2 text-xl font-bold">ShefaFx</span>
        </div>
      </header>

      {/* Onboarding stepper will go here */}
      <div className="container py-4">
        <div className="mx-auto max-w-2xl">
          {/* TODO: Add OnboardingStepper component */}
        </div>
      </div>

      <main className="flex-1">
        <div className="container py-8">
          <div className="mx-auto max-w-2xl">{children}</div>
        </div>
      </main>
    </div>
  );
}
