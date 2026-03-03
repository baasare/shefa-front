/**
 * About Marketing Page
 * Mission, values, founding story, and team
 */

import Link from 'next/link';
import { routes } from '@/lib/config/routes';

const stats = [
    { value: '$2.5B+', label: 'Trading Volume' },
    { value: '150K+', label: 'Active Traders' },
    { value: '50+', label: 'Markets' },
    { value: '98.9%', label: 'Uptime' },
];

const values = [
    {
        icon: '⚡',
        title: 'Innovation First',
        description:
            'We push the boundaries of what AI can do in financial markets. Every feature we build is grounded in research and real-world trading data.',
    },
    {
        icon: '🪟',
        title: 'Full Transparency',
        description:
            'No black boxes. You can see exactly why your AI agent made every decision through detailed logs, confidence scores, and explainability reports.',
    },
    {
        icon: '🛡️',
        title: 'Security as a Foundation',
        description:
            'Bank-level encryption, SOC 2 compliant infrastructure, API-only broker access — your assets always remain under your full control.',
    },
];

const team = [
    { name: 'Alex Martinez', role: 'CEO & Co-founder', initials: 'AM' },
    { name: 'Sarah Chen', role: 'CTO & Co-founder', initials: 'SC' },
    { name: 'Marcus Johnson', role: 'Head of AI Research', initials: 'MJ' },
    { name: 'Priya Patel', role: 'Head of Product', initials: 'PP' },
    { name: 'David Kim', role: 'Lead Engineer', initials: 'DK' },
    { name: 'Emma Wilson', role: 'Head of Partnerships', initials: 'EW' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
            {/* Hero */}
            <section className="relative py-24 px-4 text-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-shefa-bg dark:via-slate-900 dark:to-shefa-bg">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/10 dark:bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-300/10 dark:bg-purple-500/10 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-primary/10 border border-blue-100 dark:border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
                        Our Story
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-6">
                        Built by Traders,<br className="hidden md:block" /> for Traders
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        ShefaFx was founded on a simple belief: elite algorithmic trading shouldn't be reserved for hedge funds with million-dollar infrastructure budgets.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12 px-4 bg-slate-50 dark:bg-shefa-navy border-y border-slate-200 dark:border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-4xl font-extrabold text-primary mb-1 font-mono">{s.value}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-24 px-4 bg-white dark:bg-shefa-bg">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                            These principles guide every decision we make — from product features to company culture.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((v) => (
                            <div
                                key={v.title}
                                className="p-8 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all"
                            >
                                <div className="text-4xl mb-5">{v.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founding Story */}
            <section className="py-24 px-4 bg-slate-50 dark:bg-transparent">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wide mb-6">
                                Our Origin
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Democratizing Algorithmic Trading</h2>
                            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                <p>
                                    In 2021, our founders — experienced quant traders frustrated by the inaccessibility of institutional-grade tools — set out to change the landscape. They had watched algorithms move markets while retail traders were left using outdated charting software.
                                </p>
                                <p>
                                    ShefaFx was built to close that gap. Using modern AI and ML techniques, we packaged the same multi-agent decision systems used by hedge funds into an accessible platform that any trader can configure and deploy in minutes.
                                </p>
                                <p>
                                    Today, we power over 150,000 traders across 70 countries — from individual day traders to family offices — all using the same AI infrastructure that was once only available to the largest financial institutions.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-primary/20 dark:to-purple-500/20 rounded-3xl blur-2xl" />
                            <div className="relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-8">
                                <div className="space-y-4">
                                    {[
                                        { year: '2021', event: 'ShefaFx founded by team of quant traders' },
                                        { year: '2022', event: 'First 1,000 users; $50M volume milestone' },
                                        { year: '2023', event: 'Series A funding; expanded to 20+ exchanges' },
                                        { year: '2024', event: 'v2.0 launch with multi-agent AI system' },
                                        { year: '2026', event: '150K+ active traders; $2.5B+ volume' },
                                    ].map((item) => (
                                        <div key={item.year} className="flex gap-4 items-start">
                                            <div className="w-16 shrink-0 text-sm font-bold text-primary font-mono">{item.year}</div>
                                            <div className="text-sm text-slate-700 dark:text-slate-300 pt-0.5">{item.event}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 px-4 bg-white dark:bg-shefa-bg">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                            A team of engineers, quants, and traders united by a mission to level the trading playing field.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                        {team.map((member) => (
                            <div key={member.name} className="text-center group">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 dark:from-primary dark:to-purple-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 shadow-lg group-hover:scale-105 transition-transform">
                                    {member.initials}
                                </div>
                                <div className="font-semibold text-sm">{member.name}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{member.role}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 bg-slate-50 dark:bg-transparent">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50/50 dark:from-white/5 dark:to-primary/5 p-12 rounded-3xl border border-blue-100 dark:border-primary/20">
                        <h2 className="text-3xl font-bold mb-4">Join us — start trading smarter today</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            Become part of the community democratizing algorithmic trading for everyone.
                        </p>
                        <Link
                            href={routes.auth.register}
                            className="inline-flex items-center justify-center bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-lg transition-all shadow-lg shadow-primary/30"
                        >
                            Create Free Account →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
