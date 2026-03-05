'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTrades, getTradingPerformance, deleteTrade } from '@/lib/api/orders';
import { formatCurrency } from '@/lib/data/positions'; // Reusing format function
import { TrendingUp, TrendingDown, Search, ArrowUpDown, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function PortfolioHistoryPage() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);
    const [timePeriod, setTimePeriod] = useState('All');
    const [ordering, setOrdering] = useState('-executed_at');
    const pageSize = 10;

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput);
            setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    const { data: response, isLoading } = useQuery({
        queryKey: ['trades', { page, pageSize, search, timePeriod, ordering }],
        queryFn: () => getTrades({
            page,
            page_size: pageSize,
            search,
            time_period: timePeriod,
            ordering
        })
    });

    const { data: performance } = useQuery({
        queryKey: ['tradingPerformance'],
        queryFn: getTradingPerformance
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTrade,
        onSuccess: () => {
            toast.success('Trade deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['trades'] });
            queryClient.invalidateQueries({ queryKey: ['tradingPerformance'] });
        },
        onError: () => {
            toast.error('Failed to delete trade');
        }
    });

    const trades = response?.results || [];
    const totalCount = response?.count || 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    const handleSort = (field: string) => {
        if (ordering === field) {
            setOrdering(`-${field}`);
        } else {
            setOrdering(field);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Trade History</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Complete history of all closed trades</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search symbol..."
                            className="w-full sm:w-48 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['1W', '1M', '3M', '1Y', 'All'].map((p) => (
                            <button
                                key={p}
                                onClick={() => { setTimePeriod(p); setPage(1); }}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${timePeriod === p
                                        ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20'
                                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] border border-[rgb(var(--border))]'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
                {[
                    { label: 'Total Trades', value: String(performance?.total_trades || 0) },
                    {
                        label: 'Win Rate',
                        value: `${(performance?.win_rate || 0).toFixed(1)}%`,
                        color: (performance?.win_rate || 0) >= 50 ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'
                    },
                    {
                        label: 'Total P&L',
                        value: formatCurrency(performance?.total_pnl || 0),
                        color: (performance?.total_pnl || 0) >= 0 ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'
                    },
                    {
                        label: 'Profitable Trades',
                        value: String(performance?.profitable_trades || 0),
                        color: 'text-[rgb(var(--success))]'
                    },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold font-mono ${s.color ?? 'text-[rgb(var(--foreground))]'}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* History table */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden flex flex-col min-h-[400px]">
                <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Closed Trades</h2>
                </div>
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                {[
                                    { label: 'Date', field: 'executed_at' },
                                    { label: 'Asset', field: 'symbol' },
                                    { label: 'Action', field: 'trade_type' },
                                    { label: 'Qty', field: 'quantity' },
                                    { label: 'Price', field: 'price' },
                                    { label: 'Total Value', field: 'total_value' },
                                    { label: 'P&L', field: 'realized_pnl' },
                                    { label: '', field: '' }
                                ].map((col) => (
                                    <th
                                        key={col.label}
                                        className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap"
                                    >
                                        {col.field ? (
                                            <button
                                                onClick={() => handleSort(col.field)}
                                                className="flex items-center gap-1 hover:text-[rgb(var(--foreground))] transition-colors"
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
                                    <td colSpan={8} className="px-5 py-20 text-center">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-[rgb(var(--muted-foreground))]" />
                                    </td>
                                </tr>
                            ) : trades.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-5 py-20 text-center text-[rgb(var(--muted-foreground))]">
                                        No trades found for this period.
                                    </td>
                                </tr>
                            ) : trades.map((h: any) => {
                                const pnl = parseFloat(h.realized_pnl || '0');
                                const isPositivePnl = pnl >= 0;
                                const date = h.executed_at ? new Date(h.executed_at).toLocaleDateString() : '—';

                                return (
                                    <tr key={h.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                                        <td className="px-5 py-3 text-xs text-[rgb(var(--muted-foreground))] font-mono">{date}</td>
                                        <td className="px-5 py-3 font-mono font-semibold text-[rgb(var(--foreground))]">{h.symbol}</td>
                                        <td className="px-5 py-3">
                                            <span className={`font-medium text-xs ${h.trade_type === 'buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                {h.trade_type?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-[rgb(var(--foreground))]">{h.quantity}</td>
                                        <td className="px-5 py-3 font-mono text-[rgb(var(--foreground))]">{formatCurrency(h.price)}</td>
                                        <td className="px-5 py-3 font-mono text-[rgb(var(--foreground))]">{formatCurrency(h.total_value)}</td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-1">
                                                {h.realized_pnl ? (
                                                    <>
                                                        {isPositivePnl
                                                            ? <TrendingUp className="h-3 w-3 text-[rgb(var(--success))]" strokeWidth={2} />
                                                            : <TrendingDown className="h-3 w-3 text-[rgb(var(--destructive))]" strokeWidth={2} />}
                                                        <span className={`font-mono font-semibold text-xs ${isPositivePnl ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                            {isPositivePnl ? '+' : ''}{formatCurrency(pnl)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-[rgb(var(--muted-foreground))]">—</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this trade history record?')) {
                                                        deleteMutation.mutate(h.id);
                                                    }
                                                }}
                                                className="text-[rgb(var(--destructive))] hover:opacity-80 transition-opacity"
                                                disabled={deleteMutation.isPending}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {!isLoading && trades.length > 0 && (
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
