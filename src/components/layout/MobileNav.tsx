/**
 * Mobile Navigation Component
 * Bottom navigation for mobile devices
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mobileBottomNav } from '@/lib/config/navigation';
import { cn } from '@/lib/utils/cn';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="flex items-center justify-around">
        {mobileBottomNav.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {/* Icon placeholder */}
              <div
                className={cn(
                  'h-6 w-6 rounded',
                  isActive ? 'bg-primary/20' : 'bg-muted-foreground/20'
                )}
              />
              <span className="font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute right-2 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {item.badge === 'HITL' ? '!' : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
