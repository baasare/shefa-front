'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPositions, deletePosition, Position } from '@/lib/api/portfolios';
import { Plus, TrendingUp, TrendingDown, Search, ArrowUpDown, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function formatCurrency(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(num);
}

export default function PositionsPage() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);
    const [assetClass, setAssetClass] = useState('All');
    const [ordering, setOrdering] = useState('-opened_at');
    const pageSize = 10;

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
            setPage(1); // Reset page on new search
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    const { data: response, isLoading, isError } = useQuery({
        queryKey: ['positions', { page, pageSize, search, filter: assetClass, ordering }],
        queryFn: () => getPositions({
            page,
            page_size: pageSize,
            search,
            asset_class: assetClass,
            ordering
        })
    });

    const positions = response?.results || [];
    const totalCount = response?.count || 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const totalValue = positions.reduce((s, p) => s + parseFloat(p.current_value || '0'), 0);
    const totalPnl = positions.reduce((s, p) => s + parseFloat(p.unrealized_pnl || '0'), 0);

    const deleteMutation = useMutation({
        mutationFn: deletePosition,
        onSuccess: () => {
            toast.success('Position deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
        onError: () => {
            toast.error('Failed to delete position');
        }
    });

    const handleSort = (field: string) => {
        if (ordering === field) {
            setOrdering(`-${field}`);
        } else {
            setOrdering(field);
        }
    };

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
                    { label: 'Page Total Value', value: formatCurrency(totalValue), colored: false },
                    {
                        label: 'Page Total P&L',
                        value: `${totalPnl >= 0 ? '+' : ''}${formatCurrency(totalPnl)}`,
                        colored: true,
                        positive: totalPnl >= 0,
                    },
                    { label: 'Total Positions', value: String(totalCount), colored: false },
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
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search positions..."
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Stocks', 'Crypto', 'ETF'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setAssetClass(tab); setPage(1); }}
                            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${assetClass === tab
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
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden flex flex-col min-h-[400px]">
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                {[
                                    { label: 'Asset', field: 'symbol' },
                                    { label: 'Portfolio', field: 'portfolio__name' },
                                    { label: 'Qty', field: 'quantity' },
                                    { label: 'Avg Cost', field: 'avg_entry_price' },
                                    { label: 'Current Price', field: 'current_price' },
                                    { label: 'Value', field: 'current_value' },
                                    { label: 'P&L', field: 'unrealized_pnl' },
                                    { label: 'Strategy', field: 'strategy' },
                                    { label: '', field: '' }
                                ].map((col) => (
                                    <th
                                        key={col.label}
                                        className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap"
                                    >
                                        {col.field ? (
                                            <button
                                                onClick={() => handleSort(col.field)}
                                                className="flex items-center gap-1 hover:text-[rgb(var(--foreground))]"
                                            >
                                                {col.label}
                                                <ArrowUpDown className="h-3 w-3" />
                                            </button>
                                        ) : col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgb(var(--border))]">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={9} className="px-5 py-20 text-center">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-[rgb(var(--muted-foreground))]" />
                                    </td>
                                </tr>
                            ) : positions.length === 0 ? (
                                <tr>
                                    <td colSpan={9} className="px-5 py-20 text-center text-[rgb(var(--muted-foreground))]">
                                        No positions found.
                                    </td>
                                </tr>
                            ) : positions.map((pos) => {
                                const pnl = parseFloat(pos.unrealized_pnl || '0');
                                const pnlPct = parseFloat(pos.unrealized_pnl_pct || '0');

                                return (
                                    <tr key={pos.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <div>
                                                <p className="font-mono font-semibold text-[rgb(var(--foreground))]">{pos.symbol}</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">
                                                {pos.portfolio_name || '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">{pos.quantity}</td>
                                        <td className="px-5 py-3.5 font-mono text-[rgb(var(--muted-foreground))]">
                                            {formatCurrency(pos.avg_entry_price)}
                                        </td>
                                        <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">
                                            {formatCurrency(pos.current_price || '0')}
                                        </td>
                                        <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">
                                            {formatCurrency(pos.current_value)}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-1">
                                                {pnl >= 0 ? (
                                                    <TrendingUp className="h-3 w-3 text-[rgb(var(--success))]" strokeWidth={2} />
                                                ) : (
                                                    <TrendingDown className="h-3 w-3 text-[rgb(var(--destructive))]" strokeWidth={2} />
                                                )}
                                                <span
                                                    className={`font-mono font-semibold text-xs ${pnl >= 0 ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'
                                                        }`}
                                                >
                                                    {pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">{pos.strategy || '—'}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/portfolio/positions/${pos.id}`}
                                                    className="text-xs text-[rgb(var(--primary))] hover:underline"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this position?')) {
                                                            deleteMutation.mutate(pos.id);
                                                        }
                                                    }}
                                                    className="text-[rgb(var(--destructive))] hover:opacity-80 transition-opacity"
                                                    disabled={deleteMutation.isPending}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {!isLoading && positions.length > 0 && (
                    <div className="border-t border-[rgb(var(--border))] p-4 flex items-center justify-between">
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                            Showing <span className="font-medium text-[rgb(var(--foreground))]">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-[rgb(var(--foreground))]">{Math.min(page * pageSize, totalCount)}</span> of <span className="font-medium text-[rgb(var(--foreground))]">{totalCount}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-medium text-[rgb(var(--foreground))] px-2">
                                {page} / {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
