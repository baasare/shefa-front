'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { getStrategyTemplates, StrategyTemplate } from '@/lib/api/strategies';

const difficultyColor: Record<string, string> = {
    beginner: 'text-[rgb(var(--success))] bg-[rgb(var(--success))]/10',
    Beginner: 'text-[rgb(var(--success))] bg-[rgb(var(--success))]/10',
    intermediate: 'text-[rgb(var(--warning))] bg-[rgb(var(--warning))]/10',
    Intermediate: 'text-[rgb(var(--warning))] bg-[rgb(var(--warning))]/10',
    advanced: 'text-[rgb(var(--destructive))] bg-[rgb(var(--destructive))]/10',
    Advanced: 'text-[rgb(var(--destructive))] bg-[rgb(var(--destructive))]/10',
};

const riskColor: Record<string, string> = {
    Low: 'text-[rgb(var(--success))]',
    Medium: 'text-[rgb(var(--warning))]',
    High: 'text-[rgb(var(--destructive))]',
};

export default function StrategyTemplatesPage() {
    const [templates, setTemplates] = useState<StrategyTemplate[]>([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTemplates();
    }, [filter]);

    async function fetchTemplates() {
        setLoading(true);
        try {
            const params: Record<string, string> = {};
            if (filter !== 'All') {
                params.difficulty = filter; // Backend filter expects difficulty
            }
            const res = await getStrategyTemplates(params);
            setTemplates(res.results || []);
        } catch (err) {
            console.error('Failed to fetch templates:', err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Strategy Templates</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                        Pick a template and customize it to your needs
                    </p>
                </div>
                <Link
                    href="/strategies/create"
                    className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                >
                    Build from Scratch
                </Link>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${filter === t
                            ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/20'
                            : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:text-[rgb(var(--foreground))]'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Template grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <div className="col-span-full py-8 text-center text-[rgb(var(--muted-foreground))]">Loading templates...</div>
                ) : templates.length > 0 ? (
                    templates.map((tpl: StrategyTemplate) => (
                        <div key={tpl.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 flex flex-col hover:border-[rgb(var(--primary))]/40 transition-all group">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-[rgb(var(--foreground))]">{tpl.name}</h3>
                                        {tpl.popular && (
                                            <span className="flex items-center gap-0.5 rounded-full bg-[rgb(var(--warning))]/10 px-1.5 py-0.5 text-[10px] font-bold text-[rgb(var(--warning))] uppercase">
                                                <Star className="h-2.5 w-2.5" fill="currentColor" />
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 uppercase tracking-wide ${difficultyColor[tpl.difficulty]}`}>
                                        {tpl.difficulty}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed mb-4 flex-1">{tpl.description}</p>
                            <div className="flex items-center justify-between text-xs mb-4">
                                <div>
                                    <span className="text-[rgb(var(--muted-foreground))]">Est. Return: </span>
                                    <span className="font-semibold text-[rgb(var(--success))]">{tpl.estimatedReturn}</span>
                                </div>
                                <div>
                                    <span className="text-[rgb(var(--muted-foreground))]">Risk: </span>
                                    <span className={`font-semibold ${tpl.riskLevel ? riskColor[tpl.riskLevel] : ''}`}>{tpl.riskLevel || 'N/A'}</span>
                                </div>
                            </div>
                            <Link
                                href="/strategies/create"
                                className="flex items-center justify-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-4 py-2 text-xs font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--primary))] hover:text-white hover:border-[rgb(var(--primary))] transition-all"
                            >
                                Use Template
                                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-[rgb(var(--muted-foreground))]">
                        No templates found for this category.
                    </div>
                )}
            </div>
        </div>
    );
}
