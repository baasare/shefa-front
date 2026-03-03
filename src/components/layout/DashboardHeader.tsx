/**
 * Dashboard Header Component
 * Sticky top bar for all authenticated dashboard pages.
 * Uses BrandLogo + ThemeToggle shared components + Lucide icons.
 */

'use client';

import Link from 'next/link';
import {
  Bell,
  HelpCircle,
  Settings,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { routes } from '@/lib/config/routes';
import { useUIStore } from '@/lib/store/uiStore';
import { cn } from '@/lib/utils/cn';

export function DashboardHeader() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <header className="fixed top-0 z-[var(--z-sticky,100)] w-full border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[rgb(var(--background))]/80">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="hidden md:inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors"
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
            ) : (
              <PanelLeftOpen className="h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
            )}
          </button>

          {/* Brand Logo */}
          <BrandLogo href={routes.dashboard.home} size="md" />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          {/* Notifications */}
          <Link
            href={routes.dashboard.notifications}
            aria-label="Notifications"
            className="relative inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors"
          >
            <Bell className="h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
            {/* Unread indicator */}
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[rgb(var(--destructive))]" />
          </Link>

          {/* Help */}
          <Link
            href={routes.dashboard.help.index}
            aria-label="Help"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors"
          >
            <HelpCircle className="h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
          </Link>

          {/* Settings */}
          <Link
            href={routes.dashboard.settings.index}
            aria-label="Settings"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors"
          >
            <Settings className="h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
          </Link>

          {/* Divider */}
          <div className="h-6 w-px bg-[rgb(var(--border))] mx-1" />

          {/* User Menu */}
          <Link
            href={routes.dashboard.settings.profile}
            className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-purple-600 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
              U
            </div>
            <span className="hidden sm:block text-sm font-medium text-[rgb(var(--foreground))]">
              Account
            </span>
            <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
