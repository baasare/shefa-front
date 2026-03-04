/**
 * Privacy Policy Legal Page
 */

import Link from 'next/link';

const sections = [
    {
        id: 'introduction',
        title: '1. INTRODUCTION',
        content: `ShefaFx, Inc. ("we," "us," "our," or "Company") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our trading platform, website, mobile applications, and services (collectively, the "Platform"). BY USING THE PLATFORM, YOU CONSENT TO THE COLLECTION, USE, AND DISCLOSURE OF YOUR INFORMATION AS DESCRIBED IN THIS PRIVACY POLICY. If you do not agree with this Privacy Policy, please do not use the Platform.`,
    },
    {
        id: 'collect',
        title: '2. INFORMATION WE COLLECT',
        content: `We collect: Account Information (name, email, phone, username/password, date of birth, address, government-issued ID if required); Financial Information (broker account credentials/API keys, trading strategies and preferences, portfolio holdings and positions, transaction history, payment information); Profile Information (profile photo, trading experience level, investment preferences, risk tolerance); Communications (support requests, feedback, messages sent through the Platform); Usage Data (pages viewed, features used, time spent, click patterns, search queries, device type, browser type); Technical Data (IP address, device identifiers, browser fingerprints, cookies, log data); Trading Activity (orders placed/executed, strategy performance, market data accessed, API calls); and Information from Third Parties (broker data, market data, identity verification services).`,
    },
    {
        id: 'use',
        title: '3. HOW WE USE YOUR INFORMATION',
        content: `We use your information for: Providing Services (creating/managing accounts, connecting brokerage accounts, executing trades, providing market data and analysis, generating strategy signals, calculating portfolio performance, processing payments); Improving Services (analyzing Platform usage, developing new features, fixing bugs, conducting research, testing and optimization); Communications (sending transactional emails, providing customer support, sending Platform updates, marketing communications with your consent, responding to inquiries); and Security and Compliance (detecting/preventing fraud, monitoring suspicious activity, complying with legal obligations, enforcing Terms of Service, protecting our rights and property, conducting audits). For EU/EEA users, our legal bases include contract performance, legitimate interests, legal compliance, and consent.`,
    },
    {
        id: 'sharing',
        title: '4. HOW WE SHARE YOUR INFORMATION',
        content: `We do not sell, rent, or trade your personal information. We may share information with: Service Providers (brokers for trade execution, payment processors, cloud hosting providers like AWS/Google Cloud, analytics providers like Google Analytics/Mixpanel, email services, customer support platforms, identity verification services); Business Transfers (in case of merger, acquisition, sale of assets, or bankruptcy); Legal Requirements (court orders, subpoenas, government investigations, regulatory requests from SEC/FINRA, law enforcement, legal proceedings); Protection of Rights (to protect our legal rights and property, enforce Terms of Service, prevent fraud or illegal activity, protect safety of users or public); and with Your Consent for other purposes.`,
    },
    {
        id: 'security',
        title: '5. DATA SECURITY',
        content: `We implement industry-standard security measures including: Technical Safeguards (encryption in transit via TLS/SSL and at rest via AES-256, encrypted API credentials using Fernet symmetric encryption, role-based access controls, strong password requirements with optional 2FA, firewalls/intrusion detection/DDoS protection, secure development practices with code reviews and vulnerability scanning); and Organizational Safeguards (employee training on data security, background checks for personnel with access to sensitive data, incident response procedures, regular security audits, data backup and disaster recovery plans). However, no system is 100% secure. We cannot guarantee absolute security. You are responsible for maintaining password confidentiality, securing your devices, using secure networks, logging out of your account, and notifying us immediately of any security breach.`,
    },
    {
        id: 'retention',
        title: '6. DATA RETENTION',
        content: `We retain your information for as long as necessary to provide Platform services, comply with legal obligations, resolve disputes, and enforce agreements. Retention Periods: Account data (while account is active plus 7 years after closure for legal compliance); Trading records (7 years - regulatory requirement); Audit logs (7 years for compliance and security); Financial records (7 years for tax and regulatory requirements); Marketing data (until you opt out); Support requests (3 years). After the retention period, we securely delete or anonymize your information.`,
    },
    {
        id: 'rights',
        title: '7. YOUR PRIVACY RIGHTS',
        content: `All Users have the right to: access (request a copy of your personal information), correction (update or correct inaccurate information), deletion (request deletion of your information subject to legal requirements), portability (receive your data in a structured format), object (to certain uses of your information), and opt-out (unsubscribe from marketing communications). California Residents (CCPA) have additional rights including: right to know what personal information is collected, right to know if personal information is sold or disclosed (we do not sell information), right to opt out of sale, right to deletion, and right to non-discrimination. EU/EEA Residents (GDPR) have rights including: access, rectification, erasure ("right to be forgotten"), restriction of processing, data portability, objection to processing, withdrawal of consent, and the right to lodge a complaint with a supervisory authority. To exercise these rights, contact us at privacy@shefaai.com.`,
    },
    {
        id: 'cookies',
        title: '8. COOKIES AND TRACKING TECHNOLOGIES',
        content: `We use cookies and similar technologies to: authenticate users, remember preferences, analyze Platform usage, improve user experience, and provide personalized content. Types of Cookies: Essential cookies (required for Platform functionality), Analytics cookies (track usage and performance via Google Analytics), Functional cookies (remember preferences), and Marketing cookies (show relevant ads if applicable). You can control cookies through your browser settings. However, disabling essential cookies may limit Platform functionality. Do Not Track: We do not currently respond to Do Not Track signals.`,
    },
    {
        id: 'third-party',
        title: '9. THIRD-PARTY LINKS',
        content: `The Platform may contain links to third-party websites and services (brokers, market data providers, etc.). We are not responsible for their privacy practices. Please review their privacy policies.`,
    },
    {
        id: 'children',
        title: '10. CHILDREN\'S PRIVACY',
        content: `The Platform is not intended for individuals under 18 years of age. We do not knowingly collect information from children. If you believe we have collected information from a child, please contact us immediately.`,
    },
    {
        id: 'international',
        title: '11. INTERNATIONAL DATA TRANSFERS',
        content: `The Platform is operated in the United States. If you access the Platform from outside the U.S., your information may be transferred to, stored, and processed in the U.S. For EU/EEA users: We comply with GDPR requirements for international transfers, including Standard Contractual Clauses (SCCs) where applicable.`,
    },
    {
        id: 'changes',
        title: '12. CHANGES TO THIS PRIVACY POLICY',
        content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Platform, sending you an email notification, and displaying a prominent notice on the Platform. Your continued use of the Platform after changes constitutes acceptance of the updated policy.`,
    },
    {
        id: 'contact',
        title: '13. CONTACT US',
        content: `For questions, concerns, or requests regarding this Privacy Policy, contact us at: Email: privacy@shefaai.com | Mailing Address: ShefaFx, Inc., [Your Business Address] | Data Protection Officer (if applicable): dpo@shefaai.com`,
    },
    {
        id: 'disclosures',
        title: '14. SPECIFIC DISCLOSURES',
        content: `Data We Collect: Identifiers (name, email, IP address) for account creation and communication; Financial Data (broker credentials, transactions) for trade execution and portfolio management; Usage Data (pages viewed, clicks) for Platform improvement and analytics; Device Data (device type, browser) for technical support and security. Data Sharing: We share data with brokers (for trade execution), service providers (for Platform operations), and legal authorities (when required by law). We do NOT: sell your data, share data with advertisers (without consent), or use data for unrelated purposes. Data Retention: Account data (duration of account + 7 years); Trading records (7 years - regulatory requirement); Audit logs (7 years); Marketing data (until opt-out).`,
    },
    {
        id: 'state-specific',
        title: '15. STATE-SPECIFIC DISCLOSURES',
        content: `Nevada Residents may opt out of the sale of personal information. We do not sell personal information, but you may submit a request to privacy@shefaai.com. Virginia Residents (VCDPA) have rights similar to CCPA. Contact privacy@shefaai.com to exercise your rights.`,
    },
    {
        id: 'acknowledgment',
        title: '16. ACKNOWLEDGMENT',
        content: `BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT: (1) You have read and understood this Privacy Policy; (2) You consent to the collection, use, and disclosure of your information as described; (3) You understand the security risks of online platforms; (4) You are responsible for securing your account and devices; (5) You will notify us immediately of any privacy concerns. IF YOU DO NOT AGREE WITH THIS PRIVACY POLICY, PLEASE DO NOT USE THE PLATFORM.`,
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
