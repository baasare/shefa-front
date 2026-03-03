/**
 * Marketing Site Header Component
 * Public-facing header with navigation and CTAs
 */

'use client';

import Link from 'next/link';
import { marketingNav } from '@/lib/config/navigation';
import { routes } from '@/lib/config/routes';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={routes.home} className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
          <span className="text-xl font-bold">ShefaFx</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            href={routes.auth.login}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors px-4 py-2"
          >
            Login
          </Link>
          <Link
            href={routes.auth.register}
            className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-blue-800 text-white font-medium px-4 py-2 text-sm transition-all shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
