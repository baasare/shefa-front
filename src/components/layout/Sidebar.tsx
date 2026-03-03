/**
 * Dashboard Sidebar Component
 * Main navigation for authenticated users
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { dashboardNav } from '@/lib/config/navigation';
import { routes } from '@/lib/config/routes';
import { cn } from '@/lib/utils/cn';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background">
      <div className="flex h-full flex-col gap-4 p-4">
        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {dashboardNav.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>

                {/* Children (submenu) */}
                {item.children && isActive && (
                  <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block rounded-lg px-3 py-1.5 text-sm transition-colors',
                          pathname === child.href
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
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

        {/* Bottom CTA */}
        <div className="rounded-lg bg-muted p-4">
          <h4 className="mb-2 text-sm font-semibold">Need Help?</h4>
          <p className="mb-3 text-xs text-muted-foreground">
            Check our guides and tutorials
          </p>
          <Link
            href={routes.dashboard.education.index}
            className="text-xs font-medium text-primary hover:underline"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </aside>
  );
}
