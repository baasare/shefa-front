import { Metadata } from 'next';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Glossary — ShefaFx',
    description: 'Definitions of trading and AI terms used in ShefaFx.',
};

const terms = [
    {
        letter: 'A', entries: [
            { term: 'Algorithmic Trading', def: 'The use of computer programs to execute trades automatically based on pre-defined criteria or signals.' },
            { term: 'Alpha', def: 'A measure of a portfolio\'s excess return compared to a benchmark index, adjusted for risk.' },
            { term: 'Arbitrage', def: 'The simultaneous purchase and sale of correlated assets in different markets to profit from price discrepancies.' },
        ]
    },
    {
        letter: 'B', entries: [
            { term: 'Backtesting', def: 'Testing a trading strategy on historical data to evaluate its performance before live deployment.' },
            { term: 'Bollinger Bands', def: 'A volatility indicator that plots bands two standard deviations above and below a moving average.' },
        ]
    },
    {
        letter: 'D', entries: [
            { term: 'Drawdown', def: 'The percentage decline from a peak portfolio value to its subsequent trough, used to measure risk.' },
            { term: 'Diversification', def: 'Spreading investments across different assets to reduce portfolio risk.' },
        ]
    },
    {
        letter: 'H', entries: [
            { term: 'HITL (Human-in-the-Loop)', def: 'A system design where human oversight is required for certain AI decisions before execution.' },
        ]
    },
    {
        letter: 'M', entries: [
            { term: 'MACD', def: 'Moving Average Convergence Divergence — a trend-following momentum indicator using two EMAs.' },
            { term: 'Mean Reversion', def: 'A strategy based on the theory that prices tend to return to their historical average over time.' },
            { term: 'Momentum Trading', def: 'A strategy that buys assets trending upward and sells those trending downward.' },
        ]
    },
    {
        letter: 'R', entries: [
            { term: 'RSI (Relative Strength Index)', def: 'A momentum oscillator measuring the speed and magnitude of price changes, scaled 0–100.' },
            { term: 'Risk-Adjusted Return', def: 'A return measurement that accounts for the amount of risk taken to achieve the return (e.g., Sharpe ratio).' },
        ]
    },
    {
        letter: 'S', entries: [
            { term: 'Sharpe Ratio', def: 'A measure of risk-adjusted performance = (portfolio return − risk-free rate) / standard deviation.' },
            { term: 'Sentiment Analysis', def: 'Using NLP to gauge market sentiment from news, social media, and other textual data sources.' },
            { term: 'Stop-Loss', def: 'An order to sell a position when it reaches a specified price, meant to limit potential losses.' },
        ]
    },
    {
        letter: 'V', entries: [
            { term: 'Volatility', def: 'A statistical measure of the dispersion of returns for a given security, often expressed as a percentage.' },
            { term: 'VaR (Value at Risk)', def: 'The maximum expected loss over a given time period at a specified confidence level.' },
        ]
    },
];

export default function GlossaryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Glossary</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Key trading and AI terms explained</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                <input type="text" placeholder="Search terms..." className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-3 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
            </div>

            {/* Alphabet nav */}
            <div className="flex flex-wrap gap-1.5">
                {terms.map((group) => (
                    <a
                        key={group.letter}
                        href={`#letter-${group.letter}`}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/10 transition-all"
                    >
                        {group.letter}
                    </a>
                ))}
            </div>

            {/* Terms */}
            <div className="space-y-8">
                {terms.map((group) => (
                    <div key={group.letter} id={`letter-${group.letter}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-bold text-[rgb(var(--primary))]">{group.letter}</span>
                            <div className="flex-1 h-px bg-[rgb(var(--border))]" />
                        </div>
                        <div className="space-y-3">
                            {group.entries.map((entry) => (
                                <div key={entry.term} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
                                    <h3 className="font-semibold text-[rgb(var(--foreground))] mb-1">{entry.term}</h3>
                                    <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">{entry.def}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
