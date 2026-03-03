import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPositionById, formatCurrency } from '@/lib/data/positions';
import { ArrowLeft, TrendingUp, TrendingDown, Pencil } from 'lucide-react';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const pos = getPositionById(params.id);
    return {
        title: pos ? `${pos.symbol} Position — ShefaFx` : 'Position — ShefaFx',
    };
}

export default function PositionDetailPage({ params }: Props) {
    const pos = getPositionById(params.id);
    if (!pos) notFound();

    const isPositive = pos.pnl >= 0;

    return (
        <div className="space-y-6">
            {/* Back + header */}
            <div className="flex items-start justify-between">
                <div>
                    <Link
                        href="/portfolio/positions"
                        className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                        Back to Positions
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] font-mono">{pos.symbol}</h1>
                        <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">
                            {pos.assetClass}
                        </span>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">{pos.name}</p>
                </div>
                <Link
                    href={`/portfolio/positions/${pos.id}/edit`}
                    className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                >
                    <Pencil className="h-4 w-4" strokeWidth={1.5} />
                    Edit Position
                </Link>
            </div>

            {/* Key metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Current Value', value: formatCurrency(pos.value), mono: true },
                    { label: 'Avg Cost', value: formatCurrency(pos.avgCost), mono: true },
                    { label: 'Current Price', value: formatCurrency(pos.currentPrice), mono: true },
                    {
                        label: 'P&L',
                        value: `${isPositive ? '+' : ''}${formatCurrency(pos.pnl)} (${isPositive ? '+' : ''}${pos.pnlPct.toFixed(1)}%)`,
                        mono: true,
                        colored: true,
                        positive: isPositive,
                    },
                ].map((card) => (
                    <div key={card.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">
                            {card.label}
                        </p>
                        <p
                            className={`text-xl font-bold ${card.mono ? 'font-mono' : ''} ${card.colored
                                    ? card.positive
                                        ? 'text-[rgb(var(--success))]'
                                        : 'text-[rgb(var(--destructive))]'
                                    : 'text-[rgb(var(--foreground))]'
                                }`}
                        >
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Details card */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">Position Details</h2>
                <dl className="grid gap-y-3 sm:grid-cols-2 gap-x-8">
                    {[
                        { label: 'Quantity', value: String(pos.qty) },
                        { label: 'Strategy', value: pos.strategy },
                        { label: 'Opened', value: pos.openedAt },
                        { label: 'Last Updated', value: pos.lastUpdated },
                        { label: 'Risk Level', value: 'Medium' },
                        { label: 'Asset Class', value: pos.assetClass },
                    ].map((item) => (
                        <div key={item.label} className="flex flex-col">
                            <dt className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider">{item.label}</dt>
                            <dd className="mt-1 text-sm font-medium text-[rgb(var(--foreground))]">{item.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            {/* P&L indicator */}
            <div
                className={`rounded-xl border p-5 flex items-center gap-4 ${isPositive
                        ? 'border-[rgb(var(--success))]/30 bg-[rgb(var(--success))]/5'
                        : 'border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/5'
                    }`}
            >
                {isPositive ? (
                    <TrendingUp className="h-6 w-6 text-[rgb(var(--success))] flex-shrink-0" strokeWidth={1.5} />
                ) : (
                    <TrendingDown className="h-6 w-6 text-[rgb(var(--destructive))] flex-shrink-0" strokeWidth={1.5} />
                )}
                <div>
                    <p className={`font-semibold ${isPositive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                        {isPositive ? 'Profitable Position' : 'Position in Loss'}
                    </p>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">
                        {isPositive
                            ? `Gaining ${formatCurrency(pos.pnl)} (+${pos.pnlPct.toFixed(1)}%) since opening`
                            : `Down ${formatCurrency(Math.abs(pos.pnl))} (${pos.pnlPct.toFixed(1)}%) since opening`}
                    </p>
                </div>
            </div>
        </div>
    );
}
