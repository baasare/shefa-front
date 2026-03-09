/**
 * Strategy API Client
 * All strategy, backtest, template, and watchlist-related API calls
 */

import axios from 'axios';
import { tokenStorage } from './authClient';

import { API_BASE } from './config';

const strategyHttp = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Attach access token to requests
strategyHttp.interceptors.request.use((config) => {
    const token = tokenStorage.getAccess();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Strategy {
    id: string;
    user: string;
    portfolio: string;
    name: string;
    strategy_type: 'momentum' | 'mean_reversion' | 'swing' | 'trend_following' | 'custom';
    description: string;
    symbols: string[];
    entry_rules: Record<string, unknown>;
    exit_rules: Record<string, unknown>;
    risk_per_trade: string;
    max_open_positions: number;
    status: 'active' | 'paused' | 'inactive';
    autonomous_trading_enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface Backtest {
    id: string;
    strategy: string;
    start_date: string;
    end_date: string;
    initial_capital: string;
    final_equity: string;
    total_return: string;
    total_return_percentage: string;
    total_trades: number;
    winning_trades: number;
    losing_trades: number;
    win_rate: string;
    sharpe_ratio: string;
    max_drawdown: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    created_at: string;
    completed_at: string | null;
}

export interface StrategyTemplate {
    id: string;
    name: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    description: string;
    strategy_type: string;
    entry_rules: Record<string, unknown>;
    exit_rules: Record<string, unknown>;
    risk_parameters: Record<string, unknown>;
    expected_performance: Record<string, unknown>;
    tags: string[];
    is_featured: boolean;
    usage_count: number;
}

export interface Watchlist {
    id: string;
    user: string;
    name: string;
    symbols: string[];
    color: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

// ─── Strategy Management ──────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export async function getStrategies(params?: Record<string, unknown>): Promise<PaginatedResponse<Strategy>> {
    const { data } = await strategyHttp.get('strategies/', { params });
    // If not using paginated DRF, mock the structure
    if (Array.isArray(data)) {
        return { count: data.length, next: null, previous: null, results: data };
    }
    return data;
}

export async function getStrategy(id: string): Promise<Strategy> {
    const { data } = await strategyHttp.get(`strategies/${id}/`);
    return data;
}

export async function createStrategy(strategy: Partial<Strategy>): Promise<Strategy> {
    const { data } = await strategyHttp.post('strategies/', strategy);
    return data;
}

export async function updateStrategy(id: string, strategy: Partial<Strategy>): Promise<Strategy> {
    const { data } = await strategyHttp.patch(`strategies/${id}/`, strategy);
    return data;
}

export async function deleteStrategy(id: string): Promise<void> {
    await strategyHttp.delete(`strategies/${id}/`);
}

export async function activateStrategy(id: string): Promise<Strategy> {
    const { data } = await strategyHttp.post(`strategies/${id}/activate/`);
    return data;
}

export async function pauseStrategy(id: string): Promise<Strategy> {
    const { data } = await strategyHttp.post(`strategies/${id}/pause/`);
    return data;
}

export async function deactivateStrategy(id: string): Promise<Strategy> {
    const { data } = await strategyHttp.post(`strategies/${id}/deactivate/`);
    return data;
}

export async function runBacktest(id: string, params: {
    start_date: string;
    end_date: string;
    initial_capital?: number;
}): Promise<Backtest> {
    const { data } = await strategyHttp.post(`strategies/${id}/run_backtest/`, params);
    return data;
}

export async function getActiveStrategies(): Promise<Strategy[]> {
    const { data } = await strategyHttp.get('strategies/active/');
    // Handle paginated response from DRF
    return Array.isArray(data) ? data : data.results || [];
}

// ─── Backtest Management ──────────────────────────────────────────────────────

export async function getBacktests(strategyId?: string): Promise<Backtest[]> {
    const params = strategyId ? { strategy: strategyId } : {};
    const { data } = await strategyHttp.get('strategies/backtests/', { params });
    // Handle paginated response from DRF
    return Array.isArray(data) ? data : data.results || [];
}

export async function getBacktest(id: string): Promise<Backtest> {
    const { data } = await strategyHttp.get(`strategies/backtests/${id}/`);
    return data;
}

export async function getEquityCurve(id: string): Promise<Record<string, unknown>[]> {
    const { data } = await strategyHttp.get(`strategies/backtests/${id}/equity_curve/`);
    return data;
}

// ─── Strategy Templates ───────────────────────────────────────────────────────

export async function getStrategyTemplates(filters?: {
    category?: string;
    difficulty?: string;
    tags?: string;
    featured?: boolean;
    search?: string;
    ordering?: string;
    page?: number;
}): Promise<PaginatedResponse<StrategyTemplate>> {
    const { data } = await strategyHttp.get('strategies/templates/', { params: filters });
    if (Array.isArray(data)) {
        return { count: data.length, next: null, previous: null, results: data };
    }
    return data;
}

export async function getStrategyTemplate(id: string): Promise<StrategyTemplate> {
    const { data } = await strategyHttp.get(`strategies/templates/${id}/`);
    return data;
}

export async function createStrategyFromTemplate(id: string, templateData: {
    name: string;
    portfolio: string;
    symbols?: string[];
}): Promise<Strategy> {
    const { data } = await strategyHttp.post(`strategies/templates/${id}/create_strategy/`, templateData);
    return data;
}

export async function getFeaturedTemplates(): Promise<StrategyTemplate[]> {
    const { data } = await strategyHttp.get('strategies/templates/featured/');
    // Handle paginated response from DRF
    return Array.isArray(data) ? data : data.results || [];
}

// ─── Watchlist Management ─────────────────────────────────────────────────────

export async function getWatchlists(): Promise<Watchlist[]> {
    const { data } = await strategyHttp.get('strategies/watchlists/');
    // Handle paginated response from DRF
    return Array.isArray(data) ? data : data.results || [];
}

export async function getWatchlist(id: string): Promise<Watchlist> {
    const { data } = await strategyHttp.get(`strategies/watchlists/${id}/`);
    return data;
}

export async function createWatchlist(watchlist: Partial<Watchlist>): Promise<Watchlist> {
    const { data } = await strategyHttp.post('strategies/watchlists/', watchlist);
    return data;
}

export async function updateWatchlist(id: string, watchlist: Partial<Watchlist>): Promise<Watchlist> {
    const { data } = await strategyHttp.patch(`strategies/watchlists/${id}/`, watchlist);
    return data;
}

export async function deleteWatchlist(id: string): Promise<void> {
    await strategyHttp.delete(`strategies/watchlists/${id}/`);
}

export async function addSymbolToWatchlist(id: string, symbol: string): Promise<Watchlist> {
    const { data } = await strategyHttp.post(`strategies/watchlists/${id}/add_symbol/`, { symbol });
    return data;
}

export async function removeSymbolFromWatchlist(id: string, symbol: string): Promise<Watchlist> {
    const { data } = await strategyHttp.post(`strategies/watchlists/${id}/remove_symbol/`, { symbol });
    return data;
}

export async function setDefaultWatchlist(id: string): Promise<Watchlist> {
    const { data } = await strategyHttp.post(`strategies/watchlists/${id}/set_default/`);
    return data;
}

export async function getDefaultWatchlist(): Promise<Watchlist> {
    const { data } = await strategyHttp.get('strategies/watchlists/default/');
    return data;
}

// Legacy API object for backward compatibility
export const strategyApi = {
    updateStrategy,
};
