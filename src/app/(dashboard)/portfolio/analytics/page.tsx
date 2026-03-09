'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPortfolios, getPortfolioAnalytics } from '@/lib/api/portfolios';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Loader2 } from 'lucide-react';

interface MonthlyReturn {
    month: string;
    value: number;
    positive: boolean;
}

interface AllocationItem {
    name: string;
    pct: number;
    value: number;
}

export default function PortfolioAnalyticsPage() {
    const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('');

    const { data: portfolios, isLoading: isLoadingPortfolios } = useQuery({
        queryKey: ['portfolios'],
        queryFn: getPortfolios
    });

    const activePortfolioId = selectedPortfolioId || (portfolios && portfolios.length > 0 ? portfolios[0].id : null);

    const { data: analytics, isLoading: isLoadingAnalytics } = useQuery({
        queryKey: ['portfolioAnalytics', activePortfolioId],
        queryFn: () => getPortfolioAnalytics(activePortfolioId!),
        enabled: !!activePortfolioId
    });

    if (isLoadingPortfolios) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
            </div>
        );
    }

    if (!portfolios || portfolios.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-[rgb(var(--muted-foreground))]">No portfolios found. Create a portfolio to see analytics.</p>
            </div>
        );
    }

    const isLoading = isLoadingAnalytics;
    const m = analytics || {
        total_return: '0%',
        sharpe_ratio: '0.00',
        max_drawdown: '0%',
        volatility: '0%',
        monthly_returns: [],
        allocation: []
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Portfolio Analytics</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Performance metrics and portfolio composition</p>
                </div>

                <div className="w-full sm:w-64">
                    <select
                        value={activePortfolioId || ''}
                        onChange={(e) => setSelectedPortfolioId(e.target.value)}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    >
                        {portfolios.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} ({p.type})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
                </div>
            ) : (
                <>
                    {/* Key metrics */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Total Return', value: m.total_return, sub: 'since inception', positive: parseFloat(m.total_return) >= 0 },
                            { label: 'Sharpe Ratio', value: m.sharpe_ratio, sub: 'risk-adjusted return', positive: parseFloat(m.sharpe_ratio) >= 1 },
                            { label: 'Max Drawdown', value: `${m.max_drawdown}%`, sub: 'worst peak-to-trough', positive: false },
                            { label: 'Volatility', value: m.volatility, sub: 'annualized', positive: null },
                            { label: 'Profit Factor', value: String(m.profit_factor || 0), sub: 'gross profit / gross loss', positive: (m.profit_factor || 0) > 1 },
                            { label: 'Best Trade', value: m.best_trade || '0%', sub: 'max individual win', positive: true },
                            { label: 'Worst Trade', value: m.worst_trade || '0%', sub: 'max individual loss', positive: false },
                            { label: 'Recovery Factor', value: String(m.recovery_factor || 0), sub: 'net profit / max drawdown', positive: (m.recovery_factor || 0) > 1 },
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                                <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{stat.label}</p>
                                <p
                                    className={`text-2xl font-bold font-mono ${stat.positive === true
                                            ? 'text-[rgb(var(--success))]'
                                            : stat.positive === false
                                                ? 'text-[rgb(var(--destructive))]'
                                                : 'text-[rgb(var(--foreground))]'
                                        }`}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">{stat.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Monthly Returns */}
                        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                            <div className="flex items-center gap-2 mb-5">
                                <BarChart3 className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                                <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Monthly Returns</h2>
                            </div>
                            <div className="flex items-end justify-between h-48 px-2">
                                {m.monthly_returns?.map((mr: MonthlyReturn, idx: number) => {
                                    // Scale height based on max absolute value
                                    const maxVal = Math.max(...(m.monthly_returns?.map((x: MonthlyReturn) => Math.abs(x.value)) || [1]));
                                    const heightPct = (Math.abs(mr.value) / maxVal) * 100;

                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                            <span className={`text-[10px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-opacity ${mr.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                {mr.positive ? '+' : ''}{mr.value}%
                                            </span>
                                            <div
                                                className={`w-8 rounded-t-sm transition-all ${mr.positive ? 'bg-[rgb(var(--success))]/80 hover:bg-[rgb(var(--success))]' : 'bg-[rgb(var(--destructive))]/80 hover:bg-[rgb(var(--destructive))]'}`}
                                                style={{ height: `${Math.max(10, heightPct)}%` }}
                                            />
                                            <span className="text-[10px] text-[rgb(var(--muted-foreground))]">{mr.month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Asset Allocation */}
                        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                            <div className="flex items-center gap-2 mb-5">
                                <PieChart className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                                <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Asset Allocation</h2>
                            </div>
                            <div className="space-y-4">
                                {m.allocation && m.allocation.length > 0 ? m.allocation.map((a: AllocationItem) => (
                                    <div key={a.name}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-[rgb(var(--foreground))]">{a.name}</span>
                                            <span className="text-sm font-mono font-semibold text-[rgb(var(--foreground))]">{a.pct}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-[rgb(var(--muted))] overflow-hidden">
                                            <div
                                                className={`h-full ${a.color}`}
                                                style={{ width: `${a.pct}%` }}
                                            />
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-sm text-[rgb(var(--muted-foreground))] text-center py-10">No allocation data to display.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Performance vs Benchmark */}
                    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                            <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">vs Benchmark (S&P 500)</h2>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {[
                                { label: 'Your Portfolio', value: m.total_return, icon: TrendingUp, positive: parseFloat(m.total_return) >= 0 },
                                { label: 'S&P 500', value: '+9.8%', icon: TrendingUp, positive: true },
                                { label: 'Alpha', value: `${(parseFloat(m.total_return) - 9.8).toFixed(1)}%`, icon: TrendingUp, positive: (parseFloat(m.total_return) - 9.8) >= 0 },
                            ].map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.label} className="rounded-lg bg-[rgb(var(--muted))]/50 border border-[rgb(var(--border))] px-4 py-3 flex items-center gap-3 hover:bg-[rgb(var(--muted))]/80 transition-colors">
                                        <Icon className={`h-5 w-5 flex-shrink-0 ${item.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`} strokeWidth={1.5} />
                                        <div>
                                            <p className="text-xs text-[rgb(var(--muted-foreground))]">{item.label}</p>
                                            <p className={`font-mono font-bold ${item.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                {parseFloat(item.value) >= 0 && !item.value.includes('+') ? `+${item.value}` : item.value}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
