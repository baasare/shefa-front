/**
 * Contact Marketing Page
 * Contact form + contact info + FAQ teaser
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';

const contactInfo = [
    { icon: '✉️', label: 'Support Email', value: 'support@shefafx.com' },
    { icon: '⏱️', label: 'Response Time', value: 'Under 2 hours' },
    { icon: '🕐', label: 'Support Hours', value: 'Mon–Fri, 24 hours/day' },
];

const faqs = [
    {
        q: 'How do I connect my exchange account?',
        a: 'You connect your exchange via API keys in Settings → Brokers. We only request trade permissions, not withdrawal access.',
    },
    {
        q: 'Is there a free tier?',
        a: 'Yes. Our Starter plan is permanently free and includes 1 AI agent and up to $1k monthly trading volume.',
    },
    {
        q: 'What do I do if my agent makes an error trade?',
        a: 'Contact support immediately. You can also pause all agents instantly from your dashboard.',
    },
];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
            {/* Hero */}
            <section className="py-20 px-4 text-center bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-shefa-bg dark:via-slate-900 dark:to-shefa-bg border-b border-slate-200 dark:border-white/5">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        We're here to help you trade smarter. Our team typically responds within 2 hours.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-[1fr_380px] gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                        {submitted ? (
                            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-2xl p-10 text-center">
                                <div className="text-5xl mb-4">✓</div>
                                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Message sent!</h3>
                                <p className="text-green-700 dark:text-green-400">We'll get back to you within 2 hours. Check your inbox.</p>
                            </div>
                        ) : (
                            <form
                                className="space-y-5"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setSubmitted(true);
                                }}
                            >
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Alex"
                                            className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Martinez"
                                            className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="alex@company.com"
                                        className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Subject</label>
                                    <select className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none">
                                        <option value="">Select a topic</option>
                                        <option>Sales Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Partnership</option>
                                        <option>Press / Media</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={6}
                                        placeholder="Tell us how we can help..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full h-12 bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30"
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
                            <div className="space-y-4">
                                {contactInfo.map((info) => (
                                    <div
                                        key={info.label}
                                        className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10"
                                    >
                                        <div className="text-2xl">{info.icon}</div>
                                        <div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{info.label}</div>
                                            <div className="font-semibold text-sm">{info.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Socials */}
                        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                            <h3 className="font-bold mb-4">Find us online</h3>
                            <div className="flex gap-3">
                                {[
                                    { label: '𝕏 Twitter', href: '#' },
                                    { label: 'in LinkedIn', href: '#' },
                                    { label: '💬 Discord', href: '#' },
                                ].map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium text-center text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-all"
                                    >
                                        {s.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* FAQ Teaser */}
                        <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                            <h3 className="font-bold mb-4">Quick Answers</h3>
                            <div className="space-y-3">
                                {faqs.map((faq, i) => (
                                    <details key={i} className="group">
                                        <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 list-none py-1">
                                            {faq.q}
                                            <span className="text-slate-400 group-open:rotate-180 transition-transform inline-block">▼</span>
                                        </summary>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed pl-0">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
