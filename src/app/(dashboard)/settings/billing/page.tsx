import { Metadata } from 'next';
import { CreditCard, Check, Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Billing — ShefaFx',
    description: 'Manage your subscription plan and billing.',
};

const invoices = [
    { id: 'INV-2024-12', date: 'Dec 1, 2024', amount: '$49.00', status: 'Paid' },
    { id: 'INV-2024-11', date: 'Nov 1, 2024', amount: '$49.00', status: 'Paid' },
    { id: 'INV-2024-10', date: 'Oct 1, 2024', amount: '$49.00', status: 'Paid' },
    { id: 'INV-2024-09', date: 'Sep 1, 2024', amount: '$49.00', status: 'Paid' },
];

const plans = [
    { name: 'Starter', price: '$0', period: 'Forever free', features: ['1 strategy', '1 AI agent', 'Paper trading only'], current: false },
    { name: 'Pro', price: '$49', period: 'per month', features: ['Unlimited strategies', '4 AI agents', 'Live trading', 'Priority support', 'Advanced analytics'], current: true },
    { name: 'Enterprise', price: 'Custom', period: 'per month', features: ['Everything in Pro', 'Dedicated support', 'Custom AI models', 'White-label option'], current: false },
];

export default function BillingPage() {
    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Billing</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Manage your plan and payment details</p>
            </div>

            {/* Current plan */}
            <div className="rounded-xl border border-[rgb(var(--primary))]/30 bg-[rgb(var(--primary))]/5 p-5 flex items-center justify-between">
                <div>
                    <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">Current Plan</p>
                    <p className="text-xl font-bold text-[rgb(var(--foreground))]">Pro Plan <span className="text-[rgb(var(--primary))]">$49/mo</span></p>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">Next billing: January 1, 2025</p>
                </div>
                <button className="rounded-lg border border-[rgb(var(--destructive))]/30 px-4 py-2 text-sm font-medium text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/10 transition-all">
                    Cancel Subscription
                </button>
            </div>

            {/* Plan comparison */}
            <div className="grid gap-4 sm:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className={`rounded-xl border p-5 ${plan.current ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/5' : 'border-[rgb(var(--border))] bg-[rgb(var(--card))]'}`}>
                        {plan.current && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[rgb(var(--primary))] px-2 py-0.5 text-[10px] font-bold text-white uppercase mb-2">
                                <Check className="h-2.5 w-2.5" strokeWidth={3} />
                                Current
                            </span>
                        )}
                        <h3 className="font-bold text-[rgb(var(--foreground))]">{plan.name}</h3>
                        <div className="mt-1 mb-3">
                            <span className="text-xl font-bold font-mono text-[rgb(var(--foreground))]">{plan.price}</span>
                            <span className="text-xs text-[rgb(var(--muted-foreground))] ml-1">{plan.period}</span>
                        </div>
                        <ul className="space-y-1.5 mb-4">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-center gap-2 text-xs text-[rgb(var(--muted-foreground))]">
                                    <Check className="h-3 w-3 text-[rgb(var(--success))] flex-shrink-0" strokeWidth={3} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        {!plan.current && (
                            <button className="w-full rounded-lg border border-[rgb(var(--border))] py-2 text-xs font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all">
                                {plan.name === 'Starter' ? 'Downgrade' : 'Upgrade'}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Payment method */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Payment Method</h2>
                    </div>
                    <button className="text-sm text-[rgb(var(--primary))] hover:underline">Update</button>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 px-4 py-3">
                    <CreditCard className="h-5 w-5 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                    <div>
                        <p className="text-sm font-medium text-[rgb(var(--foreground))]">Visa ending in 4242</p>
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">Expires 08/2027</p>
                    </div>
                </div>
            </div>

            {/* Invoices */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Invoice History</h2>
                </div>
                <div className="divide-y divide-[rgb(var(--border))]">
                    {invoices.map((inv) => (
                        <div key={inv.id} className="flex items-center justify-between px-5 py-3.5">
                            <div>
                                <p className="text-sm font-medium text-[rgb(var(--foreground))]">{inv.date}</p>
                                <p className="text-xs font-mono text-[rgb(var(--muted-foreground))]">{inv.id}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-mono font-semibold text-sm text-[rgb(var(--foreground))]">{inv.amount}</span>
                                <span className="text-xs font-medium text-[rgb(var(--success))]">{inv.status}</span>
                                <button className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
                                    <Download className="h-4 w-4" strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
