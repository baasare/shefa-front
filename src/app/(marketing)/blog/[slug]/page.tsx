'use client';

/**
 * Blog Post Detail Page
 * Editorial post template with sidebar, author card, and related posts
 */

import Link from 'next/link';
import { routes } from '@/lib/config/routes';

const relatedPosts = [
    {
        slug: 'how-multi-agent-ai-outperforms',
        category: 'AI Trading',
        title: 'How Multi-Agent AI Outperforms Single Models',
        date: 'Feb 22, 2026',
    },
    {
        slug: 'top-5-algo-trading-strategies',
        category: 'Strategy',
        title: 'Top 5 Algo Trading Strategies for 2024',
        date: 'Feb 28, 2026',
    },
    {
        slug: 'human-in-the-loop-why-it-matters',
        category: 'AI Trading',
        title: 'Human-in-the-Loop: Why It Matters for Traders',
        date: 'Jan 25, 2026',
    },
];

const tableOfContents = [
    'What Are AI Trading Agents?',
    'The Multi-Agent Advantage',
    'Key Technologies Behind the Scenes',
    'How to Get Started',
    'Risks and Limitations',
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    return (
        <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-[1fr_320px] gap-12">
                    {/* Main Content */}
                    <article>
                        {/* Header */}
                        <div className="mb-8">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 mb-4">
                                AI Trading
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                                The Rise of AI Trading Agents: What You Need to Know
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold">AM</div>
                                    <span className="font-medium text-slate-700 dark:text-slate-300">Alex Martinez</span>
                                </div>
                                <span>•</span>
                                <span>Mar 1, 2026</span>
                                <span>•</span>
                                <span>8 min read</span>
                                <div className="ml-auto flex gap-2">
                                    {['𝕏', 'in', '🔗'].map((icon) => (
                                        <button key={icon} className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors text-sm">
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="h-72 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center mb-10 overflow-hidden">
                            <div className="text-center text-white">
                                <div className="text-7xl mb-3">🤖</div>
                                <div className="text-sm font-medium opacity-60">AI Trading Agents</div>
                            </div>
                        </div>

                        {/* Article Body */}
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                Algorithmic trading has existed for decades, but the emergence of large language models and multi-agent AI systems has fundamentally changed what's possible. Today, AI trading agents can process news sentiment, on-chain data, technical indicators, and macroeconomic signals simultaneously — and reach a high-confidence trading decision in milliseconds.
                            </p>

                            <h2 className="text-2xl font-bold mt-10 mb-4">What Are AI Trading Agents?</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                An AI trading agent is an autonomous software system that monitors market data, applies a decision-making framework, and executes trades on your behalf. Unlike simple rule-based bots, modern AI agents can reason about complex, ambiguous market conditions and adapt their strategy dynamically.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                The key innovation at ShefaFx is the multi-agent architecture. Rather than relying on a single model to do everything, we deploy a network of specialized agents — each an expert in one domain — and combine their signals through a consensus mechanism.
                            </p>

                            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 bg-blue-50 dark:bg-primary/5 rounded-r-xl">
                                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                                    "The same diversification principles that apply to portfolios also apply to AI models. No single model is right 100% of the time, but a well-coordinated ensemble can outperform any individual."
                                </p>
                                <cite className="text-sm text-slate-500 dark:text-slate-400 not-italic mt-2 block">— Sarah Chen, CTO of ShefaFx</cite>
                            </blockquote>

                            <h2 className="text-2xl font-bold mt-10 mb-4">The Multi-Agent Advantage</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Our system deploys three types of specialized agents running in parallel:
                            </p>
                            <ul className="space-y-2 mb-6">
                                {[
                                    'Technical Agent — analyzes price action, volume, RSI, MACD, and 30+ other indicators',
                                    'Sentiment Agent — processes news headlines and social media in real-time',
                                    'On-Chain Agent — for crypto assets, monitors wallet movements and exchange flows',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                                        <span className="text-primary mt-1">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 my-8">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-blue-500">ℹ</span>
                                    <span className="font-semibold text-sm">Pro Tip</span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    When setting up your first AI agent on ShefaFx, start with conservative position sizing (1–2% per trade) and enable human-in-the-loop approval for all trades over $500 until you're confident in the agent's performance on your specific market.
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold mt-10 mb-4">Key Technologies Behind the Scenes</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                Building production-grade AI trading agents requires several layers of infrastructure. Here's a simplified view of how a ShefaFx agent configuration looks:
                            </p>
                            <div className="bg-slate-900 dark:bg-slate-950 rounded-xl p-5 my-6 font-mono text-sm overflow-x-auto">
                                <div className="text-slate-400 mb-2"># Example agent configuration</div>
                                <div className="text-green-400">agent:<br />
                                    &nbsp;&nbsp;name: "Alpha-7"<br />
                                    &nbsp;&nbsp;markets: ["BTC/USDT", "ETH/USDT"]<br />
                                    &nbsp;&nbsp;strategy: momentum_breakout<br />
                                    &nbsp;&nbsp;risk:<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;max_position: 0.05<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;stop_loss: 0.02<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;require_approval_above: 1000<br />
                                    &nbsp;&nbsp;signals:<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;technical: weight: 0.5<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;sentiment: weight: 0.3<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;onchain: weight: 0.2
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold mt-10 mb-4">Risks and Limitations</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                AI trading agents are powerful, but they are not infallible. Markets can exhibit black swan events that fall outside any model's training distribution. This is why we strongly recommend maintaining human oversight via the approval system, especially during high-volatility periods or when trading significant capital.
                            </p>
                        </div>

                        {/* Author Card */}
                        <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex gap-5">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                AM
                            </div>
                            <div>
                                <div className="font-bold text-lg">Alex Martinez</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">CEO & Co-founder at ShefaFx</div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Alex has 15 years of experience in quantitative finance and algorithmic trading. He previously led quant research at a European hedge fund before founding ShefaFx.
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Table of Contents */}
                        <div className="bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 p-6 sticky top-24">
                            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                                Table of Contents
                            </h3>
                            <ul className="space-y-2">
                                {tableOfContents.map((item, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors block py-1">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <hr className="border-slate-200 dark:border-white/10 my-6" />

                            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                                Related Posts
                            </h3>
                            <div className="space-y-4">
                                {relatedPosts.slice(0, 2).map((post) => (
                                    <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                                        <div className="text-xs text-primary font-semibold mb-1">{post.category}</div>
                                        <div className="text-sm font-medium group-hover:text-primary transition-colors leading-snug">
                                            {post.title}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <hr className="border-slate-200 dark:border-white/10 my-6" />

                            <h3 className="font-bold text-sm mb-3">Get the newsletter</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Weekly trading insights delivered to your inbox.</p>
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full h-9 px-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <button type="submit" className="w-full h-9 bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white rounded-lg text-sm font-semibold transition-all">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>

                {/* Related Posts Footer */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-8">More to Read</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {relatedPosts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden hover:border-primary/30 transition-all">
                                <div className="h-32 bg-gradient-to-br from-blue-600 to-purple-700" />
                                <div className="p-5">
                                    <div className="text-xs text-primary font-semibold mb-2">{post.category}</div>
                                    <div className="font-bold leading-snug group-hover:text-primary transition-colors">{post.title}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-3">{post.date}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-16 text-center bg-gradient-to-br from-blue-50 to-purple-50/50 dark:from-white/5 dark:to-primary/5 p-12 rounded-3xl border border-blue-100 dark:border-primary/20">
                    <h2 className="text-3xl font-bold mb-4">Start trading smarter with ShefaFx today</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">Join 150,000+ traders automating their strategies with AI.</p>
                    <Link href={routes.auth.register} className="inline-flex items-center justify-center bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-lg transition-all shadow-lg shadow-primary/30">
                        Create Free Account →
                    </Link>
                </div>
            </div>
        </div>
    );
}
