'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { routes } from '@/lib/config/routes';
import { useAuthStore } from '@/lib/store/authStore';

const completedSteps = [
    { label: 'Risk profile configured', delay: 0 },
    { label: 'Broker connected', delay: 200 },
    { label: 'Portfolio created', delay: 400 },
    { label: 'Strategy activated', delay: 600 },
];

export default function CompletePage() {
    const router = useRouter();
    const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
    const [visibleCount, setVisibleCount] = useState(0);
    const [isCompleting, setIsCompleting] = useState(false);

    useEffect(() => {
        completedSteps.forEach((_, i) => {
            setTimeout(() => setVisibleCount(i + 1), completedSteps[i].delay + 300);
        });
    }, []);

    const handleGoToDashboard = async () => {
        setIsCompleting(true);
        try {
            await completeOnboarding();
            router.push(routes.dashboard.home);
        } catch (error) {
            console.error('Failed to complete onboarding:', error);
            setIsCompleting(false);
        }
    };

    return (
        <div className="flex flex-col items-center text-center space-y-8 py-4">
            {/* Success icon */}
            <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-[rgb(var(--success))]/20" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[rgb(var(--success))]/10 border-2 border-[rgb(var(--success))]/30">
                    <CheckCircle2
                        className="h-10 w-10 text-[rgb(var(--success))]"
                        strokeWidth={1.5}
                    />
                </div>
            </div>

            {/* Heading */}
            <div className="space-y-3">
                <h1 className="text-4xl font-bold text-[rgb(var(--foreground))]">
                    You&apos;re all set!
                </h1>
                <p className="text-[rgb(var(--muted-foreground))] text-lg max-w-sm mx-auto">
                    Your ShefaFx account is configured and ready to trade.
                </p>
            </div>

            {/* Summary card */}
            <div className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                <h3 className="text-sm font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-4 text-left">
                    Setup Summary
                </h3>
                <ul className="space-y-3">
                    {completedSteps.map((step, i) => (
                        <li
                            key={step.label}
                            className={`flex items-center gap-3 transition-all duration-500 ${i < visibleCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}
                        >
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(var(--success))]/10">
                                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--success))]" strokeWidth={2} />
                            </div>
                            <span className="text-sm text-[rgb(var(--foreground))]">{step.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA */}
            <div className="w-full max-w-xs space-y-3">
                <button
                    onClick={handleGoToDashboard}
                    disabled={isCompleting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[rgb(var(--primary))] px-8 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isCompleting ? 'Loading...' : 'Go to Dashboard'}
                    <ExternalLink className="h-4 w-4" strokeWidth={2} />
                </button>
                <p className="text-xs text-[rgb(var(--muted-foreground))]">
                    You can always update your settings from the dashboard
                </p>
            </div>

            {/* Decorative dots */}
            <div className="flex gap-2 opacity-30">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]"
                        style={{ animationDelay: `${i * 150}ms` }}
                    />
                ))}
            </div>
        </div>
    );
}
