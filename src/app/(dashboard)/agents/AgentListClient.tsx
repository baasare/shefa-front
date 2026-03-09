'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bot, Brain, Activity, CheckCircle2, Clock, Play, Settings, Plus, Loader2 } from 'lucide-react';
import { agentApi, Agent, AgentLog } from '@/lib/api/agents';
import { routes } from '@/lib/config/routes';

const initialAgents = [
    {
        id: 'analysis',
        name: 'Analysis Agent',
        icon: Brain,
        status: 'Active',
        statusColor: 'success',
        description: 'Continuously scans markets using technical and fundamental signals.',
        lastAction: 'Completed sentiment sweep for AAPL, MSFT, BTC',
        lastActionTime: '2 min ago',
        tasksToday: 47,
        successRate: '96%',
    },
    {
        id: 'trade',
        name: 'Trade Agent',
        icon: Activity,
        status: 'Active',
        statusColor: 'success',
        description: 'Executes buy/sell orders based on approved signals from the Analysis Agent.',
        lastAction: 'Executed AAPL Buy — 10 shares @ $182.50',
        lastActionTime: '5 min ago',
        tasksToday: 12,
        successRate: '100%',
    },
    {
        id: 'risk',
        name: 'Risk Agent',
        icon: CheckCircle2,
        status: 'Monitoring',
        statusColor: 'primary',
        description: 'Monitors portfolio drawdown, position sizing, and risk exposure in real-time.',
        lastAction: 'Portfolio risk within defined limits',
        lastActionTime: '1 min ago',
        tasksToday: 120,
        successRate: '100%',
    },
    {
        id: 'approval',
        name: 'Approval Agent',
        icon: Clock,
        status: 'Waiting',
        statusColor: 'warning',
        description: 'Routes high-confidence but risk-flagged trades to you for manual approval.',
        lastAction: 'TSLA Sell @ $248.30 — awaiting your approval',
        lastActionTime: '18 min ago',
        tasksToday: 3,
        successRate: '—',
    },
];

const statusColorMap: Record<string, { dot: string; badge: string }> = {
    success: {
        dot: 'bg-[rgb(var(--success))] animate-pulse',
        badge: 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]',
    },
    primary: {
        dot: 'bg-[rgb(var(--primary))] animate-pulse',
        badge: 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]',
    },
    warning: {
        dot: 'bg-[rgb(var(--warning))]',
        badge: 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))]',
    },
};

const initialLogs = [
    { id: 1, time: '16:32', agent: 'Analysis Agent', event: 'BTC sentiment score: 0.78 (Bullish)', type: 'info' },
    { id: 2, time: '16:29', agent: 'Risk Agent', event: 'Portfolio VaR within 5% daily limit', type: 'success' },
    { id: 3, time: '16:27', agent: 'Trade Agent', event: 'AAPL Buy order filled — 10 shares at $182.50', type: 'success' },
    { id: 4, time: '16:14', agent: 'Approval Agent', event: 'TSLA Sell flagged for human review', type: 'warning' },
    { id: 5, time: '16:08', agent: 'Analysis Agent', event: 'MSFT earnings beat — signal upgraded', type: 'info' },
    { id: 6, time: '15:55', agent: 'Risk Agent', event: 'ETH drawdown exceeded 5% threshold — strategy paused', type: 'error' },
];

const logTypeMap: Record<string, string> = {
    info: 'text-[rgb(var(--primary))]',
    success: 'text-[rgb(var(--success))]',
    warning: 'text-[rgb(var(--warning))]',
    error: 'text-[rgb(var(--destructive))]',
};

export default function AgentListClient() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [logs, setLogs] = useState(initialLogs);
    const [loading, setLoading] = useState(true);
    const [runningAgent, setRunningAgent] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Load agents on mount
    useEffect(() => {
        async function loadAgents() {
            try {
                const data = await agentApi.getAgents();
                setAgents(data);
            } catch (error) {
                console.error('Failed to load agents:', error);
                showToast('Failed to load agents', 'error');
            } finally {
                setLoading(false);
            }
        }
        loadAgents();
    }, []);

    // Poll logs every 10 seconds
    useEffect(() => {
        async function loadLogs() {
            try {
                const data = await agentApi.getAgentLogs({ limit: 10 });
                // Transform API logs to match display format
                if (data && data.results) {
                    setLogs(data.results.map((log: AgentLog) => ({
                        id: log.id,
                        time: new Date(log.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
                        agent: log.agent_run?.strategy?.name || 'System',
                        event: log.message,
                        type: log.level === 'error' ? 'error' : log.level === 'warning' ? 'warning' : log.level === 'info' ? 'info' : 'success'
                    })));
                }
            } catch (error) {
                console.error('Failed to load logs:', error);
            }
        }

        loadLogs();
        const interval = setInterval(loadLogs, 10000);
        return () => clearInterval(interval);
    }, []);

    function showToast(message: string, type: 'success' | 'error') {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function handleRunAgent(id: string, name: string) {
        if (runningAgent) return;
        setRunningAgent(id);

        try {
            await agentApi.runAgent(id);
            showToast(`Successfully triggered ${name}.`, 'success');

            // Reload agents to get updated stats
            const data = await agentApi.getAgents();
            setAgents(data);
        } catch (err: any) {
            showToast(err.response?.data?.error || `Failed to execute ${name}.`, 'error');
        } finally {
            setRunningAgent(null);
        }
    }

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-lg flex items-center gap-3 transition-all ${toast.type === 'success'
                        ? 'bg-[rgb(var(--card))] border-[rgb(var(--success))]/30 text-[rgb(var(--success))]'
                        : 'bg-[rgb(var(--card))] border-[rgb(var(--destructive))]/30 text-[rgb(var(--destructive))]'
                    }`}>
                    <div className="text-sm font-medium">{toast.message}</div>
                </div>
            )}

            {/* Toolbar */}
            <div className="flex justify-end gap-3">
                <Link
                    href={routes.dashboard.agents.consensus}
                    className="flex items-center gap-2 rounded-lg bg-[rgb(var(--muted))] px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:opacity-80 transition-all border border-[rgb(var(--border))]"
                >
                    Run Consensus
                </Link>
                <Link
                    href={routes.dashboard.agents.create}
                    className="flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition-all"
                >
                    <Plus className="h-4 w-4" strokeWidth={2} />
                    Create Agent
                </Link>
            </div>

            {/* Agent cards */}
            <div className="grid gap-4 sm:grid-cols-2">
                {loading ? (
                    <div className="col-span-2 flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
                    </div>
                ) : agents.length === 0 ? (
                    <div className="col-span-2 rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 p-12 text-center">
                        <Bot className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4 opacity-50" />
                        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">No custom agents yet</p>
                        <Link
                            href={routes.dashboard.agents.create}
                            className="inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 transition-all"
                        >
                            <Plus className="h-4 w-4" strokeWidth={2} />
                            Create Your First Agent
                        </Link>
                    </div>
                ) : agents.map((agent) => {
                    const Icon = Brain; // Default icon for custom agents
                    const statusColor = agent.is_active ? 'success' : 'warning';
                    const colors = statusColorMap[statusColor];
                    const isRunning = runningAgent === agent.id;
                    const status = agent.is_active ? 'Active' : 'Inactive';

                    return (
                        <div key={agent.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 shadow-sm group">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--muted))]">
                                    <Icon className="h-5 w-5 text-[rgb(var(--foreground))]" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2 mb-0.5">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-[rgb(var(--foreground))] text-sm">{agent.name}</p>
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors.badge}`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                                                {status}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed mt-1">{agent.description || 'Custom AI agent'}</p>
                                </div>
                            </div>

                            <div className="rounded-lg bg-[rgb(var(--muted))]/50 border border-[rgb(var(--border))] p-3 mb-4">
                                <p className="text-xs text-[rgb(var(--muted-foreground))] mb-0.5">Last Run</p>
                                <p className="text-xs font-medium text-[rgb(var(--foreground))]">
                                    {agent.last_run_at ? new Date(agent.last_run_at).toLocaleString() : 'Never run'}
                                </p>
                                <p className="text-[10px] text-[rgb(var(--muted-foreground))]/60 mt-1">
                                    Model: {agent.model} | Type: {agent.agent_type}
                                </p>
                            </div>

                            <div className="flex gap-4 text-xs items-center justify-between border-t border-[rgb(var(--border))] pt-4">
                                <div className="flex gap-4">
                                    <div>
                                        <p className="text-[rgb(var(--muted-foreground))]">Total Runs</p>
                                        <p className="font-semibold text-[rgb(var(--foreground))] mt-0.5">{agent.run_count || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-[rgb(var(--muted-foreground))]">Success Rate</p>
                                        <p className="font-semibold text-[rgb(var(--success))] mt-0.5">
                                            {agent.success_rate ? `${agent.success_rate}%` : '—'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-1.5">
                                    <Link
                                        href={routes.dashboard.agents.statistics(agent.id)}
                                        className="p-2 rounded-md hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors"
                                        title="View Statistics"
                                    >
                                        <Activity className="h-4 w-4" strokeWidth={1.5} />
                                    </Link>
                                    <Link
                                        href={routes.dashboard.agents.edit(agent.id)}
                                        className="p-2 rounded-md hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors"
                                        title="Edit Agent"
                                    >
                                        <Settings className="h-4 w-4" strokeWidth={1.5} />
                                    </Link>
                                    <button
                                        onClick={() => handleRunAgent(agent.id, agent.name)}
                                        disabled={runningAgent !== null || !agent.is_active}
                                        className="flex items-center gap-1.5 ml-1 px-3 py-1.5 rounded-md bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))]/20 hover:text-[rgb(var(--primary))] font-medium transition-colors disabled:opacity-50"
                                        title={!agent.is_active ? 'Activate agent first' : 'Run agent now'}
                                    >
                                        {isRunning ? (
                                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[rgb(var(--primary))] border-t-transparent" />
                                        ) : (
                                            <Play className="h-3.5 w-3.5" strokeWidth={2} />
                                        )}
                                        Run Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Activity log */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgb(var(--border))]">
                    <Bot className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Agent Activity Log</h2>
                </div>
                <div className="divide-y divide-[rgb(var(--border))]">
                    {logs.map((log) => (
                        <div key={log.id} className="flex items-start gap-4 px-5 py-3 hover:bg-[rgb(var(--muted))]/20 transition-colors">
                            <span className="font-mono text-xs text-[rgb(var(--muted-foreground))] mt-0.5 w-10 flex-shrink-0">{log.time}</span>
                            <span className="text-xs font-medium text-[rgb(var(--foreground))] w-32 flex-shrink-0">{log.agent}</span>
                            <span className={`text-xs ${logTypeMap[log.type]}`}>{log.event}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
