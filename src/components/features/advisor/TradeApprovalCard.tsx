'use client';

import { CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';

export interface TradeApprovalCall {
  id: string;
  toolName: string;
  args: {
    symbol: string;
    action: 'buy' | 'sell' | string;
    notional_usd: number;
    reason?: string;
  };
  state?: 'pending' | 'approved' | 'rejected';
}

interface TradeApprovalCardProps {
  call: TradeApprovalCall;
  onApprove: (callId: string) => void;
  onReject: (callId: string) => void;
}

export function TradeApprovalCard({ call, onApprove, onReject }: TradeApprovalCardProps) {
  const actionLabel = call.args.action?.toUpperCase() || 'TRADE';
  const status = call.state ?? 'pending';
  const isPending = status === 'pending';
  const statusStyles =
    status === 'approved'
      ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))] border-[rgb(var(--success))]/30'
      : status === 'rejected'
        ? 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))] border-[rgb(var(--destructive))]/30'
        : 'bg-[rgb(var(--warning))]/10 text-[rgb(var(--warning))] border-[rgb(var(--warning))]/30';

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-[rgb(var(--muted-foreground))]">
            Trade Approval Required
          </p>
          <p className="mt-1 text-sm font-semibold text-[rgb(var(--foreground))]">
            {actionLabel} ${call.args.notional_usd.toLocaleString('en-US', { maximumFractionDigits: 2 })} of{' '}
            {call.args.symbol}
          </p>
        </div>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${statusStyles}`}>
          {status}
        </span>
      </div>

      {call.args.reason && (
        <div className="mt-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 p-3">
          <div className="flex items-start gap-2">
            <ShieldAlert className="mt-0.5 h-4 w-4 text-[rgb(var(--warning))]" strokeWidth={1.5} />
            <p className="text-xs leading-relaxed text-[rgb(var(--muted-foreground))]">{call.args.reason}</p>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onApprove(call.id)}
          disabled={!isPending}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[rgb(var(--success))] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
          Approve
        </button>
        <button
          type="button"
          onClick={() => onReject(call.id)}
          disabled={!isPending}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/10 px-3 py-2 text-xs font-semibold text-[rgb(var(--destructive))] transition hover:bg-[rgb(var(--destructive))]/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <XCircle className="h-3.5 w-3.5" strokeWidth={2} />
          Reject
        </button>
      </div>
    </div>
  );
}
