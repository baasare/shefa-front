/**
 * AuthLayout Component
 * Minimal layout shell used by all auth pages.
 * Top bar: BrandLogo (left) + ThemeToggle (right)
 * Content: centered gradient-bg area
 */

'use client';

import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col bg-[rgb(var(--background))]">
            {/* Ambient gradient background */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--primary))]/5 via-transparent to-purple-900/10" />
            </div>

            {/* Top bar */}
            <header className="relative z-10 flex h-16 items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/80 backdrop-blur px-4 sm:px-6">
                <BrandLogo href="/" size="md" />
                <ThemeToggle />
            </header>

            {/* Content */}
            <main className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 py-12">
                {children}
            </main>

            {/* Footer note */}
            <footer className="relative z-10 py-4 text-center">
                <p className="text-xs text-[rgb(var(--muted-foreground))]">
                    © {new Date().getFullYear()} ShefaFx. All rights reserved.{' '}
                    <a href="/legal/privacy" className="hover:text-[rgb(var(--foreground))] underline underline-offset-2 transition-colors">
                        Privacy Policy
                    </a>
                </p>
            </footer>
        </div>
    );
}
