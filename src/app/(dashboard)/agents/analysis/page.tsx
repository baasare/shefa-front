import { Metadata } from 'next';
import { Brain, Sparkles, LineChart, FileText } from 'lucide-react';

export const metadata: Metadata = {
    title: 'New Analysis — ShefaFx',
    description: 'Request a new market analysis from your AI agents.',
};

const analysisTypes = [
    { id: 'technical', icon: LineChart, label: 'Technical Analysis', desc: 'EMA, RSI, MACD, Bollinger Bands and more.' },
    { id: 'sentiment', icon: Sparkles, label: 'Sentiment Analysis', desc: 'NLP scan across news and social media.' },
    { id: 'fundamental', icon: FileText, label: 'Fundamental Analysis', desc: 'Earnings, PE ratio, revenue growth.' },
];

const recentAnalyses = [
    { symbol: 'AAPL', type: 'Technical', result: 'Strong Buy', score: 88, time: '2 min ago' },
    { symbol: 'BTC', type: 'Sentiment', result: 'Bullish', score: 78, time: '8 min ago' },
    { symbol: 'MSFT', type: 'Fundamental', result: 'Buy', score: 74, time: '15 min ago' },
    { symbol: 'TSLA', type: 'Technical', result: 'Neutral', score: 51, time: '32 min ago' },
];

export default function AgentAnalysisPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">New Analysis</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Request the Analysis Agent to evaluate a market</p>
            </div>

            {/* Request form */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                    <Brain className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Analysis Request</h2>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Symbol / Ticker *</label>
                    <input type="text" placeholder="e.g. AAPL, BTC, EUR/USD" className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] font-mono uppercase" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">Analysis Type *</label>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {analysisTypes.map((type, i) => {
                            const Icon = type.icon;
                            return (
                                <label key={type.id} className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${i === 0 ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/5' : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/40'}`}>
                                    <input type="radio" name="analysisType" value={type.id} className="sr-only" defaultChecked={i === 0} />
                                    <Icon className="h-5 w-5 text-[rgb(var(--primary))] mb-2" strokeWidth={1.5} />
                                    <span className="text-sm font-medium text-[rgb(var(--foreground))]">{type.label}</span>
                                    <span className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{type.desc}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Time Frame</label>
                    <select className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]">
                        <option>Short-term (1–5 days)</option>
                        <option>Medium-term (1–4 weeks)</option>
                        <option>Long-term (1–6 months)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-1.5">Additional Instructions</label>
                    <textarea rows={3} placeholder="Any specific focus areas for the analysis..." className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] resize-none" />
                </div>
                <button className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-all shadow-[var(--shadow-glow)]">
                    <Brain className="h-4 w-4" strokeWidth={1.5} />
                    Run Analysis
                </button>
            </div>

            {/* Recent analyses */}
            <div>
                <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-3">Recent Analyses</h2>
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] divide-y divide-[rgb(var(--border))]">
                    {recentAnalyses.map((a) => (
                        <div key={`${a.symbol}-${a.time}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[rgb(var(--muted))]/20 transition-colors">
                            <span className="font-mono font-bold text-sm text-[rgb(var(--foreground))] w-12">{a.symbol}</span>
                            <span className="text-xs text-[rgb(var(--muted-foreground))] w-24">{a.type}</span>
                            <span className={`flex-1 text-sm font-semibold ${a.result.includes('Buy') || a.result === 'Bullish' ? 'text-[rgb(var(--success))]' : a.result === 'Neutral' ? 'text-[rgb(var(--foreground))]' : 'text-[rgb(var(--destructive))]'}`}>
                                {a.result}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <div className="h-1.5 w-20 rounded-full bg-[rgb(var(--muted))]">
                                    <div className="h-1.5 rounded-full bg-[rgb(var(--primary))]" style={{ width: `${a.score}%` }} />
                                </div>
                                <span className="text-xs font-mono text-[rgb(var(--muted-foreground))]">{a.score}%</span>
                            </div>
                            <span className="text-xs text-[rgb(var(--muted-foreground))] w-20 text-right">{a.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
