/**
 * Landing Page
 * Main marketing landing page with light/dark theme support
 */

'use client';

import Link from 'next/link';
import { routes } from '@/lib/config/routes';
import { useState } from 'react';
import { AnimatedTerminal } from '@/components/marketing/AnimatedTerminal';

export default function LandingPage() {
  return (
    <div className="font-display min-h-screen flex flex-col overflow-x-hidden">
      {/* Mesh Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-white dark:bg-shefa-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#eff6ff] via-[#f5f3ff] to-white dark:from-slate-900 dark:via-slate-900 dark:to-shefa-bg opacity-80" />
      </div>

      <div className="relative z-10 flex flex-col w-full grow">
        {/* Hero Section */}
        <main className="flex flex-col items-center justify-center pt-24 pb-20 px-4 sm:px-6 relative">
          <div className="max-w-5xl w-full flex flex-col items-center text-center gap-10">
            <div className="flex flex-col gap-6 items-center max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-primary/10 border border-blue-100 dark:border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Beta — Paper Trading Only
              </div>

              {/* Hero Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                AI Trading Agents <br className="hidden md:block" /> That Never Sleep
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-light">
                Automate your trading strategies with 24/7 AI monitoring and execution. Optimize performance with data-driven insights and real-time market adaptation.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
                <Link
                  href={routes.auth.register}
                  className="w-full sm:w-auto bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-lg text-base transition-all shadow-lg hover:shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
                >
                  <span>Start Free Trial</span>
                  <span className="text-[20px]">→</span>
                </Link>
                <button className="w-full sm:w-auto bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 font-medium h-12 px-8 rounded-lg text-base transition-all flex items-center justify-center gap-2 group shadow-sm backdrop-blur-lg">
                  <span className="text-[20px] text-slate-400 dark:text-slate-400 group-hover:text-primary transition-colors">▶</span>
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Demo Card */}
            <div className="relative w-full max-w-[600px] mt-8 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-primary/30 dark:to-blue-500/30 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-white dark:bg-white/5 dark:backdrop-blur-lg rounded-xl border border-slate-200 dark:border-white/10 p-6 overflow-hidden transform transition-transform duration-500 hover:scale-[1.01] shadow-xl dark:shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-primary dark:text-blue-400">
                      <span className="text-sm">🤖</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">Agent Alpha-7</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live Analysis
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300">
                    AAPL • NASDAQ
                  </div>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500">🔍</span>
                      Scanning Market Conditions...
                    </span>
                    <span className="text-green-600 dark:text-primary font-medium">Complete</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-white/5 rounded p-3 border border-slate-100 dark:border-white/5 text-left">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">RSI (14)</div>
                      <div className="flex justify-between items-end">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">58.2</span>
                        <span className="text-green-600 dark:text-primary flex items-center text-xs font-medium">
                          <span className="mr-0.5">✓</span>
                          Neutral-Bullish
                        </span>
                      </div>
                      <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 dark:bg-primary w-[58%]" />
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-white/5 rounded p-3 border border-slate-100 dark:border-white/5 text-left">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">MACD</div>
                      <div className="flex justify-between items-end">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">Bullish</span>
                        <span className="text-primary flex items-center text-xs font-medium">
                          <span className="mr-0.5">↗</span>
                          Crossover
                        </span>
                      </div>
                      <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 mt-2 rounded-full overflow-hidden">
                        <div className="h-full bg-primary dark:bg-blue-500 w-[85%]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col text-left">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Confidence Score</span>
                      <span className="text-slate-900 dark:text-white font-bold">94.8%</span>
                    </div>
                    <div className="px-4 py-2 rounded bg-green-50 dark:bg-primary/20 border border-green-500/30 dark:border-primary/50 text-green-600 dark:text-primary font-bold animate-pulse flex items-center gap-2 shadow-sm dark:shadow-[0_0_15px_rgba(16,183,127,0.3)]">
                      <span>⚡</span>
                      BUY SIGNAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Trusted By Section */}
        <section className="border-t border-slate-200 dark:border-white/5 bg-white/50 dark:bg-shefa-bg/50 backdrop-blur-sm w-full py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <div className="flex flex-col gap-2 min-w-[280px] text-center lg:text-left">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Trusted by 1,000+ traders</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Join the community leveraging AI for smarter decisions.</p>
            </div>
            <div className="flex-1 w-full overflow-hidden relative">
              <div className="flex items-center justify-between gap-8 opacity-40 dark:opacity-60 grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100">
                <div className="flex items-center gap-2">
                  <span className="text-4xl dark:text-white">📊</span>
                  <span className="font-bold text-lg text-slate-800 dark:text-white">QuantX</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-4xl dark:text-white">💧</span>
                  <span className="font-bold text-lg text-slate-800 dark:text-white">FlowTrade</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl dark:text-white">↗️</span>
                  <span className="font-bold text-lg text-slate-800 dark:text-white">ApexCapital</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-4xl dark:text-white">🛡️</span>
                  <span className="font-bold text-lg text-slate-800 dark:text-white">SafeGuard</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                See Your AI Agent Think in Real-Time
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Watch how our autonomous agents analyze thousands of data points instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-lg p-8 rounded-[16px] border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:bg-white/10 transition-all group">
                <div className="bg-blue-50 dark:bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-primary dark:text-blue-400 text-2xl">🔗</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Multi-Agent Analysis</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Deploys specialized sub-agents for technicals, sentiment, and on-chain data to form a consensus.
                </p>
              </div>

              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-lg p-8 rounded-[16px] border border-slate-200 dark:border-white/10 hover:border-purple-300 dark:hover:bg-white/10 transition-all group">
                <div className="bg-purple-50 dark:bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-purple-600 dark:text-purple-400 text-2xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Human-in-the-Loop</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Set approval thresholds. Let AI handle the boring stuff while you sign off on high-stakes trades.
                </p>
              </div>

              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-lg p-8 rounded-[16px] border border-slate-200 dark:border-white/10 hover:border-green-300 dark:hover:bg-white/10 transition-all group">
                <div className="bg-green-50 dark:bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-green-600 dark:text-primary text-2xl">🕐</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Autonomous 24/7</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Crypto markets never close. Neither should your strategy. Our cloud infrastructure ensures zero downtime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Analysis Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-shefa-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Watch Our AI Agents in Action
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Real-time analysis and decision-making powered by advanced machine learning
              </p>
            </div>

            <AnimatedTerminal />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Get started in four simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm text-center border border-slate-200 dark:border-white/10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">1️⃣</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Sign Up
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Create your account in seconds with email or Google
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm text-center border border-slate-200 dark:border-white/10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">2️⃣</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Connect
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Link your exchange account or fund your wallet
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm text-center border border-slate-200 dark:border-white/10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">3️⃣</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Configure
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Set your risk preferences and trading strategy
                  </p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm text-center border border-slate-200 dark:border-white/10">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">4️⃣</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Trade
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Let our AI agents work for you 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-shefa-bg">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-primary/20 dark:border-primary/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1">$2.5B+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Trading Volume</div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-primary/20 dark:border-primary/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1">150K+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Active Traders</div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-primary/20 dark:border-primary/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">AI Trading</div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-primary/20 dark:border-primary/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1">98.9%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-primary/20 dark:border-primary/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Markets</div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-primary/20 dark:border-primary/30 text-center">
                <div className="text-3xl font-bold text-primary mb-1">4.8★</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">User Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Trusted by Traders Worldwide
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                See what our users have to say about ShefaFx
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Video Placeholder */}
              <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white font-medium">Watch Success Stories</p>
                </div>
              </div>

              {/* Testimonial Cards */}
              <div className="space-y-4">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-white/10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Sarah Johnson</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Professional Trader</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    "ShefaFx has transformed my trading strategy. The AI agents are incredibly accurate and save me hours of analysis every day."
                  </p>
                  <div className="text-yellow-400">★★★★★</div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-white/10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">👤</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Michael Chen</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Crypto Investor</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    "I've tried many platforms, but ShefaFx stands out. The risk management features give me peace of mind."
                  </p>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-shefa-bg">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Everything you need to know about ShefaFx
              </p>
            </div>

            <div className="space-y-4">
              <details className="bg-white dark:bg-slate-800 rounded-xl shadow-sm group border border-slate-200 dark:border-white/10">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  How does the AI trading work?
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400">
                  Our AI agents use advanced machine learning algorithms to analyze market data, identify patterns, and execute trades based on your predefined strategy and risk tolerance. The system operates 24/7, monitoring multiple markets simultaneously.
                </div>
              </details>

              <details className="bg-white dark:bg-slate-800 rounded-xl shadow-sm group border border-slate-200 dark:border-white/10">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  Is my money safe?
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400">
                  Yes. We use bank-level encryption and never store your funds. Your assets remain in your connected exchange account, and we only have API access for trading operations. You maintain full control and can revoke access at any time.
                </div>
              </details>

              <details className="bg-white dark:bg-slate-800 rounded-xl shadow-sm group border border-slate-200 dark:border-white/10">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  What exchanges do you support?
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400">
                  We currently support major exchanges including Binance, Coinbase Pro, Kraken, and FTX. We're continuously adding support for more exchanges based on user demand.
                </div>
              </details>

              <details className="bg-white dark:bg-slate-800 rounded-xl shadow-sm group border border-slate-200 dark:border-white/10">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  Can I cancel my subscription anytime?
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400">
                  Absolutely. You can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees. Your access will continue until the end of your current billing period.
                </div>
              </details>

              <details className="bg-white dark:bg-slate-800 rounded-xl shadow-sm group border border-slate-200 dark:border-white/10">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                  Do I need trading experience?
                  <span className="transition group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400">
                  No trading experience is required. Our platform is designed for both beginners and experienced traders. We provide educational resources, preset strategies, and guided onboarding to help you get started. The AI handles the complex analysis and execution.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 relative bg-white dark:bg-shefa-bg" id="pricing">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Transparent Pricing</h2>
              <p className="text-slate-500 dark:text-slate-400">Scale your trading operations as you grow.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Starter Plan */}
              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-lg p-8 rounded-2xl relative border border-slate-200 dark:border-white/10 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">$0</span>
                  <span className="text-slate-500 dark:text-slate-400">/mo</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 h-10">Perfect for trying out the platform and basic strategies.</p>
                <ul className="space-y-4 mb-8 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> 1 AI Agent
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> $1k Monthly Volume
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> Basic Indicators
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-slate-400 dark:text-slate-600 text-lg">✗</span> No API Access
                  </li>
                </ul>
                <button className="w-full py-3 rounded-lg border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-900 dark:text-white font-medium transition-colors">
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-lg p-8 rounded-2xl relative border-2 border-primary dark:border-purple-500/50 shadow-xl dark:shadow-[0_0_30px_rgba(168,85,247,0.15)] transform scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary dark:bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pro Trader</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">$49</span>
                  <span className="text-slate-500 dark:text-slate-400">/mo</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 h-10">Advanced tools for serious traders seeking edge.</p>
                <ul className="space-y-4 mb-8 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> 5 AI Agents
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> Unlimited Volume
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> Custom Indicators
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> Priority Support
                  </li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold transition-all shadow-lg hover:shadow-xl shadow-primary/30">
                  Start Free Trial
                </button>
              </div>

              {/* Institutional Plan */}
              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-lg p-8 rounded-2xl relative border border-slate-200 dark:border-white/10 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Institutional</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">Custom</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 h-10">For funds and institutions requiring dedicated infrastructure.</p>
                <ul className="space-y-4 mb-8 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> Unlimited Agents
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> Dedicated Server
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> Custom API Integration
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span> 24/7 Account Manager
                  </li>
                </ul>
                <button className="w-full py-3 rounded-lg border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-900 dark:text-white font-medium transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-slate-50 dark:bg-transparent">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-white dark:bg-white/5 dark:backdrop-blur-lg p-12 rounded-3xl relative overflow-hidden border border-slate-200 dark:border-primary/30 shadow-2xl">
              <div className="absolute inset-0 bg-blue-50/50 dark:bg-primary/5 blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Ready to Trade Smarter with AI?
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of traders who have automated their financial freedom.
                </p>
                <Link
                  href={routes.auth.register}
                  className="inline-block bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white text-lg font-bold py-4 px-10 rounded-full transition-all shadow-xl hover:shadow-2xl shadow-primary/20 hover:scale-105 transform"
                >
                  Create Free Account
                </Link>
                <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">No credit card required for Starter plan.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
