import { Metadata } from 'next';
import Link from 'next/link';
import { routes } from '@/lib/config/routes';
import { Plus, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio — ShefaFx',
  description: 'View and manage your investment portfolio.',
};

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', qty: 25, avgCost: '$168.20', currentPrice: '$182.50', value: '$4,562.50', pnl: '+$357.50', pnlPct: '+8.5%', positive: true },
  { symbol: 'MSFT', name: 'Microsoft Corp.', qty: 10, avgCost: '$395.10', currentPrice: '$418.30', value: '$4,183.00', pnl: '+$232.00', pnlPct: '+5.9%', positive: true },
  { symbol: 'BTC', name: 'Bitcoin', qty: 0.5, avgCost: '$58,000', currentPrice: '$61,200', value: '$30,600', pnl: '+$1,600', pnlPct: '+5.5%', positive: true },
  { symbol: 'ETH', name: 'Ethereum', qty: 3, avgCost: '$3,600', currentPrice: '$3,450', value: '$10,350', pnl: '-$450', pnlPct: '-4.2%', positive: false },
  { symbol: 'TSLA', name: 'Tesla Inc.', qty: 8, avgCost: '$265.00', currentPrice: '$248.30', value: '$1,986.40', pnl: '-$133.60', pnlPct: '-6.3%', positive: false },
];

const summaryCards = [
  { label: 'Total Value', value: '$47,230.50' },
  { label: 'Total Invested', value: '$42,100.00' },
  { label: 'Total P&L', value: '+$5,130.50' },
  { label: 'Return', value: '+12.2%' },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Portfolio</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">View and manage your investments</p>
        </div>
        <Link
          href={routes.dashboard.strategies.create}
          className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:opacity-90 transition-all"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add Position
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
            <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">{card.label}</p>
            <p className={`text-2xl font-bold font-mono ${card.value.startsWith('+') ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--foreground))]'}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Holdings table */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Holdings</h2>
          <div className="flex gap-2">
            {['Stocks', 'Crypto', 'All'].map((tab, i) => (
              <button key={tab} className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${i === 2 ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {['Asset', 'Qty', 'Avg Cost', 'Current Price', 'Value', 'P&L', ''].map((col) => (
                  <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {holdings.map((h) => (
                <tr key={h.symbol} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="font-mono font-semibold text-[rgb(var(--foreground))]">{h.symbol}</p>
                      <p className="text-xs text-[rgb(var(--muted-foreground))]">{h.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">{h.qty}</td>
                  <td className="px-5 py-3.5 font-mono text-[rgb(var(--muted-foreground))]">{h.avgCost}</td>
                  <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">{h.currentPrice}</td>
                  <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">{h.value}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      {h.positive ? (
                        <TrendingUp className="h-3 w-3 text-[rgb(var(--success))]" strokeWidth={2} />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-[rgb(var(--destructive))]" strokeWidth={2} />
                      )}
                      <span className={`font-mono font-semibold text-xs ${h.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                        {h.pnlPct}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="text-xs text-[rgb(var(--primary))] hover:underline">
                      <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
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
