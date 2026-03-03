import { Metadata } from 'next';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Portfolio Analytics — ShefaFx',
    description: 'Deep analytics and performance metrics for your portfolio.',
};

const monthlyReturns = [
    { month: 'Jul', value: 2.1, positive: true },
    { month: 'Aug', value: -1.4, positive: false },
    { month: 'Sep', value: 3.8, positive: true },
    { month: 'Oct', value: 1.2, positive: true },
    { month: 'Nov', value: 4.5, positive: true },
    { month: 'Dec', value: 2.9, positive: true },
];

const allocation = [
    { name: 'Stocks', pct: 52, color: 'bg-[rgb(var(--primary))]' },
    { name: 'Crypto', pct: 28, color: 'bg-[rgb(var(--success))]' },
    { name: 'ETFs', pct: 12, color: 'bg-[rgb(var(--warning))]' },
    { name: 'Forex', pct: 8, color: 'bg-[rgb(var(--destructive))]' },
];

export default function PortfolioAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Portfolio Analytics</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Performance metrics and portfolio composition</p>
            </div>

            {/* Key metrics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Return', value: '+12.2%', sub: 'since inception', positive: true },
                    { label: 'Sharpe Ratio', value: '1.84', sub: 'risk-adjusted return', positive: null },
                    { label: 'Max Drawdown', value: '-8.3%', sub: 'worst peak-to-trough', positive: false },
                    { label: 'Volatility', value: '14.2%', sub: 'annualized', positive: null },
                ].map((m) => (
                    <div key={m.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{m.label}</p>
                        <p
                            className={`text-2xl font-bold font-mono ${m.positive === true
                                    ? 'text-[rgb(var(--success))]'
                                    : m.positive === false
                                        ? 'text-[rgb(var(--destructive))]'
                                        : 'text-[rgb(var(--foreground))]'
                                }`}
                        >
                            {m.value}
                        </p>
                        <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">{m.sub}</p>
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
                    <div className="flex items-end gap-3 h-36">
                        {monthlyReturns.map((m) => {
                            const height = Math.abs(m.value) * 8;
                            return (
                                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                                    <span className={`text-[10px] font-mono font-semibold ${m.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                        {m.positive ? '+' : ''}{m.value}%
                                    </span>
                                    <div
                                        className={`w-full rounded-t-sm ${m.positive ? 'bg-[rgb(var(--success))]/80' : 'bg-[rgb(var(--destructive))]/80'}`}
                                        style={{ height: `${height}px` }}
                                    />
                                    <span className="text-[10px] text-[rgb(var(--muted-foreground))]">{m.month}</span>
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
                    <div className="space-y-3">
                        {allocation.map((a) => (
                            <div key={a.name}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-[rgb(var(--foreground))]">{a.name}</span>
                                    <span className="text-sm font-mono font-semibold text-[rgb(var(--foreground))]">{a.pct}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-[rgb(var(--muted))]">
                                    <div
                                        className={`h-2 rounded-full ${a.color}`}
                                        style={{ width: `${a.pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
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
                        { label: 'Your Portfolio', value: '+12.2%', icon: TrendingUp, positive: true },
                        { label: 'S&P 500', value: '+9.8%', icon: TrendingUp, positive: true },
                        { label: 'Alpha', value: '+2.4%', icon: TrendingUp, positive: true },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className="rounded-lg bg-[rgb(var(--muted))]/50 border border-[rgb(var(--border))] px-4 py-3 flex items-center gap-3">
                                <Icon className={`h-5 w-5 flex-shrink-0 ${item.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`} strokeWidth={1.5} />
                                <div>
                                    <p className="text-xs text-[rgb(var(--muted-foreground))]">{item.label}</p>
                                    <p className={`font-mono font-bold ${item.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
