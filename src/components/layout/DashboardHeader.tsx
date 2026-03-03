/**
 * Dashboard Header Component
 * Header for authenticated users with notifications and user menu
 */

'use client';

import Link from 'next/link';
import { dashboardHeaderNav } from '@/lib/config/navigation';
import { routes } from '@/lib/config/routes';

export function DashboardHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href={routes.dashboard.home} className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
          <span className="text-xl font-bold">ShefaFx</span>
        </Link>

        {/* Right side - Quick actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Link
            href={routes.dashboard.notifications}
            className="relative rounded-lg p-2 hover:bg-muted"
          >
            <span className="sr-only">Notifications</span>
            {/* Bell icon placeholder */}
            <div className="h-5 w-5 rounded bg-muted-foreground/20" />
            {/* Notification badge */}
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </Link>

          {/* Help */}
          <Link
            href={routes.dashboard.help.index}
            className="rounded-lg p-2 hover:bg-muted"
          >
            <span className="sr-only">Help</span>
            <div className="h-5 w-5 rounded bg-muted-foreground/20" />
          </Link>

          {/* User Menu */}
          <Link
            href={routes.dashboard.settings.profile}
            className="flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
            <span className="text-sm font-medium">User</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
