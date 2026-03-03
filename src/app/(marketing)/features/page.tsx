/**
 * Features Marketing Page
 * Full-featured page showcasing ShefaFx AI trading capabilities
 */

import Link from 'next/link';
import { routes } from '@/lib/config/routes';

const features = [
  {
    icon: '🔗',
    color: 'blue',
    title: 'Multi-Agent Analysis',
    description:
      'Deploy specialized sub-agents for technicals, sentiment, and on-chain data analysis to form a unified, high-confidence consensus signal.',
  },
  {
    icon: '👤',
    color: 'purple',
    title: 'Human-in-the-Loop',
    description:
      'Set approval thresholds for high-stakes trades. Let AI handle routine execution while you retain final authority on critical decisions.',
  },
  {
    icon: '🕐',
    color: 'green',
    title: '24/7 Autonomous Trading',
    description:
      'Crypto markets never close. Our cloud infrastructure ensures zero-downtime operation across all time zones and market sessions.',
  },
  {
    icon: '🎯',
    color: 'orange',
    title: 'Strategy Builder',
    description:
      'Visual drag-and-drop interface to construct, backtest, and deploy algorithmic trading strategies — no coding required.',
  },
  {
    icon: '🛡️',
    color: 'red',
    title: 'Risk Management',
    description:
      'Granular stop-loss controls, position sizing limits, max drawdown guards, and portfolio-level exposure caps protect your capital.',
  },
  {
    icon: '📊',
    color: 'cyan',
    title: 'Market Intelligence',
    description:
      'Real-time data feeds from 50+ exchanges, news sentiment scoring, on-chain analytics, and macroeconomic event calendars.',
  },
];

const comparisons = [
  { feature: 'Market hours coverage', shefa: '24/7 Automated', manual: 'Limited by time', bot: 'Partial' },
  { feature: 'Multi-signal analysis', shefa: '✓ AI consensus', manual: '✗ Human bias', bot: '✗ Single signal' },
  { feature: 'Adaptive strategy', shefa: '✓ ML-driven', manual: '✓ Manual adjust', bot: '✗ Static rules' },
  { feature: 'Risk management', shefa: '✓ Automated', manual: '✓ Manual', bot: '⚠ Basic' },
  { feature: 'Backtesting', shefa: '✓ Advanced', manual: '✗ None', bot: '⚠ Limited' },
  { feature: 'Emotion-free execution', shefa: '✓ Always', manual: '✗ Never', bot: '✓ Always' },
];

const brokers = ['Binance', 'Coinbase', 'Kraken', 'Interactive Brokers'];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-shefa-bg dark:via-slate-900 dark:to-shefa-bg text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-primary/10 border border-blue-100 dark:border-primary/20 text-primary text-xs font-semibold uppercase tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-6">
            Everything You Need to<br className="hidden md:block" /> Trade Smarter, Faster
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From multi-agent AI analysis to human-in-the-loop approvals — ShefaFx gives you the full suite of tools to automate and optimize your trading strategy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href={routes.auth.register}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-lg text-base transition-all shadow-lg hover:shadow-xl shadow-primary/30"
            >
              Start Free Trial →
            </Link>
            <Link
              href={routes.demo}
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg border border-slate-200 dark:border-white/20 bg-white dark:bg-white/5 text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
            >
              Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Capabilities</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Every tool you need to build, deploy, and monitor AI trading agents at any scale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white dark:bg-white/5 dark:backdrop-blur-lg p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-4 bg-white dark:bg-shefa-bg">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How ShefaFx Compares</h2>
            <p className="text-slate-600 dark:text-slate-400">See why traders choose AI over manual or basic bot trading.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
                  <th className="text-left px-6 py-4 font-semibold">Feature</th>
                  <th className="px-6 py-4 font-semibold text-primary">ShefaFx AI</th>
                  <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">Manual Trading</th>
                  <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400">Basic Bots</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-slate-100 dark:border-white/5 ${i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50 dark:bg-white/[0.02]'}`}
                  >
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-green-600 dark:text-green-400 font-medium">{row.shefa}</td>
                    <td className="px-6 py-4 text-center text-slate-500 dark:text-slate-400">{row.manual}</td>
                    <td className="px-6 py-4 text-center text-slate-500 dark:text-slate-400">{row.bot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-transparent border-t border-b border-slate-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-8">Works with your broker</p>
          <div className="flex items-center justify-center flex-wrap gap-8">
            {brokers.map((b) => (
              <div
                key={b}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="text-xl">🏦</span>
                <span className="font-bold text-slate-700 dark:text-white">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-white dark:bg-shefa-bg">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50/50 dark:from-white/5 dark:to-primary/5 p-12 rounded-3xl border border-blue-100 dark:border-primary/20 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start your free trial today</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Join 150,000+ traders already using ShefaFx to automate their strategies. No credit card required.
            </p>
            <Link
              href={routes.auth.register}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-lg text-base transition-all shadow-lg hover:shadow-xl shadow-primary/30"
            >
              Create Free Account →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
