/**
 * Blog Index Marketing Page
 * Editorial hub with featured post, category filters, and post grid
 */

import Link from 'next/link';

const posts = [
    {
        slug: 'top-5-algo-trading-strategies',
        category: 'Strategy',
        categoryColor: 'purple',
        title: 'Top 5 Algo Trading Strategies for 2024',
        excerpt: 'Explore the most effective algorithmic trading strategies that are generating consistent returns in current market conditions.',
        author: 'Alex Martinez',
        date: 'Feb 28, 2026',
        readTime: '7 min read',
        gradient: 'from-purple-600 to-blue-600',
    },
    {
        slug: 'how-multi-agent-ai-outperforms',
        category: 'AI Trading',
        categoryColor: 'blue',
        title: 'How Multi-Agent AI Outperforms Single Models',
        excerpt: 'Why a consensus approach using specialized AI sub-agents consistently outperforms single-model trading systems.',
        author: 'Sarah Chen',
        date: 'Feb 22, 2026',
        readTime: '9 min read',
        gradient: 'from-blue-600 to-cyan-600',
    },
    {
        slug: 'understanding-risk-adjusted-returns',
        category: 'Education',
        categoryColor: 'green',
        title: 'Understanding Risk-Adjusted Returns',
        excerpt: 'Sharpe ratio, Sortino ratio, and maximum drawdown — the metrics every algorithmic trader needs to master.',
        author: 'Marcus Johnson',
        date: 'Feb 15, 2026',
        readTime: '6 min read',
        gradient: 'from-green-600 to-teal-600',
    },
    {
        slug: 'crypto-market-volatility',
        category: 'Market Analysis',
        categoryColor: 'orange',
        title: 'Crypto Market Volatility: What the Data Shows',
        excerpt: 'A data-driven analysis of cryptocurrency volatility patterns and how AI agents adapt to turbulent market conditions.',
        author: 'David Kim',
        date: 'Feb 8, 2026',
        readTime: '8 min read',
        gradient: 'from-orange-500 to-red-500',
    },
    {
        slug: 'setting-up-first-strategy',
        category: 'Platform Updates',
        categoryColor: 'primary',
        title: 'Setting Up Your First ShefaFx Strategy',
        excerpt: 'A step-by-step guide to configuring, backtesting, and deploying your first AI trading strategy on ShefaFx.',
        author: 'Priya Patel',
        date: 'Feb 1, 2026',
        readTime: '5 min read',
        gradient: 'from-blue-500 to-indigo-600',
    },
    {
        slug: 'human-in-the-loop-why-it-matters',
        category: 'AI Trading',
        categoryColor: 'blue',
        title: 'Human-in-the-Loop: Why It Matters for Traders',
        excerpt: 'How approval-based AI workflows combine machine speed with human judgment for superior trading outcomes.',
        author: 'Emma Wilson',
        date: 'Jan 25, 2026',
        readTime: '6 min read',
        gradient: 'from-indigo-600 to-purple-600',
    },
];

const categories = ['All', 'AI Trading', 'Strategy', 'Market Analysis', 'Education', 'Platform Updates'];

const categoryColorMap: Record<string, string> = {
    Strategy: 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300',
    'AI Trading': 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300',
    Education: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300',
    'Market Analysis': 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300',
    'Platform Updates': 'bg-primary/10 text-primary',
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
            {/* Hero */}
            <section className="relative py-20 px-4 text-center bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-shefa-bg dark:via-slate-900 dark:to-shefa-bg border-b border-slate-200 dark:border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-4">
                        ShefaFx Insights
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                        Stay ahead of the markets with AI trading strategies, analysis, and platform updates.
                    </p>
                    {/* Newsletter */}
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 h-11 px-4 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="h-11 px-6 rounded-lg bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-semibold text-sm transition-all whitespace-nowrap"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Featured Post */}
                <Link
                    href={`/blog/rise-of-ai-trading-agents`}
                    className="block mb-16 group"
                >
                    <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden hover:border-primary/30 transition-all">
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="h-64 md:h-auto bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-12">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">🤖</div>
                                    <div className="text-sm font-medium opacity-75">Featured Post</div>
                                </div>
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 mb-4 w-fit">
                                    Market Analysis
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                                    The Rise of AI Trading Agents: What You Need to Know
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    AI trading agents are no longer science fiction. We explore how multi-agent systems are revolutionizing algorithmic trading and what it means for retail and institutional traders alike.
                                </p>
                                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xs font-bold">AM</div>
                                        <span>Alex Martinez</span>
                                    </div>
                                    <span>•</span>
                                    <span>Mar 1, 2026</span>
                                    <span>•</span>
                                    <span>8 min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${i === 0
                                    ? 'bg-primary text-white'
                                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Post Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden hover:border-primary/30 hover:shadow-xl dark:hover:shadow-primary/5 transition-all"
                        >
                            <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-end p-4`}>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${categoryColorMap[post.category] || 'bg-primary/10 text-primary'}`}>
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                                    {post.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
                                            {post.author.split(' ').map((n) => n[0]).join('')}
                                        </div>
                                        <span>{post.author}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2">
                    <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        ← Previous
                    </button>
                    {[1, 2, 3].map((p) => (
                        <button
                            key={p}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === 1 ? 'bg-primary text-white' : 'border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                    <button className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}
