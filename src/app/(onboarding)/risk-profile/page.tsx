'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, TrendingUp, Shield, Rocket, BarChart2 } from 'lucide-react';
import { routes } from '@/lib/config/routes';
import { cn } from '@/lib/utils/cn';

const profiles = [
    {
        id: 'conservative',
        icon: Shield,
        label: 'Conservative',
        tagline: 'Safety first',
        description:
            'Preserves capital with low-risk strategies. Suitable for beginners or those near retirement.',
        expectedReturn: '5–12% / yr',
        maxDrawdown: '< 10%',
        color: 'success',
    },
    {
        id: 'moderate',
        icon: BarChart2,
        label: 'Moderate',
        tagline: 'Balanced growth',
        description:
            'Balanced exposure with moderate risk. Good for long-term wealth building.',
        expectedReturn: '12–25% / yr',
        maxDrawdown: '< 20%',
        color: 'primary',
        recommended: true,
    },
    {
        id: 'aggressive',
        icon: TrendingUp,
        label: 'Aggressive',
        tagline: 'High growth',
        description:
            'Higher-risk strategies targeting maximum returns. Not suitable for all investors.',
        expectedReturn: '25–60% / yr',
        maxDrawdown: '< 40%',
        color: 'warning',
    },
    {
        id: 'ultra',
        icon: Rocket,
        label: 'Ultra High Risk',
        tagline: 'Maximum potential',
        description:
            'Highly speculative strategies. Significant capital loss is possible. Expert use only.',
        expectedReturn: '60%+ / yr',
        maxDrawdown: '> 40%',
        color: 'destructive',
    },
];

const colorMap: Record<string, { border: string; bg: string; text: string; ring: string }> = {
    success: {
        border: 'border-[rgb(var(--success))]/40',
        bg: 'bg-[rgb(var(--success))]/10',
        text: 'text-[rgb(var(--success))]',
        ring: 'ring-[rgb(var(--success))]/40',
    },
    primary: {
        border: 'border-[rgb(var(--primary))]/40',
        bg: 'bg-[rgb(var(--primary))]/10',
        text: 'text-[rgb(var(--primary))]',
        ring: 'ring-[rgb(var(--primary))]/40',
    },
    warning: {
        border: 'border-[rgb(var(--warning))]/40',
        bg: 'bg-[rgb(var(--warning))]/10',
        text: 'text-[rgb(var(--warning))]',
        ring: 'ring-[rgb(var(--warning))]/40',
    },
    destructive: {
        border: 'border-[rgb(var(--destructive))]/40',
        bg: 'bg-[rgb(var(--destructive))]/10',
        text: 'text-[rgb(var(--destructive))]',
        ring: 'ring-[rgb(var(--destructive))]/40',
    },
};

export default function RiskProfilePage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>('moderate');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = async () => {
        if (!selected) return;
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 500));
        router.push(routes.onboarding.connectBroker);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-[rgb(var(--foreground))]">
                    Choose your risk profile
                </h1>
                <p className="text-[rgb(var(--muted-foreground))]">
                    This determines how our AI agents approach opportunities on your behalf.
                    You can change this anytime.
                </p>
            </div>

            {/* Profile grid */}
            <div className="grid gap-3 sm:grid-cols-2">
                {profiles.map((profile) => {
                    const Icon = profile.icon;
                    const isSelected = selected === profile.id;
                    const colors = colorMap[profile.color];

                    return (
                        <button
                            key={profile.id}
                            onClick={() => setSelected(profile.id)}
                            className={cn(
                                'relative rounded-xl border-2 bg-[rgb(var(--card))] p-5 text-left transition-all duration-200',
                                isSelected
                                    ? `${colors.border} ring-2 ${colors.ring} -translate-y-0.5 shadow-lg`
                                    : 'border-[rgb(var(--border))] hover:border-[rgb(var(--border))]/80 hover:-translate-y-0.5'
                            )}
                        >
                            {profile.recommended && (
                                <span className="absolute -top-3 left-4 rounded-full bg-[rgb(var(--primary))] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                    Recommended
                                </span>
                            )}

                            <div className="flex items-start gap-3 mb-3">
                                <div className={cn('flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg', colors.bg)}>
                                    <Icon className={cn('h-5 w-5', colors.text)} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="font-semibold text-[rgb(var(--foreground))]">{profile.label}</p>
                                    <p className="text-xs text-[rgb(var(--muted-foreground))]">{profile.tagline}</p>
                                </div>
                            </div>

                            <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4 leading-relaxed">
                                {profile.description}
                            </p>

                            <div className="flex gap-4 text-xs">
                                <div>
                                    <p className="text-[rgb(var(--muted-foreground))]">Expected Return</p>
                                    <p className={cn('font-semibold mt-0.5', colors.text)}>{profile.expectedReturn}</p>
                                </div>
                                <div>
                                    <p className="text-[rgb(var(--muted-foreground))]">Max Drawdown</p>
                                    <p className="font-semibold mt-0.5 text-[rgb(var(--foreground))]">{profile.maxDrawdown}</p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={() => router.push(routes.onboarding.welcome)}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                    Back
                </button>

                <button
                    onClick={handleNext}
                    disabled={!selected || isSubmitting}
                    className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                        <>
                            Continue
                            <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
