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
  User,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { routes } from '@/lib/config/routes';
import { useUIStore } from '@/lib/store/uiStore';
import { useAuthStore } from '@/lib/store/authStore';
import { cn } from '@/lib/utils/cn';

export function DashboardHeader() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to login on main domain
      const hostname = window.location.hostname;
      if (hostname.startsWith('app.')) {
        window.location.href = `https://shefafx.com${routes.auth.login}`;
      } else {
        router.push(routes.auth.login);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userInitial = user?.first_name
    ? user.first_name.charAt(0).toUpperCase()
    : user?.email
      ? user.email.charAt(0).toUpperCase()
      : 'U';

  const userName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`.trim()
    : user?.email?.split('@')[0] || 'Account';

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

          {/* User Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-1.5 border border-[rgb(var(--border))] transition-colors",
                isMenuOpen ? "bg-[rgb(var(--muted))]" : "hover:bg-[rgb(var(--muted))]"
              )}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-purple-600 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-1 ring-white/20">
                {userInitial}
              </div>
              <span className="hidden sm:block text-sm font-medium text-[rgb(var(--foreground))]">
                {userName}
              </span>
              <ChevronDown
                className={cn(
                  "hidden sm:block h-3.5 w-3.5 text-[rgb(var(--muted-foreground))] transition-transform duration-200",
                  isMenuOpen && "rotate-180"
                )}
                strokeWidth={1.5}
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] p-1.5 shadow-xl animate-in fade-in zoom-in duration-200 z-[var(--z-fixed,200)]">
                <div className="px-3 py-2 border-b border-[rgb(var(--border))] mb-1.5">
                  <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">
                    Logged in as
                  </p>
                  <p className="text-sm font-semibold text-[rgb(var(--foreground))] truncate">
                    {user?.email}
                  </p>
                </div>

                <div className="space-y-0.5">
                  <Link
                    href={routes.dashboard.settings.profile}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors group"
                  >
                    <User className="h-4 w-4 text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--primary))]" strokeWidth={1.5} />
                    <span>View Profile</span>
                    <ExternalLink className="ml-auto h-3 w-3 opacity-0 group-hover:opacity-100 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                  </Link>

                  <Link
                    href={routes.dashboard.settings.index}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
                  >
                    <Settings className="h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                    <span>Account Settings</span>
                  </Link>
                </div>

                <div className="mt-1.5 pt-1.5 border-t border-[rgb(var(--border))]">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/10 transition-colors group"
                  >
                    <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.5} />
                    <span className="font-medium">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
