/**
 * Demo Marketing Page
 * Video showcase, feature highlights, and demo booking form
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { routes } from '@/lib/config/routes';

const highlights = [
    {
        icon: '🤖',
        title: 'AI Agent Analysis',
        description: 'Watch the multi-agent system analyze market conditions and reach a consensus signal in real-time.',
        gradient: 'from-blue-600 to-indigo-700',
    },
    {
        icon: '🎯',
        title: 'Strategy Builder',
        description: 'Drag-and-drop strategy construction with live backtesting against 3 years of historical data.',
        gradient: 'from-purple-600 to-pink-700',
    },
    {
        icon: '📡',
        title: 'Live Trading Feed',
        description: 'Real-time trade execution logs showing agent decisions, confidence scores, and P&L tracking.',
        gradient: 'from-green-600 to-teal-700',
    },
];

const steps = [
    { num: '1', title: 'Sign Up', desc: 'Create your account in under 60 seconds — email or Google.' },
    { num: '2', title: 'Connect Exchange', desc: 'Securely link your broker via API keys. Read-only first.' },
    { num: '3', title: 'Configure Agent', desc: 'Choose a strategy template and set your risk parameters.' },
    { num: '4', title: 'Go Live', desc: 'Activate your agent and monitor performance from your dashboard.' },
];

export default function DemoPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
            {/* Hero */}
            <section className="relative py-24 px-4 text-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-shefa-bg dark:via-slate-900 dark:to-shefa-bg">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300/10 dark:bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-300/10 dark:bg-purple-500/10 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-green-700 dark:text-green-400 text-xs font-semibold uppercase tracking-wide mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Live Demo Available
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-6">
                        See ShefaFx in Action
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Watch how our AI agents analyze markets, build consensus signals, and execute trades in real-time — all with full transparency and human oversight.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl shadow-primary/30">
                            ▶ Watch Demo Video
                        </button>
                        <a
                            href="#book-demo"
                            className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                        >
                            Book a Live Demo
                        </a>
                    </div>
                </div>
            </section>

            {/* Video Embed */}
            <section className="px-4 pb-24">
                <div className="max-w-5xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-primary/30 dark:to-purple-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500" />
                        <div className="relative bg-slate-900 dark:bg-slate-950 rounded-2xl border border-white/10 overflow-hidden aspect-video flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer transition-colors">
                                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <p className="text-white/60 text-sm">Click to play the full platform demo</p>
                                <p className="text-white/40 text-xs mt-1">12 minutes</p>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-white/80 text-xs">ShefaFx Platform Overview — March 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-transparent">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Highlights</h2>
                        <p className="text-slate-600 dark:text-slate-400">Three core experiences captured in the demo.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {highlights.map((h) => (
                            <div key={h.title} className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden hover:border-primary/30 transition-all group">
                                <div className={`h-40 bg-gradient-to-br ${h.gradient} flex items-center justify-center text-4xl`}>
                                    {h.icon}
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{h.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{h.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="py-20 px-4 bg-white dark:bg-shefa-bg">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-14">From sign-up to active trading in 4 steps</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={step.num} className="relative">
                                <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary font-bold text-lg font-mono mx-auto mb-4">
                                    {step.num}
                                </div>
                                <h3 className="font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-slate-200 dark:bg-white/10 -translate-x-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Book a Demo */}
            <section id="book-demo" className="py-24 px-4 bg-slate-50 dark:bg-transparent">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Book a Personalized Demo</h2>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Get a 30-minute live walkthrough with one of our product specialists. We'll tailor the demo to your trading style and answer all your questions.
                            </p>
                            <div className="space-y-4">
                                {[
                                    '✓ Real-time platform demonstration',
                                    '✓ Strategy setup for your specific market',
                                    '✓ Q&A with product specialist',
                                    '✓ Exclusive trial plan options',
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="text-primary">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 p-8">
                            {submitted ? (
                                <div className="text-center py-8">
                                    <div className="text-5xl mb-4">🎉</div>
                                    <h3 className="text-xl font-bold mb-2">Demo Requested!</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm">Our team will reach out within 24 hours to confirm your slot.</p>
                                </div>
                            ) : (
                                <form
                                    className="space-y-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setSubmitted(true);
                                    }}
                                >
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Full Name</label>
                                        <input type="text" required placeholder="Alex Martinez" className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Work Email</label>
                                        <input type="email" required placeholder="alex@company.com" className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Company (Optional)</label>
                                        <input type="text" placeholder="Acme Capital" className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Time Zone</label>
                                        <select className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                                            <option>UTC-5 (Eastern)</option>
                                            <option>UTC+0 (GMT)</option>
                                            <option>UTC+1 (CET)</option>
                                            <option>UTC+8 (SGT)</option>
                                            <option>UTC+9 (JST)</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="w-full h-12 bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30">
                                        Request Demo Slot →
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-white dark:bg-shefa-bg">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">Not ready to book? Start for free right now — no demo needed.</p>
                    <Link href={routes.auth.register} className="inline-flex items-center justify-center bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-lg transition-all shadow-lg shadow-primary/30">
                        Create Free Account →
                    </Link>
                </div>
            </section>
        </div>
    );
}
