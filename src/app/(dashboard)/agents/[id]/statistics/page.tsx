'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { agentApi, AgentStatistics } from '@/lib/api/agents';
import { routes } from '@/lib/config/routes';

export default function AgentStatisticsPage({ params }: { params: { id: string } }) {
    const [stats, setStats] = useState<AgentStatistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const data = await agentApi.getAgentStatistics(params.id);
                setStats(data);
            } catch (err) {
                console.error('Failed to load stats', err);
                setStats(null);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-[rgb(var(--primary))] border-t-transparent" />
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <Activity className="h-10 w-10 text-[rgb(var(--muted-foreground))] mb-4" />
                <h2 className="text-lg font-medium text-[rgb(var(--foreground))]">Statistics Unavailable</h2>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Unable to load metrics for this agent.</p>
                <Link
                    href={routes.dashboard.agents.index}
                    className="mt-6 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                    Return to Agents
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl">
            {/* Header */}
            <div>
                <Link
                    href={routes.dashboard.agents.index}
                    className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Agents / {params.id} / Statistics
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Agent Setup & Statistics</h1>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(var(--success))]/10 px-2 py-0.5 text-xs font-semibold text-[rgb(var(--success))] tracking-wider">
                        <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--success))] animate-pulse" />
                        ACTIVE
                    </span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Total Runs</p>
                        <Activity className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={2} />
                    </div>
                    <p className="text-3xl font-bold font-mono text-[rgb(var(--foreground))]">
                        {stats.totalRuns.toLocaleString()}
                    </p>
                </div>

                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Success Rate</p>
                        <CheckCircle2 className="h-4 w-4 text-[rgb(var(--success))]" strokeWidth={2} />
                    </div>
                    <p className="text-3xl font-bold font-mono text-[rgb(var(--success))]">
                        {stats.successRate}%
                    </p>
                </div>

                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">Last Run Time</p>
                        <Clock className="h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={2} />
                    </div>
                    <p className="text-3xl font-bold font-mono text-[rgb(var(--foreground))]">
                        {stats.lastRunTime}
                    </p>
                </div>
            </div>

            {/* Recent Runs Table */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Recent Runs</h2>
                </div>

                {stats.recentRuns && stats.recentRuns.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[rgb(var(--muted))]/30 text-[rgb(var(--muted-foreground))] text-xs uppercase font-medium">
                                <tr>
                                    <th className="px-5 py-3 rounded-tl-xl font-medium">Run ID</th>
                                    <th className="px-5 py-3 font-medium">Status</th>
                                    <th className="px-5 py-3 font-medium">Timestamp</th>
                                    <th className="px-5 py-3 rounded-tr-xl font-medium text-right">Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[rgb(var(--border))] text-[rgb(var(--foreground))]">
                                {stats.recentRuns.map((run) => (
                                    <tr key={run.id} className="hover:bg-[rgb(var(--muted))]/20 transition-colors">
                                        <td className="px-5 py-3 font-mono text-[rgb(var(--primary))] font-medium">{run.id}</td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${run.status === 'Success'
                                                    ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]'
                                                    : 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))]'
                                                }`}>
                                                {run.status === 'Success' ? <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} /> : <XCircle className="h-3 w-3" strokeWidth={2.5} />}
                                                {run.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 font-mono text-xs text-[rgb(var(--muted-foreground))]">{run.timestamp}</td>
                                        <td className="px-5 py-3 font-mono text-xs text-right text-[rgb(var(--foreground))]">{run.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="px-5 py-8 text-center">
                        <p className="text-sm text-[rgb(var(--muted-foreground))]">No recent runs found for this agent.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
