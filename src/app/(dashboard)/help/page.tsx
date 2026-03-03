import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, MessageCircle, HelpCircle, ChevronDown, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center — ShefaFx',
  description: 'Get help and support for ShefaFx.',
};

const faqs = [
  {
    q: 'How do AI agents make trading decisions?',
    a: 'Our AI agents use a combination of technical analysis, sentiment analysis, and machine learning models to identify trading opportunities. They analyze price patterns, news, and market data in real-time.',
  },
  {
    q: 'What is HITL (Human-in-the-Loop)?',
    a: 'HITL ensures that high-risk or high-value trades require your manual approval before execution. This gives you final control while benefiting from AI-powered analysis.',
  },
  {
    q: 'How do I connect my broker account?',
    a: 'Go to Settings → Brokers and enter your API key and secret. ShefaFx only uses trading-only API keys — withdrawal access is never required or used.',
  },
  {
    q: 'Can I run multiple strategies simultaneously?',
    a: 'Yes, you can run multiple strategies at the same time. Each strategy operates independently with its own capital allocation and risk parameters.',
  },
  {
    q: 'How is my data secured?',
    a: 'All data is encrypted at rest and in transit. We use industry-standard AES-256 encryption. API keys are stored in a hardware security module (HSM).',
  },
];

const resources = [
  { icon: BookOpen, title: 'Documentation', desc: 'Complete platform documentation and API reference', href: '#' },
  { icon: MessageCircle, title: 'Live Chat', desc: 'Chat with our support team in real-time', href: '#' },
  { icon: HelpCircle, title: 'Community Forum', desc: 'Ask questions and share strategies with other traders', href: '#' },
];

export default function HelpPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Help Center</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Find answers, guides, and support resources</p>
      </div>

      {/* Resources */}
      <div className="grid gap-4 sm:grid-cols-3">
        {resources.map((res) => {
          const Icon = res.icon;
          return (
            <a
              key={res.title}
              href={res.href}
              className="flex flex-col rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 hover:border-[rgb(var(--primary))]/40 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/10">
                <Icon className="h-5 w-5 text-[rgb(var(--primary))]" strokeWidth={1.5} />
              </div>
              <p className="font-semibold text-sm text-[rgb(var(--foreground))] mb-1 group-hover:text-[rgb(var(--primary))] transition-colors flex items-center gap-1">
                {res.title}
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2} />
              </p>
              <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed">{res.desc}</p>
            </a>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-[rgb(var(--border))]">
          {faqs.map((item, i) => (
            <details key={i} className="group px-5 py-4 cursor-pointer">
              <summary className="flex items-center justify-between list-none font-medium text-sm text-[rgb(var(--foreground))]">
                {item.q}
                <ChevronDown className="h-4 w-4 text-[rgb(var(--muted-foreground))] transition-transform group-open:rotate-180 flex-shrink-0 ml-3" strokeWidth={2} />
              </summary>
              <p className="mt-3 text-sm text-[rgb(var(--muted-foreground))] leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 text-center">
        <p className="font-semibold text-[rgb(var(--foreground))] mb-1">Still need help?</p>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">Our support team is available 24/7</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-all"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          Contact Support
        </Link>
      </div>
    </div>
  );
}
