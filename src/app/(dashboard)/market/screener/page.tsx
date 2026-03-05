'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import {
    screenStocks,
    getSectors,
    type StockScreenerItem,
} from '@/lib/api/marketData';

const PAGE_SIZE = 20;

const SORT_OPTIONS = [
    { label: 'Volume (High→Low)', value: '-volume' },
    { label: 'Volume (Low→High)', value: 'volume' },
    { label: 'P/E Ratio (Low→High)', value: 'pe_ratio' },
    { label: 'P/E Ratio (High→Low)', value: '-pe_ratio' },
    { label: 'RSI (High→Low)', value: '-rsi' },
    { label: 'RSI (Low→High)', value: 'rsi' },
    { label: 'Mkt Cap (High→Low)', value: '-market_cap' },
    { label: 'Mkt Cap (Low→High)', value: 'market_cap' },
    { label: 'Change % (High→Low)', value: '-change_pct' },
    { label: 'Change % (Low→High)', value: 'change_pct' },
];

const SIGNAL_STYLES: Record<string, string> = {
    Buy: 'text-[rgb(var(--success))] bg-[rgb(var(--success))]/10',
    Hold: 'text-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10',
    Neutral: 'text-[rgb(var(--muted-foreground))] bg-[rgb(var(--muted))]',
    Sell: 'text-[rgb(var(--destructive))] bg-[rgb(var(--destructive))]/10',
};

function formatMarketCap(val: number | null): string {
    if (val === null) return '—';
    if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
    return `$${val.toLocaleString()}`;
}

function formatVolume(val: number | null): string {
    if (val === null) return '—';
    if (val >= 1e9) return `${(val / 1e9).toFixed(1)}B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(1)}M`;
    if (val >= 1e3) return `${(val / 1e3).toFixed(0)}K`;
    return `${val}`;
}

export default function ScreenerPage() {
    const [results, setResults] = useState<StockScreenerItem[]>([]);
    const [sectors, setSectors] = useState<string[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sector, setSector] = useState('');
    const [orderBy, setOrderBy] = useState('-volume');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Debounce search
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 350);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [search]);

    // Load sectors
    useEffect(() => {
        getSectors().then(setSectors).catch(() => { });
    }, []);

    // Fetch screener results
    const fetchResults = useCallback(() => {
        setLoading(true);
        setError(null);
        screenStocks({
            search: debouncedSearch || undefined,
            sector: sector || undefined,
            order_by: orderBy,
            page,
            page_size: PAGE_SIZE,
        })
            .then((res) => {
                setResults(res.results);
                setTotalCount(res.count);
            })
            .catch(() => setError('Failed to load screener results.'))
            .finally(() => setLoading(false));
    }, [debouncedSearch, sector, orderBy, page]);

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const handleSectorClick = (s: string) => {
        setSector(s === sector ? '' : s);
        setPage(1);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Market Screener</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">Filter and discover assets using technical and fundamental criteria</p>
            </div>

            {/* Filter bar */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" strokeWidth={1.5} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search symbols or company name..."
                            className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] pl-10 pr-4 py-2 text-sm text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))]"
                        />
                    </div>
                </div>

                {/* Sector quick filters */}
                {sectors.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                        <button
                            onClick={() => handleSectorClick('')}
                            className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${sector === ''
                                    ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                                    : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                                }`}
                        >
                            All Sectors
                        </button>
                        {sectors.map((s) => (
                            <button
                                key={s}
                                onClick={() => handleSectorClick(s)}
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${sector === s
                                        ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results header */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    <span className="font-semibold text-[rgb(var(--foreground))]">{loading ? '…' : totalCount}</span> results
                    {sector && <span> in <span className="font-medium text-[rgb(var(--foreground))]">{sector}</span></span>}
                </p>
                <select
                    value={orderBy}
                    onChange={(e) => { setOrderBy(e.target.value); setPage(1); }}
                    className="rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-3 py-1.5 text-xs text-[rgb(var(--foreground))] focus:outline-none cursor-pointer"
                >
                    {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Results table */}
            <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[rgb(var(--border))]">
                                {['Symbol', 'Sector', 'Price', 'Change', 'P/E', 'RSI', 'Mkt Cap', 'Volume', 'Signal'].map((col) => (
                                    <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[rgb(var(--muted-foreground))] uppercase tracking-wider">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[rgb(var(--border))]">
                            {loading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        {Array.from({ length: 9 }).map((_, j) => (
                                            <td key={j} className="px-5 py-3.5">
                                                <div className="h-4 rounded bg-[rgb(var(--muted))] w-16" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : error ? (
                                <tr><td colSpan={9} className="px-5 py-8 text-center text-sm text-[rgb(var(--destructive))]">{error}</td></tr>
                            ) : results.length === 0 ? (
                                <tr><td colSpan={9} className="px-5 py-8 text-center text-sm text-[rgb(var(--muted-foreground))]">No results found.</td></tr>
                            ) : (
                                results.map((r) => {
                                    const changePct = r.change_pct ? parseFloat(r.change_pct) : null;
                                    const positive = changePct !== null && changePct >= 0;
                                    return (
                                        <tr key={r.id} className="hover:bg-[rgb(var(--muted))]/30 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <p className="font-mono font-semibold text-[rgb(var(--foreground))]">{r.symbol}</p>
                                                <p className="text-xs text-[rgb(var(--muted-foreground))]">{r.name}</p>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className="rounded-md bg-[rgb(var(--muted))] px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))]">
                                                    {r.sector || '—'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 font-mono font-semibold text-[rgb(var(--foreground))]">
                                                ${parseFloat(r.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                            <td className={`px-5 py-3.5 font-mono text-xs font-medium ${positive ? 'text-[rgb(var(--success))]' : 'text-[rgb(var(--destructive))]'}`}>
                                                {changePct !== null ? `${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%` : '—'}
                                            </td>
                                            <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">
                                                {r.pe_ratio ? parseFloat(r.pe_ratio).toFixed(1) : '—'}
                                            </td>
                                            <td className="px-5 py-3.5 font-mono text-[rgb(var(--foreground))]">
                                                {r.rsi ? parseFloat(r.rsi).toFixed(0) : '—'}
                                            </td>
                                            <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">
                                                {formatMarketCap(r.market_cap)}
                                            </td>
                                            <td className="px-5 py-3.5 text-xs text-[rgb(var(--muted-foreground))]">
                                                {formatVolume(r.volume)}
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${SIGNAL_STYLES[r.signal] ?? SIGNAL_STYLES.Neutral}`}>
                                                    {r.signal}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t border-[rgb(var(--border))]">
                        <p className="text-xs text-[rgb(var(--muted-foreground))]">
                            Page {page} of {totalPages} &middot; {totalCount} results
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="rounded-md p-1.5 text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] disabled:opacity-40 transition-all"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            {/* Page number buttons */}
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                                const p = start + i;
                                return (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${p === page
                                                ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                                                : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
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
        </div>
    );
}
