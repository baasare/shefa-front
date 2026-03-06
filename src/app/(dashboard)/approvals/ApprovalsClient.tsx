'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { getPendingApprovals, approveOrder, type Order } from '@/lib/api/orders';

const riskLevelMap: Record<string, string> = {
  high: 'border-[rgb(var(--destructive))]/30 bg-[rgb(var(--destructive))]/5',
  medium: 'border-[rgb(var(--warning))]/30 bg-[rgb(var(--warning))]/5',
  low: 'border-[rgb(var(--success))]/30 bg-[rgb(var(--success))]/5',
};

export default function ApprovalsClient() {
  const [pendingApprovals, setPendingApprovals] = useState<Order[]>([]);
  const [historyApprovals, setHistoryApprovals] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function loadApprovals() {
    try {
      const data = await getPendingApprovals();
      setPendingApprovals(data.filter(o => o.status === 'pending_approval'));
      setHistoryApprovals(data.filter(o => o.status === 'approved' || o.status === 'rejected').slice(0, 10));
    } catch (error) {
      console.error('Failed to load approvals:', error);
      showToast('Failed to load approvals', 'error');
    } finally {
      setLoading(false);
    }
  }

  // Initial load
  useEffect(() => {
    loadApprovals();
  }, []);

  // Real-time polling every 10 seconds
  useEffect(() => {
    const interval = setInterval(loadApprovals, 10000);
    return () => clearInterval(interval);
  }, []);

  async function handleApprove(id: string, symbol: string) {
    if (processingId) return;
    setProcessingId(id);

    try {
      await approveOrder(id, { decision: 'approve', notes: 'Approved via dashboard' });
      showToast(`${symbol} order approved successfully`, 'success');
      await loadApprovals(); // Reload to update lists
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Failed to approve order', 'error');
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(id: string, symbol: string) {
    if (processingId) return;
    setProcessingId(id);

    try {
      await approveOrder(id, { decision: 'reject', notes: 'Rejected via dashboard' });
      showToast(`${symbol} order rejected`, 'success');
      await loadApprovals(); // Reload to update lists
    } catch (error: any) {
      showToast(error.response?.data?.error || 'Failed to reject order', 'error');
    } finally {
      setProcessingId(null);
    }
  }

  function getRiskLevel(order: Order): 'high' | 'medium' | 'low' {
    // Simple heuristic based on order value
    const quantity = parseFloat(order.quantity);
    const price = parseFloat(order.price || '0');
    const value = quantity * price;

    if (value > 10000) return 'high';
    if (value > 5000) return 'medium';
    return 'low';
  }

  function getRiskLabel(level: 'high' | 'medium' | 'low'): string {
    return level.charAt(0).toUpperCase() + level.slice(1);
  }

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-xl border shadow-lg flex items-center gap-3 transition-all ${
          toast.type === 'success'
            ? 'bg-[rgb(var(--card))] border-[rgb(var(--success))]/30 text-[rgb(var(--success))]'
            : 'bg-[rgb(var(--card))] border-[rgb(var(--destructive))]/30 text-[rgb(var(--destructive))]'
        }`}>
          <div className="text-sm font-medium">{toast.message}</div>
        </div>
      )}

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
      {pendingApprovals.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
            Pending Review
            <span className="ml-2 rounded-full bg-[rgb(var(--warning))]/20 border border-[rgb(var(--warning))]/30 px-2 py-0.5 text-xs font-medium text-[rgb(var(--warning))]">
              {pendingApprovals.length}
            </span>
          </h2>
          {pendingApprovals.map((approval) => {
            const isProcessing = processingId === approval.id;
            const riskLevel = getRiskLevel(approval);
            const quantity = parseFloat(approval.quantity);
            const price = parseFloat(approval.price || '0');
            const total = (quantity * price).toFixed(2);

            return (
              <div
                key={approval.id}
                className={`rounded-xl border-2 p-5 ${riskLevelMap[riskLevel]}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[rgb(var(--muted-foreground))]">
                        {approval.id.substring(0, 8)}
                      </span>
                      <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-[10px] font-medium text-[rgb(var(--muted-foreground))]">
                        {approval.order_type.toUpperCase()} {approval.side.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="font-mono font-bold text-lg text-[rgb(var(--foreground))]">
                        {approval.symbol}
                      </h3>
                      <p className="text-sm font-medium text-[rgb(var(--foreground))]">
                        {approval.side === 'buy' ? 'Buy' : 'Sell'} {approval.quantity} shares @ ${price}
                      </p>
                      <p className="text-sm font-mono text-[rgb(var(--muted-foreground))]">
                        ${total}
                      </p>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] max-w-xl mb-3">
                      {approval.approval_notes || 'AI-generated trading signal requiring approval'}
                    </p>
                    <div className="flex gap-4 text-xs">
                      <div>
                        <span className="text-[rgb(var(--muted-foreground))]">Risk: </span>
                        <span className={`font-semibold ${
                          riskLevel === 'high' ? 'text-[rgb(var(--destructive))]' :
                          riskLevel === 'medium' ? 'text-[rgb(var(--warning))]' :
                          'text-[rgb(var(--success))]'
                        }`}>
                          {getRiskLabel(riskLevel)}
                        </span>
                      </div>
                      <span className="text-[rgb(var(--muted-foreground))]">
                        {new Date(approval.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleApprove(approval.id, approval.symbol)}
                      disabled={isProcessing}
                      className="flex items-center gap-2 rounded-lg bg-[rgb(var(--success))]/10 border border-[rgb(var(--success))]/30 px-4 py-2 text-sm font-medium text-[rgb(var(--success))] hover:bg-[rgb(var(--success))]/20 transition-all disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(approval.id, approval.symbol)}
                      disabled={isProcessing}
                      className="flex items-center gap-2 rounded-lg bg-[rgb(var(--destructive))]/10 border border-[rgb(var(--destructive))]/30 px-4 py-2 text-sm font-medium text-[rgb(var(--destructive))] hover:bg-[rgb(var(--destructive))]/20 transition-all disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4" strokeWidth={2} />
                      )}
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 p-12 text-center">
          <Clock className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4 opacity-50" />
          <h3 className="text-base font-semibold text-[rgb(var(--foreground))] mb-2">No Pending Approvals</h3>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            All AI-generated trading signals have been reviewed
          </p>
        </div>
      )}

      {/* History */}
      {historyApprovals.length > 0 && (
        <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
          <div className="px-5 py-4 border-b border-[rgb(var(--border))]">
            <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Decision History</h2>
          </div>
          <div className="divide-y divide-[rgb(var(--border))]">
            {historyApprovals.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-3.5">
                <span className="font-mono text-xs text-[rgb(var(--muted-foreground))] w-20 flex-shrink-0">
                  {item.id.substring(0, 8)}
                </span>
                <span className="font-mono font-semibold text-sm text-[rgb(var(--foreground))] w-12 flex-shrink-0">
                  {item.symbol}
                </span>
                <span className="text-sm text-[rgb(var(--muted-foreground))] flex-1">
                  {item.side === 'buy' ? 'Buy' : 'Sell'} {item.quantity} shares
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                  item.status === 'approved'
                    ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]'
                    : 'bg-[rgb(var(--destructive))]/10 text-[rgb(var(--destructive))]'
                }`}>
                  {item.status === 'approved' ? (
                    <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                  ) : (
                    <XCircle className="h-3 w-3" strokeWidth={2} />
                  )}
                  {item.status === 'approved' ? 'Approved' : 'Rejected'}
                </span>
                <span className="font-mono text-xs text-[rgb(var(--muted-foreground))] w-32 text-right">
                  {new Date(item.updated_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
