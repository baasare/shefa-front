import { Metadata } from 'next';
import { Link2, Plus, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Connected Brokers — ShefaFx',
    description: 'Manage your connected broker accounts.',
};

const brokers = [
    { id: 'b1', name: 'Interactive Brokers', account: 'U1234567', status: 'Connected', type: 'Live', balance: '$84,230.50', lastSync: '2 min ago' },
    { id: 'b2', name: 'Alpaca Markets', account: 'PA-XXXXXXX', status: 'Connected', type: 'Paper', balance: '$100,000.00', lastSync: '5 min ago' },
];

const supportedBrokers = ['Interactive Brokers', 'Alpaca', 'TD Ameritrade', 'Robinhood', 'Coinbase Advanced', 'Binance'];

export default function BrokersSettingsPage() {
    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Connected Brokers</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Manage your broker connections for live and paper trading</p>
                </div>
                <button className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all shadow-[var(--shadow-glow)]">
                    <Plus className="h-4 w-4" strokeWidth={2} />
                    Add Broker
                </button>
            </div>

            {/* Connected brokers */}
            <div className="space-y-3">
                {brokers.map((broker) => (
                    <div key={broker.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--muted))] border border-[rgb(var(--border))]">
                                    <Link2 className="h-5 w-5 text-[rgb(var(--foreground))]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-[rgb(var(--foreground))]">{broker.name}</p>
                                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${broker.type === 'Live' ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]' : 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'}`}>
                                            {broker.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[rgb(var(--muted-foreground))]">Account: {broker.account}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[rgb(var(--success))]" strokeWidth={1.5} />
                                <span className="text-xs text-[rgb(var(--success))] font-medium">{broker.status}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgb(var(--border))]">
                            <div className="flex gap-4 text-xs">
                                <span className="text-[rgb(var(--muted-foreground))]">Balance: <span className="font-mono font-semibold text-[rgb(var(--foreground))]">{broker.balance}</span></span>
                                <span className="text-[rgb(var(--muted-foreground))]">Last sync: {broker.lastSync}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-xs text-[rgb(var(--primary))] hover:underline">Sync</button>
                                <button className="text-xs text-[rgb(var(--destructive))] hover:underline">Disconnect</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Supported brokers */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                <h2 className="text-sm font-semibold text-[rgb(var(--foreground))] mb-3">Supported Brokers</h2>
                <div className="flex flex-wrap gap-2">
                    {supportedBrokers.map((b) => (
                        <span key={b} className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/50 px-3 py-1.5 text-xs text-[rgb(var(--muted-foreground))]">
                            {b}
                        </span>
                    ))}
                </div>
                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-3">More brokers coming soon. <button className="text-[rgb(var(--primary))] hover:underline">Request a broker →</button></p>
            </div>
        </div>
    );
}
