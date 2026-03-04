'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain, ShieldCheck, Zap } from 'lucide-react';
import { routes } from '@/lib/config/routes';
import { useAuthStore } from '@/lib/store/authStore';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description:
      'Our AI agents analyze markets 24/7 so you never miss an opportunity.',
    color: 'text-[rgb(var(--primary))]',
    bg: 'bg-[rgb(var(--primary))]/10',
    border: 'border-[rgb(var(--primary))]/20',
  },
  {
    icon: ShieldCheck,
    title: 'Smart Risk Management',
    description:
      'Automated risk controls keep your portfolio protected at all times.',
    color: 'text-[rgb(var(--success))]',
    bg: 'bg-[rgb(var(--success))]/10',
    border: 'border-[rgb(var(--success))]/20',
  },
  {
    icon: Zap,
    title: 'One-Click Trading',
    description:
      'Execute strategies with precision using our intelligent order system.',
    color: 'text-[rgb(var(--warning))]',
    bg: 'bg-[rgb(var(--warning))]/10',
    border: 'border-[rgb(var(--warning))]/20',
  },
];

export default function WelcomePage() {
  const router = useRouter();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
  const [isSkipping, setIsSkipping] = useState(false);

  const handleGetStarted = () => {
    router.push(routes.onboarding.riskProfile);
  };

  const handleSkipSetup = async () => {
    setIsSkipping(true);
    try {
      await completeOnboarding();
      router.push(routes.dashboard.home);
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      setIsSkipping(false);
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-10 py-4">
      {/* Hero */}
      <div className="space-y-4 max-w-xl">
        {/* Glow orb decoration */}
        <div className="relative mx-auto mb-2 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[rgb(var(--primary))]/20 blur-xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary))]/60 shadow-[0_0_30px_rgba(30,111,255,0.4)]">
            <Zap className="h-8 w-8 text-white" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-5xl">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(91,143,255)] bg-clip-text text-transparent">
            ShefaFx
          </span>
        </h1>
        <p className="text-lg text-[rgb(var(--muted-foreground))] leading-relaxed">
          Your AI-powered trading journey begins here. In just a few steps,
          we&apos;ll tailor the platform for your goals and risk appetite.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid gap-4 sm:grid-cols-3 w-full">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`rounded-xl border ${feature.border} bg-[rgb(var(--card))] p-6 text-left transition-transform duration-200 hover:-translate-y-1`}
            >
              <div
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.bg}`}
              >
                <Icon className={`h-5 w-5 ${feature.color}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-[rgb(var(--foreground))] mb-1.5">
                {feature.title}
              </h3>
              <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 pt-2 w-full max-w-xs">
        <button
          onClick={handleGetStarted}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[rgb(var(--primary))] px-8 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Started
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
        <button
          onClick={handleSkipSetup}
          disabled={isSkipping}
          className="text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSkipping ? 'Skipping...' : 'Skip setup, go to dashboard'}
        </button>
      </div>

      {/* Time estimate */}
      <p className="text-xs text-[rgb(var(--muted-foreground))]/70">
        ⏱ Takes about 3 minutes to complete
      </p>
    </div>
  );
}
