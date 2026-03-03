'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Building2, ExternalLink } from 'lucide-react';
import { routes } from '@/lib/config/routes';
import { cn } from '@/lib/utils/cn';

const brokers = [
    {
        id: 'alpaca',
        name: 'Alpaca',
        description: 'Commission-free stock & crypto trading API',
        region: 'US',
        type: 'Stocks & Crypto',
        logo: '🦙',
        popular: true,
    },
    {
        id: 'interactive',
        name: 'Interactive Brokers',
        description: 'Professional-grade multi-asset broker',
        region: 'Global',
        type: 'All Assets',
        logo: '🏦',
    },
    {
        id: 'binance',
        name: 'Binance',
        description: 'World\'s largest crypto exchange by volume',
        region: 'Global',
        type: 'Crypto',
        logo: '₿',
        popular: true,
    },
    {
        id: 'coinbase',
        name: 'Coinbase Advanced',
        description: 'Institutional crypto trading platform',
        region: 'US/EU',
        type: 'Crypto',
        logo: '🔷',
    },
    {
        id: 'td',
        name: 'TD Ameritrade',
        description: 'Full-service retail brokerage',
        region: 'US',
        type: 'Stocks & ETFs',
        logo: '🇺🇸',
    },
    {
        id: 'skip',
        name: 'I\'ll connect later',
        description: 'Set up broker connection from settings',
        region: '',
        type: '',
        logo: '⏭',
    },
];

export default function ConnectBrokerPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [step, setStep] = useState<'select' | 'credentials'>('select');

    const selectedBroker = brokers.find((b) => b.id === selected);

    const handleSelect = (id: string) => {
        setSelected(id);
        if (id === 'skip') return;
        setStep('credentials');
    };

    const handleNext = async () => {
        setIsConnecting(true);
        await new Promise((r) => setTimeout(r, 800));
        router.push(routes.onboarding.createPortfolio);
    };

    const handleBack = () => {
        if (step === 'credentials') {
            setStep('select');
            return;
        }
        router.push(routes.onboarding.riskProfile);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-[rgb(var(--foreground))]">
                    Connect your broker
                </h1>
                <p className="text-[rgb(var(--muted-foreground))]">
                    Link your trading account so our AI agents can execute strategies on your behalf.
                </p>
            </div>

            {step === 'select' && (
                <div className="grid gap-3 sm:grid-cols-2">
                    {brokers.map((broker) => (
                        <button
                            key={broker.id}
                            onClick={() => handleSelect(broker.id)}
                            className={cn(
                                'relative rounded-xl border-2 bg-[rgb(var(--card))] p-4 text-left transition-all duration-200 hover:-translate-y-0.5',
                                selected === broker.id
                                    ? 'border-[rgb(var(--primary))]/50 ring-2 ring-[rgb(var(--primary))]/30'
                                    : 'border-[rgb(var(--border))] hover:border-[rgb(var(--border))]/80'
                            )}
                        >
                            {broker.popular && (
                                <span className="absolute -top-2.5 left-4 rounded-full bg-[rgb(var(--primary))]/20 border border-[rgb(var(--primary))]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[rgb(var(--primary))]">
                                    Popular
                                </span>
                            )}
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{broker.logo}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-[rgb(var(--foreground))] text-sm">{broker.name}</p>
                                    <p className="text-xs text-[rgb(var(--muted-foreground))] truncate">{broker.description}</p>
                                </div>
                                {broker.type && (
                                    <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-[10px] font-medium text-[rgb(var(--muted-foreground))] whitespace-nowrap">
                                        {broker.type}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {step === 'credentials' && selectedBroker && (
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                    <div className="flex items-center gap-3 pb-4 border-b border-[rgb(var(--border))]">
                        <span className="text-3xl">{selectedBroker.logo}</span>
                        <div>
                            <h3 className="font-semibold text-[rgb(var(--foreground))]">{selectedBroker.name}</h3>
                            <p className="text-sm text-[rgb(var(--muted-foreground))]">{selectedBroker.description}</p>
                        </div>
                    </div>

                    <div className="rounded-lg bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 p-4 flex gap-3">
                        <Building2 className="h-5 w-5 text-[rgb(var(--primary))] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="text-sm">
                            <p className="font-medium text-[rgb(var(--foreground))] mb-1">API Key Only — Read-Restricted</p>
                            <p className="text-[rgb(var(--muted-foreground))] text-xs leading-relaxed">
                                ShefaFx uses trading-only API keys. We never have access to withdrawal permissions.
                                Your funds remain 100% under your control.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[rgb(var(--foreground))]">
                                API Key <span className="text-[rgb(var(--destructive))]">*</span>
                            </label>
                            <input
                                type="text"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="e.g. APCA-API-KEY-ID or pk_..."
                                className="w-full rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-4 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:border-[rgb(var(--primary))]/60 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[rgb(var(--foreground))]">
                                API Secret <span className="text-[rgb(var(--destructive))]">*</span>
                            </label>
                            <input
                                type="password"
                                value={apiSecret}
                                onChange={(e) => setApiSecret(e.target.value)}
                                placeholder="Your API secret key"
                                className="w-full rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-4 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:border-[rgb(var(--primary))]/60 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 transition-all"
                            />
                        </div>
                    </div>

                    <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-sm text-[rgb(var(--primary))] hover:underline"
                    >
                        How to get your API key
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                    </a>
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2} />
                    Back
                </button>

                <button
                    onClick={handleNext}
                    disabled={!selected || isConnecting}
                    className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isConnecting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                        <>
                            {selected === 'skip' ? 'Skip for now' : (
                                step === 'credentials' ? (
                                    <>
                                        <CheckCircle className="h-4 w-4" strokeWidth={2} />
                                        Connect Broker
                                    </>
                                ) : 'Continue'
                            )}
                            {selected !== 'skip' && step === 'select' && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
