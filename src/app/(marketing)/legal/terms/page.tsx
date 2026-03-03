/**
 * Terms of Service Legal Page
 */

import Link from 'next/link';
import { routes } from '@/lib/config/routes';

const sections = [
    {
        id: 'acceptance',
        title: '1. Acceptance of Terms',
        content: `By accessing or using the ShefaFx platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. These Terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update these Terms at any time, and we will notify you of material changes via email or a prominent notice on our platform.`,
    },
    {
        id: 'description',
        title: '2. Service Description',
        content: `ShefaFx provides an AI-powered algorithmic trading platform that enables users to configure, deploy, and monitor automated trading strategies across connected exchange accounts. The Service includes the web application, APIs, strategy builder, agent monitoring, and all related tools and services provided by ShefaFx. We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.`,
    },
    {
        id: 'obligations',
        title: '3. User Obligations',
        content: `You agree to: (a) provide accurate, current, and complete information during registration; (b) maintain the security of your account credentials; (c) notify us immediately of any unauthorized access to your account; (d) comply with all applicable laws and regulations; (e) use the Service only for lawful purposes. You are solely responsible for all activities that occur under your account and for ensuring your use of the Service complies with the laws of your jurisdiction.`,
    },
    {
        id: 'prohibited',
        title: '4. Prohibited Activities',
        content: `You agree not to: (a) engage in market manipulation or any form of securities fraud; (b) attempt to reverse-engineer, decompile, or extract the source code of our software; (c) use the Service to transmit malware or harmful code; (d) scrape, crawl, or harvest data from the Service without our written consent; (e) use the Service in any jurisdiction where algorithmic trading is prohibited. Violations may result in immediate termination of your account.`,
    },
    {
        id: 'risk',
        title: '5. Risk Disclosures',
        content: `Trading financial instruments involves substantial risk of loss. ShefaFx does not guarantee profits or protect against losses. Past performance of any trading strategy is not indicative of future results. You should only trade with capital you can afford to lose. You acknowledge that you have read and understand our full Risk Disclosures document before using the Service.`,
    },
    {
        id: 'liability',
        title: '6. Limitation of Liability',
        content: `To the maximum extent permitted by applicable law, ShefaFx and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to trading losses, loss of profits, loss of data, or loss of goodwill. In no event shall our total liability to you for all claims exceed the amount you paid to us in the twelve months preceding the claim.`,
    },
    {
        id: 'privacy',
        title: '7. Privacy',
        content: `Your privacy is important to us. Our Privacy Policy, incorporated into these Terms by reference, describes how we collect, use, and share information about you when you use the Service. By using the Service, you consent to the collection and use of information in accordance with our Privacy Policy.`,
    },
    {
        id: 'termination',
        title: '8. Termination',
        content: `We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease. All provisions which by their nature should survive termination shall survive, including intellectual property provisions, disclaimers, indemnity, and limitations of liability.`,
    },
    {
        id: 'governing',
        title: '9. Governing Law',
        content: `These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Delaware. If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
    },
];

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-shefa-bg text-slate-900 dark:text-white">
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-shefa-navy">
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <div className="flex items-start gap-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide mt-1">
                            Legal
                        </span>
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: March 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning callout */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <div className="bg-blue-50 dark:bg-primary/5 border border-blue-200 dark:border-primary/20 rounded-xl px-6 py-4 flex items-start gap-3">
                    <span className="text-blue-500 text-lg mt-0.5">ℹ</span>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Important:</strong> ShefaFx does not provide financial advice. These Terms govern your use of the platform as a technology service. Trading involves significant risk — please review our{' '}
                        <Link href={routes.legal.disclosures} className="underline hover:text-primary">Risk Disclosures</Link>.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-[220px_1fr] gap-12">
                    {/* Sidebar TOC */}
                    <aside className="hidden lg:block">
                        <nav className="sticky top-24 space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Contents</p>
                            {sections.map((s) => (
                                <a
                                    key={s.id}
                                    href={`#${s.id}`}
                                    className="block text-sm text-slate-600 dark:text-slate-400 hover:text-primary py-1.5 transition-colors leading-snug"
                                >
                                    {s.title}
                                </a>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="max-w-2xl space-y-10">
                        {sections.map((s) => (
                            <section key={s.id} id={s.id}>
                                <h2 className="text-xl font-bold mb-4 scroll-mt-24">{s.title}</h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px]">{s.content}</p>
                            </section>
                        ))}

                        <div className="pt-8 border-t border-slate-200 dark:border-white/10 text-sm text-slate-500 dark:text-slate-400">
                            <p>Questions about these Terms? Contact us at{' '}
                                <a href="mailto:legal@shefafx.com" className="text-primary hover:underline">legal@shefafx.com</a>
                            </p>
                            <p className="mt-2">Last updated: March 3, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
