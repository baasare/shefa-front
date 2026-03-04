/**
 * Dashboard Layout
 * Layout for authenticated dashboard pages with responsive sidebar.
 * Sidebar state managed by uiStore.
 * Protected by authentication - redirects to login if not authenticated.
 */

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { useUIStore } from '@/lib/store/uiStore';
import { useAuthStore } from '@/lib/store/authStore';
import { routes } from '@/lib/config/routes';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Redirect to login if not authenticated after loading completes
    if (!isLoading && !isAuthenticated) {
      const loginUrl = `${routes.auth.login}?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--background))]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[rgb(var(--primary))] border-t-transparent" />
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--background))]">
      <DashboardHeader />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <DashboardMain>{children}</DashboardMain>
      </div>
      <MobileNav />
    </div>
  );
}

function DashboardMain({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore();
  return (
    <main
      className="flex-1 transition-all duration-200"
      style={{ paddingLeft: sidebarOpen ? '16rem' : '0' }}
    >
      <div className="container py-6 md:py-8">
        <Breadcrumbs />
        <div className="mt-4">{children}</div>
      </div>
    </main>
  );
}
