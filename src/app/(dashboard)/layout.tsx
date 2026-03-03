/**
 * Dashboard Layout
 * Layout for authenticated dashboard pages with sidebar and header
 */

import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 pl-64">
          <div className="container py-6">
            <Breadcrumbs />
            <div className="mt-4">{children}</div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
