'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getPortfolios, getPortfolioAnalytics, getPositions } from '@/lib/api/portfolios';
import { routes } from '@/lib/config/routes';
import { formatCurrency } from '@/lib/data/positions';
import { Plus, TrendingUp, TrendingDown, ExternalLink, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export default function PortfolioPage() {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('');
  const [assetClass, setAssetClass] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 5; // Smaller page size for dashboard overview

  const { data: portfolios, isLoading: isLoadingPortfolios } = useQuery({
    queryKey: ['portfolios'],
    queryFn: getPortfolios
  });

  const activePortfolioId = selectedPortfolioId || (portfolios && portfolios.length > 0 ? portfolios[0].id : null);

  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['portfolioAnalytics', activePortfolioId],
    queryFn: () => getPortfolioAnalytics(activePortfolioId!),
    enabled: !!activePortfolioId
  });

  const { data: positionsResponse, isLoading: isLoadingPositions } = useQuery({
    queryKey: ['positions', { page, pageSize, filter: assetClass, portfolio: activePortfolioId }],
    queryFn: () => getPositions({
      page,
      page_size: pageSize,
      asset_class: assetClass,
      portfolio: activePortfolioId!
    }),
    enabled: !!activePortfolioId
  });

  const positions = positionsResponse?.results || [];
  const totalCount = positionsResponse?.count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  if (isLoadingPortfolios) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[rgb(var(--primary))]" />
      </div>
    );
  }

  if (!portfolios || portfolios.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[rgb(var(--muted-foreground))]">No portfolios found. Create a portfolio to get started.</p>
      </div>
    );
  }

  const m = analytics || {
    total_return: '0%',
  };

  const activePortfolio = portfolios.find(p => p.id === activePortfolioId);

  // Fallback static metrics for what backend analytics doesn't directly provide yet
  const summaryCards = [
    { label: 'Total Value', value: formatCurrency(activePortfolio?.current_equity || 0) },
    { label: 'Available Cash', value: formatCurrency(activePortfolio?.cash_balance || 0) },
    { label: 'Total P&L', value: `${parseFloat(activePortfolio?.total_pl || '0') >= 0 ? '+' : ''}${formatCurrency(activePortfolio?.total_pl || 0)}` },
    { label: 'Return', value: m.total_return },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Portfolio</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">View and manage your investments</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={activePortfolioId || ''}
            onChange={(e) => { setSelectedPortfolioId(e.target.value); setPage(1); }}
            className="flex-1 sm:w-48 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
          >
            {portfolios.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.type})
              </option>
            ))}
          </select>

          <Link
            href={routes.dashboard.strategies.create}
            className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:opacity-90 transition-all flex-shrink-0"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Add Position
          </Link>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
            <p className="text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-2">{card.label}</p>
            <p className={`text-2xl font-bold font-mono ${card.value.startsWith('+') ? 'text-[rgb(var(--success))]' : card.value.startsWith('-') ? 'text-[rgb(var(--destructive))]' : 'text-[rgb(var(--foreground))]'}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Holdings table */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden flex flex-col min-h-[300px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))] gap-3">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Holdings</h2>
          <div className="flex gap-2">
            {['All', 'Stocks', 'Crypto', 'ETF'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setAssetClass(tab); setPage(1); }}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${assetClass === tab ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {['Asset', 'Qty', 'Avg Cost', 'Current Price', 'Value', 'P&L', ''].map((col) => (
                  <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {isLoadingPositions ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-[rgb(var(--muted-foreground))]" />
                  </td>
                </tr>
              ) : positions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-[rgb(var(--muted-foreground))]">
                    No active positions found in this portfolio.
                  </td>
                </tr>
              ) : positions.map((h: any) => {
                const pnl = parseFloat(h.unrealized_pnl || '0');
                const pnlPct = parseFloat(h.unrealized_pnl_pct || '0');
                const isPositivePnl = pnl >= 0;

                return (
                  <tr key={h.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-mono font-semibold text-[rgb(var(--foreground))]">{h.symbol}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[rgb(var(--foreground))]">{h.quantity}</td>
                    <td className="px-5 py-3.5 font-mono text-[rgb(var(--muted-foreground))]">{formatCurrency(h.avg_entry_price)}</td>
                    <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">{formatCurrency(h.current_price || '0')}</td>
                    <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">{formatCurrency(h.current_value)}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1">
                        {isPositivePnl ? (
                          <TrendingUp className="h-3 w-3 text-[rgb(var(--success))]" strokeWidth={2} />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-[rgb(var(--destructive))]" strokeWidth={2} />
                        )}
                        <span className={`font-mono font-semibold text-xs ${isPositivePnl ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                          {isPositivePnl ? '+' : ''}{pnlPct.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link href={`/portfolio/positions/${h.id}`} className="inline-flex text-xs text-[rgb(var(--primary))] hover:underline items-center gap-1">
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {!isLoadingPositions && positions.length > 0 && (
          <div className="border-t border-[rgb(var(--border))] p-4 flex items-center justify-between">
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Showing <span className="font-medium text-[rgb(var(--foreground))]">{(page - 1) * pageSize + 1}</span> to <span className="font-medium text-[rgb(var(--foreground))]">{Math.min(page * pageSize, totalCount)}</span> of <span className="font-medium text-[rgb(var(--foreground))]">{totalCount}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium text-[rgb(var(--foreground))] px-2">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
