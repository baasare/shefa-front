/**
 * Auth Group Layout
 * Wraps all auth pages with AuthLayout (minimal top bar: logo + theme toggle).
 * Redirects authenticated users to dashboard.
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/features/auth/AuthLayout';
import { useAuthStore } from '@/lib/store/authStore';
import { routes } from '@/lib/config/routes';

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (!isLoading && isAuthenticated) {
      router.replace(routes.dashboard.home);
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--primary))] border-t-transparent" />
      </div>
    );
  }

  // Don't render auth pages if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return <AuthLayout>{children}</AuthLayout>;
}
