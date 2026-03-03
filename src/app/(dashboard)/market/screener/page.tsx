import { Metadata } from 'next';
import { Search, SlidersHorizontal } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Market Screener — ShefaFx',
    description: 'Screen assets using technical and fundamental filters.',
};

const results = [
    { symbol: 'NVDA', name: 'NVIDIA', sector: 'Tech', price: '$875.40', pe: '55.2', rsi: '62', mcap: '$2.16T', volume: '2.3x', signal: 'Buy' },
    { symbol: 'AAPL', name: 'Apple', sector: 'Tech', price: '$182.50', pe: '30.1', rsi: '58', mcap: '$2.82T', volume: '1.1x', signal: 'Hold' },
    { symbol: 'MSFT', name: 'Microsoft', sector: 'Tech', price: '$418.30', pe: '37.4', rsi: '55', mcap: '$3.11T', volume: '0.9x', signal: 'Buy' },
    { symbol: 'JPM', name: 'JPMorgan', sector: 'Finance', price: '$195.20', pe: '11.8', rsi: '48', mcap: '$561B', volume: '1.4x', signal: 'Hold' },
    { symbol: 'XOM', name: 'ExxonMobil', sector: 'Energy', price: '$112.40', pe: '14.2', rsi: '41', mcap: '$451B', volume: '0.7x', signal: 'Neutral' },
];

const signalColor = {
    Buy: 'text-[rgb(var(--success))] bg-[rgb(var(--success))]/10',
    Hold: 'text-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10',
    Neutral: 'text-[rgb(var(--muted-foreground))] bg-[rgb(var(--muted))]',
    Sell: 'text-[rgb(var(--destructive))] bg-[rgb(var(--destructive))]/10',
};

export default function ScreenerPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Market Screener</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Filter and discover assets using technical and fundamental criteria</p>
            </div>

            {/* Filter bar */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                        <input type="text" placeholder="Search symbols..." className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {['Sector', 'Market Cap', 'RSI Range', 'P/E Range', 'Volume'].map((f) => (
                            <button key={f} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all">
                                <SlidersHorizontal className="h-3 w-3" strokeWidth={1.5} />
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick filters */}
                <div className="flex gap-2 mt-3 flex-wrap">
                    {['All Sectors', 'Technology', 'Finance', 'Energy', 'Healthcare', 'Consumer'].map((s, i) => (
                        <button key={s} className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${i === 0 ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-[rgb(var(--muted-foreground))]"><span className="font-semibold text-[rgb(var(--foreground))]">{results.length}</span> results</p>
                <select className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-1.5 text-xs text-[rgb(var(--foreground))] focus:outline-none">
                    <option>Sort: Volume</option>
                    <option>Sort: P/E Ratio</option>
                    <option>Sort: RSI</option>
                    <option>Sort: Market Cap</option>
                </select>
            </div>

            {/* Results table */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                {['Symbol', 'Sector', 'Price', 'P/E', 'RSI', 'Mkt Cap', 'Volume', 'Signal'].map((col) => (
                                    <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgb(var(--border))]">
                            {results.map((r) => (
                                <tr key={r.symbol} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <p className="font-mono font-semibold text-[rgb(var(--foreground))]">{r.symbol}</p>
                                        <p className="text-xs text-[rgb(var(--muted-foreground))]">{r.name}</p>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">{r.sector}</span>
                                    </td>
                                    <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">{r.price}</td>
                                    <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">{r.pe}</td>
                                    <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">{r.rsi}</td>
                                    <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">{r.mcap}</td>
                                    <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">{r.volume} avg</td>
                                    <td className="px-5 py-3.5">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${signalColor[r.signal as keyof typeof signalColor]}`}>
                                            {r.signal}
                                        </span>
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
