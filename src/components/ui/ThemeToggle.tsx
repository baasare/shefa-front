/**
 * ThemeToggle Component
 * Switches between light and dark modes.
 * Appears in EVERY top navigation bar (marketing, auth, onboarding, dashboard).
 */

'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface ThemeToggleProps {
    className?: string;
    size?: 'sm' | 'md';
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div
                className={cn(
                    'rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))]',
                    size === 'sm' ? 'h-8 w-8' : 'h-9 w-9'
                )}
            />
        );
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const icon =
        theme === 'dark' ? (
            <Sun
                className={cn('text-[rgb(var(--muted-foreground))]', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')}
                strokeWidth={1.5}
            />
        ) : (
            <Moon
                className={cn('text-[rgb(var(--muted-foreground))]', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')}
                strokeWidth={1.5}
            />
        );

    return (
        <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={cn(
                'inline-flex items-center justify-center rounded-lg',
                'border border-[rgb(var(--border))]',
                'bg-transparent hover:bg-[rgb(var(--muted))]',
                'transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--background))]',
                size === 'sm' ? 'h-8 w-8' : 'h-9 w-9',
                className
            )}
        >
            {icon}
        </button>
    );
}
