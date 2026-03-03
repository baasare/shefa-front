/**
 * OnboardingStepper Component
 * Step indicator for the multi-step onboarding wizard.
 * Uses onboardingSteps from navigation config.
 * Completely separate from auth layout and dashboard sidebar.
 */

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { onboardingSteps } from '@/lib/config/navigation';
import { cn } from '@/lib/utils/cn';

export function OnboardingStepper() {
    const pathname = usePathname();
    const currentIdx = onboardingSteps.findIndex(
        (step) => step.href === pathname || pathname?.startsWith(step.href + '/')
    );
    const activeIdx = currentIdx === -1 ? 0 : currentIdx;

    return (
        <nav aria-label="Onboarding Progress" className="w-full">
            {/* Desktop: horizontal stepper */}
            <ol className="hidden sm:flex items-center w-full">
                {onboardingSteps.map((step, idx) => {
                    const isDone = idx < activeIdx;
                    const isActive = idx === activeIdx;
                    const isUpcoming = idx > activeIdx;

                    return (
                        <li key={step.href} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                {isDone ? (
                                    <Link
                                        href={step.href}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(var(--success))] transition-transform hover:scale-105"
                                        aria-label={`Step ${idx + 1}: ${step.label} (completed)`}
                                    >
                                        <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
                                    </Link>
                                ) : (
                                    <div
                                        className={cn(
                                            'flex h-8 w-8 items-center justify-center rounded-full font-semibold text-sm transition-all',
                                            isActive
                                                ? 'bg-[rgb(var(--primary))] text-white shadow-[var(--shadow-glow)]'
                                                : 'border-2 border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] bg-[rgb(var(--background))]'
                                        )}
                                        aria-current={isActive ? 'step' : undefined}
                                    >
                                        {idx + 1}
                                    </div>
                                )}
                                <span
                                    className={cn(
                                        'mt-2 text-xs font-medium whitespace-nowrap',
                                        isActive
                                            ? 'text-[rgb(var(--foreground))]'
                                            : isDone
                                                ? 'text-[rgb(var(--success))]'
                                                : 'text-[rgb(var(--muted-foreground))]'
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector line */}
                            {idx < onboardingSteps.length - 1 && (
                                <div
                                    className={cn(
                                        'flex-1 h-0.5 mx-3 mb-5 transition-colors',
                                        idx < activeIdx
                                            ? 'bg-[rgb(var(--success))]'
                                            : 'bg-[rgb(var(--border))]'
                                    )}
                                />
                            )}
                        </li>
                    );
                })}
            </ol>

            {/* Mobile: compact step indicator */}
            <div className="sm:hidden flex items-center justify-between">
                <p className="text-sm font-medium text-[rgb(var(--foreground))]">
                    Step {activeIdx + 1} of {onboardingSteps.length}:{' '}
                    <span className="text-[rgb(var(--primary))]">{onboardingSteps[activeIdx]?.label}</span>
                </p>
                <div className="flex gap-1.5">
                    {onboardingSteps.map((_, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                'h-1.5 rounded-full transition-all',
                                idx < activeIdx
                                    ? 'w-4 bg-[rgb(var(--success))]'
                                    : idx === activeIdx
                                        ? 'w-6 bg-[rgb(var(--primary))]'
                                        : 'w-4 bg-[rgb(var(--border))]'
                            )}
                        />
                    ))}
                </div>
            </div>
        </nav>
    );
}
