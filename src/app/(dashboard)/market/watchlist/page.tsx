'use client';

import { useEffect, useState, useCallback } from 'react';
import { Star, TrendingUp, TrendingDown, Plus, X, Search, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    type WatchlistItem,
} from '@/lib/api/marketData';

const PAGE_SIZE = 10;
type SortKey = 'symbol' | 'name' | 'asset_type' | 'added_at';
type SortDir = 'asc' | 'desc';

export default function WatchlistPage() {
    const [items, setItems] = useState<WatchlistItem[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [sortKey, setSortKey] = useState<SortKey>('added_at');
    const [sortDir, setSortDir] = useState<SortDir>('desc');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Add symbol modal
    const [showModal, setShowModal] = useState(false);
    const [newSymbol, setNewSymbol] = useState('');
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState<WatchlistItem['asset_type']>('stock');
    const [adding, setAdding] = useState(false);
    const [addError, setAddError] = useState<string | null>(null);

    // Remove in-progress
    const [removingId, setRemovingId] = useState<string | null>(null);

    const fetchItems = useCallback(() => {
        setLoading(true);
        setError(null);
        getWatchlist(page, PAGE_SIZE)
            .then((res) => {
                setItems(res.results);
                setTotalCount(res.count);
            })
            .catch(() => setError('Failed to load watchlist.'))
            .finally(() => setLoading(false));
    }, [page]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const SortIcon = ({ col }: { col: SortKey }) => {
        if (sortKey !== col) return <ChevronUp className="h-3 w-3 opacity-30" />;
        return sortDir === 'asc'
            ? <ChevronUp className="h-3 w-3 text-[rgb(var(--primary))]" />
            : <ChevronDown className="h-3 w-3 text-[rgb(var(--primary))]" />;
    };

    // Client-side sort + search (applied to current page)
    const filtered = items
        .filter((item) => {
            if (!search) return true;
            const q = search.toLowerCase();
            return item.symbol.toLowerCase().includes(q) || item.name.toLowerCase().includes(q);
        })
        .sort((a, b) => {
            let av = a[sortKey] as string;
            let bv = b[sortKey] as string;
            const cmp = av.localeCompare(bv);
            return sortDir === 'asc' ? cmp : -cmp;
        });

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const handleAdd = async () => {
        if (!newSymbol.trim()) return;
        setAdding(true);
        setAddError(null);
        try {
            const item = await addToWatchlist(newSymbol.trim(), newName.trim(), newType);
            // Optimistically add to front if on page 1
            if (page === 1) {
                setItems((prev) => [item, ...prev].slice(0, PAGE_SIZE));
            }
            setTotalCount((c) => c + 1);
            setShowModal(false);
            setNewSymbol('');
            setNewName('');
            setNewType('stock');
            // Refresh to be safe
            fetchItems();
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: string } } };
            const msg = error?.response?.data?.error ?? 'Failed to add symbol.';
            setAddError(msg);
        } finally {
            setAdding(false);
        }
    };

    const handleRemove = async (item: WatchlistItem) => {
        setRemovingId(item.id);
        try {
            await removeFromWatchlist(item.id);
            // Optimistic removal
            setItems((prev) => prev.filter((i) => i.id !== item.id));
            setTotalCount((c) => c - 1);
        } catch {
            setError('Failed to remove item.');
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Watchlist</h1>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Your tracked markets and assets</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter..."
                            className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:border-[rgb(var(--primary))]/50 focus:outline-none w-36 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 rounded-full bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all shadow-[var(--shadow-glow)]"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                        Add Symbol
                    </button>
                </div>
            </div>

            {error && (
                <p className="text-sm text-[rgb(var(--destructive))] text-center">{error}</p>
            )}

            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                <th className="px-5 py-3 w-8"></th>
                                {([
                                    ['Symbol', 'symbol'],
                                    ['Name', 'name'],
                                    ['Type', 'asset_type'],
                                    ['Added', 'added_at'],
                                ] as [string, SortKey][]).map(([label, key]) => (
                                    <th
                                        key={key}
                                        onClick={() => handleSort(key)}
                                        className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider cursor-pointer select-none hover:text-[rgb(var(--foreground))] transition-colors"
                                    >
                                        <div className="flex items-center gap-1">
                                            {label}
                                            <SortIcon col={key} />
                                        </div>
                                    </th>
                                ))}
                                <th className="px-5 py-3 w-20"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgb(var(--border))]">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {Array.from({ length: 6 }).map((_, j) => (
                                            <td key={j} className="px-5 py-3.5">
                                                <div className="h-4 rounded bg-[rgb(var(--muted))] w-20" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-10 text-center text-sm text-[rgb(var(--muted-foreground))]">
                                        {search ? 'No results match your filter.' : 'Your watchlist is empty. Add a symbol to get started.'}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((item) => (
                                    <tr key={item.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors group">
                                        <td className="px-5 py-3.5">
                                            <Star className="h-4 w-4 text-[rgb(var(--warning))]" fill="currentColor" strokeWidth={1.5} />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="font-mono font-semibold text-[rgb(var(--foreground))]">{item.symbol}</p>
                                        </td>
                                        <td className="px-5 py-3.5 text-[rgb(var(--muted-foreground))]">
                                            {item.name || '—'}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))] capitalize">
                                                {item.asset_type}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">
                                            {new Date(item.added_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <button
                                                onClick={() => handleRemove(item)}
                                                disabled={removingId === item.id}
                                                className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--destructive))] transition-all disabled:cursor-wait"
                                            >
                                                {removingId === item.id ? (
                                                    <Loader2 className="h-3 w-3 animate-spin" />
                                                ) : (
                                                    <X className="h-3 w-3" />
                                                )}
                                                Remove
                                            </button>
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

            {/* Add Symbol Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">Add Symbol</h2>
                            <button
                                onClick={() => { setShowModal(false); setAddError(null); }}
                                className="rounded-full p-1 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-all"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[rgb(var(--muted-foreground))] mb-1.5 uppercase tracking-wide">
                                    Symbol *
                                </label>
                                <input
                                    type="text"
                                    value={newSymbol}
                                    onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                                    placeholder="e.g. AAPL"
                                    className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm font-mono text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                                    autoFocus
                                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[rgb(var(--muted-foreground))] mb-1.5 uppercase tracking-wide">
                                    Company / Asset Name
                                </label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="e.g. Apple Inc."
                                    className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]/50 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[rgb(var(--muted-foreground))] mb-1.5 uppercase tracking-wide">
                                    Asset Type
                                </label>
                                <select
                                    value={newType}
                                    onChange={(e) => setNewType(e.target.value as WatchlistItem['asset_type'])}
                                    className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-2 text-sm text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] cursor-pointer"
                                >
                                    <option value="stock">Stock</option>
                                    <option value="crypto">Crypto</option>
                                    <option value="etf">ETF</option>
                                    <option value="index">Index</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {addError && (
                                <p className="text-xs text-[rgb(var(--destructive))]">{addError}</p>
                            )}

                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={() => { setShowModal(false); setAddError(null); }}
                                    className="flex-1 rounded-lg border border-[rgb(var(--border))] px-4 py-2 text-sm font-medium text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    disabled={adding || !newSymbol.trim()}
                                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-all"
                                >
                                    {adding && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Add to Watchlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
