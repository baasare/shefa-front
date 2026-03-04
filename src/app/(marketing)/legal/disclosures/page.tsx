/**
 * Risk Disclosures Legal Page
 */

const sections = [
    {
        id: 'mandatory',
        title: 'MANDATORY ACKNOWLEDGMENT',
        content: `BY USING THE SHEFAFX PLATFORM, YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT: (1) You have read, understood, and accept all risks described in this document; (2) You understand that trading can result in the loss of some or all of your invested capital; (3) You are trading with money you can afford to lose without affecting your financial well-being; (4) You have the knowledge, experience, and risk tolerance necessary to engage in trading; (5) You will not hold ShefaFx liable for any trading losses; (6) You are solely responsible for all trading decisions and outcomes; (7) You have consulted with financial, tax, and legal professionals as appropriate. IF YOU DO NOT UNDERSTAND OR ACCEPT THESE RISKS, DO NOT USE THE PLATFORM.`,
    },
    {
        id: 'general',
        title: '1. GENERAL TRADING RISKS',
        content: `TRADING INVOLVES SUBSTANTIAL RISK OF LOSS. You may lose some or all of your invested capital. In some cases, losses can exceed your initial investment, particularly when trading on margin or with leveraged products. Key points: No guarantees - there is no guarantee that you will make any profit or avoid losses; Past performance is not indicative of future results; Capital at risk - you should only trade with money you can afford to lose; Rapid losses can occur particularly in volatile markets; You may lose 100% of your invested capital. Financial markets are inherently volatile and unpredictable due to economic conditions, political events, corporate events, market sentiment, regulatory changes, natural disasters, technology failures, and black swan events.`,
    },
    {
        id: 'liquidity',
        title: '1.3 Liquidity Risk',
        content: `Liquidity risk is the risk that you cannot buy or sell a security quickly enough at a fair price. This can result in: inability to exit positions when you want to; wide bid-ask spreads; slippage (executions at prices worse than expected); forced liquidation; and market impact from large orders. Liquidity risk is highest in small-cap and micro-cap stocks, OTC securities, after-hours trading, markets during periods of stress or panic, and thinly traded securities.`,
    },
    {
        id: 'volatility',
        title: '1.4 Volatility Risk',
        content: `Volatility measures the magnitude of price fluctuations. High volatility means: prices can change dramatically in short periods; stop-loss orders may not protect you from rapid declines; emotional decision-making is more likely; risk management becomes more difficult; profits and losses are amplified. Volatility can increase suddenly due to news, events, or changes in market conditions.`,
    },
    {
        id: 'concentration',
        title: '1.5 Concentration Risk',
        content: `Concentration risk arises when your portfolio is not adequately diversified. Risks include: overexposure to a single security, sector, or asset class; correlation risk where holdings move together in adverse conditions; idiosyncratic risk from company-specific events (bankruptcy, fraud); and sector-specific downturns. Diversification does not guarantee profit or protect against loss, but lack of diversification increases risk.`,
    },
    {
        id: 'algo',
        title: '2. AUTOMATED AND ALGORITHMIC TRADING RISKS',
        content: `NO STRATEGY IS GUARANTEED TO BE PROFITABLE. Automated trading strategies carry unique risks: Backtesting limitations - past performance in backtests does not guarantee future results; Overfitting - strategies optimized for historical data may fail in real markets; Market regime changes - strategies that worked in one environment may fail in another; Data mining bias; Strategy degradation - profitable strategies may stop working as markets evolve; Unknown unknowns - strategies cannot account for all possible market scenarios. Execution risks include: order failures, partial fills, delayed execution, incorrect orders, duplicate orders, and missed opportunities. YOU ARE RESPONSIBLE FOR MONITORING YOUR AUTOMATED STRATEGIES.`,
    },
    {
        id: 'technology',
        title: '2.3 Technology and System Risks',
        content: `Automated trading depends on technology, which can fail: Software bugs causing unexpected behavior or losses; System outages preventing trading or order cancellation; Internet connectivity loss disrupting trading; Broker API failures; Data feed errors leading to bad decisions; Hardware failures interrupting trading; Cyber attacks, malware, or DDoS attacks compromising systems; Power outages preventing trading. Always use risk controls such as position limits, loss limits, and kill switches.`,
    },
    {
        id: 'overtrading',
        title: '2.4 Over-Trading Risk',
        content: `Automated strategies may trade more frequently than manual trading resulting in: transaction costs (commissions and fees) eroding profits; market impact from frequent trading resulting in worse execution prices; tax consequences with short-term capital gains taxed at higher rates; and slippage accumulation where small slippage on many trades adds up.`,
    },
    {
        id: 'unintended',
        title: '2.5 Unintended Behavior',
        content: `Automated strategies may behave unexpectedly: Runaway strategies placing excessive orders rapidly; Flash crashes where automated trading contributes to extreme volatility; Position accumulation from errors causing unintended large positions; Risk limit breaches where strategies exceed intended risk parameters; Cascade failures where errors in one strategy trigger problems in others.`,
    },
    {
        id: 'leverage',
        title: '3. LEVERAGE AND MARGIN RISKS',
        content: `MARGIN TRADING AMPLIFIES BOTH GAINS AND LOSSES. When trading on margin you are borrowing money from your broker to trade; small price movements can result in large percentage gains or losses; you can lose more than your initial investment; you must pay interest on borrowed funds; you must maintain minimum margin requirements. If your account equity falls below required levels, your broker will require you to deposit additional funds (margin call) or may liquidate your positions without notice at unfavorable market prices. YOU CAN LOSE MORE THAN YOUR INITIAL DEPOSIT WHEN TRADING ON MARGIN. Using leverage increases risk exponentially: 2x leverage means a 5% loss becomes a 10% loss; 10x leverage means a 5% loss becomes a 50% loss; 20x leverage means a 5% loss wipes out your entire capital. THE HIGHER THE LEVERAGE, THE HIGHER THE RISK OF TOTAL LOSS.`,
    },
    {
        id: 'securities',
        title: '4. SECURITIES-SPECIFIC RISKS',
        content: `Equities carry risks including company-specific risk (poor management, fraud, bankruptcy), earnings risk, dividend risk, delisting risk, and dilution risk. OPTIONS TRADING IS HIGHLY SPECULATIVE AND CARRIES EXTREME RISK including total loss of premium, unlimited loss potential from selling uncovered options, time decay, complex multi-leg strategies with multiple points of failure, early assignment risk, and liquidity risk. NEVER TRADE OPTIONS UNLESS YOU FULLY UNDERSTAND THE RISKS. Penny stocks and micro-cap securities have extreme volatility, lack of information, low liquidity, fraud risk, and higher likelihood of business failure.`,
    },
    {
        id: 'crypto',
        title: '4.5 Cryptocurrency and Digital Assets',
        content: `CRYPTOCURRENCIES ARE HIGHLY SPECULATIVE AND EXTREMELY VOLATILE. Risks include: extreme volatility with prices swinging 20-50% or more in a single day; lack of regulation and limited investor protections; security risk with exchanges being hacked and wallets stolen; irreversible transactions where losses due to errors or fraud cannot be recovered; regulatory risk where governments may ban or restrict cryptocurrencies; technology risk including blockchain forks, protocol changes, and obsolescence; valuation uncertainty with no consensus on how to value cryptocurrencies; and liquidity risk with some cryptocurrencies having low trading volume.`,
    },
    {
        id: 'broker',
        title: '5. THIRD-PARTY BROKER RISKS',
        content: `ShefaFx is NOT a broker-dealer. All trades are executed through your connected third-party brokerage account. We have no control over: order execution quality, trade settlement, fees and commissions, margin requirements, account restrictions, or account closure. If your broker experiences financial difficulties, you may not be able to access your account or funds, assets may be tied up in bankruptcy proceedings, SIPC insurance has limits and may not cover all losses, and international brokers may not have equivalent protections. Your broker's systems may fail resulting in outages, data errors, execution problems, and access issues. WE ARE NOT RESPONSIBLE FOR BROKER FAILURES OR ISSUES.`,
    },
    {
        id: 'data',
        title: '6. DATA AND INFORMATION RISKS',
        content: `WE DO NOT GUARANTEE THE ACCURACY OF MARKET DATA. Market data may be delayed, incorrect, or incomplete; data feed providers may experience errors or outages; prices displayed may differ from actual execution prices; historical data may contain errors. DO NOT RELY SOLELY ON OUR PLATFORM FOR REAL-TIME QUOTES. The Platform may display information from third-party sources including news, analysis, and research that are not verified by us. Third-party opinions may be biased or incorrect and content may be outdated or inaccurate. WE ARE NOT RESPONSIBLE FOR THIRD-PARTY CONTENT.`,
    },
    {
        id: 'regulatory',
        title: '7. REGULATORY AND LEGAL RISKS',
        content: `You are responsible for compliance with all applicable laws including securities laws (SEC, FINRA, state regulations), Pattern Day Trader rules (accounts under $25,000 have trading restrictions), wash sale rules, reporting requirements, and licensing requirements. Trading has significant tax implications: short-term capital gains are taxed as ordinary income (up to 37% federal); long-term capital gains have preferential rates (0%, 15%, or 20%); wash sales restrict loss deductions; mark-to-market elections available for day traders; state/local taxes may apply; and international trading may trigger foreign tax obligations. CONSULT A TAX PROFESSIONAL. We do not provide tax advice. Laws and regulations can change affecting trading strategies, compliance costs, product availability, and tax treatment.`,
    },
    {
        id: 'psychological',
        title: '8. PSYCHOLOGICAL AND BEHAVIORAL RISKS',
        content: `Trading can trigger emotional responses leading to poor decisions: Fear (panic selling during downturns); Greed (over-trading or taking excessive risks); Overconfidence; Revenge trading (trying to recover losses quickly); FOMO (Fear of Missing Out); and Anchoring (holding losing positions hoping they return to purchase price). Common cognitive biases affect trading: confirmation bias, hindsight bias, recency bias, loss aversion, and gambler's fallacy. Trading can become addictive with frequent trading for excitement rather than profit, inability to stop despite losses, neglecting responsibilities, and using money needed for living expenses. IF TRADING BECOMES A PROBLEM, SEEK PROFESSIONAL HELP.`,
    },
    {
        id: 'limitations',
        title: '9. LIMITATIONS OF SHEFAFX',
        content: `SHEFAFX DOES NOT PROVIDE INVESTMENT ADVICE. We are a technology platform, not a financial advisor. We do not make recommendations to buy, sell, or hold securities. Information on the Platform is for educational purposes only. You are solely responsible for your investment decisions. CONSULT QUALIFIED PROFESSIONALS before making investment decisions. WE MAKE NO REPRESENTATIONS ABOUT PROFITABILITY. We do not guarantee that you will make profits or that any strategy will be successful. Performance shown on the Platform is not indicative of future results. Individual results will vary based on many factors. The Platform has limitations: not suitable for all investors (particularly those without experience or risk tolerance); requires monitoring; technology dependent; and has a learning curve.`,
    },
    {
        id: 'management',
        title: '10. RISK MANAGEMENT RECOMMENDATIONS',
        content: `While we cannot eliminate risk, we strongly recommend: (1) Only trade with risk capital you can afford to lose; (2) Diversify - don't put all capital in a single security or strategy; (3) Use stop-loss orders to limit losses; (4) Position sizing - limit each trade to a small percentage of capital (e.g., 1-2%); (5) Avoid over-leveraging; (6) Continuously monitor your positions and strategies; (7) Educate yourself about securities and strategies you use; (8) Start small while learning; (9) Have an exit plan before entering trades; (10) Keep detailed records of all trades for tax reporting and performance analysis.`,
    },
    {
        id: 'warnings',
        title: '11. SPECIFIC WARNINGS',
        content: `YOU CAN LOSE MORE THAN YOU DEPOSIT when trading on margin or with certain derivatives - losses can exceed your initial investment and you remain liable for any deficiency. PAST PERFORMANCE IS NOT INDICATIVE - historical returns do not predict future results; backtested strategies may not perform as expected in live trading; market conditions change. NO STRATEGY WORKS ALL THE TIME - all strategies have periods of losses (drawdowns); market regime changes can cause strategies to fail. AUTOMATED TRADING REQUIRES MONITORING - do not assume strategies are "set and forget"; monitor for unexpected behavior or excessive losses; be prepared to intervene or shut down strategies. MARKET CONDITIONS CAN CHANGE RAPIDLY - sudden news or events can cause extreme volatility; stop-loss orders may not protect from gap moves; after-hours news can cause large opening gaps.`,
    },
    {
        id: 'acknowledgment',
        title: '12. ACKNOWLEDGMENT OF UNDERSTANDING',
        content: `BY USING THE SHEFAFX PLATFORM, YOU ACKNOWLEDGE THAT: You have read and understood these Risk Disclosures in their entirety; you understand that trading involves substantial risk of loss; you understand that you may lose some or all of your invested capital; you understand that past performance is not indicative of future results; you understand that ShefaFx does not provide investment advice; you understand that ShefaFx makes no guarantees about profitability; you understand the specific risks of automated and algorithmic trading; you understand the risks of margin and leverage; you understand that all trades are executed through third-party brokers; you understand that ShefaFx is not responsible for broker failures; you understand that market data may be inaccurate or delayed; you are solely responsible for all trading decisions and outcomes; you will not hold ShefaFx liable for any trading losses; you are trading with risk capital you can afford to lose; you have consulted with financial, tax, and legal professionals as appropriate; you have the knowledge, experience, and risk tolerance necessary to trade; you will implement appropriate risk management practices; you will monitor your trading activity and strategies; you understand the tax implications of trading; and you will comply with all applicable laws and regulations. IF YOU DO NOT UNDERSTAND OR AGREE, DO NOT USE THE PLATFORM.`,
    },
    {
        id: 'liability',
        title: '13. DISCLAIMER OF LIABILITY',
        content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, SHEFAFX SHALL NOT BE LIABLE FOR: Any trading losses or missed profits; losses resulting from strategy performance or failure; losses due to market conditions or volatility; losses from delayed, failed, or incorrect order execution; losses from broker errors, failures, or insolvency; losses from system downtime, bugs, or technical issues; losses from unauthorized account access; losses from inaccurate or delayed market data; losses from reliance on information provided on the Platform; or any indirect, incidental, special, consequential, or punitive damages. YOU ACCEPT FULL RESPONSIBILITY FOR ALL TRADING DECISIONS AND OUTCOMES.`,
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

                        {/* Final Warning */}
                        <section id="final-warning">
                            <div className="bg-red-50 dark:bg-red-500/10 border-2 border-red-300 dark:border-red-500/40 rounded-2xl p-6">
                                <h2 className="text-xl font-bold mb-3 text-red-900 dark:text-red-300">FINAL WARNING</h2>
                                <p className="text-red-800 dark:text-red-200 text-[15px] leading-relaxed font-semibold mb-3">
                                    TRADING IS RISKY. YOU CAN LOSE MONEY. NEVER TRADE WITH MONEY YOU CANNOT AFFORD TO LOSE.
                                </p>
                                <p className="text-red-800 dark:text-red-200 text-[15px] leading-relaxed">
                                    ShefaFx provides technology tools, not investment advice. We are not responsible for your trading decisions or outcomes. If you do not have the knowledge, experience, or risk tolerance to trade, do not use this Platform. When in doubt, consult qualified financial, tax, and legal professionals.
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
