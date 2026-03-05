'use client';

import { useEffect, useState, useCallback } from 'react';
import { TrendingUp, TrendingDown, Search, Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import {
  getMarketOverview,
  getWatchlist,
  type MarketOverviewItem,
  type WatchlistItem,
} from '@/lib/api/marketData';

const PAGE_SIZE = 10;
const TABS = ['All', 'Stocks', 'Crypto', 'Starred'] as const;
type Tab = (typeof TABS)[number];

// Starred set stored in localStorage
function loadStarred(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem('market_starred');
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}
function saveStarred(s: Set<string>) {
  localStorage.setItem('market_starred', JSON.stringify([...s]));
}

export default function MarketPage() {
  const [overview, setOverview] = useState<MarketOverviewItem[]>([]);
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [search, setSearch] = useState('');
  const [starred, setStarred] = useState<Set<string>>(new Set());
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load starred from localStorage on mount
  useEffect(() => {
    setStarred(loadStarred());
  }, []);

  // Fetch market overview strip
  useEffect(() => {
    getMarketOverview()
      .then(setOverview)
      .catch(() => setError('Failed to load market overview.'))
      .finally(() => setLoadingOverview(false));
  }, []);

  // Fetch watchlist
  const fetchWatchlist = useCallback(() => {
    setLoadingList(true);
    getWatchlist(page, PAGE_SIZE)
      .then((res) => {
        setWatchlistItems(res.results);
        setTotalCount(res.count);
      })
      .catch(() => setError('Failed to load watchlist.'))
      .finally(() => setLoadingList(false));
  }, [page]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const toggleStar = (symbol: string) => {
    setStarred((prev) => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      saveStarred(next);
      return next;
    });
  };

  // Client-side filtering (tab + search)
  const filtered = watchlistItems.filter((item) => {
    const matchesSearch =
      !search ||
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Stocks' && item.asset_type === 'stock') ||
      (activeTab === 'Crypto' && item.asset_type === 'crypto') ||
      (activeTab === 'Starred' && starred.has(item.symbol));

    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Market</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Live market data and analysis</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbol..."
            className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:border-[rgb(var(--primary))]/50 focus:outline-none w-48 transition-all"
          />
        </div>
      </div>

      {/* Market overview strip */}
      {loadingOverview ? (
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3 animate-pulse">
              <div className="h-3 w-12 rounded bg-[rgb(var(--muted))] mb-2" />
              <div className="h-4 w-20 rounded bg-[rgb(var(--muted))] mb-1" />
              <div className="h-3 w-10 rounded bg-[rgb(var(--muted))]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {overview.map((item) => (
            <div key={item.symbol} className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-4 py-3">
              <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">{item.label}</p>
              <p className="font-mono font-semibold text-sm text-[rgb(var(--foreground))]">{item.value}</p>
              <p className={`text-xs font-medium mt-0.5 ${item.positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                {item.change}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Watchlist */}
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))]">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">Watchlist</h2>
          <div className="flex gap-1.5 rounded-lg bg-[rgb(var(--muted))] p-0.5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setPage(1); }}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === tab
                    ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm'
                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgb(var(--border))]">
                {['', 'Symbol', 'Name', 'Asset Type', 'Added'].map((col, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {loadingList ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded bg-[rgb(var(--muted))] w-20" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
                    No items found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStar(item.symbol)}>
                        <Star
                          className={`h-4 w-4 transition-colors ${starred.has(item.symbol)
                              ? 'fill-[rgb(var(--warning))] text-[rgb(var(--warning))]'
                              : 'text-[rgb(var(--border))] hover:text-[rgb(var(--muted-foreground))]'
                            }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-[rgb(var(--foreground))]">{item.symbol}</td>
                    <td className="px-4 py-3 text-[rgb(var(--muted-foreground))]">{item.name || '—'}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))] capitalize">
                        {item.asset_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[rgb(var(--muted-foreground))]">
                      {new Date(item.added_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-[rgb(var(--border))]">
            <p className="text-xs text-[rgb(var(--muted-foreground))]">
              Page {page} of {totalPages} &middot; {totalCount} items
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md p-1.5 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-40 transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-md p-1.5 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-40 transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-[rgb(var(--destructive))] text-center">{error}</p>
      )}
    </div>
  );
}
