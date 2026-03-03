import { Metadata } from 'next';
import { Layers, Zap, Info } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Strategy Builder — ShefaFx',
    description: 'Visual drag-and-drop builder for AI trading strategies.',
};

const blocks = [
    { id: 'entry', label: 'Entry Signal', icon: 'E', color: 'text-[rgb(var(--success))]', bg: 'bg-[rgb(var(--success))]/10 border-[rgb(var(--success))]/20', desc: 'EMA 20 > EMA 50 + Volume > 1.5x avg' },
    { id: 'risk', label: 'Risk Guard', icon: 'R', color: 'text-[rgb(var(--warning))]', bg: 'bg-[rgb(var(--warning))]/10 border-[rgb(var(--warning))]/20', desc: 'Max position 5% of portfolio' },
    { id: 'exit', label: 'Exit Signal', icon: 'X', color: 'text-[rgb(var(--destructive))]', bg: 'bg-[rgb(var(--destructive))]/10 border-[rgb(var(--destructive))]/20', desc: 'RSI > 75 OR drawdown > 8%' },
];

const palette = ['EMA Crossover', 'RSI Filter', 'Volume Spike', 'MACD Signal', 'Bollinger Bands', 'Sentiment Score', 'Price Breakout', 'News Trigger'];

export default function StrategyBuilderPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Strategy Builder</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Visually compose your trading logic</p>
                </div>
                <div className="flex gap-2">
                    <button className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all">
                        Save Draft
                    </button>
                    <button className="rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all shadow-[var(--shadow-glow)]">
                        Deploy Strategy
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[rgb(var(--primary))]/20 bg-[rgb(var(--primary))]/5 px-4 py-3">
                <Info className="h-4 w-4 text-[rgb(var(--primary))] flex-shrink-0" strokeWidth={1.5} />
                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    Drag blocks from the palette onto the canvas to compose your strategy logic. Full visual builder coming soon — use the Create form for now.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-4">
                {/* Block palette */}
                <div className="lg:col-span-1">
                    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgb(var(--border))]">
                            <Layers className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                            <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">Block Palette</h2>
                        </div>
                        <div className="p-3 space-y-1.5">
                            {palette.map((block) => (
                                <div
                                    key={block}
                                    className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-xs font-medium text-[rgb(var(--foreground))] cursor-grab hover:border-[rgb(var(--primary))]/40 hover:bg-[rgb(var(--primary))]/5 transition-all"
                                >
                                    {block}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="lg:col-span-3">
                    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden" style={{ minHeight: '400px' }}>
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgb(var(--border))]">
                            <Zap className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                            <h2 className="text-sm font-semibold text-[rgb(var(--foreground))]">Canvas</h2>
                            <span className="ml-auto text-xs text-[rgb(var(--muted-foreground))]">Strategy: Untitled</span>
                        </div>
                        <div className="p-6 space-y-3">
                            {blocks.map((b, i) => (
                                <div key={b.id}>
                                    <div className={`rounded-xl border p-4 flex items-start gap-3 ${b.bg}`}>
                                        <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--card))] text-xs font-bold border border-[rgb(var(--border))] ${b.color}`}>
                                            {b.icon}
                                        </span>
                                        <div className="flex-1">
                                            <p className={`text-sm font-semibold mb-0.5 ${b.color}`}>{b.label}</p>
                                            <p className="text-xs text-[rgb(var(--muted-foreground))]">{b.desc}</p>
                                        </div>
                                        <button className="text-[10px] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">Edit</button>
                                    </div>
                                    {i < blocks.length - 1 && (
                                        <div className="flex justify-center py-1">
                                            <div className="h-6 w-px bg-[rgb(var(--border))]" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="rounded-xl border-2 border-dashed border-[rgb(var(--border))] p-6 text-center mt-4">
                                <p className="text-sm text-[rgb(var(--muted-foreground))]">Drop blocks here to add more logic</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
