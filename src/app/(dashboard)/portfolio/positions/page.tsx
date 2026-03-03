import { Metadata } from 'next';
import Link from 'next/link';
import { mockPositions, formatCurrency } from '@/lib/data/positions';
import { Plus, TrendingUp, TrendingDown, Search } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Positions — ShefaFx',
    description: 'View and manage all your open positions.',
};

export default function PositionsPage() {
    const totalValue = mockPositions.reduce((s, p) => s + p.value, 0);
    const totalPnl = mockPositions.reduce((s, p) => s + p.pnl, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Positions</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                        All open positions across your portfolio
                    </p>
                </div>
                <Link
                    href="/portfolio/positions/new"
                    className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:opacity-90 transition-all"
                >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                    New Position
                </Link>
            </div>

            {/* Summary cards */}
            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: 'Total Value', value: formatCurrency(totalValue), colored: false },
                    {
                        label: 'Total P&L',
                        value: `${totalPnl >= 0 ? '+' : ''}${formatCurrency(totalPnl)}`,
                        colored: true,
                        positive: totalPnl >= 0,
                    },
                    { label: 'Open Positions', value: String(mockPositions.length), colored: false },
                ].map((card) => (
                    <div
                        key={card.label}
                        className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4"
                    >
                        <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">
                            {card.label}
                        </p>
                        <p
                            className={`text-2xl font-bold font-mono ${card.colored
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

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search positions..."
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Stocks', 'Crypto', 'ETF'].map((tab, i) => (
                        <button
                            key={tab}
                            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${i === 0
                                    ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20'
                                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] border border-[rgb(var(--border))]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Positions table */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                {['Asset', 'Class', 'Qty', 'Avg Cost', 'Current Price', 'Value', 'P&L', 'Strategy', ''].map((col) => (
                                    <th
                                        key={col}
                                        className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgb(var(--border))]">
                            {mockPositions.map((pos) => (
                                <tr key={pos.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <div>
                                            <p className="font-mono font-semibold text-[rgb(var(--foreground))]">{pos.symbol}</p>
                                            <p className="text-xs text-[rgb(var(--muted-foreground))]">{pos.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">
                                            {pos.assetClass}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">{pos.qty}</td>
                                    <td className="px-5 py-3.5 font-mono text-[rgb(var(--muted-foreground))]">
                                        {formatCurrency(pos.avgCost)}
                                    </td>
                                    <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">
                                        {formatCurrency(pos.currentPrice)}
                                    </td>
                                    <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">
                                        {formatCurrency(pos.value)}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-1">
                                            {pos.pnl >= 0 ? (
                                                <TrendingUp className="h-3 w-3 text-[rgb(var(--success))]" strokeWidth={2} />
                                            ) : (
                                                <TrendingDown className="h-3 w-3 text-[rgb(var(--destructive))]" strokeWidth={2} />
                                            )}
                                            <span
                                                className={`font-mono font-semibold text-xs ${pos.pnl >= 0 ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'
                                                    }`}
                                            >
                                                {pos.pnlPct >= 0 ? '+' : ''}{pos.pnlPct.toFixed(1)}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">{pos.strategy}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/portfolio/positions/${pos.id}`}
                                                className="text-xs text-[rgb(var(--primary))] hover:underline"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/portfolio/positions/${pos.id}/edit`}
                                                className="text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
