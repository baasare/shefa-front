/**
 * Privacy Policy Legal Page
 */

import Link from 'next/link';

const sections = [
    {
        id: 'collect',
        title: '1. Information We Collect',
        content: `We collect information you provide directly to us when you register for an account, use the Service, or communicate with us. This includes: name, email address, password (hashed), payment information (processed by Stripe, not stored by us), and any information you add to your profile. We also automatically collect usage data, log data, and device information when you use the Service.`,
    },
    {
        id: 'use',
        title: '2. How We Use Your Information',
        content: `We use the information we collect to: provide, maintain, and improve the Service; process transactions and send related information; send technical notices and support messages; respond to your comments and questions; send marketing communications (with your consent); monitor and analyze usage patterns; detect and prevent fraudulent transactions and other illegal activities; and comply with legal obligations.`,
    },
    {
        id: 'sharing',
        title: '3. Data Sharing',
        content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating the Service (e.g., Stripe for payments, AWS for hosting, Intercom for support), subject to confidentiality agreements. We may also disclose your information if required by law or if we reasonably believe disclosure is necessary to protect our rights, protect your safety, or comply with a legal process.`,
    },
    {
        id: 'cookies',
        title: '4. Cookies and Tracking',
        content: `We use cookies and similar tracking technologies to track activity on the Service and hold certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some parts of the Service may not function properly. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted).`,
    },
    {
        id: 'retention',
        title: '5. Data Retention',
        content: `We retain your personal information for as long as your account is active or as needed to provide you with the Service. You may request deletion of your personal data at any time. We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. Trading logs and transaction records may be retained for up to 7 years for regulatory compliance purposes.`,
    },
    {
        id: 'rights',
        title: '6. Your Rights',
        content: `Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. EU/UK residents have rights under GDPR including data portability and the right to object to processing. California residents have rights under the CCPA. To exercise these rights, please contact us at privacy@shefafx.com. We will respond within 30 days.`,
    },
    {
        id: 'security',
        title: '7. Data Security',
        content: `We implement industry-standard security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. These include TLS/SSL encryption for data in transit, AES-256 encryption for data at rest, regular security audits, and SOC 2 Type II compliance. However, no security system is impenetrable, and we cannot guarantee the absolute security of your data.`,
    },
    {
        id: 'children',
        title: '8. Children\'s Privacy',
        content: `The Service is not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you become aware that your child has provided us with personal information, please contact us immediately at privacy@shefafx.com, and we will take steps to remove that information.`,
    },
    {
        id: 'changes',
        title: '9. Changes to This Policy',
        content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Where the changes are material, we will also send you an email notification. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.`,
    },
    {
        id: 'contact',
        title: '10. Contact Us',
        content: `If you have any questions about this Privacy Policy or our data practices, please contact our Privacy Officer at privacy@shefafx.com. For EU/UK residents, you also have the right to lodge a complaint with your local data protection supervisory authority.`,
    },
];

const gdprRights = [
    { icon: '👁', title: 'Right to Access', desc: 'Request a copy of the data we hold about you.' },
    { icon: '🗑', title: 'Right to Delete', desc: 'Request erasure of your personal data.' },
    { icon: '📦', title: 'Right to Portability', desc: 'Receive your data in a portable format.' },
    { icon: '✋', title: 'Right to Object', desc: 'Object to processing of your personal data.' },
];

export default function PrivacyPage() {
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
                            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Last updated: March 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust callout */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <div className="bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 rounded-xl px-6 py-4 flex items-start gap-3">
                    <span className="text-green-500 text-lg mt-0.5">🛡</span>
                    <p className="text-sm text-green-800 dark:text-green-200">
                        <strong>We take your privacy seriously.</strong> Your data is never sold, rented, or shared with advertisers. We only use your data to operate and improve ShefaFx.
                    </p>
                </div>
            </div>

            {/* GDPR Rights */}
            <div className="max-w-6xl mx-auto px-4 pt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gdprRights.map((r) => (
                        <div key={r.title} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">{r.icon}</div>
                            <div className="font-semibold text-sm mb-1">{r.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{r.desc}</div>
                        </div>
                    ))}
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
                            <p>Privacy questions? Contact us at{' '}
                                <a href="mailto:privacy@shefafx.com" className="text-primary hover:underline">privacy@shefafx.com</a>
                            </p>
                            <p className="mt-2">Last updated: March 3, 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
