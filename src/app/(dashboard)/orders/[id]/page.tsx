'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/data/orders';
import { ArrowLeft, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface Props { params: { id: string } }

const statusConfig = {
    Filled: { badge: 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))] border-[rgb(var(--success))]/20', icon: CheckCircle2 },
    Pending: { badge: 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))] border-[rgb(var(--warning))]/20', icon: Clock },
    Cancelled: { badge: 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))]', icon: XCircle },
    Rejected: { badge: 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))] border-[rgb(var(--destructive))]/20', icon: XCircle },
};

export default function OrderDetailPage({ params }: Props) {
    const order = getOrderById(params.id);
    if (!order) notFound();

    const router = useRouter();
    const [showCancel, setShowCancel] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    const cfg = statusConfig[order.status] ?? statusConfig.Cancelled;
    const StatusIcon = cfg.icon;

    async function handleCancel() {
        setCancelling(true);
        await new Promise((res) => setTimeout(res, 800));
        router.push('/orders');
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <Link href="/orders" className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors">
                        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                        Back to Orders
                    </Link>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))] font-mono">{order.id}</h1>
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cfg.badge}`}>
                            <StatusIcon className="h-3 w-3" strokeWidth={2} />
                            {order.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`font-mono font-bold text-base ${order.side === 'Buy' ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                            {order.side}
                        </span>
                        <span className="font-mono font-bold text-base text-[rgb(var(--foreground))]">{order.symbol}</span>
                        <span className="text-sm text-[rgb(var(--muted-foreground))]">— {order.name}</span>
                    </div>
                </div>
                {order.status === 'Pending' && (
                    <button
                        onClick={() => setShowCancel(true)}
                        className="flex items-center gap-2 rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-4 py-2 text-sm font-medium text-[rgb(var(--destructive))] hover:opacity-80 transition-all"
                    >
                        <XCircle className="h-4 w-4" strokeWidth={1.5} />
                        Cancel Order
                    </button>
                )}
            </div>

            {/* Order details */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Order Type', value: order.type },
                    { label: 'Quantity', value: String(order.qty) },
                    { label: 'Price', value: `$${order.price.toLocaleString()}` },
                    { label: 'Total Value', value: `$${order.total.toLocaleString()}` },
                ].map((card) => (
                    <div key={card.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">{card.label}</p>
                        <p className="text-xl font-bold font-mono text-[rgb(var(--foreground))]">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">Order Info</h2>
                    <dl className="space-y-3">
                        {[
                            { label: 'Strategy', value: order.strategy },
                            { label: 'Agent', value: order.agentId },
                            { label: 'Filled Qty', value: String(order.filledQty) },
                            { label: 'Created', value: new Date(order.createdAt).toLocaleString() },
                            { label: 'Last Updated', value: new Date(order.updatedAt).toLocaleString() },
                        ].map((item) => (
                            <div key={item.label} className="flex justify-between">
                                <dt className="text-xs text-[rgb(var(--muted-foreground))]">{item.label}</dt>
                                <dd className="text-xs font-medium text-[rgb(var(--foreground))]">{item.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                {order.note && (
                    <div className="rounded-xl border border-[rgb(var(--warning))]/30 bg-[rgb(var(--warning))]/5 p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-[rgb(var(--warning))]" strokeWidth={1.5} />
                            <h3 className="text-sm font-semibold text-[rgb(var(--foreground))]">Note</h3>
                        </div>
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">{order.note}</p>
                    </div>
                )}
            </div>

            {/* Cancel confirm dialog */}
            {showCancel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-xl w-full max-w-sm mx-4">
                        <h3 className="text-base font-semibold text-[rgb(var(--foreground))] mb-2">Cancel Order?</h3>
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-5">
                            This will cancel order <span className="font-mono font-semibold">{order.id}</span> ({order.side} {order.qty} {order.symbol} @ ${order.price.toLocaleString()}). This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={handleCancel} disabled={cancelling} className="flex-1 rounded-full bg-[rgb(var(--destructive))] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">
                                {cancelling ? 'Cancelling...' : 'Yes, Cancel'}
                            </button>
                            <button onClick={() => setShowCancel(false)} className="flex-1 rounded-full border border-[rgb(var(--border))] px-4 py-2.5 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]">
                                Keep Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
