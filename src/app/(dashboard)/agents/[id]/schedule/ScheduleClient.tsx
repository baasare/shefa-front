'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, Play, Pause, Save } from 'lucide-react';
import { routes } from '@/lib/config/routes';

interface ScheduleConfig {
    enabled: boolean;
    frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'custom';
    interval: number; // in minutes for custom
    time: string; // HH:mm format
    daysOfWeek: number[]; // 0-6 for weekly
    dayOfMonth: number; // 1-31 for monthly
    timezone: string;
}

export default function ScheduleClient({ agentId }: { agentId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [config, setConfig] = useState<ScheduleConfig>({
        enabled: false,
        frequency: 'daily',
        interval: 60,
        time: '09:00',
        daysOfWeek: [1, 2, 3, 4, 5], // Mon-Fri
        dayOfMonth: 1,
        timezone: 'America/New_York',
    });

    const frequencies = [
        { value: 'once', label: 'Run Once', description: 'Execute immediately, one time' },
        { value: 'daily', label: 'Daily', description: 'Run every day at a specific time' },
        { value: 'weekly', label: 'Weekly', description: 'Run on specific days of the week' },
        { value: 'monthly', label: 'Monthly', description: 'Run on a specific day each month' },
        { value: 'custom', label: 'Custom Interval', description: 'Run at custom minute intervals' },
    ];

    const daysOfWeek = [
        { value: 0, label: 'Sun' },
        { value: 1, label: 'Mon' },
        { value: 2, label: 'Tue' },
        { value: 3, label: 'Wed' },
        { value: 4, label: 'Thu' },
        { value: 5, label: 'Fri' },
        { value: 6, label: 'Sat' },
    ];

    const timezones = [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Asia/Tokyo',
        'Asia/Hong_Kong',
        'Asia/Singapore',
        'Australia/Sydney',
    ];

    function toggleDay(day: number) {
        setConfig(prev => ({
            ...prev,
            daysOfWeek: prev.daysOfWeek.includes(day)
                ? prev.daysOfWeek.filter(d => d !== day)
                : [...prev.daysOfWeek, day].sort(),
        }));
    }

    async function handleSave() {
        setLoading(true);
        try {
            // TODO: Call API to save schedule
            console.log('Saving schedule:', config);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            router.push(routes.dashboard.agents.index);
        } catch (error) {
            console.error('Failed to save schedule:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div>
                <Link
                    href={routes.dashboard.agents.index}
                    className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Agents
                </Link>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Agent Schedule</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Configure automated execution schedule</p>
            </div>

            {/* Enable/Disable Toggle */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Schedule Status</h2>
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                            {config.enabled ? 'Agent will run automatically' : 'Agent scheduling is disabled'}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            config.enabled ? 'bg-[rgb(var(--primary))]' : 'bg-[rgb(var(--muted))]'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                config.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Frequency Selection */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[rgb(var(--primary))]" />
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Execution Frequency</h2>
                </div>

                <div className="grid gap-3">
                    {frequencies.map((freq) => (
                        <label
                            key={freq.value}
                            className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                                config.frequency === freq.value
                                    ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/5'
                                    : 'border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30'
                            }`}
                        >
                            <input
                                type="radio"
                                name="frequency"
                                value={freq.value}
                                checked={config.frequency === freq.value}
                                onChange={(e) => setConfig(prev => ({ ...prev, frequency: e.target.value as any }))}
                                className="mt-0.5 h-4 w-4 text-[rgb(var(--primary))] border-[rgb(var(--border))] focus:ring-[rgb(var(--ring))]"
                            />
                            <div className="flex-1">
                                <div className="text-sm font-medium text-[rgb(var(--foreground))]">{freq.label}</div>
                                <div className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">{freq.description}</div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Frequency-specific Configuration */}
            {config.frequency !== 'once' && (
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 space-y-5">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[rgb(var(--primary))]" />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Schedule Details</h2>
                    </div>

                    {/* Custom Interval */}
                    {config.frequency === 'custom' && (
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                                Interval (minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="1440"
                                value={config.interval}
                                onChange={(e) => setConfig(prev => ({ ...prev, interval: parseInt(e.target.value) }))}
                                className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                            />
                            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1.5">
                                Agent will run every {config.interval} minutes
                            </p>
                        </div>
                    )}

                    {/* Time Selection (for daily, weekly, monthly) */}
                    {(config.frequency === 'daily' || config.frequency === 'weekly' || config.frequency === 'monthly') && (
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                                Execution Time
                            </label>
                            <input
                                type="time"
                                value={config.time}
                                onChange={(e) => setConfig(prev => ({ ...prev, time: e.target.value }))}
                                className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                            />
                        </div>
                    )}

                    {/* Days of Week (for weekly) */}
                    {config.frequency === 'weekly' && (
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                                Days of Week
                            </label>
                            <div className="flex gap-2">
                                {daysOfWeek.map((day) => (
                                    <button
                                        key={day.value}
                                        type="button"
                                        onClick={() => toggleDay(day.value)}
                                        className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                                            config.daysOfWeek.includes(day.value)
                                                ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30'
                                                : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30'
                                        }`}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Day of Month (for monthly) */}
                    {config.frequency === 'monthly' && (
                        <div>
                            <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                                Day of Month
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="31"
                                value={config.dayOfMonth}
                                onChange={(e) => setConfig(prev => ({ ...prev, dayOfMonth: parseInt(e.target.value) }))}
                                className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                            />
                            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1.5">
                                Agent will run on day {config.dayOfMonth} of each month
                            </p>
                        </div>
                    )}

                    {/* Timezone */}
                    <div>
                        <label className="block text-sm font-medium text-[rgb(var(--foreground))] mb-2">
                            Timezone
                        </label>
                        <select
                            value={config.timezone}
                            onChange={(e) => setConfig(prev => ({ ...prev, timezone: e.target.value }))}
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        >
                            {timezones.map((tz) => (
                                <option key={tz} value={tz}>
                                    {tz}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-[rgb(var(--border))] text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]/50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading || (config.enabled && config.frequency === 'weekly' && config.daysOfWeek.length === 0)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[rgb(var(--primary))] text-sm font-medium text-white hover:bg-[rgb(var(--primary))]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4" />
                            Save Schedule
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
