import { Metadata } from 'next';
import { Bot, Brain, Activity, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Agents — ShefaFx',
  description: 'Monitor your AI trading agents.',
};

const agents = [
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

const recentLogs = [
  { time: '16:32', agent: 'Analysis Agent', event: 'BTC sentiment score: 0.78 (Bullish)', type: 'info' },
  { time: '16:29', agent: 'Risk Agent', event: 'Portfolio VaR within 5% daily limit', type: 'success' },
  { time: '16:27', agent: 'Trade Agent', event: 'AAPL Buy order filled — 10 shares at $182.50', type: 'success' },
  { time: '16:14', agent: 'Approval Agent', event: 'TSLA Sell flagged for human review', type: 'warning' },
  { time: '16:08', agent: 'Analysis Agent', event: 'MSFT earnings beat — signal upgraded', type: 'info' },
  { time: '15:55', agent: 'Risk Agent', event: 'ETH drawdown exceeded 5% threshold — strategy paused', type: 'error' },
];

const logTypeMap: Record<string, string> = {
  info: 'text-[rgb(var(--primary))]',
  success: 'text-[rgb(var(--success))]',
  warning: 'text-[rgb(var(--warning))]',
  error: 'text-[rgb(var(--destructive))]',
};

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">AI Agents</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Monitor and control your AI trading agents</p>
      </div>

      {/* Agent cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const colors = statusColorMap[agent.statusColor];
          return (
            <div key={agent.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--muted))]">
                  <Icon className="h-5 w-5 text-[rgb(var(--foreground))]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-[rgb(var(--foreground))] text-sm">{agent.name}</p>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${colors.dot}`} />
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed">{agent.description}</p>
                </div>
              </div>

              <div className="rounded-lg bg-[rgb(var(--muted))]/50 border border-[rgb(var(--border))] p-3 mb-3">
                <p className="text-xs text-[rgb(var(--muted-foreground))] mb-0.5">Last Action</p>
                <p className="text-xs text-[rgb(var(--foreground))]">{agent.lastAction}</p>
                <p className="text-[10px] text-[rgb(var(--muted-foreground))]/60 mt-1">{agent.lastActionTime}</p>
              </div>

              <div className="flex gap-4 text-xs">
                <div>
                  <p className="text-[rgb(var(--muted-foreground))]">Tasks Today</p>
                  <p className="font-semibold text-[rgb(var(--foreground))] mt-0.5">{agent.tasksToday}</p>
                </div>
                <div>
                  <p className="text-[rgb(var(--muted-foreground))]">Success Rate</p>
                  <p className="font-semibold text-[rgb(var(--success))] mt-0.5">{agent.successRate}</p>
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
          {recentLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-3 hover:bg-[rgb(var(--muted))]/20 transition-colors">
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
