import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ShefaFx - AI-Powered Trading Platform',
    template: '%s | ShefaFx',
  },
  description:
    'Automate your trading strategies with 24/7 AI monitoring and execution. Intelligent trading platform powered by AI agents.',
  keywords: ['AI trading', 'trading platform', 'fintech', 'automated trading', 'crypto trading'],
  openGraph: {
    title: 'ShefaFx - AI Trading Agents That Never Sleep',
    description: 'Automate your trading strategies with 24/7 AI monitoring and execution.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${firaCode.variable}`}
    >
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
