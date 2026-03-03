/**
 * Onboarding Layout
 * Wizard layout for the multi-step onboarding flow.
 * Uses BrandLogo + ThemeToggle in header.
 * Uses OnboardingStepper below header.
 * Completely separate from dashboard sidebar and auth card shell.
 */

'use client';

import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { OnboardingStepper } from '@/components/features/onboarding/OnboardingStepper';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--background))]">
      {/* Wizard Header */}
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <BrandLogo href="/" size="md" />
          <ThemeToggle />
        </div>
      </header>

      {/* Stepper Progress */}
      <div className="border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]/50">
        <div className="container py-5">
          <OnboardingStepper />
        </div>
      </div>

      {/* Wizard Content */}
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="mx-auto max-w-2xl">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgb(var(--border))] py-4">
        <div className="container text-center">
          <p className="text-xs text-[rgb(var(--muted-foreground))]">
            © {new Date().getFullYear()} ShefaFx. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
