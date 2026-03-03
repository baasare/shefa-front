import { Metadata } from 'next';
import Link from 'next/link';
import { routes } from '@/lib/config/routes';
import { Plus, Play, Pause, Settings2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Strategies — ShefaFx',
  description: 'Manage your AI trading strategies.',
};

const strategies = [
  {
    id: '1',
    name: 'Momentum Trend',
    status: 'Running',
    type: 'Trend Following',
    assets: ['Stocks', 'ETFs'],
    pnl: '+$1,234.50',
    pnlPct: '+6.8%',
    winRate: '68%',
    trades: 42,
    positive: true,
  },
  {
    id: '2',
    name: 'Mean Reversion',
    status: 'Running',
    type: 'Statistical Arbitrage',
    assets: ['Stocks', 'Forex'],
    pnl: '+$562.80',
    pnlPct: '+4.2%',
    winRate: '72%',
    trades: 29,
    positive: true,
  },
  {
    id: '3',
    name: 'ML Sentiment',
    status: 'Paused',
    type: 'NLP / Sentiment',
    assets: ['Stocks', 'Crypto'],
    pnl: '-$128.20',
    pnlPct: '-1.1%',
    winRate: '61%',
    trades: 18,
    positive: false,
  },
];

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Strategies</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Manage your AI trading strategies</p>
        </div>
        <Link
          href={routes.dashboard.strategies.create}
          className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:opacity-90 transition-all"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Strategy
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Active Strategies', value: '2' },
          { label: 'Total P&L', value: '+$1,669.10', pos: true },
          { label: 'Avg Win Rate', value: '67%' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
            <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.pos ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--foreground))]'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Strategy cards */}
      <div className="space-y-4">
        {strategies.map((strategy) => (
          <div key={strategy.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-[rgb(var(--foreground))]">{strategy.name}</h3>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${strategy.status === 'Running'
                      ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]'
                      : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]'
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${strategy.status === 'Running' ? 'bg-[rgb(var(--success))] animate-pulse' : 'bg-[rgb(var(--muted-foreground))]'}`} />
                    {strategy.status}
                  </span>
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mb-3">{strategy.type}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {strategy.assets.map((a) => (
                    <span key={a} className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="text-right">
                  <p className="text-xs text-[rgb(var(--muted-foreground))] mb-0.5">P&L</p>
                  <p className={`font-mono font-semibold ${strategy.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                    {strategy.pnlPct}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[rgb(var(--muted-foreground))] mb-0.5">Win Rate</p>
                  <p className="font-semibold text-[rgb(var(--foreground))]">{strategy.winRate}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[rgb(var(--muted-foreground))] mb-0.5">Trades</p>
                  <p className="font-semibold text-[rgb(var(--foreground))]">{strategy.trades}</p>
                </div>
                <div className="flex gap-2 ml-2">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all">
                    {strategy.status === 'Running' ? <Pause className="h-4 w-4" strokeWidth={1.5} /> : <Play className="h-4 w-4" strokeWidth={1.5} />}
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all">
                    <Settings2 className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state hint */}
      <div className="rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 p-8 text-center">
        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-3">
          Want to add a new strategy?
        </p>
        <Link
          href={routes.dashboard.strategies.templates}
          className="text-sm text-[rgb(var(--primary))] hover:underline"
        >
          Browse strategy templates →
        </Link>
      </div>
    </div>
  );
}
