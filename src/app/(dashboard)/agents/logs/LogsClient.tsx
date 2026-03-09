'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Activity, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { agentApi, AgentLog } from '@/lib/api/agents';

const logTypeMap: Record<string, { dot: string; badge: string; label: string }> = {
    info: { dot: 'bg-[rgb(var(--primary))]', badge: 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]', label: 'Info' },
    success: { dot: 'bg-[rgb(var(--success))]', badge: 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]', label: 'Success' },
    warning: { dot: 'bg-[rgb(var(--warning))]', badge: 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))]', label: 'Warning' },
    error: { dot: 'bg-[rgb(var(--destructive))]', badge: 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))]', label: 'Error' },
    debug: { dot: 'bg-[rgb(var(--muted-foreground))]', badge: 'bg-[rgb(var(--muted))]/20 text-[rgb(var(--muted-foreground))]', label: 'Debug' },
};

export default function LogsClient() {
    const [logs, setLogs] = useState<AgentLog[]>([]);
    const [filteredLogs, setFilteredLogs] = useState<AgentLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const eventSourceRef = useRef<EventSource | null>(null);
    const logsPerPage = 50;

    // SSE connection for real-time logs
    useEffect(() => {
        async function loadInitialLogs() {
            try {
                const data = await agentApi.getAgentLogs({ limit: 200 });
                const logList = data?.results || data || [];
                setLogs(logList);
                setFilteredLogs(logList);
            } catch (error) {
                console.error('Failed to load initial logs:', error);
            } finally {
                setLoading(false);
            }
        }

        loadInitialLogs();

        // Get auth token from localStorage
        const token = localStorage.getItem('authToken');
        const params = new URLSearchParams();
        if (filter !== 'All') params.append('level', filter.toLowerCase());
        if (token) params.append('token', token);

        // Connect to SSE stream via Next.js API route
        const eventSource = new EventSource(`/api/logs/stream?${params.toString()}`);

        eventSource.onopen = () => {
            console.log('SSE connection established');
            setConnected(true);
        };

        eventSource.addEventListener('log', (event) => {
            try {
                const newLog = JSON.parse(event.data);
                setLogs(prev => [newLog, ...prev].slice(0, 500)); // Keep last 500 logs
            } catch (error) {
                console.error('Failed to parse log event:', error);
            }
        });

        eventSource.addEventListener('heartbeat', () => {
            // Keep connection alive
        });

        eventSource.onerror = (error) => {
            console.error('SSE connection error:', error);
            setConnected(false);
            eventSource.close();
        };

        eventSourceRef.current = eventSource;

        return () => {
            eventSource.close();
            setConnected(false);
        };
    }, [filter]);

    // Apply filters
    useEffect(() => {
        let result = logs;

        // Filter by type
        if (filter !== 'All') {
            result = result.filter(log => log.level?.toLowerCase() === filter.toLowerCase());
        }

        // Filter by search
        if (search.trim()) {
            const searchLower = search.toLowerCase();
            result = result.filter(log =>
                log.message?.toLowerCase().includes(searchLower) ||
                log.agent_run?.strategy?.name?.toLowerCase().includes(searchLower)
            );
        }

        setFilteredLogs(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [logs, filter, search]);

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
    const startIndex = (currentPage - 1) * logsPerPage;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

    // Stats
    const stats = {
        total: logs.length,
        errors: logs.filter(l => l.level === 'error').length,
        warnings: logs.filter(l => l.level === 'warning').length,
        successes: logs.filter(l => l.level === 'info').length,
    };

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Agent Logs</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Real-time activity stream from all AI agents</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`flex h-2 w-2 rounded-full ${connected ? 'bg-[rgb(var(--success))] animate-pulse' : 'bg-[rgb(var(--muted-foreground))]'}`} />
                    <span className="text-xs text-[rgb(var(--muted-foreground))]">{connected ? 'Live' : 'Connecting...'}</span>
                </div>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['All', 'Info', 'Success', 'Warning', 'Error'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                                filter === t
                                    ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/20'
                                    : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:text-[rgb(var(--foreground))]'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
                {[
                    { label: 'Total Events', value: String(stats.total) },
                    { label: 'Errors', value: String(stats.errors), color: 'text-[rgb(var(--destructive))]' },
                    { label: 'Warnings', value: String(stats.warnings), color: 'text-[rgb(var(--warning))]' },
                    { label: 'Successes', value: String(stats.successes), color: 'text-[rgb(var(--success))]' },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold font-mono ${s.color ?? 'text-[rgb(var(--foreground))]'}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Log stream */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                        <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Event Stream</h2>
                        <span className="text-xs text-[rgb(var(--muted-foreground))]">
                            ({filteredLogs.length} {filteredLogs.length === 1 ? 'event' : 'events'})
                        </span>
                    </div>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-1 rounded hover:bg-[rgb(var(--muted))] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-xs text-[rgb(var(--muted-foreground))] min-w-[80px] text-center">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-1 rounded hover:bg-[rgb(var(--muted))] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
                <div className="divide-y divide-[rgb(var(--border))]">
                    {paginatedLogs.length > 0 ? (
                        paginatedLogs.map((log) => {
                            const type = logTypeMap[log.level] || logTypeMap.info;
                            const time = new Date(log.created_at).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            });
                            const agentName = log.agent_run?.strategy?.name || 'System';

                            return (
                                <div key={log.id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-[rgb(var(--muted))]/20 transition-colors">
                                    <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${type.dot}`} />
                                    <span className="font-mono text-xs text-[rgb(var(--muted-foreground))] w-16 flex-shrink-0 mt-0.5">
                                        {time}
                                    </span>
                                    <span className="text-xs font-medium text-[rgb(var(--foreground))] w-32 flex-shrink-0 truncate">
                                        {agentName}
                                    </span>
                                    <span className="flex-1 text-xs text-[rgb(var(--foreground))]/80">
                                        {log.message}
                                    </span>
                                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide flex-shrink-0 ${type.badge}`}>
                                        {type.label}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <div className="px-5 py-12 text-center">
                            <Activity className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4 opacity-50" />
                            <p className="text-sm text-[rgb(var(--muted-foreground))]">No logs found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
