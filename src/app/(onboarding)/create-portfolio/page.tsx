'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Briefcase, Info } from 'lucide-react';
import { routes } from '@/lib/config/routes';
import { cn } from '@/lib/utils/cn';

const allocationPresets = [
    { label: '20%', pct: 20 },
    { label: '50%', pct: 50 },
    { label: '75%', pct: 75 },
    { label: '100%', pct: 100 },
];

export default function CreatePortfolioPage() {
    const router = useRouter();
    const [portfolioName, setPortfolioName] = useState('My Portfolio');
    const [currency, setCurrency] = useState('USD');
    const [startingCapital, setStartingCapital] = useState('10000');
    const [allocationPct, setAllocationPct] = useState(50);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const allocatedAmount = (parseFloat(startingCapital || '0') * allocationPct) / 100;

    const handleNext = async () => {
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 600));
        router.push(routes.onboarding.createStrategy);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--primary))]/10">
                    <Briefcase className="h-7 w-7 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl font-bold text-[rgb(var(--foreground))]">
                    Create your portfolio
                </h1>
                <p className="text-[rgb(var(--muted-foreground))]">
                    Define how much capital you&apos;d like to allocate to AI-managed trading.
                </p>
            </div>

            {/* Form */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                {/* Portfolio name */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[rgb(var(--foreground))]">
                        Portfolio Name <span className="text-[rgb(var(--destructive))]">*</span>
                    </label>
                    <input
                        type="text"
                        value={portfolioName}
                        onChange={(e) => setPortfolioName(e.target.value)}
                        placeholder="e.g. Growth Portfolio"
                        className="w-full rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-4 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:border-[rgb(var(--primary))]/60 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 transition-all"
                    />
                </div>

                {/* Currency */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[rgb(var(--foreground))]">
                        Base Currency
                    </label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-4 py-2.5 text-sm text-[rgb(var(--foreground))] focus:border-[rgb(var(--primary))]/60 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 transition-all"
                    >
                        <option value="USD">USD — US Dollar</option>
                        <option value="EUR">EUR — Euro</option>
                        <option value="GBP">GBP — British Pound</option>
                        <option value="BTC">BTC — Bitcoin</option>
                        <option value="USDT">USDT — Tether</option>
                    </select>
                </div>

                {/* Starting capital */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[rgb(var(--foreground))]">
                        Starting Capital <span className="text-[rgb(var(--destructive))]">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[rgb(var(--muted-foreground))]">
                            {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : ''}
                        </span>
                        <input
                            type="number"
                            value={startingCapital}
                            onChange={(e) => setStartingCapital(e.target.value)}
                            min="100"
                            placeholder="10000"
                            className="w-full rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--background))] pl-8 pr-4 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:border-[rgb(var(--primary))]/60 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 transition-all"
                        />
                    </div>
                </div>

                {/* Allocation slider */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-[rgb(var(--foreground))]">
                            AI Trading Allocation
                        </label>
                        <span className="text-sm font-bold text-[rgb(var(--primary))]">{allocationPct}%</span>
                    </div>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        step="5"
                        value={allocationPct}
                        onChange={(e) => setAllocationPct(parseInt(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none bg-[rgb(var(--border))] accent-[rgb(var(--primary))] cursor-pointer"
                    />
                    <div className="flex gap-2">
                        {allocationPresets.map((p) => (
                            <button
                                key={p.pct}
                                onClick={() => setAllocationPct(p.pct)}
                                className={cn(
                                    'flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-all',
                                    allocationPct === p.pct
                                        ? 'bg-[rgb(var(--primary))] text-white'
                                        : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                                )}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="rounded-lg bg-[rgb(var(--muted))] border border-[rgb(var(--border))] p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 text-[rgb(var(--primary))] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        <span className="text-[rgb(var(--foreground))] font-medium">
                            {isNaN(allocatedAmount) ? '$0' : `${currency === 'USD' ? '$' : currency === 'EUR' ? '€' : ''}${allocatedAmount.toLocaleString()}`}
                        </span>{' '}
                        will be allocated to AI trading. The remaining{' '}
                        <span className="text-[rgb(var(--foreground))] font-medium">
                            {100 - allocationPct}%
                        </span>{' '}
                        stays as reserved capital.
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={() => router.push(routes.onboarding.connectBroker)}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                    Back
                </button>

                <button
                    onClick={handleNext}
                    disabled={!portfolioName || !startingCapital || isSubmitting}
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
