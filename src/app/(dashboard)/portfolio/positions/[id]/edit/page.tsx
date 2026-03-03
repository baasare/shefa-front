'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getPositionById } from '@/lib/data/positions';
import { ArrowLeft, Check, Trash2 } from 'lucide-react';

const assetClasses = ['Stock', 'Crypto', 'ETF', 'Forex'];
const strategies = ['Momentum Trend', 'Mean Reversion', 'ML Sentiment', 'None'];

interface Props {
    params: { id: string };
}

export default function EditPositionPage({ params }: Props) {
    const pos = getPositionById(params.id);
    if (!pos) notFound();

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [form, setForm] = useState({
        symbol: pos.symbol,
        assetClass: pos.assetClass,
        qty: String(pos.qty),
        avgCost: String(pos.avgCost),
        strategy: pos.strategy,
        notes: '',
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        await new Promise((res) => setTimeout(res, 1000));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => router.push(`/portfolio/positions/${params.id}`), 1200);
    }

    async function handleDelete() {
        setDeleting(true);
        await new Promise((res) => setTimeout(res, 800));
        router.push('/portfolio/positions');
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <Link
                    href={`/portfolio/positions/${params.id}`}
                    className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Position
                </Link>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Edit Position</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                    Update details for <span className="font-mono font-semibold">{pos.symbol}</span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Symbol</label>
                        <input
                            name="symbol"
                            value={form.symbol}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] font-mono uppercase"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Asset Class</label>
                        <select
                            name="assetClass"
                            value={form.assetClass}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        >
                            {assetClasses.map((c) => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Strategy</label>
                        <select
                            name="strategy"
                            value={form.strategy}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        >
                            {strategies.map((s) => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Quantity</label>
                        <input
                            name="qty"
                            type="number"
                            step="any"
                            value={form.qty}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Average Cost (USD)</label>
                        <input
                            name="avgCost"
                            type="number"
                            step="any"
                            value={form.avgCost}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Notes</label>
                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Optional notes..."
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-60"
                        >
                            {success ? (
                                <><Check className="h-4 w-4" strokeWidth={2} /> Saved!</>
                            ) : loading ? (
                                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Saving...</>
                            ) : 'Save Changes'}
                        </button>
                        <Link
                            href={`/portfolio/positions/${params.id}`}
                            className="rounded-full border border-[rgb(var(--border))] px-6 py-2.5 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                        >
                            Cancel
                        </Link>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowDelete(true)}
                        className="flex items-center gap-1.5 text-sm text-[rgb(var(--destructive))] hover:opacity-80 transition-opacity"
                    >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        Delete
                    </button>
                </div>
            </form>

            {/* Delete confirm dialog */}
            {showDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-xl w-full max-w-sm mx-4">
                        <h3 className="text-base font-semibold text-[rgb(var(--foreground))] mb-2">Delete Position?</h3>
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-5">
                            This will permanently remove the <span className="font-mono font-semibold">{pos.symbol}</span> position from your portfolio. This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 rounded-full bg-[rgb(var(--destructive))] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-60"
                            >
                                {deleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                            <button
                                onClick={() => setShowDelete(false)}
                                className="flex-1 rounded-full border border-[rgb(var(--border))] px-4 py-2.5 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
