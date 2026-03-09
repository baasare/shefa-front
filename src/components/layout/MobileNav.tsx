/**
 * Mobile Navigation Bar
 * Bottom tab bar for mobile dashboard navigation.
 * Uses navigation config (mobileBottomNav) and Lucide icons.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { mobileBottomNav } from '@/lib/config/navigation';
import { cn } from '@/lib/utils/cn';

function getIcon(name: string | undefined): LucideIcon {
  if (!name) return LucideIcons.Circle;
  const candidate = LucideIcons[name as keyof typeof LucideIcons];
  if (typeof candidate === 'function') {
    return candidate as LucideIcon;
  }
  return LucideIcons.Circle;
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-[rgb(var(--border))] bg-[rgb(var(--background))]/95 backdrop-blur pb-safe"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around px-2 py-2">
        {mobileBottomNav.map((item) => {
          const Icon = getIcon(item.icon);
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                isActive
                  ? 'text-[rgb(var(--primary))]'
                  : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
              )}
              aria-label={item.label}
            >
              <Icon
                className={cn(
                  'h-5 w-5',
                  isActive
                    ? 'text-[rgb(var(--primary))]'
                    : 'text-[rgb(var(--muted-foreground))]'
                )}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span>{item.label}</span>
              {item.badge && (
                <span className="absolute -top-0.5 right-1 h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
