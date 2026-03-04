/**
 * Market Data API Client
 * All market data, quotes, indicators, and screener-related API calls
 */

import axios from 'axios';
import { tokenStorage } from './authClient';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
    value: any;
    period: number;
    timestamp: string;
}

export interface StockScreenerItem {
    id: string;
    symbol: string;
    company_name: string;
    exchange: string;
    sector: string;
    industry: string;
    price: string;
    market_cap: string;
    volume: string;
    change_percent: string;
    rsi: string | null;
    pe_ratio: string | null;
    dividend_yield: string | null;
    sma_50: string | null;
    sma_200: string | null;
    above_sma_50: boolean;
    above_sma_200: boolean;
    last_updated: string;
}

export interface ScreenerFilters {
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
}

// ─── Quotes ───────────────────────────────────────────────────────────────────

/** GET /api/market-data/quotes/ */
export async function getQuotes(): Promise<Quote[]> {
    const { data } = await marketHttp.get('/market-data/quotes/');
    return data;
}

/** GET /api/market-data/quotes/{id}/ */
export async function getQuote(id: string): Promise<Quote> {
    const { data } = await marketHttp.get(`/market-data/quotes/${id}/`);
    return data;
}

/** GET /api/market-data/quotes/by_symbol/?symbol=AAPL&limit=100 */
export async function getQuotesBySymbol(symbol: string, limit = 100): Promise<Quote[]> {
    const { data } = await marketHttp.get('/market-data/quotes/by_symbol/', {
        params: { symbol, limit }
    });
    return data;
}

// ─── Indicators ───────────────────────────────────────────────────────────────

/** GET /api/market-data/indicators/ */
export async function getIndicators(): Promise<Indicator[]> {
    const { data } = await marketHttp.get('/market-data/indicators/');
    return data;
}

/** GET /api/market-data/indicators/{id}/ */
export async function getIndicator(id: string): Promise<Indicator> {
    const { data } = await marketHttp.get(`/market-data/indicators/${id}/`);
    return data;
}

/** GET /api/market-data/indicators/by_symbol/?symbol=AAPL&type=rsi */
export async function getIndicatorsBySymbol(
    symbol: string,
    type?: string
): Promise<Indicator[]> {
    const { data } = await marketHttp.get('/market-data/indicators/by_symbol/', {
        params: { symbol, type }
    });
    return data;
}

// ─── Stock Screener ───────────────────────────────────────────────────────────

/** GET /api/market-data/screener/ */
export async function screenStocks(filters?: ScreenerFilters): Promise<StockScreenerItem[]> {
    const { data } = await marketHttp.get('/market-data/screener/', {
        params: filters
    });
    return data;
}

/** GET /api/market-data/screener/{id}/ */
export async function getStockDetails(id: string): Promise<StockScreenerItem> {
    const { data } = await marketHttp.get(`/market-data/screener/${id}/`);
    return data;
}

/** GET /api/market-data/screener/sectors/ */
export async function getSectors(): Promise<string[]> {
    const { data } = await marketHttp.get('/market-data/screener/sectors/');
    return data;
}

/** GET /api/market-data/screener/industries/ */
export async function getIndustries(): Promise<string[]> {
    const { data } = await marketHttp.get('/market-data/screener/industries/');
    return data;
}

/** GET /api/market-data/screener/top_gainers/?limit=20 */
export async function getTopGainers(limit = 20): Promise<StockScreenerItem[]> {
    const { data } = await marketHttp.get('/market-data/screener/top_gainers/', {
        params: { limit }
    });
    return data;
}

/** GET /api/market-data/screener/top_losers/?limit=20 */
export async function getTopLosers(limit = 20): Promise<StockScreenerItem[]> {
    const { data } = await marketHttp.get('/market-data/screener/top_losers/', {
        params: { limit }
    });
    return data;
}

/** GET /api/market-data/screener/most_active/?limit=20 */
export async function getMostActive(limit = 20): Promise<StockScreenerItem[]> {
    const { data } = await marketHttp.get('/market-data/screener/most_active/', {
        params: { limit }
    });
    return data;
}
