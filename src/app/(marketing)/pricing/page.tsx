/**
 * Pricing Marketing Page
 * Three-tier pricing with comparison table and FAQ
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { routes } from '@/lib/config/routes';

const plans = [
  {
    name: 'Starter',
    price: { monthly: '$0', annual: '$0' },
    description: 'Perfect for exploring the platform and testing basic strategies.',
    features: [
      { text: '1 AI Agent', included: true },
      { text: '$1k Monthly Volume', included: true },
      { text: 'Basic Indicators', included: true },
      { text: 'Community Support', included: true },
      { text: 'Backtesting', included: false },
      { text: 'API Access', included: false },
      { text: 'Custom Indicators', included: false },
    ],
    cta: 'Get Started Free',
    href: routes.auth.register,
    highlighted: false,
  },
  {
    name: 'Pro Trader',
    price: { monthly: '$49', annual: '$39' },
    description: 'Advanced tools for serious traders seeking a competitive edge.',
    features: [
      { text: '5 AI Agents', included: true },
      { text: 'Unlimited Volume', included: true },
      { text: 'Custom Indicators', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Full Backtesting Suite', included: true },
      { text: 'API Access', included: true },
      { text: 'Advanced Risk Controls', included: true },
    ],
    cta: 'Start Free Trial',
    href: routes.auth.register,
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Institutional',
    price: { monthly: 'Custom', annual: 'Custom' },
    description: 'For funds and institutions requiring dedicated infrastructure.',
    features: [
      { text: 'Unlimited Agents', included: true },
      { text: 'Unlimited Volume', included: true },
      { text: 'Dedicated Server', included: true },
      { text: '24/7 Account Manager', included: true },
      { text: 'Custom API Integration', included: true },
      { text: 'SLA Guarantee', included: true },
      { text: 'White-label Option', included: true },
    ],
    cta: 'Contact Sales',
    href: routes.contact,
    highlighted: false,
  },
];

const faqs = [
  {
    q: 'Can I upgrade or downgrade my plan at any time?',
    a: 'Yes. You can upgrade immediately and the new features will be unlocked right away. Downgrades take effect at the end of your billing period.',
  },
  {
    q: 'Is there a free trial for the Pro plan?',
    a: 'Absolutely. All Pro Trader subscriptions include a 14-day free trial. No credit card is required to start.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards (Visa, Mastercard, Amex), as well as bank transfers for Institutional plans.',
  },
  {
    q: 'What happens to my strategies if I cancel?',
    a: 'Your strategies and data are retained for 90 days after cancellation, giving you time to export everything. We will never delete your data without notice.',
  },
  {
    q: 'Is there a limit on API calls?',
    a: 'Starter plans have no public API access. Pro Trader plans include up to 100,000 API calls per month. Institutional plans have custom limits.',
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 text-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 dark:from-shefa-bg dark:via-slate-900 dark:to-shefa-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-blue-300/10 dark:bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
            Scale your trading operations as you grow. Start free, upgrade when ready.
          </p>
          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-white/5 rounded-xl p-1.5 border border-slate-200 dark:border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!annual ? 'bg-white dark:bg-white/10 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-white dark:bg-white/10 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
            >
              Annual
              <span className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${plan.highlighted
                    ? 'border-2 border-primary shadow-2xl shadow-primary/20 bg-white dark:bg-white/5 scale-105 z-10'
                    : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03]'
                  }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-lg">
                    {plan.badge}
                  </div>
                )}
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-extrabold">
                    {annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly !== 'Custom' && (
                    <span className="text-slate-500 dark:text-slate-400">/mo</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-7 h-10">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-sm">
                      {f.included ? (
                        <span className="text-primary text-lg leading-none">✓</span>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600 text-lg leading-none">✗</span>
                      )}
                      <span className={f.included ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${plan.highlighted
                      ? 'bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white shadow-lg shadow-primary/30'
                      : 'border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-slate-50 dark:bg-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-600 dark:text-slate-400">Everything you need to know about our pricing.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-slate-900 dark:text-white">{faq.q}</span>
                  <span className={`shrink-0 w-5 h-5 flex items-center justify-center transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" className="w-5 h-5 text-slate-500 dark:text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white dark:bg-shefa-bg">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50/50 dark:from-white/5 dark:to-primary/5 p-12 rounded-3xl border border-blue-100 dark:border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Start free, scale when ready</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              No credit card required for the Starter plan. Upgrade at any time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={routes.auth.register}
                className="inline-flex items-center justify-center bg-primary hover:bg-blue-800 dark:hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-lg transition-all shadow-lg shadow-primary/30"
              >
                Get Started Free
              </Link>
              <Link
                href={routes.contact}
                className="inline-flex items-center justify-center border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white font-medium h-12 px-8 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
