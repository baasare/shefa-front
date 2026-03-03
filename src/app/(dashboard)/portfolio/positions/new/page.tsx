'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';

const assetClasses = ['Stock', 'Crypto', 'ETF', 'Forex'];
const strategies = ['Momentum Trend', 'Mean Reversion', 'ML Sentiment', 'None'];

export default function NewPositionPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        symbol: '',
        assetClass: 'Stock',
        qty: '',
        avgCost: '',
        strategy: 'None',
        notes: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise((res) => setTimeout(res, 1000));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => router.push('/portfolio/positions'), 1200);
    }

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <Link
                    href="/portfolio/positions"
                    className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Positions
                </Link>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">New Position</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                    Add a new asset to your portfolio
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                    {/* Symbol */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">
                            Symbol / Ticker <span className="text-[rgb(var(--destructive))]">*</span>
                        </label>
                        <input
                            name="symbol"
                            value={form.symbol}
                            onChange={handleChange}
                            required
                            placeholder="e.g. AAPL"
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] font-mono uppercase"
                        />
                    </div>

                    {/* Asset Class */}
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">
                            Asset Class <span className="text-[rgb(var(--destructive))]">*</span>
                        </label>
                        <select
                            name="assetClass"
                            value={form.assetClass}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        >
                            {assetClasses.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    {/* Strategy */}
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">
                            Strategy
                        </label>
                        <select
                            name="strategy"
                            value={form.strategy}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        >
                            {strategies.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">
                            Quantity <span className="text-[rgb(var(--destructive))]">*</span>
                        </label>
                        <input
                            name="qty"
                            type="number"
                            min="0"
                            step="any"
                            value={form.qty}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 10"
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        />
                    </div>

                    {/* Avg Cost */}
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">
                            Average Cost (USD) <span className="text-[rgb(var(--destructive))]">*</span>
                        </label>
                        <input
                            name="avgCost"
                            type="number"
                            min="0"
                            step="any"
                            value={form.avgCost}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 150.00"
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        />
                    </div>

                    {/* Notes */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Optional notes about this position..."
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={loading || success}
                        className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-60"
                    >
                        {success ? (
                            <>
                                <Check className="h-4 w-4" strokeWidth={2} />
                                Saved!
                            </>
                        ) : loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Saving...
                            </>
                        ) : (
                            'Add Position'
                        )}
                    </button>
                    <Link
                        href="/portfolio/positions"
                        className="rounded-full border border-[rgb(var(--border))] px-6 py-2.5 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
