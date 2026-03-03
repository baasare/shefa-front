/**
 * Risk Disclosures Legal Page
 */

const sections = [
    {
        id: 'general',
        title: '1. General Trading Risks',
        content: `Trading financial instruments, including equities, futures, options, forex, and cryptocurrencies, involves substantial risk of loss and is not suitable for all investors. The value of financial instruments can decrease as well as increase, and you may not recover the amount you originally invested. You should carefully consider your investment objectives, level of experience, and risk appetite before investing. Do not invest capital that you cannot afford to lose.`,
    },
    {
        id: 'algo',
        title: '2. Algorithmic Trading Risks',
        content: `Algorithmic and automated trading systems carry specific risks that differ from manual trading. These include: system failures, software bugs, network interruptions, and unexpected market conditions that may cause the automated system to behave in unintended ways. Historical backtesting results may not accurately reflect future performance due to curve-fitting, overfitting, and changing market dynamics. Monitor your automated strategies regularly and maintain the ability to intervene or pause trading at any time.`,
    },
    {
        id: 'leverage',
        title: '3. Leverage Risks',
        content: `If the Service supports leveraged trading through connected broker accounts, be aware that leverage amplifies both gains and losses. Trading on margin means that a small adverse price movement can result in losses that significantly exceed your initial deposit. Ensure you understand the margin requirements applicable to your trades and that you are aware of the potential for margin calls and forced position closeouts.`,
    },
    {
        id: 'volatility',
        title: '4. Market Volatility',
        content: `Financial markets can experience sudden and severe price movements driven by economic data, geopolitical events, regulatory announcements, or changes in market sentiment. During periods of extreme volatility, liquidity may be severely reduced, bid-ask spreads may widen dramatically, and order execution may occur at prices significantly different from expected. Stop-loss orders cannot guarantee protection against losses in fast-moving markets.`,
    },
    {
        id: 'technology',
        title: '5. Technology Risks',
        content: `The ShefaFx platform depends on complex technology infrastructure including internet connectivity, cloud servers, third-party APIs, and exchange connectivity. Technical failures, cyberattacks, or connectivity issues may temporarily prevent you from accessing the Service, monitoring positions, or executing trades. ShefaFx is not liable for losses arising from technical failures beyond our reasonable control. You should always maintain alternative means to access your exchange accounts in case of platform unavailability.`,
    },
    {
        id: 'regulatory',
        title: '6. Regulatory Risks',
        content: `Algorithmic trading and financial services are subject to regulation that varies significantly by jurisdiction. Regulatory frameworks are subject to change and new regulations may restrict or prohibit certain types of trades, strategies, or automated systems. It is your responsibility to ensure that your use of the Service complies with all applicable laws and regulations in your jurisdiction. ShefaFx does not provide legal or regulatory advice.`,
    },
    {
        id: 'crypto',
        title: '7. Cryptocurrency-Specific Risks',
        content: `Cryptocurrency markets are particularly volatile and subject to additional risks including: extreme price fluctuations, thin liquidity on certain trading pairs, risk of exchange hacks or insolvencies, regulatory uncertainty, technology risks (forks, smart contract bugs), and the potential for projects to become worthless. Cryptocurrency investments are not insured by government deposit protection schemes. Only allocate funds to cryptocurrency trading that you can afford to lose entirely.`,
    },
    {
        id: 'returns',
        title: '8. No Guarantee of Returns',
        content: `ShefaFx does not guarantee any specific trading results, profits, or returns. All performance data, backtest results, and example strategies presented on the platform are for illustrative purposes only and do not constitute a guarantee of future performance. The profitability of any trading strategy depends on factors including market conditions, execution quality, and individual risk management, which may vary significantly from historical results. Past performance shown by any strategy is not a reliable indicator of future results.`,
    },
];

export default function DisclosuresPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-shefa-navy">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex items-start gap-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wide mt-1">
                            ⚠ Important
                        </span>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Risk Disclosures</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: March 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Primary Warning Callout */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <div className="bg-amber-50 dark:bg-amber-500/10 border-2 border-amber-300 dark:border-amber-500/40 rounded-2xl px-6 py-5 flex items-start gap-4">
                    <span className="text-amber-500 text-2xl mt-0.5 shrink-0">⚠</span>
                    <div>
                        <p className="font-bold text-amber-900 dark:text-amber-300 mb-1">Important Risk Warning</p>
                        <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                            <strong>Trading involves significant risk of loss.</strong> Past performance is not indicative of future results. Algorithmic trading does not eliminate risk — it changes how risk is managed. This is not financial advice. You should consider whether trading is appropriate for you given your financial situation, objectives, and risk tolerance.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-[220px_1fr] gap-12">
                    {/* Sidebar TOC */}
                    <aside className="hidden lg:block">
                        <nav className="sticky top-24 space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Contents</p>
                            {sections.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="block text-sm text-slate-600 dark:text-slate-400 hover:text-primary py-1.5 transition-colors leading-snug"
                                >
                                    {s.title}
                                </a>
                            ))}
                            <a href="#acknowledgment" className="block text-sm text-slate-600 dark:text-slate-400 hover:text-primary py-1.5 transition-colors leading-snug">
                                9. Acknowledgment
                            </a>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="max-w-2xl space-y-10">
                        {sections.map((s) => (
                            <section key={s.id} id={s.id}>
                                <h2 className="text-xl font-bold mb-4 scroll-mt-24">{s.title}</h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">{s.content}</p>
                            </section>
                        ))}

                        {/* Acknowledgment */}
                        <section id="acknowledgment">
                            <div className="bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/20 rounded-2xl p-6">
                                <h2 className="text-xl font-bold mb-3">9. Acknowledgment</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed">
                                    By using ShefaFx and activating any trading agent or strategy, you acknowledge that you have read, understood, and accepted these Risk Disclosures in their entirety. You confirm that you are aware of the risks associated with algorithmic and automated trading and that you will only use capital you can afford to lose.
                                </p>
                            </div>
                        </section>

                        <div className="pt-8 border-t border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400">
                            <p>Questions about these disclosures? Contact us at{' '}
                                <a href="mailto:legal@shefafx.com" className="text-primary hover:underline">legal@shefafx.com</a>
                            </p>
                            <p className="mt-2">Last updated: March 3, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
