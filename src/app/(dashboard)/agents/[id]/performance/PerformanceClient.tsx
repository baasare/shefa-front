'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Activity, Target, Clock, Loader2 } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { routes } from '@/lib/config/routes';
import { agentApi } from '@/lib/api/agents';

interface PerformanceData {
    executionHistory: Array<{
        date: string;
        executions: number;
        successes: number;
        failures: number;
        avgDuration: number;
    }>;
    successRate: number;
    avgExecutionTime: number;
    totalExecutions: number;
    uptime: number;
}

export default function PerformanceClient({ agentId }: { agentId: string }) {
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
    const [data, setData] = useState<PerformanceData>({
        executionHistory: [],
        successRate: 0,
        avgExecutionTime: 0,
        totalExecutions: 0,
        uptime: 0,
    });

    useEffect(() => {
        async function loadPerformanceData() {
            try {
                // TODO: Replace with real API call
                // const stats = await agentApi.getAgentPerformance(agentId, timeRange);

                // Mock data for demonstration
                const mockData: PerformanceData = {
                    executionHistory: generateMockHistory(timeRange),
                    successRate: 94.5,
                    avgExecutionTime: 2.3,
                    totalExecutions: 1247,
                    uptime: 99.2,
                };

                setData(mockData);
            } catch (error) {
                console.error('Failed to load performance data:', error);
            } finally {
                setLoading(false);
            }
        }

        loadPerformanceData();
    }, [agentId, timeRange]);

    function generateMockHistory(range: '7d' | '30d' | '90d') {
        const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
        const history = [];
        const now = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            history.push({
                date: dateStr,
                executions: Math.floor(Math.random() * 20) + 30,
                successes: Math.floor(Math.random() * 15) + 28,
                failures: Math.floor(Math.random() * 3),
                avgDuration: parseFloat((Math.random() * 2 + 1.5).toFixed(1)),
            });
        }

        return history;
    }

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
            </div>
        );
    }

    const stats = [
        {
            label: 'Success Rate',
            value: `${data.successRate}%`,
            icon: Target,
            color: 'text-[rgb(var(--success))]',
            bg: 'bg-[rgb(var(--success))]/10',
        },
        {
            label: 'Avg Execution Time',
            value: `${data.avgExecutionTime}s`,
            icon: Clock,
            color: 'text-[rgb(var(--primary))]',
            bg: 'bg-[rgb(var(--primary))]/10',
        },
        {
            label: 'Total Executions',
            value: data.totalExecutions.toLocaleString(),
            icon: Activity,
            color: 'text-[rgb(var(--foreground))]',
            bg: 'bg-[rgb(var(--muted))]',
        },
        {
            label: 'Uptime',
            value: `${data.uptime}%`,
            icon: TrendingUp,
            color: 'text-[rgb(var(--success))]',
            bg: 'bg-[rgb(var(--success))]/10',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Link
                    href={routes.dashboard.agents.index}
                    className="flex items-center gap-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] mb-2 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    Back to Agents
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Agent Performance</h1>
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Detailed analytics and metrics</p>
                    </div>

                    {/* Time Range Selector */}
                    <div className="flex gap-2">
                        {(['7d', '30d', '90d'] as const).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                                    timeRange === range
                                        ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30'
                                        : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:border-[rgb(var(--foreground))]/30'
                                }`}
                            >
                                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`${stat.bg} p-2 rounded-lg`}>
                                    <Icon className={`h-5 w-5 ${stat.color}`} strokeWidth={1.5} />
                                </div>
                            </div>
                            <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider">{stat.label}</p>
                            <p className={`text-2xl font-bold font-mono mt-1 ${stat.color}`}>{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Execution History Chart */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">Execution History</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.executionHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
                            stroke="rgb(var(--border))"
                        />
                        <YAxis
                            tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 12 }}
                            stroke="rgb(var(--border))"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgb(var(--card))',
                                border: '1px solid rgb(var(--border))',
                                borderRadius: '8px',
                                fontSize: '12px',
                            }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="successes"
                            stackId="1"
                            stroke="rgb(var(--success))"
                            fill="rgb(var(--success))"
                            fillOpacity={0.6}
                            name="Successes"
                        />
                        <Area
                            type="monotone"
                            dataKey="failures"
                            stackId="1"
                            stroke="rgb(var(--destructive))"
                            fill="rgb(var(--destructive))"
                            fillOpacity={0.6}
                            name="Failures"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Success vs Failure Breakdown */}
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">Success vs Failure</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data.executionHistory.slice(-14)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }}
                                stroke="rgb(var(--border))"
                            />
                            <YAxis
                                tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }}
                                stroke="rgb(var(--border))"
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgb(var(--card))',
                                    border: '1px solid rgb(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                            />
                            <Legend />
                            <Bar dataKey="successes" fill="rgb(var(--success))" name="Success" />
                            <Bar dataKey="failures" fill="rgb(var(--destructive))" name="Failure" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Average Execution Time */}
                <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">Average Execution Time</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data.executionHistory.slice(-14)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }}
                                stroke="rgb(var(--border))"
                            />
                            <YAxis
                                tick={{ fill: 'rgb(var(--muted-foreground))', fontSize: 11 }}
                                stroke="rgb(var(--border))"
                                label={{ value: 'Seconds', angle: -90, position: 'insideLeft', fill: 'rgb(var(--muted-foreground))' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgb(var(--card))',
                                    border: '1px solid rgb(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="avgDuration"
                                stroke="rgb(var(--primary))"
                                strokeWidth={2}
                                dot={{ fill: 'rgb(var(--primary))', r: 4 }}
                                name="Avg Duration (s)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Performance Insights */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
                <h2 className="text-base font-semibold text-[rgb(var(--foreground))] mb-4">Performance Insights</h2>
                <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/20">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--success))]">
                            <span className="text-xs text-white font-bold">✓</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[rgb(var(--foreground))]">Excellent Success Rate</p>
                            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
                                Your agent maintains a {data.successRate}% success rate, which is above the recommended 90% threshold.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--primary))]">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-[rgb(var(--foreground))]">Consistent Performance</p>
                            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
                                Execution time has remained stable at ~{data.avgExecutionTime}s over the past {timeRange}.
                            </p>
                        </div>
                    </div>

                    {data.uptime < 95 && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-[rgb(var(--warning))]/10 border border-[rgb(var(--warning))]/20">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--warning))]">
                                <span className="text-xs text-white font-bold">!</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-[rgb(var(--foreground))]">Uptime Below Target</p>
                                <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
                                    Current uptime is {data.uptime}%. Consider reviewing error logs to improve reliability.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
