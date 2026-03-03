import { Metadata } from 'next';
import { Star, TrendingUp, TrendingDown, Plus } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Watchlist — ShefaFx',
    description: 'Track your favourite markets and assets.',
};

const watchlistItems = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$182.50', change: '+2.4%', positive: true, volume: '54.2M', mktCap: '$2.82T' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$418.30', change: '+1.9%', positive: true, volume: '21.1M', mktCap: '$3.11T' },
    { symbol: 'BTC', name: 'Bitcoin', price: '$61,200', change: '+3.2%', positive: true, volume: '$28.4B', mktCap: '$1.20T' },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,450', change: '-1.8%', positive: false, volume: '$12.6B', mktCap: '$414B' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.30', change: '-2.1%', positive: false, volume: '$31.7M', mktCap: '$791B' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$875.40', change: '+5.3%', positive: true, volume: '$41.2M', mktCap: '$2.16T' },
    { symbol: 'AMZN', name: 'Amazon.com', price: '$183.75', change: '+0.8%', positive: true, volume: '$35.8M', mktCap: '$1.92T' },
];

export default function WatchlistPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Watchlist</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Your tracked markets and assets</p>
                </div>
                <button className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all shadow-[var(--shadow-glow)]">
                    <Plus className="h-4 w-4" strokeWidth={2} />
                    Add Symbol
                </button>
            </div>

            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                {['', 'Symbol', 'Price', '24h Change', 'Volume', 'Mkt Cap', ''].map((col, i) => (
                                    <th key={`${col}-${i}`} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgb(var(--border))]">
                            {watchlistItems.map((item) => (
                                <tr key={item.symbol} className="hover:bg-[rgb(var(--muted))]/30 transition-colors group">
                                    <td className="px-5 py-3.5">
                                        <Star className="h-4 w-4 text-[rgb(var(--warning))]" fill="currentColor" strokeWidth={1.5} />
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <p className="font-mono font-semibold text-[rgb(var(--foreground))]">{item.symbol}</p>
                                        <p className="text-xs text-[rgb(var(--muted-foreground))]">{item.name}</p>
                                    </td>
                                    <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">{item.price}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-1">
                                            {item.positive ? (
                                                <TrendingUp className="h-3 w-3 text-[rgb(var(--success))]" strokeWidth={2} />
                                            ) : (
                                                <TrendingDown className="h-3 w-3 text-[rgb(var(--destructive))]" strokeWidth={2} />
                                            )}
                                            <span className={`font-mono font-semibold text-xs ${item.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                {item.change}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">{item.volume}</td>
                                    <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">{item.mktCap}</td>
                                    <td className="px-5 py-3.5">
                                        <button className="opacity-0 group-hover:opacity-100 text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--destructive))] transition-all">Remove</button>
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
