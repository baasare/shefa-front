import { Metadata } from 'next';
import { mockDecisions } from '@/lib/data/agents';
import { CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Agent Decisions — ShefaFx',
    description: 'Review and approve AI agent trade decisions.',
};

const statusConfig = {
    Pending: { icon: Clock, badge: 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))] border-[rgb(var(--warning))]/20', dot: 'bg-[rgb(var(--warning))]' },
    Approved: { icon: CheckCircle2, badge: 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))] border-[rgb(var(--success))]/20', dot: 'bg-[rgb(var(--success))]' },
    Rejected: { icon: XCircle, badge: 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))] border-[rgb(var(--destructive))]/20', dot: 'bg-[rgb(var(--destructive))]' },
    Executed: { icon: CheckCircle2, badge: 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/20', dot: 'bg-[rgb(var(--primary))]' },
};

export default function AgentDecisionsPage() {
    const pending = mockDecisions.filter((d) => d.status === 'Pending');
    const past = mockDecisions.filter((d) => d.status !== 'Pending');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Agent Decisions</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Review trade decisions made by your AI agents</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: 'Awaiting Approval', value: String(pending.length), color: 'text-[rgb(var(--warning))]' },
                    { label: 'Approved Today', value: '3', color: 'text-[rgb(var(--success))]' },
                    { label: 'Auto-Executed', value: '28', color: 'text-[rgb(var(--primary))]' },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Pending decisions */}
            {pending.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-[rgb(var(--warning))]" strokeWidth={1.5} />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Pending Approval ({pending.length})</h2>
                    </div>
                    <div className="space-y-3">
                        {pending.map((d) => {
                            const cfg = statusConfig[d.status];
                            const StatusIcon = cfg.icon;
                            return (
                                <div key={d.id} className="rounded-xl border border-[rgb(var(--warning))]/30 bg-[rgb(var(--warning))]/5 p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cfg.badge}`}>
                                                    <StatusIcon className="h-3 w-3" strokeWidth={2} />
                                                    {d.status}
                                                </span>
                                                <span className={`font-mono font-bold text-sm ${d.action === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                    {d.action} {d.symbol}
                                                </span>
                                            </div>
                                            <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed mt-2">{d.reasoning}</p>
                                            <div className="flex gap-4 mt-3 text-xs">
                                                <span className="text-[rgb(var(--muted-foreground))]">Confidence: <span className="font-semibold text-[rgb(var(--foreground))]">{d.confidence}%</span></span>
                                                <span className="text-[rgb(var(--muted-foreground))]">Risk: <span className={`font-semibold ${d.riskScore > 7 ? 'text-[rgb(var(--destructive))]' : d.riskScore > 5 ? 'text-[rgb(var(--warning))]' : 'text-[rgb(var(--success))]'}`}>{d.riskScore}/10</span></span>
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
            )}

            {/* Past decisions */}
            <div>
                <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-3">History</h2>
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] divide-y divide-[rgb(var(--border))]">
                    {past.map((d) => {
                        const cfg = statusConfig[d.status];
                        const StatusIcon = cfg.icon;
                        return (
                            <div key={d.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[rgb(var(--muted))]/20 transition-colors">
                                <span className={`flex h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                                <span className={`font-mono font-bold text-xs w-16 ${d.action === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>{d.action}</span>
                                <span className="font-mono font-semibold text-sm text-[rgb(var(--foreground))] w-16">{d.symbol}</span>
                                <span className="flex-1 text-xs text-[rgb(var(--muted-foreground))] truncate">{d.reasoning.substring(0, 80)}...</span>
                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${cfg.badge}`}>
                                    <StatusIcon className="h-2.5 w-2.5" strokeWidth={2} />
                                    {d.status}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
