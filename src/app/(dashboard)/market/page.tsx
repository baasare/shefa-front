import { Metadata } from 'next';
import { TrendingUp, TrendingDown, Search, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market — ShefaFx',
  description: 'Market data, prices, and analysis.',
};

const marketOverview = [
  { label: 'S&P 500', value: '5,123.41', change: '+0.42%', positive: true },
  { label: 'NASDAQ', value: '16,245.80', change: '+0.63%', positive: true },
  { label: 'BTC/USD', value: '$61,240', change: '-1.2%', positive: false },
  { label: 'ETH/USD', value: '$3,448', change: '-0.8%', positive: false },
  { label: 'Gold', value: '$2,185.30', change: '+0.28%', positive: true },
  { label: 'VIX', value: '13.45', change: '-2.1%', positive: true },
];

const watchlist = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$182.50', change: '+1.2%', volume: '54.2M', market: 'US', positive: true, starred: true },
  { symbol: 'MSFT', name: 'Microsoft', price: '$418.30', change: '+0.8%', volume: '21.8M', market: 'US', positive: true, starred: true },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '$248.30', change: '-2.1%', volume: '82.4M', market: 'US', positive: false, starred: false },
  { symbol: 'BTC', name: 'Bitcoin', price: '$61,240', change: '-1.2%', volume: '$28B', market: 'Crypto', positive: false, starred: true },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,448', change: '-0.8%', volume: '$12B', market: 'Crypto', positive: false, starred: false },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$875.40', change: '+3.4%', volume: '38.7M', market: 'US', positive: true, starred: false },
  { symbol: 'META', name: 'Meta Platforms', price: '$527.80', change: '+1.7%', volume: '19.2M', market: 'US', positive: true, starred: false },
  { symbol: 'AMZN', name: 'Amazon.com', price: '$194.60', change: '+0.9%', volume: '25.6M', market: 'US', positive: true, starred: false },
];

export default function MarketPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Market</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Live market data and analysis</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search symbol..."
            className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:border-[rgb(var(--primary))]/50 focus:outline-none w-48 transition-all"
          />
        </div>
      </div>

      {/* Market overview strip */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {marketOverview.map((item) => (
          <div key={item.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3">
            <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">{item.label}</p>
            <p className="font-mono font-semibold text-sm text-[rgb(var(--foreground))]">{item.value}</p>
            <p className={`text-xs font-medium mt-0.5 ${item.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
              {item.change}
            </p>
          </div>
        ))}
      </div>

      {/* Watchlist */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Watchlist</h2>
          <div className="flex gap-1.5 rounded-lg bg-[rgb(var(--muted))] p-0.5">
            {['All', 'Stocks', 'Crypto', 'Starred'].map((tab, i) => (
              <button key={tab} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${i === 0 ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {['', 'Symbol', 'Name', 'Price', 'Change', 'Volume', 'Market'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {watchlist.map((item) => (
                <tr key={item.symbol} className="hover:bg-[rgb(var(--muted))]/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <Star className={`h-4 w-4 ${item.starred ? 'fill-[rgb(var(--warning))] text-[rgb(var(--warning))]' : 'text-[rgb(var(--border))] hover:text-[rgb(var(--muted-foreground))]'}`} strokeWidth={1.5} />
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-[rgb(var(--foreground))]">{item.symbol}</td>
                  <td className="px-4 py-3 text-[rgb(var(--muted-foreground))]">{item.name}</td>
                  <td className="px-4 py-3 font-mono font-semibold text-[rgb(var(--foreground))]">{item.price}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {item.positive ? (
                        <TrendingUp className="h-3.5 w-3.5 text-[rgb(var(--success))]" strokeWidth={2} />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-[rgb(var(--destructive))]" strokeWidth={2} />
                      )}
                      <span className={`font-medium font-mono text-xs ${item.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                        {item.change}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[rgb(var(--muted-foreground))]">{item.volume}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">
                      {item.market}
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
