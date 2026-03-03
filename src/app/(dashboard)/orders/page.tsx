import { Metadata } from 'next';
import { CheckCircle2, Clock, XCircle, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Orders — ShefaFx',
  description: 'View and manage your trading orders.',
};

const orders = [
  { id: 'ORD-001', symbol: 'AAPL', side: 'Buy', qty: 10, price: '$182.50', total: '$1,825.00', strategy: 'Momentum Trend', status: 'Filled', time: '16:27:03' },
  { id: 'ORD-002', symbol: 'BTC', side: 'Buy', qty: 0.25, price: '$61,200', total: '$15,300', strategy: 'ML Sentiment', status: 'Filled', time: '16:10:15' },
  { id: 'ORD-003', symbol: 'TSLA', side: 'Sell', qty: 5, price: '$248.30', total: '$1,241.50', strategy: 'Momentum Trend', status: 'Pending', time: '16:14:00' },
  { id: 'ORD-004', symbol: 'MSFT', side: 'Buy', qty: 3, price: '$418.30', total: '$1,254.90', strategy: 'Mean Reversion', status: 'Filled', time: '15:52:11' },
  { id: 'ORD-005', symbol: 'ETH', side: 'Sell', qty: 1, price: '$3,450', total: '$3,450', strategy: 'ML Sentiment', status: 'Cancelled', time: '15:40:22' },
  { id: 'ORD-006', symbol: 'NVDA', side: 'Buy', qty: 2, price: '$875.40', total: '$1,750.80', strategy: 'Momentum Trend', status: 'Rejected', time: '15:28:44' },
];

const statusConfig: Record<string, { icon: typeof CheckCircle2; text: string; badge: string }> = {
  Filled: { icon: CheckCircle2, text: 'text-[rgb(var(--success))]', badge: 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]' },
  Pending: { icon: Clock, text: 'text-[rgb(var(--warning))]', badge: 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))]' },
  Cancelled: { icon: XCircle, text: 'text-[rgb(var(--muted-foreground))]', badge: 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]' },
  Rejected: { icon: XCircle, text: 'text-[rgb(var(--destructive))]', badge: 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))]' },
};

const summaryStats = [
  { label: 'Total Orders', value: '89', sub: 'today' },
  { label: 'Filled', value: '81', color: 'text-[rgb(var(--success))]' },
  { label: 'Pending', value: '2', color: 'text-[rgb(var(--warning))]' },
  { label: 'Fill Rate', value: '91%', color: 'text-[rgb(var(--primary))]' },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Orders</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">View all trading orders placed by your AI agents</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all">
          <Filter className="h-4 w-4" strokeWidth={1.5} />
          Filter
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
            <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color ?? 'text-[rgb(var(--foreground))]'}`}>{s.value}</p>
            {s.sub && <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{s.sub}</p>}
          </div>
        ))}
      </div>

      {/* Orders table */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Order History</h2>
          <div className="flex gap-1.5 rounded-lg bg-[rgb(var(--muted))] p-0.5">
            {['All', 'Filled', 'Pending', 'Cancelled'].map((tab, i) => (
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
                {['Order ID', 'Symbol', 'Side', 'Qty', 'Price', 'Total', 'Strategy', 'Status', 'Time'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {orders.map((order) => {
                const { icon: Icon, badge } = statusConfig[order.status] ?? statusConfig.Cancelled;
                return (
                  <tr key={order.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[rgb(var(--muted-foreground))]">{order.id}</td>
                    <td className="px-4 py-3 font-mono font-semibold text-[rgb(var(--foreground))]">{order.symbol}</td>
                    <td className="px-4 py-3">
                      <span className={`font-medium ${order.side === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                        {order.side}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[rgb(var(--foreground))]">{order.qty}</td>
                    <td className="px-4 py-3 font-mono text-[rgb(var(--foreground))]">{order.price}</td>
                    <td className="px-4 py-3 font-mono text-[rgb(var(--foreground))]">{order.total}</td>
                    <td className="px-4 py-3 text-xs text-[rgb(var(--muted-foreground))]">{order.strategy}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${badge}`}>
                        <Icon className="h-3 w-3" strokeWidth={2} />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[rgb(var(--muted-foreground))]">{order.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
