'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { agentApi } from '@/lib/api/agents';

const statusConfig = {
    pending: { icon: Clock, badge: 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))] border-[rgb(var(--warning))]/20', dot: 'bg-[rgb(var(--warning))]' },
    approved: { icon: CheckCircle2, badge: 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))] border-[rgb(var(--success))]/20', dot: 'bg-[rgb(var(--success))]' },
    rejected: { icon: XCircle, badge: 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))] border-[rgb(var(--destructive))]/20', dot: 'bg-[rgb(var(--destructive))]' },
    executed: { icon: CheckCircle2, badge: 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/20', dot: 'bg-[rgb(var(--primary))]' },
};

export default function DecisionsClient() {
    const [decisions, setDecisions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    function showToast(message: string, type: 'success' | 'error') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function loadDecisions() {
        try {
            const data = await agentApi.getPendingDecisions();
            setDecisions(data);
        } catch (error) {
            console.error('Failed to load decisions:', error);
            showToast('Failed to load decisions', 'error');
        } finally {
            setLoading(false);
        }
    }

    // Initial load
    useEffect(() => {
        loadDecisions();
    }, []);

    // Real-time polling every 10 seconds
    useEffect(() => {
        const interval = setInterval(loadDecisions, 10000);
        return () => clearInterval(interval);
    }, []);

    const pending = decisions.filter((d) => !d.approved_at && !d.rejected_at);
    const past = decisions.filter((d) => d.approved_at || d.rejected_at);

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-lg flex items-center gap-3 transition-all ${
                    toast.type === 'success'
                        ? 'bg-[rgb(var(--card))] border-[rgb(var(--success))]/30 text-[rgb(var(--success))]'
                        : 'bg-[rgb(var(--card))] border-[rgb(var(--destructive))]/30 text-[rgb(var(--destructive))]'
                }`}>
                    <div className="text-sm font-medium">{toast.message}</div>
                </div>
            )}

            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Agent Decisions</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Review trade decisions made by your AI agents</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: 'Awaiting Approval', value: String(pending.length), color: 'text-[rgb(var(--warning))]' },
                    { label: 'Total Decisions', value: String(decisions.length), color: 'text-[rgb(var(--primary))]' },
                    { label: 'Approved', value: String(past.filter(d => d.approved_at).length), color: 'text-[rgb(var(--success))]' },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Pending decisions */}
            {pending.length > 0 ? (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-[rgb(var(--warning))]" strokeWidth={1.5} />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Pending Approval ({pending.length})</h2>
                    </div>
                    <div className="space-y-3">
                        {pending.map((d) => {
                            const cfg = statusConfig.pending;
                            const StatusIcon = cfg.icon;
                            const confidence = d.confidence ? parseFloat(d.confidence) : 0;

                            return (
                                <div key={d.id} className="rounded-xl border border-[rgb(var(--warning))]/30 bg-[rgb(var(--warning))]/5 p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cfg.badge}`}>
                                                    <StatusIcon className="h-3 w-3" strokeWidth={2} />
                                                    Pending
                                                </span>
                                                <span className={`font-mono font-bold text-sm ${
                                                    d.decision === 'buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'
                                                }`}>
                                                    {d.decision?.toUpperCase()} {d.symbol}
                                                </span>
                                            </div>
                                            <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed mt-2">
                                                {d.rationale || 'No reasoning provided'}
                                            </p>
                                            <div className="flex gap-4 mt-3 text-xs">
                                                <span className="text-[rgb(var(--muted-foreground))]">
                                                    Confidence: <span className="font-semibold text-[rgb(var(--foreground))]">{confidence}%</span>
                                                </span>
                                                <span className="text-[rgb(var(--muted-foreground))]">
                                                    Created: <span className="font-semibold text-[rgb(var(--foreground))]">
                                                        {new Date(d.created_at).toLocaleString()}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 flex-shrink-0">
                                            <button className="rounded-full bg-[rgb(var(--success))] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-all">
                                                Approve
                                            </button>
                                            <button className="rounded-full border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-1.5 text-xs font-medium text-[rgb(var(--destructive))] hover:opacity-80 transition-all">
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 p-12 text-center">
                    <Clock className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4 opacity-50" />
                    <h3 className="text-base font-semibold text-[rgb(var(--foreground))] mb-2">No Pending Decisions</h3>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        All agent decisions have been reviewed
                    </p>
                </div>
            )}

            {/* Past decisions */}
            {past.length > 0 && (
                <div>
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-3">History</h2>
                    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] divide-y divide-[rgb(var(--border))]">
                        {past.map((d) => {
                            const status = d.approved_at ? 'approved' : 'rejected';
                            const cfg = statusConfig[status];
                            const StatusIcon = cfg.icon;

                            return (
                                <div key={d.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[rgb(var(--muted))]/20 transition-colors">
                                    <span className={`flex h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                                    <span className={`font-mono font-bold text-xs w-16 ${
                                        d.decision === 'buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'
                                    }`}>
                                        {d.decision?.toUpperCase()}
                                    </span>
                                    <span className="font-mono font-semibold text-sm text-[rgb(var(--foreground))] w-16">
                                        {d.symbol}
                                    </span>
                                    <span className="flex-1 text-xs text-[rgb(var(--muted-foreground))] truncate">
                                        {d.rationale ? d.rationale.substring(0, 80) + '...' : 'No reasoning provided'}
                                    </span>
                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${cfg.badge}`}>
                                        <StatusIcon className="h-2.5 w-2.5" strokeWidth={2} />
                                        {status}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
