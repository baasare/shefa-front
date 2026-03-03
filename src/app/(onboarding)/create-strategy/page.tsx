'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Target, TrendingUp, BarChart2, Activity } from 'lucide-react';
import { routes } from '@/lib/config/routes';
import { cn } from '@/lib/utils/cn';

const strategies = [
    {
        id: 'momentum',
        icon: TrendingUp,
        name: 'Momentum Trend',
        description: 'Follows strong price trends across equities and crypto. Enters on breakouts, exits on reversals.',
        winRate: '68%',
        backtest: '+34% / yr',
        assets: ['Stocks', 'ETFs', 'Crypto'],
        risk: 'Moderate',
        riskColor: 'primary',
        popular: true,
    },
    {
        id: 'meanreversion',
        icon: Activity,
        name: 'Mean Reversion',
        description: 'Capitalizes on temporary price dislocations. Buys oversold, sells overbought conditions.',
        winRate: '72%',
        backtest: '+22% / yr',
        assets: ['Stocks', 'Forex'],
        risk: 'Low-Moderate',
        riskColor: 'success',
    },
    {
        id: 'ml-sentiment',
        icon: BarChart2,
        name: 'ML Sentiment',
        description: 'Uses NLP to analyze news and social media sentiment to time entries and exits.',
        winRate: '61%',
        backtest: '+41% / yr',
        assets: ['Stocks', 'Crypto'],
        risk: 'High',
        riskColor: 'warning',
        new: true,
    },
    {
        id: 'scalping',
        icon: Target,
        name: 'AI Scalping',
        description: 'High-frequency strategy targeting small gains across many trades per session.',
        winRate: '79%',
        backtest: '+55% / yr',
        assets: ['Crypto', 'Forex'],
        risk: 'Very High',
        riskColor: 'destructive',
    },
];

const riskColorMap: Record<string, { text: string; bg: string; border: string }> = {
    primary: { text: 'text-[rgb(var(--primary))]', bg: 'bg-[rgb(var(--primary))]/10', border: 'border-[rgb(var(--primary))]/20' },
    success: { text: 'text-[rgb(var(--success))]', bg: 'bg-[rgb(var(--success))]/10', border: 'border-[rgb(var(--success))]/20' },
    warning: { text: 'text-[rgb(var(--warning))]', bg: 'bg-[rgb(var(--warning))]/10', border: 'border-[rgb(var(--warning))]/20' },
    destructive: { text: 'text-[rgb(var(--destructive))]', bg: 'bg-[rgb(var(--destructive))]/10', border: 'border-[rgb(var(--destructive))]/20' },
};

export default function CreateStrategyPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = async () => {
        if (!selected) return;
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 600));
        router.push(routes.onboarding.complete);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--primary))]/10">
                    <Target className="h-7 w-7 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl font-bold text-[rgb(var(--foreground))]">
                    Choose your first strategy
                </h1>
                <p className="text-[rgb(var(--muted-foreground))]">
                    Select one to activate. You can run multiple strategies simultaneously from the dashboard.
                </p>
            </div>

            {/* Strategy grid */}
            <div className="space-y-3">
                {strategies.map((strategy) => {
                    const isSelected = selected === strategy.id;
                    const colors = riskColorMap[strategy.riskColor] ?? riskColorMap.primary;
                    const Icon = strategy.icon;

                    return (
                        <button
                            key={strategy.id}
                            onClick={() => setSelected(strategy.id)}
                            className={cn(
                                'relative w-full rounded-xl border-2 bg-[rgb(var(--card))] p-5 text-left transition-all duration-200',
                                isSelected
                                    ? 'border-[rgb(var(--primary))]/50 ring-2 ring-[rgb(var(--primary))]/20 shadow-md'
                                    : 'border-[rgb(var(--border))] hover:border-[rgb(var(--border))]/80'
                            )}
                        >
                            {strategy.popular && (
                                <span className="absolute top-4 right-4 rounded-full bg-[rgb(var(--primary))]/20 border border-[rgb(var(--primary))]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--primary))]">
                                    Popular
                                </span>
                            )}
                            {strategy.new && (
                                <span className="absolute top-4 right-4 rounded-full bg-[rgb(var(--success))]/20 border border-[rgb(var(--success))]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--success))]">
                                    New
                                </span>
                            )}

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/10 mt-0.5">
                                    <Icon className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 min-w-0 pr-16">
                                    <p className="font-semibold text-[rgb(var(--foreground))] mb-1">{strategy.name}</p>
                                    <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed mb-3">
                                        {strategy.description}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 text-xs">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[rgb(var(--muted-foreground))]">Win Rate:</span>
                                            <span className="font-semibold text-[rgb(var(--success))]">{strategy.winRate}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[rgb(var(--muted-foreground))]">Backtest:</span>
                                            <span className="font-semibold text-[rgb(var(--foreground))]">{strategy.backtest}</span>
                                        </div>
                                        <span className={cn('rounded-md px-2 py-0.5 font-medium border', colors.bg, colors.text, colors.border)}>
                                            {strategy.risk} Risk
                                        </span>
                                        <div className="flex gap-1">
                                            {strategy.assets.map((a) => (
                                                <span key={a} className="rounded-md bg-[rgb(var(--muted))] px-1.5 py-0.5 text-[rgb(var(--muted-foreground))]">
                                                    {a}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={() => router.push(routes.onboarding.createPortfolio)}
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
                            Activate Strategy
                            <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
