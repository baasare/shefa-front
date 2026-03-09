/**
 * Portfolio API Client
 * All portfolio and position-related API calls
 */

import axios from 'axios';
import { tokenStorage } from './authClient';

import { API_BASE } from './config';

const portfolioHttp = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Attach access token to requests
portfolioHttp.interceptors.request.use((config) => {
    const token = tokenStorage.getAccess();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

// ─── Portfolio Management ─────────────────────────────────────────────────────

export interface Portfolio {
    id: string;
    name: string;
    type: 'live' | 'paper';
    broker_connection: string | null;
    initial_capital: string;
    current_equity: string;
    cash_balance: string;
    total_pl: string;
    total_pl_percentage: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Position {
    id: string;
    portfolio: string;
    portfolio_name: string;
    strategy: string | null;
    symbol: string;
    side: string;
    quantity: string | number;
    avg_entry_price: string;
    current_price: string | null;
    cost_basis: string;
    current_value: string;
    unrealized_pnl: string;
    unrealized_pnl_pct: string;
    unrealized_pnl_display: {
        amount: number;
        percentage: number;
        is_profit: boolean;
    };
    stop_loss_price: string | null;
    take_profit_price: string | null;
    trailing_stop_enabled: boolean;
    trailing_stop_pct: string | null;
    opened_at: string;
    updated_at: string;
}

export interface PortfolioSnapshot {
    id: string;
    portfolio: string;
    date: string;
    equity: string;
    cash_balance: string;
    positions_value: string;
    daily_pl: string;
    daily_pl_percentage: string;
    total_pl: string;
    total_pl_percentage: string;
}

/** GET /api/portfolios/ */
export async function getPortfolios(): Promise<Portfolio[]> {
    const { data } = await portfolioHttp.get('portfolios/');
    // Handle paginated response from DRF
    return Array.isArray(data) ? data : data.results || [];
}

/** GET /api/portfolios/{id}/ */
export async function getPortfolio(id: string): Promise<Portfolio> {
    const { data } = await portfolioHttp.get(`portfolios/${id}/`);
    return data;
}

/** POST /api/portfolios/ */
export async function createPortfolio(portfolio: Partial<Portfolio>): Promise<Portfolio> {
    const { data } = await portfolioHttp.post('portfolios/', portfolio);
    return data;
}

/** PATCH /api/portfolios/{id}/ */
export async function updatePortfolio(id: string, portfolio: Partial<Portfolio>): Promise<Portfolio> {
    const { data } = await portfolioHttp.patch(`portfolios/${id}/`, portfolio);
    return data;
}

/** DELETE /api/portfolios/{id}/ */
export async function deletePortfolio(id: string): Promise<void> {
    await portfolioHttp.delete(`portfolios/${id}/`);
}

/** POST /api/portfolios/{id}/calculate_equity/ */
export async function calculateEquity(id: string): Promise<Portfolio> {
    const { data } = await portfolioHttp.post(`portfolios/${id}/calculate_equity/`);
    return data;
}

/** GET /api/portfolios/{id}/performance/ */
export async function getPortfolioPerformance(id: string): Promise<PortfolioSnapshot[]> {
    const { data } = await portfolioHttp.get(`portfolios/${id}/performance/`);
    return data;
}

/** GET /api/portfolios/{id}/activate/ */
export async function activatePortfolio(id: string): Promise<Portfolio> {
    const { data } = await portfolioHttp.post(`portfolios/${id}/activate/`);
    return data;
}

/** POST /api/portfolios/{id}/deactivate/ */
export async function deactivatePortfolio(id: string): Promise<Portfolio> {
    const { data } = await portfolioHttp.post(`portfolios/${id}/deactivate/`);
    return data;
}

/** GET /api/portfolios/{id}/analytics/ */
export async function getPortfolioAnalytics(id: string): Promise<Record<string, unknown>> {
    const { data } = await portfolioHttp.get(`portfolios/${id}/analytics/`);
    return data;
}

// ─── Position Management ──────────────────────────────────────────────────────

/** GET /api/portfolios/positions/ */
export async function getPositions(filters?: {
    portfolio?: string;
    search?: string;
    ordering?: string;
    page?: number;
    page_size?: number;
    asset_class?: string;
}): Promise<PaginatedResponse<Position>> {
    const { data } = await portfolioHttp.get('positions/', { params: filters });
    // Handle both paginated and non-paginated responses gracefully for backward compatibility
    if (Array.isArray(data)) {
        return { count: data.length, next: null, previous: null, results: data };
    }
    return data;
}

/** GET /api/portfolios/positions/{id}/ */
export async function getPosition(id: string): Promise<Position> {
    const { data } = await portfolioHttp.get(`/positions/${id}/`);
    return data;
}

/** POST /api/portfolios/positions/ */
export async function createPosition(position: Partial<Position>): Promise<Position> {
    const { data } = await portfolioHttp.post('positions/', position);
    return data;
}

/** PATCH /api/portfolios/positions/{id}/ */
export async function updatePosition(id: string, position: Partial<Position>): Promise<Position> {
    const { data } = await portfolioHttp.patch(`positions/${id}/`, position);
    return data;
}

/** DELETE /api/portfolios/positions/{id}/ */
export async function deletePosition(id: string): Promise<void> {
    await portfolioHttp.delete(`positions/${id}/`);
}

/** POST /api/portfolios/positions/{id}/update_price/ */
export async function updatePositionPrice(id: string): Promise<Position> {
    const { data } = await portfolioHttp.post(`positions/${id}/update_price/`);
    return data;
}

/** GET /api/portfolios/positions/by_symbol/?symbol=AAPL */
export async function getPositionsBySymbol(symbol: string): Promise<Position[]> {
    const { data } = await portfolioHttp.get('positions/by_symbol/', {
        params: { symbol }
    });
    return data;
}

/** GET /api/portfolios/snapshots/ */
export async function getPortfolioSnapshots(portfolioId?: string): Promise<PortfolioSnapshot[]> {
    const params = portfolioId ? { portfolio: portfolioId } : {};
    const { data } = await portfolioHttp.get('portfolios/snapshots/', { params });
    // Handle paginated response from DRF
    return Array.isArray(data) ? data : data.results || [];
}
