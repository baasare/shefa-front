import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — ShefaFx',
  description: 'Your AI trading dashboard.',
};

const stats = [
  {
    label: 'Portfolio Value',
    value: '$47,230.50',
    change: '+12.4%',
    changeLabel: 'vs last month',
    positive: true,
  },
  {
    label: "Today's P&L",
    value: '+$840.25',
    change: '+1.81%',
    changeLabel: 'today',
    positive: true,
  },
  {
    label: 'Active Strategies',
    value: '3',
    change: '1 paused',
    changeLabel: '',
    positive: null,
  },
  {
    label: 'Pending Approvals',
    value: '2',
    change: 'Review required',
    changeLabel: '',
    positive: false,
    badge: true,
  },
];

const strategies = [
  {
    name: 'Momentum Trend',
    status: 'Running',
    pnl: '+$1,234',
    winRate: '68%',
    positive: true,
  },
  {
    name: 'Mean Reversion',
    status: 'Running',
    pnl: '+$562',
    winRate: '72%',
    positive: true,
  },
  {
    name: 'ML Sentiment',
    status: 'Paused',
    pnl: '-$128',
    winRate: '61%',
    positive: false,
  },
];

const recentOrders = [
  { symbol: 'AAPL', side: 'Buy', qty: 10, price: '$182.50', status: 'Filled' },
  { symbol: 'BTC', side: 'Buy', qty: 0.25, price: '$61,200', status: 'Filled' },
  { symbol: 'TSLA', side: 'Sell', qty: 5, price: '$248.30', status: 'Pending' },
  { symbol: 'ETH', side: 'Buy', qty: 2, price: '$3,450', status: 'Cancelled' },
];

const agentActivity = [
  { agent: 'Analysis Agent', action: 'Completed AAPL sentiment analysis', time: '2m ago', status: 'done' },
  { agent: 'Trade Agent', action: 'Executed AAPL Buy order — 10 shares', time: '5m ago', status: 'done' },
  { agent: 'Risk Agent', action: 'Portfolio drawdown within limits', time: '12m ago', status: 'done' },
  { agent: 'Approval Agent', action: 'TSLA Sell waiting for your approval', time: '18m ago', status: 'pending' },
];

const statusColors: Record<string, string> = {
  Filled: 'text-[rgb(var(--success))] bg-[rgb(var(--success))]/10',
  Pending: 'text-[rgb(var(--warning))] bg-[rgb(var(--warning))]/10',
  Cancelled: 'text-[rgb(var(--muted-foreground))] bg-[rgb(var(--muted))]',
};

const agentStatusColors: Record<string, string> = {
  done: 'bg-[rgb(var(--success))]',
  pending: 'bg-[rgb(var(--warning))] animate-pulse',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">
          Good morning 👋
        </h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
          Here&apos;s your trading overview for{' '}
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric',
          })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5"
          >
            <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold font-mono ${stat.positive === true
                ? 'text-[rgb(var(--success))]'
                : stat.positive === false
                  ? 'text-[rgb(var(--destructive))]'
                  : 'text-[rgb(var(--foreground))]'
              }`}>
              {stat.value}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className={`text-xs font-medium ${stat.positive === true
                  ? 'text-[rgb(var(--success))]'
                  : stat.positive === false
                    ? 'text-[rgb(var(--warning))]'
                    : 'text-[rgb(var(--muted-foreground))]'
                }`}>
                {stat.change}
              </span>
              {stat.changeLabel && (
                <span className="text-xs text-[rgb(var(--muted-foreground))]">{stat.changeLabel}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main panels */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart panel */}
        <div className="lg:col-span-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
              Portfolio Performance
            </h2>
            <div className="flex gap-1.5 rounded-lg bg-[rgb(var(--muted))] p-1">
              {['7d', '30d', '90d', '1y'].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${i === 1
                      ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm'
                      : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Decorative chart */}
          <div className="h-48 w-full relative rounded-lg overflow-hidden bg-[rgb(var(--background))]">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(30,111,255)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(30,111,255)" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path
                d="M0,160 C40,155 60,140 80,130 C100,120 110,135 130,115 C150,95 160,80 180,70 C200,60 210,75 230,65 C250,55 260,40 280,35 C300,30 320,45 340,38 C360,32 380,25 400,20 L400,200 L0,200 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M0,160 C40,155 60,140 80,130 C100,120 110,135 130,115 C150,95 160,80 180,70 C200,60 210,75 230,65 C250,55 260,40 280,35 C300,30 320,45 340,38 C360,32 380,25 400,20"
                fill="none"
                stroke="rgb(30,111,255)"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute bottom-3 left-3 text-xs text-[rgb(var(--muted-foreground))]">30 days ago</div>
            <div className="absolute bottom-3 right-3 text-xs text-[rgb(var(--muted-foreground))]">Today</div>
            <div className="absolute top-3 right-3 rounded-md bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/20 px-2 py-1 text-xs font-semibold text-[rgb(var(--success))]">
              +12.4%
            </div>
          </div>
        </div>

        {/* AI Agent Activity */}
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">
            AI Agent Activity
          </h2>
          <ul className="space-y-3">
            {agentActivity.map((item, i) => (
              <li key={i} className="flex gap-3">
                <div className="relative flex-shrink-0 mt-1">
                  <div className={`h-2 w-2 rounded-full ${agentStatusColors[item.status]}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[rgb(var(--foreground))] mb-0.5">{item.agent}</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] leading-snug">{item.action}</p>
                  <p className="text-[10px] text-[rgb(var(--muted-foreground))]/60 mt-1">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <a
            href="/agents"
            className="mt-4 block text-xs text-center text-[rgb(var(--primary))] hover:underline"
          >
            View all agent logs →
          </a>
        </div>
      </div>

      {/* Active strategies */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Active Strategies</h2>
          <a href="/strategies" className="text-xs text-[rgb(var(--primary))] hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {['Strategy', 'Status', 'P&L', 'Win Rate', 'Actions'].map((col) => (
                  <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {strategies.map((s) => (
                <tr key={s.name} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-[rgb(var(--foreground))]">{s.name}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${s.status === 'Running'
                        ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]'
                        : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]'
                      }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${s.status === 'Running' ? 'bg-[rgb(var(--success))] animate-pulse' : 'bg-[rgb(var(--muted-foreground))]'}`} />
                      {s.status}
                    </span>
                  </td>
                  <td className={`px-5 py-3.5 font-mono font-semibold ${s.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                    {s.pnl}
                  </td>
                  <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">{s.winRate}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button className="text-xs text-[rgb(var(--primary))] hover:underline">Edit</button>
                      <button className="text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]">
                        {s.status === 'Running' ? 'Pause' : 'Resume'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Recent Orders</h2>
          <a href="/orders" className="text-xs text-[rgb(var(--primary))] hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {['Symbol', 'Side', 'Qty', 'Price', 'Status'].map((col) => (
                  <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {recentOrders.map((order) => (
                <tr key={`${order.symbol}-${order.side}`} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">{order.symbol}</td>
                  <td className="px-5 py-3.5">
                    <span className={`font-medium ${order.side === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                      {order.side}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">{order.qty}</td>
                  <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">{order.price}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[order.status] ?? ''}`}>
                      {order.status}
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
