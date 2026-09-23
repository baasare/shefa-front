'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Target } from 'lucide-react';
import { routes } from '@/lib/config/routes';

const GOAL_OPTIONS = [
  {
    id: 'wealth',
    title: 'Grow Long-Term Wealth',
    description: 'Build a diversified portfolio steadily over time.',
  },
  {
    id: 'income',
    title: 'Generate Extra Income',
    description: 'Focus on opportunities that may produce supplemental returns.',
  },
  {
    id: 'milestone',
    title: 'Fund a Major Milestone',
    description: 'Save for a clear target such as a home down payment or tuition.',
  },
];

export default function OnboardingGoalsPage() {
  const router = useRouter();
  const [goalId, setGoalId] = useState<string>('wealth');
  const [timelineYears, setTimelineYears] = useState<number>(5);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recommendedBucket = useMemo(() => {
    if (timelineYears <= 2) {
      return 'Conservative';
    }
    if (timelineYears <= 5) {
      return 'Balanced';
    }
    return 'Aggressive';
  }, [timelineYears]);

  async function handleContinue() {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push(routes.onboarding.riskProfile);
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[rgb(var(--foreground))]">Set your financial goal</h1>
        <p className="mt-2 text-[rgb(var(--muted-foreground))]">
          We use this to personalize advisor recommendations and risk sizing.
        </p>
      </div>

      <div className="grid gap-3">
        {GOAL_OPTIONS.map((goal) => {
          const isSelected = goal.id === goalId;
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => setGoalId(goal.id)}
              className={`rounded-xl border p-4 text-left transition ${
                isSelected
                  ? 'border-[rgb(var(--primary))]/40 bg-[rgb(var(--primary))]/10'
                  : 'border-[rgb(var(--border))] bg-[rgb(var(--card))] hover:border-[rgb(var(--border))]/80'
              }`}
            >
              <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{goal.title}</p>
              <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">{goal.description}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted-foreground))]">
            Time Horizon
          </span>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={timelineYears}
              onChange={(event) => setTimelineYears(Number(event.target.value))}
              className="w-full accent-[rgb(var(--primary))]"
            />
            <span className="min-w-[56px] text-right text-sm font-semibold text-[rgb(var(--foreground))]">
              {timelineYears}y
            </span>
          </div>
        </label>

        <label className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted-foreground))]">
            Monthly Contribution
          </span>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2.5">
            <span className="text-sm text-[rgb(var(--muted-foreground))]">$</span>
            <input
              type="number"
              min={50}
              step={50}
              value={monthlyContribution}
              onChange={(event) => setMonthlyContribution(Number(event.target.value) || 0)}
              className="w-full bg-transparent text-sm text-[rgb(var(--foreground))] focus:outline-none"
            />
          </div>
        </label>
      </div>

      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
        <div className="flex items-start gap-2.5">
          <div className="rounded-lg bg-[rgb(var(--primary))]/10 p-2">
            <Target className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--foreground))]">Suggested Risk Bucket</p>
            <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
              Based on your timeline, we suggest <span className="font-semibold text-[rgb(var(--foreground))]">{recommendedBucket}</span>.
            </p>
            <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
              Selected goal: {GOAL_OPTIONS.find((goal) => goal.id === goalId)?.title}. Monthly contribution: $
              {monthlyContribution.toLocaleString('en-US')}.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push(routes.onboarding.welcome)}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[rgb(var(--muted-foreground))] transition hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
          {!isSubmitting && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
}
