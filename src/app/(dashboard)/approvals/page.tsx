import { Metadata } from 'next';
import { CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Approvals — ShefaFx',
  description: 'Review and approve AI-generated trading suggestions.',
};

const pendingApprovals = [
  {
    id: 'APR-001',
    type: 'Sell Order',
    symbol: 'TSLA',
    action: 'Sell 5 shares @ $248.30',
    total: '$1,241.50',
    reason: 'Stop-loss triggered: Price dropped 6.3% from entry. Strategy: Momentum Trend.',
    risk: 'Medium',
    confidence: '87%',
    agent: 'Risk Agent',
    time: '18 min ago',
    riskLevel: 'warning',
  },
  {
    id: 'APR-002',
    type: 'Position Increase',
    symbol: 'ETH',
    action: 'Buy 2 ETH @ $3,450',
    total: '$6,900',
    reason: 'Strong bullish signal detected across 3 indicators. ML Sentiment score: 0.82.',
    risk: 'High',
    confidence: '74%',
    agent: 'Analysis Agent',
    time: '34 min ago',
    riskLevel: 'error',
  },
];

const historyApprovals = [
  { id: 'APR-003', symbol: 'AAPL', action: 'Buy 10 shares', outcome: 'Approved', result: '+$140', time: 'Today 16:20' },
  { id: 'APR-004', symbol: 'NVDA', action: 'Buy 2 shares', outcome: 'Rejected', result: '—', time: 'Today 15:30' },
  { id: 'APR-005', symbol: 'BTC', action: 'Sell 0.1 BTC', outcome: 'Approved', result: '-$80', time: 'Yesterday 09:15' },
];

const riskLevelMap: Record<string, string> = {
  warning: 'border-[rgb(var(--warning))]/30 bg-[rgb(var(--warning))]/5',
  error: 'border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/5',
};

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Approvals</h1>
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
          Review AI-generated trade suggestions that require your authorization (Human-in-the-Loop)
        </p>
      </div>

      {/* HITL explanation banner */}
      <div className="rounded-xl border border-[rgb(var(--primary))]/20 bg-[rgb(var(--primary))]/5 p-4 flex gap-3">
        <AlertTriangle className="h-5 w-5 text-[rgb(var(--primary))] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
        <div>
          <p className="text-sm font-semibold text-[rgb(var(--foreground))] mb-1">Human-in-the-Loop (HITL)</p>
          <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed">
            High-risk or high-value trades are routed here for your review before execution.
            This ensures you maintain full control over significant decisions.
          </p>
        </div>
      </div>

      {/* Pending */}
      {pendingApprovals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
            Pending Review
            <span className="ml-2 rounded-full bg-[rgb(var(--warning))]/20 border border-[rgb(var(--warning))]/30 px-2 py-0.5 text-xs font-medium text-[rgb(var(--warning))]">
              {pendingApprovals.length}
            </span>
          </h2>
          {pendingApprovals.map((approval) => (
            <div
              key={approval.id}
              className={`rounded-xl border-2 p-5 ${riskLevelMap[approval.riskLevel]}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[rgb(var(--muted-foreground))]">{approval.id}</span>
                    <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-[10px] font-medium text-[rgb(var(--muted-foreground))]">
                      {approval.type}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="font-mono font-bold text-lg text-[rgb(var(--foreground))]">{approval.symbol}</h3>
                    <p className="text-sm font-medium text-[rgb(var(--foreground))]">{approval.action}</p>
                    <p className="text-sm font-mono text-[rgb(var(--muted-foreground))]">{approval.total}</p>
                  </div>
                  <p className="text-sm text-[rgb(var(--muted-foreground))] max-w-xl mb-3">{approval.reason}</p>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="text-[rgb(var(--muted-foreground))]">AI Confidence: </span>
                      <span className="font-semibold text-[rgb(var(--foreground))]">{approval.confidence}</span>
                    </div>
                    <div>
                      <span className="text-[rgb(var(--muted-foreground))]">Risk: </span>
                      <span className={`font-semibold ${approval.risk === 'High' ? 'text-[rgb(var(--destructive))]' : 'text-[rgb(var(--warning))]'}`}>
                        {approval.risk}
                      </span>
                    </div>
                    <div>
                      <span className="text-[rgb(var(--muted-foreground))]">Flagged by: </span>
                      <span className="font-semibold text-[rgb(var(--foreground))]">{approval.agent}</span>
                    </div>
                    <span className="text-[rgb(var(--muted-foreground))]">{approval.time}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="flex items-center gap-2 rounded-lg bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/30 px-4 py-2 text-sm font-medium text-[rgb(var(--success))] hover:bg-[rgb(var(--success))]/20 transition-all">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                    Approve
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-[rgb(var(--destructive))]/10 border border-[rgb(var(--destructive))]/30 px-4 py-2 text-sm font-medium text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/20 transition-all">
                    <XCircle className="h-4 w-4" strokeWidth={2} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Decision History</h2>
        </div>
        <div className="divide-y divide-[rgb(var(--border))]">
          {historyApprovals.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-3.5">
              <span className="font-mono text-xs text-[rgb(var(--muted-foreground))] w-20 flex-shrink-0">{item.id}</span>
              <span className="font-mono font-semibold text-sm text-[rgb(var(--foreground))] w-12 flex-shrink-0">{item.symbol}</span>
              <span className="text-sm text-[rgb(var(--muted-foreground))] flex-1">{item.action}</span>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${item.outcome === 'Approved'
                  ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]'
                  : 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))]'
                }`}>
                {item.outcome === 'Approved' ? <CheckCircle2 className="h-3 w-3" strokeWidth={2} /> : <XCircle className="h-3 w-3" strokeWidth={2} />}
                {item.outcome}
              </span>
              <span className="font-mono text-xs text-[rgb(var(--muted-foreground))] w-20 text-right">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
