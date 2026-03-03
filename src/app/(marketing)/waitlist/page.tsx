/**
 * Waitlist Marketing Page
 * Email signup with social proof, perks, and referral system
 */

'use client';

import { useState } from 'react';

const perks = [
    {
        icon: '💎',
        title: 'Early Access Pricing',
        description: 'Lock in a 40% lifetime discount on Pro Trader — reserved exclusively for waitlist members.',
    },
    {
        icon: '🚀',
        title: 'Priority Onboarding',
        description: 'Skip the queue. Get a dedicated onboarding specialist and go from sign-up to live trading in under an hour.',
    },
    {
        icon: '🔬',
        title: 'Exclusive Features',
        description: 'Access experimental features 30 days before general release and shape the product roadmap with your feedback.',
    },
];

const avatarColors = ['from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-green-400 to-green-600', 'from-orange-400 to-orange-600', 'from-pink-400 to-pink-600'];

export default function WaitlistPage() {
    const [email, setEmail] = useState('');
    const [joined, setJoined] = useState(false);
    const [referralLink, setReferralLink] = useState('');
    const [copied, setCopied] = useState(false);

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        const code = Math.random().toString(36).substring(2, 10);
        setReferralLink(`https://shefafx.com/join?ref=${code}`);
        setJoined(true);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
            {/* Hero */}
            <section className="relative min-h-[80vh] flex items-center justify-center px-4 text-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-shefa-bg dark:via-slate-900 dark:to-shefa-bg">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/10 dark:bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300/10 dark:bg-purple-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wide mb-6">
                        🔒 Early Access Only
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-6">
                        You're Early.<br />That's Smart.
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
                        Join 12,847+ traders waiting for exclusive early access to ShefaFx's next-generation AI trading platform.
                    </p>

                    {joined ? (
                        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-2xl p-8 text-center">
                            <div className="text-5xl mb-3">🎉</div>
                            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">You're on the list!</h2>
                            <p className="text-green-700 dark:text-green-400 mb-1">Position: <strong>#12,848</strong></p>
                            <p className="text-green-600 dark:text-green-500 text-sm">We'll email you at <strong>{email}</strong> when it's your turn.</p>
                        </div>
                    ) : (
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleJoin}>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="flex-1 h-12 px-5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                            />
                            <button
                                type="submit"
                                className="h-12 px-6 rounded-xl bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold text-sm transition-all shadow-lg shadow-primary/40 hover:shadow-xl animate-pulse whitespace-nowrap"
                            >
                                Join Waitlist →
                            </button>
                        </form>
                    )}

                    {/* Social Proof Avatars */}
                    <div className="flex items-center justify-center gap-3 mt-8">
                        <div className="flex -space-x-2">
                            {avatarColors.map((gradient, i) => (
                                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} ring-2 ring-white dark:ring-shefa-bg flex items-center justify-center text-white text-xs font-bold`}>
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            <strong className="text-slate-800 dark:text-white">12,847</strong> traders already joined
                        </div>
                    </div>
                </div>
            </section>

            {/* Perks */}
            <section className="py-24 px-4 bg-slate-50 dark:bg-transparent">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold mb-4">Why Join the Waitlist?</h2>
                        <p className="text-slate-600 dark:text-slate-400">Exclusive benefits for early access members only.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {perks.map((perk) => (
                            <div key={perk.title} className="bg-white dark:bg-white/5 p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all">
                                <div className="text-4xl mb-5">{perk.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{perk.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{perk.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teaser */}
            <section className="py-20 px-4 bg-white dark:bg-shefa-bg">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Sneak Peek</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-12">Early access features you'll unlock first.</p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {['Advanced Strategy Marketplace', 'Portfolio Correlation Engine', 'Institutional Risk Console'].map((feature) => (
                            <div key={feature} className="relative bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden h-48 flex items-center justify-center">
                                <div className="absolute inset-0 backdrop-blur-sm bg-white/80 dark:bg-shefa-bg/80 flex flex-col items-center justify-center gap-3">
                                    <div className="text-3xl text-primary">🔒</div>
                                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{feature}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">Coming Soon</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Referral */}
            {joined && (
                <section className="py-20 px-4 bg-slate-50 dark:bg-transparent">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-3">Move Up the Waitlist 🚀</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">Share your referral link — each friend who joins moves you up by 10 spots.</p>
                        <div className="flex gap-3 mb-6">
                            <input
                                readOnly
                                value={referralLink}
                                className="flex-1 h-11 px-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 focus:outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className="px-5 h-11 rounded-xl bg-primary hover:bg-blue-800 text-white font-semibold text-sm transition-all whitespace-nowrap"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <div className="flex justify-center gap-3">
                            {['𝕏 Twitter', 'in LinkedIn', '💬 Discord'].map((platform) => (
                                <button key={platform} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all">
                                    {platform}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
