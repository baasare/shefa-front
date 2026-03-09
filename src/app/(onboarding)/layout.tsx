/**
 * Onboarding Layout
 * Wizard layout for the multi-step onboarding flow.
 * Uses BrandLogo + ThemeToggle in header.
 * Uses OnboardingStepper below header.
 * Completely separate from dashboard sidebar and auth card shell.
 * Protected by authentication - redirects to login if not authenticated.
 */

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { OnboardingStepper } from '@/components/features/onboarding/OnboardingStepper';
import { useAuthStore } from '@/lib/store/authStore';
import { routes } from '@/lib/config/routes';
import { getNavigationUrl } from '@/lib/utils/navigation';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    // Redirect to login if not authenticated after loading completes
    if (!isLoading && !isAuthenticated) {
      const loginPath = `${routes.auth.login}?redirect=${encodeURIComponent(pathname)}`;
      const loginUrl = getNavigationUrl(loginPath);
      if (loginUrl.startsWith('http')) {
        window.location.href = loginUrl;
      } else {
        router.push(loginPath);
      }
      return;
    }

    // Redirect to dashboard if user has already completed onboarding
    if (!isLoading && isAuthenticated && user && user.onboarding_completed) {
      router.push(routes.dashboard.home);
    }
  }, [isAuthenticated, isLoading, user, router, pathname]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--primary))] border-t-transparent" />
      </div>
    );
  }

  // Don't render onboarding if not authenticated
  if (!isAuthenticated) {
    return null;
  }

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
