/**
 * Terms of Service Legal Page
 */

import Link from 'next/link';
import { routes } from '@/lib/config/routes';

const sections = [
    {
        id: 'acceptance',
        title: '1. ACCEPTANCE OF TERMS',
        content: `These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and ShefaFx ("Company," "we," "us," or "our") governing your access to and use of the ShefaFx trading platform, website, mobile applications, APIs, and related services (collectively, the "Platform"). By creating an account, accessing, or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms; represent that you are at least 18 years of age or the age of majority in your jurisdiction; represent that you have the legal capacity to enter into this binding agreement; and agree to comply with all applicable laws and regulations.`,
    },
    {
        id: 'description',
        title: '2. DESCRIPTION OF SERVICES',
        content: `ShefaFx provides a software platform that enables users to connect to third-party brokerage accounts, create and test trading strategies, execute trades through connected broker accounts, monitor portfolio performance, and access market data and technical analysis tools. WE ARE A TECHNOLOGY PLATFORM ONLY. WE ARE NOT: a registered broker-dealer, a registered investment advisor, a financial institution, or a provider of financial, investment, tax, or legal advice.`,
    },
    {
        id: 'risk',
        title: '3. DISCLAIMERS AND RISK ACKNOWLEDGMENTS',
        content: `YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT: TRADING INVOLVES SUBSTANTIAL RISK OF LOSS. Trading stocks, securities, and other financial instruments carries a high level of risk and may not be suitable for all investors. You may lose some or all of your invested capital. NO GUARANTEE OF PROFITS. Past performance is not indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those shown on the Platform. MARKET VOLATILITY. Financial markets are volatile and unpredictable. AUTOMATED TRADING RISKS. If you use automated trading strategies, strategies may execute trades without your real-time oversight; software bugs or errors may cause unintended trades; network or system failures may prevent strategy execution or order cancellation. THIRD-PARTY BROKER RISKS. All trades are executed through your connected third-party brokerage account. We have no control over order execution quality, trade settlement, broker fees and commissions, broker system availability, or broker account security.`,
    },
    {
        id: 'no-liability',
        title: '3.2 No Liability for Trading Losses',
        content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR: any trading losses or missed profits, losses resulting from strategy performance, losses due to market conditions, losses from delayed or failed order execution, losses from broker errors or failures, losses from system downtime or technical issues, losses from unauthorized account access, or any indirect, incidental, special, consequential, or punitive damages. YOU ACCEPT FULL RESPONSIBILITY FOR ALL TRADING DECISIONS AND OUTCOMES.`,
    },
    {
        id: 'no-advice',
        title: '3.3 No Financial Advice',
        content: `WE DO NOT PROVIDE INVESTMENT ADVICE. Nothing on the Platform constitutes investment advice or recommendations, an offer to buy or sell securities, a solicitation of any kind, or tax, legal, or financial advice. Any information, data, tools, or strategies provided are for educational and informational purposes only. You should consult with qualified financial, tax, and legal professionals before making investment decisions.`,
    },
    {
        id: 'no-warranty',
        title: '3.4 No Warranty on Software or Data',
        content: `THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. We do not warrant that market data, prices, quotes, or other information is accurate, complete, or current. We do not guarantee uninterrupted or error-free operation. While we implement security measures, we cannot guarantee absolute security. We do not warrant compatibility with all devices or brokers. We make no representations about strategy effectiveness.`,
    },
    {
        id: 'responsibilities',
        title: '4. USER RESPONSIBILITIES',
        content: `You are solely responsible for maintaining the confidentiality of your account credentials, all activities that occur under your account, unauthorized access to your account, and notifying us immediately of any security breach. We are not liable for losses resulting from unauthorized account access, regardless of whether you were negligent in safeguarding your credentials. You agree to provide accurate, current, and complete information and to update such information as necessary. You agree to comply with all applicable federal, state, local, and international laws, securities laws and regulations, pay all applicable taxes, and obtain any required licenses or registrations.`,
    },
    {
        id: 'prohibited',
        title: '4.4 Prohibited Activities',
        content: `You agree NOT to: use the Platform for illegal purposes; attempt to manipulate markets or engage in fraudulent trading; violate securities laws or regulations; reverse engineer, decompile, or disassemble the Platform; use automated systems to scrape data without permission; interfere with or disrupt the Platform; impersonate any person or entity; share your account with others; or use the Platform if you are a resident of a prohibited jurisdiction.`,
    },
    {
        id: 'broker',
        title: '5. BROKER CONNECTIONS',
        content: `When you connect a brokerage account, you authorize us to access your account via broker APIs; you remain solely responsible for all trades executed; your relationship with the broker is governed by the broker's terms; and we act only as a technology intermediary. You are responsible for the security of your broker API credentials, revoking access if you no longer wish to use our Platform, and understanding your broker's API terms and limitations. We are not liable for broker system outages or errors, order execution failures, broker fee changes, broker account restrictions or closures, or broker data accuracy.`,
    },
    {
        id: 'fees',
        title: '6. FEES AND PAYMENTS',
        content: `You agree to pay all fees associated with your chosen subscription plan. Fees are charged in advance on a recurring basis, non-refundable except as required by law, and subject to change with 30 days' notice. You are solely responsible for all fees, commissions, and charges imposed by your broker. You are responsible for all applicable taxes related to your use of the Platform and trading activities.`,
    },
    {
        id: 'ip',
        title: '7. INTELLECTUAL PROPERTY',
        content: `The Platform, including all software, content, trademarks, and intellectual property, is owned by us or our licensors. You do not acquire any ownership rights. We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your personal, non-commercial use, subject to these Terms. You retain ownership of any strategies, notes, or content you create. By using the Platform, you grant us a license to use, store, and process your content solely to provide the services.`,
    },
    {
        id: 'liability',
        title: '8. LIMITATION OF LIABILITY',
        content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY: indirect, incidental, special, consequential, or punitive damages; loss of profits, revenue, data, or business opportunities; trading losses of any kind; damages resulting from reliance on information on the Platform; damages from unauthorized access or data breaches; or damages from system failures or downtime. THIS APPLIES REGARDLESS OF THE LEGAL THEORY (CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE) AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE PLATFORM SHALL NOT EXCEED THE GREATER OF $100 USD OR THE AMOUNT YOU PAID US IN SUBSCRIPTION FEES IN THE 12 MONTHS PRECEDING THE CLAIM.`,
    },
    {
        id: 'indemnification',
        title: '9. INDEMNIFICATION',
        content: `You agree to indemnify, defend, and hold harmless ShefaFx, its officers, directors, employees, agents, licensors, and suppliers from and against all claims, losses, expenses, damages, and costs, including reasonable attorneys' fees, arising out of or related to your use of the Platform, your trading activities, your violation of these Terms, your violation of any law or regulation, your violation of any third-party rights, or unauthorized access to your account resulting from your negligence.`,
    },
    {
        id: 'termination',
        title: '10. TERMINATION',
        content: `You may terminate your account at any time by contacting our support team or following the account closure process in your settings. Termination does not entitle you to a refund of fees already paid. We may suspend or terminate your access immediately, without notice, if you violate these Terms, we suspect fraudulent or illegal activity, required by law or court order, we discontinue the Platform, or you fail to pay fees. Upon termination, your license to use the Platform ends immediately, we may delete your account and data, and sections of these Terms that by their nature should survive will survive.`,
    },
    {
        id: 'disputes',
        title: '11. DISPUTE RESOLUTION',
        content: `These Terms shall be governed by the laws of [YOUR JURISDICTION], without regard to conflict of law provisions. ANY DISPUTE ARISING OUT OF OR RELATED TO THESE TERMS OR THE PLATFORM SHALL BE RESOLVED BY BINDING ARBITRATION, except that either party may seek injunctive or other equitable relief in court. Arbitration shall be conducted by a single arbitrator under the rules of [ARBITRATION ORGANIZATION]. The arbitrator's decision shall be final and binding. Each party shall bear its own costs and attorneys' fees. YOU AGREE THAT DISPUTES MUST BE BROUGHT ON AN INDIVIDUAL BASIS ONLY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, COLLECTIVE, REPRESENTATIVE, MULTIPLE PLAINTIFF, OR SIMILAR PROCEEDING. You waive any right to a jury trial. Any claim must be filed within one (1) year after the claim arises, or it is permanently barred.`,
    },
    {
        id: 'modifications',
        title: '12. MODIFICATIONS TO TERMS',
        content: `We may modify these Terms at any time by posting the updated Terms on the Platform and notifying you via email or Platform notification. Continued use of the Platform after changes constitutes acceptance of the modified Terms. If you do not agree, you must stop using the Platform.`,
    },
    {
        id: 'general',
        title: '13. GENERAL PROVISIONS',
        content: `These Terms, along with our Privacy Policy, constitute the entire agreement between you and us. If any provision is found unenforceable, the remaining provisions shall remain in full force and effect. Our failure to enforce any right or provision shall not constitute a waiver. You may not assign these Terms. We may assign these Terms without your consent. We shall not be liable for failure to perform due to causes beyond our reasonable control. The Platform is intended for use by residents of the United States and Canada only. If you are located elsewhere, you may not use the Platform. Nothing in these Terms creates a partnership, joint venture, agency, or employment relationship.`,
    },
    {
        id: 'contact',
        title: '14. CONTACT INFORMATION',
        content: `For questions about these Terms, contact us at: Email: legal@shefaai.com | Address: [Your Business Address]`,
    },
    {
        id: 'acknowledgment',
        title: '15. ACKNOWLEDGMENT AND ACCEPTANCE',
        content: `BY USING THE PLATFORM, YOU ACKNOWLEDGE THAT: (1) You have read and understood these Terms in their entirety; (2) You agree to be legally bound by these Terms; (3) You understand the substantial risks of trading; (4) You accept full responsibility for your trading decisions and losses; (5) You will not hold us liable for any trading losses; (6) You are using the Platform at your own risk; (7) You have consulted with financial professionals as needed; (8) You understand we provide no investment advice or guarantees. IF YOU DO NOT AGREE WITH ANY PART OF THESE TERMS, YOU MUST NOT USE THE PLATFORM.`,
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
