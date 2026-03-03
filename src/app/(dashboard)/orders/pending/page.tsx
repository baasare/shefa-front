import { Metadata } from 'next';
import { Clock, AlertCircle } from 'lucide-react';
import { mockOrders } from '@/lib/data/orders';

export const metadata: Metadata = {
    title: 'Pending Orders — ShefaFx',
    description: 'View and manage all pending trading orders.',
};

const pendingOrders = mockOrders.filter((o) => o.status === 'Pending');

export default function PendingOrdersPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Pending Orders</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Orders awaiting execution or approval</p>
            </div>

            {pendingOrders.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 p-16 text-center">
                    <Clock className="h-10 w-10 text-[rgb(var(--muted-foreground))] mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-base font-semibold text-[rgb(var(--foreground))] mb-1">No pending orders</p>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">All orders have been processed.</p>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--warning))]/30 bg-[rgb(var(--warning))]/5 px-4 py-3">
                        <AlertCircle className="h-4 w-4 text-[rgb(var(--warning))] flex-shrink-0" strokeWidth={1.5} />
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">
                            <span className="font-semibold text-[rgb(var(--foreground))]">{pendingOrders.length} order{pendingOrders.length > 1 ? 's' : ''}</span> awaiting execution or human approval.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {pendingOrders.map((order) => (
                            <div key={order.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-xs text-[rgb(var(--muted-foreground))]">{order.id}</span>
                                            <span className={`font-mono font-bold text-sm ${order.side === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                {order.side} {order.symbol}
                                            </span>
                                            <span className="text-xs text-[rgb(var(--muted-foreground))]">{order.type}</span>
                                        </div>
                                        <div className="flex gap-4 text-xs mt-2">
                                            <span className="text-[rgb(var(--muted-foreground))]">Qty: <span className="font-semibold text-[rgb(var(--foreground))]">{order.qty}</span></span>
                                            <span className="text-[rgb(var(--muted-foreground))]">Price: <span className="font-mono font-semibold text-[rgb(var(--foreground))]">${order.price.toLocaleString()}</span></span>
                                            <span className="text-[rgb(var(--muted-foreground))]">Total: <span className="font-mono font-semibold text-[rgb(var(--foreground))]">${order.total.toLocaleString()}</span></span>
                                        </div>
                                        {order.note && (
                                            <p className="text-xs text-[rgb(var(--warning))] mt-2">{order.note}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2 flex-shrink-0">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(var(--warning))]/10 border border-[rgb(var(--warning))]/20 px-2.5 py-1 text-xs font-medium text-[rgb(var(--warning))]">
                                            <Clock className="h-3 w-3" strokeWidth={2} />
                                            Pending
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4 pt-4 border-t border-[rgb(var(--border))]">
                                    <button className="rounded-full bg-[rgb(var(--success))] px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-all">
                                        Execute Now
                                    </button>
                                    <button className="rounded-full border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-1.5 text-xs font-medium text-[rgb(var(--destructive))] hover:opacity-80 transition-all">
                                        Cancel Order
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
