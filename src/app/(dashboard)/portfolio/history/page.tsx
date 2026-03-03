import { Metadata } from 'next';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Trade History — ShefaFx',
    description: 'View your complete trading history.',
};

const history = [
    { date: '2024-12-20', symbol: 'AAPL', side: 'Buy', qty: 10, price: '$182.50', total: '$1,825.00', pnl: '+$143.00', positive: true, strategy: 'Momentum Trend' },
    { date: '2024-12-19', symbol: 'BTC', side: 'Buy', qty: 0.25, price: '$61,200', total: '$15,300', pnl: '+$800.00', positive: true, strategy: 'ML Sentiment' },
    { date: '2024-12-18', symbol: 'ETH', side: 'Sell', qty: 2, price: '$3,500', total: '$7,000', pnl: '-$200.00', positive: false, strategy: 'ML Sentiment' },
    { date: '2024-12-17', symbol: 'MSFT', side: 'Buy', qty: 3, price: '$418.30', total: '$1,254.90', pnl: '+$69.60', positive: true, strategy: 'Mean Reversion' },
    { date: '2024-12-16', symbol: 'TSLA', side: 'Sell', qty: 4, price: '$250.10', total: '$1,000.40', pnl: '+$36.40', positive: true, strategy: 'Momentum Trend' },
    { date: '2024-12-15', symbol: 'NVDA', side: 'Buy', qty: 2, price: '$855.00', total: '$1,710.00', pnl: '+$40.80', positive: true, strategy: 'Momentum Trend' },
];

export default function PortfolioHistoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Trade History</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Complete history of all closed trades</p>
                </div>
                <div className="flex gap-2">
                    {['1W', '1M', '3M', '1Y', 'All'].map((p, i) => (
                        <button
                            key={p}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${i === 4
                                ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border border-[rgb(var(--primary))]/20'
                                : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] border border-[rgb(var(--border))]'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
                {[
                    { label: 'Total Trades', value: '94' },
                    { label: 'Win Rate', value: '71%', color: 'text-[rgb(var(--success))]' },
                    { label: 'Total P&L', value: '+$5,130', color: 'text-[rgb(var(--success))]' },
                    { label: 'Avg Trade Return', value: '+2.4%', color: 'text-[rgb(var(--success))]' },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold font-mono ${s.color ?? 'text-[rgb(var(--foreground))]'}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* History table */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Closed Trades</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                {['Date', 'Asset', 'Side', 'Qty', 'Price', 'Total', 'P&L', 'Strategy'].map((col) => (
                                    <th
                                        key={col}
                                        className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgb(var(--border))]">
                            {history.map((h, i) => (
                                <tr key={i} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                                    <td className="px-5 py-3 text-xs text-[rgb(var(--muted-foreground))] font-mono">{h.date}</td>
                                    <td className="px-5 py-3 font-mono font-semibold text-[rgb(var(--foreground))]">{h.symbol}</td>
                                    <td className="px-5 py-3">
                                        <span className={`font-medium text-xs ${h.side === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                            {h.side}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-[rgb(var(--foreground))]">{h.qty}</td>
                                    <td className="px-5 py-3 font-mono text-[rgb(var(--foreground))]">{h.price}</td>
                                    <td className="px-5 py-3 font-mono text-[rgb(var(--foreground))]">{h.total}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-1">
                                            {h.positive
                                                ? <TrendingUp className="h-3 w-3 text-[rgb(var(--success))]" strokeWidth={2} />
                                                : <TrendingDown className="h-3 w-3 text-[rgb(var(--destructive))]" strokeWidth={2} />}
                                            <span className={`font-mono font-semibold text-xs ${h.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                {h.pnl}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-xs text-[rgb(var(--muted-foreground))]">{h.strategy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
