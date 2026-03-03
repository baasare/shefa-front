/**
 * Dashboard Sidebar Component
 * Main navigation for authenticated users.
 * Uses navigation config (single source), Lucide icons, uiStore for collapse state.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BookOpen, LifeBuoy } from 'lucide-react';
import { dashboardNav } from '@/lib/config/navigation';
import { routes } from '@/lib/config/routes';
import { useUIStore } from '@/lib/store/uiStore';
import { cn } from '@/lib/utils/cn';

// Resolve a Lucide icon by string name
function getIcon(name: string | undefined): LucideIcon {
  if (!name) return LucideIcons.Circle;
  return (LucideIcons as Record<string, LucideIcon>)[name] ?? LucideIcons.Circle;
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen } = useUIStore();

  if (!sidebarOpen) return null;

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-[rgb(var(--border))] bg-[rgb(var(--background))] flex flex-col overflow-hidden z-40">
      <div className="flex h-full flex-col overflow-y-auto">
        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 p-3" aria-label="Dashboard Navigation">
          {dashboardNav.map((item) => {
            const Icon = getIcon(item.icon);
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + '/');

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-[var(--transition-fast)]',
                    isActive
                      ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20'
                      : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 flex-shrink-0',
                      isActive
                        ? 'text-[rgb(var(--primary))]'
                        : 'text-[rgb(var(--muted-foreground))]'
                    )}
                    strokeWidth={1.5}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-[rgb(var(--primary))]/20 border border-[rgb(var(--primary))]/30 px-1.5 py-0.5 text-[10px] font-bold text-[rgb(var(--primary))] uppercase tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </Link>

                {/* Sub-navigation */}
                {item.children && isActive && (
                  <div className="ml-4 mt-0.5 border-l border-[rgb(var(--border))] pl-3 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block rounded-md px-3 py-1.5 text-sm transition-all duration-[var(--transition-fast)]',
                          pathname === child.href
                            ? 'font-medium text-[rgb(var(--foreground))] bg-[rgb(var(--muted))]'
                            : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom help card */}
        <div className="p-3 pb-6">
          <div className="rounded-xl bg-[rgb(var(--muted))] border border-[rgb(var(--border))] p-4">
            <div className="flex items-center gap-2 mb-2">
              <LifeBuoy className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
              <h4 className="text-sm font-semibold text-[rgb(var(--foreground))]">Need Help?</h4>
            </div>
            <p className="text-xs text-[rgb(var(--muted-foreground))] mb-3">
              Check our guides and tutorials
            </p>
            <Link
              href={routes.dashboard.education.index}
              className="flex items-center gap-1.5 text-xs font-medium text-[rgb(var(--primary))] hover:underline"
            >
              <BookOpen className="h-3 w-3" strokeWidth={1.5} />
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
