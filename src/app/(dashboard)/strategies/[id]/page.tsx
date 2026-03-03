import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStrategyById } from '@/lib/data/strategies';
import { ArrowLeft, Pencil, Play, Pause, BarChart3 } from 'lucide-react';

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const s = getStrategyById(params.id);
    return { title: s ? `${s.name} — ShefaFx` : 'Strategy — ShefaFx' };
}

export default function StrategyDetailPage({ params }: Props) {
    const s = getStrategyById(params.id);
    if (!s) notFound();

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <Link href="/strategies" className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                        Back to Strategies
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">{s.name}</h1>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.status === 'Running' ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]' : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]'
                            }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${s.status === 'Running' ? 'bg-[rgb(var(--success))] animate-pulse' : 'bg-[rgb(var(--muted-foreground))]'}`} />
                            {s.status}
                        </span>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">{s.type}</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] transition-all">
                        {s.status === 'Running' ? <Pause className="h-4 w-4" strokeWidth={1.5} /> : <Play className="h-4 w-4" strokeWidth={1.5} />}
                    </button>
                    <Link
                        href={`/strategies/${params.id}/edit`}
                        className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                    >
                        <Pencil className="h-4 w-4" strokeWidth={1.5} />
                        Edit
                    </Link>
                </div>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">{s.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                    {s.assets.map((a) => <span key={a} className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">{a}</span>)}
                </div>
            </div>

            {/* Performance metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'P&L', value: `${s.pnl >= 0 ? '+' : ''}$${Math.abs(s.pnl).toFixed(2)}`, colored: true, positive: s.pnl >= 0 },
                    { label: 'Return', value: `${s.pnlPct >= 0 ? '+' : ''}${s.pnlPct}%`, colored: true, positive: s.pnlPct >= 0 },
                    { label: 'Win Rate', value: `${s.winRate}%`, colored: false },
                    { label: 'Total Trades', value: String(s.trades), colored: false },
                ].map((card) => (
                    <div key={card.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">{card.label}</p>
                        <p className={`text-2xl font-bold font-mono ${card.colored ? (card.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]') : 'text-[rgb(var(--foreground))]'}`}>
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Risk info */}
            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: 'Risk Level', value: s.riskLevel, icon: BarChart3 },
                    { label: 'Max Drawdown', value: s.maxDrawdown },
                    { label: 'Target Return', value: s.targetReturn },
                ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="text-lg font-semibold text-[rgb(var(--foreground))]">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Dates */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                <dl className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <dt className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Created</dt>
                        <dd className="mt-1 text-sm font-medium text-[rgb(var(--foreground))]">{s.createdAt}</dd>
                    </div>
                    <div>
                        <dt className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Last Updated</dt>
                        <dd className="mt-1 text-sm font-medium text-[rgb(var(--foreground))]">{s.updatedAt}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
