'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';

const steps = ['Basic Info', 'Parameters', 'Risk Settings', 'Review'];
const types = ['Trend Following', 'Statistical Arbitrage', 'Breakout', 'NLP / Sentiment', 'Machine Learning', 'Pairs Trading'];
const assetOptions = ['Stocks', 'Crypto', 'ETFs', 'Forex', 'Commodities'];
const riskLevels = ['Low', 'Medium', 'High'];

export default function CreateStrategyPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        name: '',
        description: '',
        type: 'Trend Following',
        assets: ['Stocks'],
        riskLevel: 'Medium',
        maxDrawdown: '',
        targetReturn: '',
        notes: '',
    });

    function toggleAsset(asset: string) {
        setForm((prev) => ({
            ...prev,
            assets: prev.assets.includes(asset)
                ? prev.assets.filter((a) => a !== asset)
                : [...prev.assets, asset],
        }));
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit() {
        setLoading(true);
        await new Promise((res) => setTimeout(res, 1200));
        setSuccess(true);
        setTimeout(() => router.push('/strategies'), 1200);
    }

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Back */}
            <div>
                <Link
                    href="/strategies"
                    className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Strategies
                </Link>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">New Strategy</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Configure a new AI trading strategy</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center gap-0">
                {steps.map((s, i) => (
                    <div key={s} className="flex items-center flex-1 last:flex-none">
                        <button
                            onClick={() => i < step && setStep(i)}
                            className={`flex items-center gap-2 text-xs font-medium transition-colors ${i === step
                                    ? 'text-[rgb(var(--primary))]'
                                    : i < step
                                        ? 'text-[rgb(var(--success))] cursor-pointer'
                                        : 'text-[rgb(var(--muted-foreground))] cursor-default'
                                }`}
                        >
                            <span
                                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold border ${i === step
                                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                                        : i < step
                                            ? 'border-[rgb(var(--success))] bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]'
                                            : 'border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))]'
                                    }`}
                            >
                                {i < step ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                            </span>
                            <span className="hidden sm:inline">{s}</span>
                        </button>
                        {i < steps.length - 1 && (
                            <div className={`flex-1 h-px mx-3 ${i < step ? 'bg-[rgb(var(--success))]' : 'bg-[rgb(var(--border))]'}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step content */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                {step === 0 && (
                    <div className="space-y-5">
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Basic Information</h2>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Strategy Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Momentum Breakout" className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Description</label>
                            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Describe how this strategy works..." className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Strategy Type *</label>
                            <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
                                {types.map((t) => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Asset Classes *</label>
                            <div className="flex flex-wrap gap-2">
                                {assetOptions.map((a) => (
                                    <button
                                        key={a}
                                        type="button"
                                        onClick={() => toggleAsset(a)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${form.assets.includes(a)
                                                ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30'
                                                : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30'
                                            }`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-5">
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Parameters</h2>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">These parameters will be used by the AI agents to run the strategy. Defaults are pre-filled based on selected type.</p>
                        {[
                            { label: 'Lookback Period (days)', placeholder: '20', name: 'lookback' },
                            { label: 'Entry Signal Threshold (%)', placeholder: '2.5', name: 'entryThreshold' },
                            { label: 'Exit Signal Threshold (%)', placeholder: '1.5', name: 'exitThreshold' },
                            { label: 'Rebalance Frequency', placeholder: 'Daily', name: 'rebalance' },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">{field.label}</label>
                                <input name={field.name} placeholder={field.placeholder} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                            </div>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5">
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Risk Settings</h2>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Risk Level</label>
                            <div className="grid grid-cols-3 gap-3">
                                {riskLevels.map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setForm((p) => ({ ...p, riskLevel: r }))}
                                        className={`rounded-xl border p-3 text-sm font-medium text-center transition-all ${form.riskLevel === r
                                                ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                                                : 'border-[rgb(var(--border))] text-[rgb(var(--foreground))] hover:border-[rgb(var(--foreground))]/30'
                                            }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Max Drawdown (%)</label>
                            <input name="maxDrawdown" value={form.maxDrawdown} onChange={handleChange} placeholder="e.g. 15" type="number" className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">Strategy auto-pauses if drawdown exceeds this limit.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Target Annual Return (%)</label>
                            <input name="targetReturn" value={form.targetReturn} onChange={handleChange} placeholder="e.g. 20" type="number" className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Review & Create</h2>
                        <dl className="space-y-3">
                            {[
                                { label: 'Strategy Name', value: form.name || '—' },
                                { label: 'Type', value: form.type },
                                { label: 'Assets', value: form.assets.join(', ') || '—' },
                                { label: 'Risk Level', value: form.riskLevel },
                                { label: 'Max Drawdown', value: form.maxDrawdown ? `${form.maxDrawdown}%` : '—' },
                                { label: 'Target Return', value: form.targetReturn ? `${form.targetReturn}%` : '—' },
                            ].map((item) => (
                                <div key={item.label} className="flex justify-between py-2 border-b border-[rgb(var(--border))]">
                                    <dt className="text-sm text-[rgb(var(--muted-foreground))]">{item.label}</dt>
                                    <dd className="text-sm font-medium text-[rgb(var(--foreground))]">{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6">
                    <button
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={step === 0}
                        className="rounded-full border border-[rgb(var(--border))] px-5 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all disabled:opacity-40"
                    >
                        Back
                    </button>
                    {step < steps.length - 1 ? (
                        <button
                            onClick={() => setStep((s) => s + 1)}
                            disabled={step === 0 && !form.name}
                            className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-40"
                        >
                            Continue
                            <ChevronRight className="h-4 w-4" strokeWidth={2} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading || success}
                            className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-60"
                        >
                            {success ? <><Check className="h-4 w-4" strokeWidth={2} /> Created!</> : loading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Creating...</> : 'Create Strategy'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
