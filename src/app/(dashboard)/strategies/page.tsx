'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { routes } from '@/lib/config/routes';
import { Plus, Play, Pause, Settings2, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { getStrategies, activateStrategy, pauseStrategy, deleteStrategy, Strategy, PaginatedResponse } from '@/lib/api/strategies';

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('-created_at');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchStrategies();
  }, [search, ordering, page]);

  async function fetchStrategies() {
    setLoading(true);
    try {
      const filters: any = { page };
      if (search) filters.search = search;
      if (ordering) filters.ordering = ordering;

      const res = await getStrategies(filters);
      setStrategies(res.results || []);
      setTotalCount(res.count || 0);
      setTotalPages(Math.ceil((res.count || 0) / 10) || 1);
    } catch (err) {
      console.error('Failed to fetch strategies', err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleStatus(s: Strategy) {
    try {
      if (s.status === 'active') {
        await pauseStrategy(s.id);
      } else {
        await activateStrategy(s.id);
      }
      fetchStrategies();
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this strategy?')) {
      try {
        await deleteStrategy(id);
        fetchStrategies();
      } catch (err) {
        console.error('Failed to delete strategy', err);
      }
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Strategies</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Manage your AI trading strategies</p>
        </div>
        <Link
          href={routes.dashboard.strategies.create}
          className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow)] hover:opacity-90 transition-all"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Strategy
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Active Strategies', value: '2' },
          { label: 'Total P&L', value: '+$1,669.10', pos: true },
          { label: 'Avg Win Rate', value: '67%' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-4">
            <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-1">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.pos ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--foreground))]'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search strategies..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] pl-9 pr-3 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
          />
        </div>
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]"
        >
          <option value="-created_at">Newest First</option>
          <option value="name">Name (A-Z)</option>
          <option value="-name">Name (Z-A)</option>
        </select>
      </div>

      {/* Strategy cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-8 text-center text-[rgb(var(--muted-foreground))]">Loading strategies...</div>
        ) : strategies.length > 0 ? (
          strategies.map((strategy: any) => (
            <div key={strategy.id} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 hover:border-[rgb(var(--primary))]/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[rgb(var(--foreground))]">{strategy.name}</h3>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1 ${strategy.status === 'active'
                      ? 'bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]'
                      : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]'
                      }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${strategy.status === 'active' ? 'bg-[rgb(var(--success))] animate-pulse' : 'bg-[rgb(var(--muted-foreground))]'}`} />
                      {strategy.status === 'active' ? 'Running' : 'Paused'}
                    </span>
                  </div>
                  <p className="text-sm text-[rgb(var(--muted-foreground))] mb-3">{strategy.strategy_type || 'Custom'}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {strategy.symbols ? strategy.symbols.map((a: string) => (
                      <span key={a} className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">
                        {a}
                      </span>
                    )) : strategy.watchlist?.map((a: string) => (
                      <span key={a} className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-[rgb(var(--muted-foreground))] mb-0.5">Win Rate</p>
                    <p className="font-semibold text-[rgb(var(--foreground))]">{strategy.win_rate || '0'}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[rgb(var(--muted-foreground))] mb-0.5">Trades</p>
                    <p className="font-semibold text-[rgb(var(--foreground))]">{strategy.total_trades || 0}</p>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button onClick={() => toggleStatus(strategy)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all">
                      {strategy.status === 'active' ? <Pause className="h-4 w-4" strokeWidth={1.5} /> : <Play className="h-4 w-4" strokeWidth={1.5} />}
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all">
                      <Settings2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <button onClick={() => handleDelete(strategy.id)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[rgb(var(--destructive))]/10 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--destructive))] transition-all">
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[rgb(var(--muted-foreground))]">
            {search ? 'No strategies matched your search.' : 'You have no strategies yet.'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[rgb(var(--border))] pt-4">
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Showing <span className="font-medium text-[rgb(var(--foreground))]">{(page - 1) * 10 + 1}</span> to <span className="font-medium text-[rgb(var(--foreground))]">{Math.min(page * 10, totalCount)}</span> of <span className="font-medium text-[rgb(var(--foreground))]">{totalCount}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Empty state hint */}
      <div className="rounded-xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 p-8 text-center">
        <p className="text-sm text-[rgb(var(--muted-foreground))] mb-3">
          Want to add a new strategy?
        </p>
        <Link
          href={routes.dashboard.strategies.templates}
          className="text-sm text-[rgb(var(--primary))] hover:underline"
        >
          Browse strategy templates →
        </Link>
      </div>
    </div>
  );
}
