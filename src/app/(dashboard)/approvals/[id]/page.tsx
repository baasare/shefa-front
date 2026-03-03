'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { mockDecisions } from '@/lib/data/agents';
import { ArrowLeft, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface Props { params: { id: string } }

export default function ApprovalDetailPage({ params }: Props) {
    const decision = mockDecisions.find((d) => d.id === params.id);
    if (!decision) notFound();

    const router = useRouter();
    const [action, setAction] = useState<'approve' | 'reject' | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleAction(type: 'approve' | 'reject') {
        setAction(type);
        setLoading(true);
        await new Promise((res) => setTimeout(res, 1000));
        router.push('/approvals');
    }

    const isPending = decision.status === 'Pending';

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <Link href="/approvals" className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors">
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Approvals
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Approval Request</h1>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${decision.status === 'Pending' ? 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))] border-[rgb(var(--warning))]/20'
                            : decision.status === 'Approved' ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))] border-[rgb(var(--success))]/20'
                                : 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))] border-[rgb(var(--destructive))]/20'
                        }`}>
                        {decision.status === 'Pending' ? <Clock className="h-3 w-3" strokeWidth={2} /> : decision.status === 'Approved' ? <CheckCircle2 className="h-3 w-3" strokeWidth={2} /> : <XCircle className="h-3 w-3" strokeWidth={2} />}
                        {decision.status}
                    </span>
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1 font-mono">
                    {decision.id}
                </p>
            </div>

            {/* Decision summary */}
            <div className={`rounded-xl border p-6 ${isPending ? 'border-[rgb(var(--warning))]/30 bg-[rgb(var(--warning))]/5' : 'border-[rgb(var(--border))] bg-[rgb(var(--card))]'}`}>
                <div className="flex items-center gap-3 mb-4">
                    {isPending && <AlertTriangle className="h-5 w-5 text-[rgb(var(--warning))] flex-shrink-0" strokeWidth={1.5} />}
                    <div>
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-0.5">Proposed Action</p>
                        <p className="text-xl font-bold font-mono">
                            <span className={decision.action === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}>{decision.action}</span>
                            {' '}
                            <span className="text-[rgb(var(--foreground))]">{decision.symbol}</span>
                        </p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        { label: 'Requesting Agent', value: decision.agentName },
                        { label: 'Confidence', value: `${decision.confidence}%` },
                        { label: 'Risk Score', value: `${decision.riskScore}/10`, colored: true, high: decision.riskScore > 7 },
                        { label: 'Submitted', value: new Date(decision.createdAt).toLocaleString() },
                    ].map((item) => (
                        <div key={item.label} className="rounded-lg bg-[rgb(var(--card))] border border-[rgb(var(--border))] px-4 py-3">
                            <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{item.label}</p>
                            <p className={`font-semibold ${item.colored ? (item.high ? 'text-[rgb(var(--destructive))]' : 'text-[rgb(var(--success))]') : 'text-[rgb(var(--foreground))]'}`}>
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reasoning */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                <h2 className="text-sm font-semibold text-[rgb(var(--foreground))] uppercase tracking-wider mb-3">Agent Reasoning</h2>
                <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">{decision.reasoning}</p>
            </div>

            {/* Approve/Reject actions */}
            {isPending && (
                <div className="flex gap-3">
                    <button
                        onClick={() => handleAction('approve')}
                        disabled={loading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[rgb(var(--success))] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-60"
                    >
                        {action === 'approve' && loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <CheckCircle2 className="h-4 w-4" strokeWidth={2} />}
                        {action === 'approve' && loading ? 'Approving...' : 'Approve Trade'}
                    </button>
                    <button
                        onClick={() => handleAction('reject')}
                        disabled={loading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[rgb(var(--destructive))]/40 bg-[rgb(var(--destructive))]/10 px-6 py-3 text-sm font-semibold text-[rgb(var(--destructive))] hover:opacity-80 transition-all disabled:opacity-60"
                    >
                        {action === 'reject' && loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-[rgb(var(--destructive))] border-t-transparent" /> : <XCircle className="h-4 w-4" strokeWidth={2} />}
                        {action === 'reject' && loading ? 'Rejecting...' : 'Reject Trade'}
                    </button>
                </div>
            )}
        </div>
    );
}
