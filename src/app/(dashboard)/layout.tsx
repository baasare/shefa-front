/**
 * Dashboard Layout
 * Layout for authenticated dashboard pages with responsive sidebar.
 * Sidebar state managed by uiStore.
 */

'use client';

import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { useUIStore } from '@/lib/store/uiStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
