/**
 * BrandLogo Component
 * Single source of truth for the ShefaFx logo mark + wordmark.
 * Used in: marketing Header, auth top bar, dashboard Header, Sidebar, onboarding.
 */

'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface BrandLogoProps {
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    showWordmark?: boolean;
    className?: string;
}

const sizeConfig = {
    sm: { icon: 'h-6 w-6', text: 'text-base' },
    md: { icon: 'h-8 w-8', text: 'text-xl' },
    lg: { icon: 'h-10 w-10', text: 'text-2xl' },
};

export function BrandLogo({
    size = 'md',
    href = '/',
    showWordmark = true,
    className,
}: BrandLogoProps) {
    const { icon, text } = sizeConfig[size];

    const content = (
        <span className={cn('flex items-center gap-2.5 group', className)}>
            {/* Logo Mark — Gradient Shield + Lightning bolt */}
            <span
                className={cn(
                    icon,
                    'rounded-lg flex items-center justify-center flex-shrink-0',
                    'bg-gradient-to-br from-[rgb(var(--primary))] to-blue-700',
                    'shadow-[0_0_12px_rgba(var(--primary),0.4)]',
                    'transition-shadow duration-200 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.6)]'
                )}
            >
                <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[65%] h-[65%]"
                    aria-hidden="true"
                >
                    {/* Shield shape */}
                    <path
                        d="M10 1.5L3 4.5V9.5C3 13.5 6 17 10 18.5C14 17 17 13.5 17 9.5V4.5L10 1.5Z"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="0.75"
                    />
                    {/* Lightning bolt */}
                    <path
                        d="M11 4L7 10.5H10.5L9 16L13 9.5H9.5L11 4Z"
                        fill="white"
                    />
                </svg>
            </span>

            {/* Wordmark */}
            {showWordmark && (
                <span
                    className={cn(
                        text,
                        'font-bold tracking-tight',
                        'text-[rgb(var(--foreground))]',
                        'transition-opacity duration-200 group-hover:opacity-90'
                    )}
                >
                    Shefa<span className="text-[rgb(var(--primary))]">Fx</span>
                </span>
            )}
        </span>
    );

    if (href) {
        return (
            <Link href={href} aria-label="ShefaFx Home">
                {content}
            </Link>
        );
    }

    return content;
}
