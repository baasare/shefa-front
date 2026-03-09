/**
 * Market Data API Client
 * All market data, quotes, indicators, screener, watchlist, and overview API calls
 */

import axios from 'axios';
import { tokenStorage } from './authClient';
import { API_BASE } from './config';

const marketHttp = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Attach access token to requests
marketHttp.interceptors.request.use((config) => {
    const token = tokenStorage.getAccess();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Quote {
    id: string;
    symbol: string;
    price: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    timestamp: string;
    source: string;
}

export interface Indicator {
    id: string;
    symbol: string;
    indicator_type: 'rsi' | 'macd' | 'sma' | 'ema' | 'bollinger' | 'atr';
    value: number | Record<string, number>;
    period: number;
    timestamp: string;
}

export interface StockScreenerItem {
    id: string;
    symbol: string;
    name: string;
    exchange: string;
    sector: string;
    industry: string;
    price: string;
    market_cap: number | null;
    volume: number | null;
    change_pct: string | null;
    rsi: string | null;
    pe_ratio: string | null;
    dividend_yield: string | null;
    sma_50: string | null;
    sma_200: string | null;
    above_sma_50: boolean | null;
    above_sma_200: boolean | null;
    signal: 'Buy' | 'Sell' | 'Hold' | 'Neutral';
    last_updated: string;
}

export interface ScreenerFilters {
    search?: string;
    price_min?: number;
    price_max?: number;
    market_cap_min?: number;
    market_cap_max?: number;
    volume_min?: number;
    volume_max?: number;
    rsi_min?: number;
    rsi_max?: number;
    pe_min?: number;
    pe_max?: number;
    change_min?: number;
    change_max?: number;
    dividend_min?: number;
    sector?: string;
    industry?: string;
    exchange?: string;
    above_sma_50?: boolean;
    above_sma_200?: boolean;
    order_by?: string;
    page?: number;
    page_size?: number;
}

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface MarketOverviewItem {
    symbol: string;
    label: string;
    value: string;
    change: string;
    positive: boolean;
}

export interface WatchlistItem {
    id: string;
    symbol: string;
    name: string;
    asset_type: 'stock' | 'crypto' | 'etf' | 'index' | 'other';
    added_at: string;
}

// ─── Market Overview ──────────────────────────────────────────────────────────

/** GET /api/market-data/overview/ */
export async function getMarketOverview(): Promise<MarketOverviewItem[]> {
    const { data } = await marketHttp.get('market-data/overview/');
    return data.overview;
}

// ─── Quotes ───────────────────────────────────────────────────────────────────

/** GET /api/market-data/quotes/ */
export async function getQuotes(): Promise<Quote[]> {
    const { data } = await marketHttp.get('market-data/quotes/');
    return data;
}

/** GET /api/market-data/quotes/{id}/ */
export async function getQuote(id: string): Promise<Quote> {
    const { data } = await marketHttp.get(`market-data/quotes/${id}/`);
    return data;
}

/** GET /api/market-data/quotes/by_symbol/?symbol=AAPL&limit=100 */
export async function getQuotesBySymbol(symbol: string, limit = 100): Promise<Quote[]> {
    const { data } = await marketHttp.get('market-data/quotes/by_symbol/', {
        params: { symbol, limit }
    });
    return data;
}

// ─── Indicators ───────────────────────────────────────────────────────────────

/** GET /api/market-data/indicators/ */
export async function getIndicators(): Promise<Indicator[]> {
    const { data } = await marketHttp.get('market-data/indicators/');
    return data;
}

/** GET /api/market-data/indicators/{id}/ */
export async function getIndicator(id: string): Promise<Indicator> {
    const { data } = await marketHttp.get(`market-data/indicators/${id}/`);
    return data;
}

/** GET /api/market-data/indicators/by_symbol/?symbol=AAPL&type=rsi */
export async function getIndicatorsBySymbol(
    symbol: string,
    type?: string
): Promise<Indicator[]> {
    const { data } = await marketHttp.get('market-data/indicators/by_symbol/', {
        params: { symbol, type }
    });
    return data;
}

// ─── Stock Screener ───────────────────────────────────────────────────────────

/** GET /api/market-data/screener/ — paginated, filterable, sortable */
export async function screenStocks(
    filters?: ScreenerFilters
): Promise<PaginatedResponse<StockScreenerItem>> {
    const { data } = await marketHttp.get('market-data/screener/', {
        params: filters
    });
    return data;
}

/** GET /api/market-data/screener/{id}/ */
export async function getStockDetails(id: string): Promise<StockScreenerItem> {
    const { data } = await marketHttp.get(`market-data/screener/${id}/`);
    return data;
}

/** GET /api/market-data/screener/sectors/ */
export async function getSectors(): Promise<string[]> {
    const { data } = await marketHttp.get('market-data/screener/sectors/');
    return data.sectors ?? data;
}

/** GET /api/market-data/screener/industries/ */
export async function getIndustries(): Promise<string[]> {
    const { data } = await marketHttp.get('market-data/screener/industries/');
    return data.industries ?? data;
}

/** GET /api/market-data/screener/top_gainers/?limit=20 */
export async function getTopGainers(limit = 20): Promise<StockScreenerItem[]> {
    const { data } = await marketHttp.get('market-data/screener/top_gainers/', {
        params: { limit }
    });
    return data.stocks ?? data;
}

/** GET /api/market-data/screener/top_losers/?limit=20 */
export async function getTopLosers(limit = 20): Promise<StockScreenerItem[]> {
    const { data } = await marketHttp.get('market-data/screener/top_losers/', {
        params: { limit }
    });
    return data.stocks ?? data;
}

/** GET /api/market-data/screener/most_active/?limit=20 */
export async function getMostActive(limit = 20): Promise<StockScreenerItem[]> {
    const { data } = await marketHttp.get('market-data/screener/most_active/', {
        params: { limit }
    });
    return data.stocks ?? data;
}

// ─── Watchlist ────────────────────────────────────────────────────────────────

/** GET /api/market-data/watchlist/ — paginated */
export async function getWatchlist(
    page = 1,
    page_size = 10
): Promise<PaginatedResponse<WatchlistItem>> {
    const { data } = await marketHttp.get('market-data/watchlist/', {
        params: { page, page_size }
    });
    return data;
}

/** POST /api/market-data/watchlist/ */
export async function addToWatchlist(
    symbol: string,
    name: string,
    asset_type: WatchlistItem['asset_type'] = 'stock'
): Promise<WatchlistItem> {
    const { data } = await marketHttp.post('market-data/watchlist/', {
        symbol,
        name,
        asset_type,
    });
    return data;
}

/** DELETE /api/market-data/watchlist/{id}/ */
export async function removeFromWatchlist(id: string): Promise<void> {
    await marketHttp.delete(`market-data/watchlist/${id}/`);
}
