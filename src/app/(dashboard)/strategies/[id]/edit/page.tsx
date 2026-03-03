'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getStrategyById } from '@/lib/data/strategies';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, Trash2 } from 'lucide-react';

const types = ['Trend Following', 'Statistical Arbitrage', 'Breakout', 'NLP / Sentiment', 'Machine Learning', 'Pairs Trading'];
const riskLevels = ['Low', 'Medium', 'High'];

interface Props { params: { id: string } }

export default function EditStrategyPage({ params }: Props) {
    const s = getStrategyById(params.id);
    if (!s) notFound();

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [form, setForm] = useState({
        name: s.name,
        description: s.description,
        type: s.type,
        riskLevel: s.riskLevel,
        maxDrawdown: s.maxDrawdown.replace('%', ''),
        targetReturn: s.targetReturn.replace('%', ''),
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        await new Promise((res) => setTimeout(res, 1000));
        setLoading(false);
        setSuccess(true);
        setTimeout(() => router.push(`/strategies/${params.id}`), 1200);
    }

    async function handleDelete() {
        setDeleting(true);
        await new Promise((res) => setTimeout(res, 800));
        router.push('/strategies');
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <Link href={`/strategies/${params.id}`} className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors">
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Strategy
                </Link>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Edit Strategy</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Update <span className="font-semibold">{s.name}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Strategy Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Type</label>
                        <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
                            {types.map((t) => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Risk Level</label>
                        <select name="riskLevel" value={form.riskLevel} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
                            {riskLevels.map((r) => <option key={r}>{r}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Max Drawdown (%)</label>
                        <input name="maxDrawdown" type="number" value={form.maxDrawdown} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Target Return (%)</label>
                        <input name="targetReturn" type="number" value={form.targetReturn} onChange={handleChange} className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-3">
                        <button type="submit" disabled={loading || success} className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all disabled:opacity-60">
                            {success ? <><Check className="h-4 w-4" strokeWidth={2} />Saved!</> : loading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Saving...</> : 'Save Changes'}
                        </button>
                        <Link href={`/strategies/${params.id}`} className="rounded-full border border-[rgb(var(--border))] px-6 py-2.5 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all">
                            Cancel
                        </Link>
                    </div>
                    <button type="button" onClick={() => setShowDelete(true)} className="flex items-center gap-1.5 text-sm text-[rgb(var(--destructive))] hover:opacity-80 transition-opacity">
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        Delete
                    </button>
                </div>
            </form>

            {showDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-xl w-full max-w-sm mx-4">
                        <h3 className="text-base font-semibold text-[rgb(var(--foreground))] mb-2">Delete Strategy?</h3>
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-5">This will permanently delete <span className="font-semibold">{s.name}</span> and stop all associated AI agent activity. This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={handleDelete} disabled={deleting} className="flex-1 rounded-full bg-[rgb(var(--destructive))] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
                                {deleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                            <button onClick={() => setShowDelete(false)} className="flex-1 rounded-full border border-[rgb(var(--border))] px-4 py-2.5 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
