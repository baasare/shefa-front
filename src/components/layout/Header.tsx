/**
 * Marketing Site Header
 * Sticky top navigation for all public marketing pages.
 * Uses BrandLogo (single source), ThemeToggle, and navigation config.
 */

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { marketingNav } from '@/lib/config/navigation';
import { routes } from '@/lib/config/routes';
import { tokenStorage } from '@/lib/api/authClient';
import { getNavigationUrl } from '@/lib/utils/navigation';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = tokenStorage.getAccess();
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header className="sticky top-0 z-[var(--z-sticky,100)] w-full border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[rgb(var(--background))]/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <BrandLogo href={routes.home} size="md" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Marketing Navigation">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-[rgb(var(--muted-foreground))] rounded-md hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all duration-[var(--transition-fast)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated ? (
            <a
              href={getNavigationUrl(routes.dashboard.home)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-semibold text-[rgb(var(--primary-foreground))] shadow-[var(--shadow-sm)] hover:opacity-90 hover:shadow-[var(--shadow)] transition-all duration-[var(--transition-fast)]"
            >
              Go to Dashboard
            </a>
          ) : (
            <>
              <a
                href={getNavigationUrl(routes.auth.login)}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] rounded-lg transition-all duration-[var(--transition-fast)]"
              >
                Log In
              </a>

              <a
                href={getNavigationUrl(routes.auth.register)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-semibold text-[rgb(var(--primary-foreground))] shadow-[var(--shadow-sm)] hover:opacity-90 hover:shadow-[var(--shadow)] transition-all duration-[var(--transition-fast)]"
              >
                Get Started
              </a>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className="h-4 w-4 text-[rgb(var(--foreground))]" strokeWidth={1.5} />
            ) : (
              <Menu className="h-4 w-4 text-[rgb(var(--foreground))]" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[rgb(var(--border))] bg-[rgb(var(--background))]">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile Navigation">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-[rgb(var(--muted-foreground))] rounded-lg hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-[rgb(var(--border))] mt-2 pt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <a
                  href={getNavigationUrl(routes.dashboard.home)}
                  className="px-3 py-2.5 text-sm font-semibold text-center rounded-lg bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 transition-opacity"
                >
                  Go to Dashboard
                </a>
              ) : (
                <>
                  <a
                    href={getNavigationUrl(routes.auth.login)}
                    className="px-3 py-2.5 text-sm font-medium text-center text-[rgb(var(--muted-foreground))] rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] transition-colors"
                  >
                    Log In
                  </a>
                  <a
                    href={getNavigationUrl(routes.auth.register)}
                    className="px-3 py-2.5 text-sm font-semibold text-center rounded-lg bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:opacity-90 transition-opacity"
                  >
                    Get Started
                  </a>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
