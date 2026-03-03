import { Metadata } from 'next';
import { mockAgentLogs } from '@/lib/data/agents';
import { Search, Activity } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Agent Logs — ShefaFx',
    description: 'Full activity log stream from all AI agents.',
};

const logTypeMap: Record<string, { dot: string; badge: string; label: string }> = {
    info: { dot: 'bg-[rgb(var(--primary))]', badge: 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]', label: 'Info' },
    success: { dot: 'bg-[rgb(var(--success))]', badge: 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]', label: 'Success' },
    warning: { dot: 'bg-[rgb(var(--warning))]', badge: 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))]', label: 'Warning' },
    error: { dot: 'bg-[rgb(var(--destructive))]', badge: 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))]', label: 'Error' },
};

const allLogs = [...mockAgentLogs, ...mockAgentLogs.map((l, i) => ({ ...l, id: `${l.id}-b`, time: `15:${(10 + i).toString().padStart(2, '0')}:00` }))];

export default function AgentLogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Agent Logs</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Real-time activity stream from all AI agents</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-[rgb(var(--success))] animate-pulse" />
                    <span className="text-xs text-[rgb(var(--muted-foreground))]">Live</span>
                </div>
            </div>

            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                    <input type="text" placeholder="Search logs..." className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]" />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {['All', 'Info', 'Success', 'Warning', 'Error'].map((t, i) => (
                        <button key={t} className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${i === 0 ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/20' : 'text-[rgb(var(--muted-foreground))] border-[rgb(var(--border))] hover:text-[rgb(var(--foreground))]'}`}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-4">
                {[
                    { label: 'Total Events', value: String(allLogs.length) },
                    { label: 'Errors', value: String(allLogs.filter((l) => l.type === 'error').length), color: 'text-[rgb(var(--destructive))]' },
                    { label: 'Warnings', value: String(allLogs.filter((l) => l.type === 'warning').length), color: 'text-[rgb(var(--warning))]' },
                    { label: 'Successes', value: String(allLogs.filter((l) => l.type === 'success').length), color: 'text-[rgb(var(--success))]' },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-bold font-mono ${s.color ?? 'text-[rgb(var(--foreground))]'}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Log stream */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-4 border-b border-[rgb(var(--border))]">
                    <Activity className="h-4 w-4 text-[rgb(var(--primary))]" strokeWidth={1.5} />
                    <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Event Stream</h2>
                </div>
                <div className="divide-y divide-[rgb(var(--border))]">
                    {allLogs.map((log) => {
                        const type = logTypeMap[log.type] ?? logTypeMap.info;
                        return (
                            <div key={log.id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-[rgb(var(--muted))]/20 transition-colors">
                                <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${type.dot}`} />
                                <span className="font-mono text-xs text-[rgb(var(--muted-foreground))] w-14 flex-shrink-0 mt-0.5">{log.time}</span>
                                <span className="text-xs font-medium text-[rgb(var(--foreground))] w-32 flex-shrink-0">{log.agentName}</span>
                                <span className="flex-1 text-xs text-[rgb(var(--foreground))]/80">{log.event}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide flex-shrink-0 ${type.badge}`}>
                                    {type.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
