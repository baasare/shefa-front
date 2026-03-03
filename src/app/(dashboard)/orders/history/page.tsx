import { Metadata } from 'next';
import { mockOrders } from '@/lib/data/orders';
import { CheckCircle2, XCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Order History — ShefaFx',
    description: 'View your complete trading order history.',
};

const historyOrders = mockOrders.filter((o) => o.status !== 'Pending');

const statusConfig = {
    Filled: { badge: 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]', icon: CheckCircle2 },
    Cancelled: { badge: 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]', icon: XCircle },
    Rejected: { badge: 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))]', icon: XCircle },
};

export default function OrderHistoryPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Order History</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">All filled, cancelled, and rejected orders</p>
                </div>
                <div className="flex gap-2">
                    {['1D', '1W', '1M', 'All'].map((p, i) => (
                        <button key={p} className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${i === 3 ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/20' : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:text-[rgb(var(--foreground))]'}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
                {[
                    { label: 'Total', value: String(historyOrders.length) },
                    { label: 'Filled', value: String(historyOrders.filter((o) => o.status === 'Filled').length), color: 'text-[rgb(var(--success))]' },
                    { label: 'Cancelled', value: String(historyOrders.filter((o) => o.status === 'Cancelled').length), color: 'text-[rgb(var(--muted-foreground))]' },
                    { label: 'Rejected', value: String(historyOrders.filter((o) => o.status === 'Rejected').length), color: 'text-[rgb(var(--destructive))]' },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold font-mono ${s.color ?? 'text-[rgb(var(--foreground))]'}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                {['Order ID', 'Symbol', 'Side', 'Type', 'Qty', 'Price', 'Total', 'Strategy', 'Status', 'Date'].map((col) => (
                                    <th key={col} className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgb(var(--border))]">
                            {historyOrders.map((order) => {
                                const cfg = statusConfig[order.status as keyof typeof statusConfig] ?? statusConfig.Cancelled;
                                const Icon = cfg.icon;
                                return (
                                    <tr key={order.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-[rgb(var(--muted-foreground))]">{order.id}</td>
                                        <td className="px-4 py-3 font-mono font-semibold text-[rgb(var(--foreground))]">{order.symbol}</td>
                                        <td className="px-4 py-3">
                                            <span className={`font-medium text-xs ${order.side === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>{order.side}</span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-[rgb(var(--muted-foreground))]">{order.type}</td>
                                        <td className="px-4 py-3 text-[rgb(var(--foreground))]">{order.qty}</td>
                                        <td className="px-4 py-3 font-mono text-[rgb(var(--foreground))]">${order.price.toLocaleString()}</td>
                                        <td className="px-4 py-3 font-mono text-[rgb(var(--foreground))]">${order.total.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-xs text-[rgb(var(--muted-foreground))]">{order.strategy}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.badge}`}>
                                                <Icon className="h-3 w-3" strokeWidth={2} />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-mono text-xs text-[rgb(var(--muted-foreground))] whitespace-nowrap">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
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
