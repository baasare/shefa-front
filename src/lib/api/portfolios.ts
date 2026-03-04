/**
 * Portfolio API Client
 * All portfolio and position-related API calls
 */

import axios from 'axios';
import { tokenStorage } from './authClient';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
    symbol: string;
    quantity: string;
    average_price: string;
    current_price: string;
    market_value: string;
    unrealized_pl: string;
    unrealized_pl_percentage: string;
    stop_loss: string | null;
    take_profit: string | null;
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

/** GET /api/portfolios/portfolios/ */
export async function getPortfolios(): Promise<Portfolio[]> {
    const { data } = await portfolioHttp.get('/portfolios/portfolios/');
    return data;
}

/** GET /api/portfolios/portfolios/{id}/ */
export async function getPortfolio(id: string): Promise<Portfolio> {
    const { data } = await portfolioHttp.get(`/portfolios/portfolios/${id}/`);
    return data;
}

/** POST /api/portfolios/portfolios/ */
export async function createPortfolio(portfolio: Partial<Portfolio>): Promise<Portfolio> {
    const { data } = await portfolioHttp.post('/portfolios/portfolios/', portfolio);
    return data;
}

/** PATCH /api/portfolios/portfolios/{id}/ */
export async function updatePortfolio(id: string, portfolio: Partial<Portfolio>): Promise<Portfolio> {
    const { data } = await portfolioHttp.patch(`/portfolios/portfolios/${id}/`, portfolio);
    return data;
}

/** DELETE /api/portfolios/portfolios/{id}/ */
export async function deletePortfolio(id: string): Promise<void> {
    await portfolioHttp.delete(`/portfolios/portfolios/${id}/`);
}

/** POST /api/portfolios/portfolios/{id}/calculate_equity/ */
export async function calculateEquity(id: string): Promise<Portfolio> {
    const { data } = await portfolioHttp.post(`/portfolios/portfolios/${id}/calculate_equity/`);
    return data;
}

/** GET /api/portfolios/portfolios/{id}/performance/ */
export async function getPortfolioPerformance(id: string): Promise<PortfolioSnapshot[]> {
    const { data } = await portfolioHttp.get(`/portfolios/portfolios/${id}/performance/`);
    return data;
}

/** POST /api/portfolios/portfolios/{id}/activate/ */
export async function activatePortfolio(id: string): Promise<Portfolio> {
    const { data } = await portfolioHttp.post(`/portfolios/portfolios/${id}/activate/`);
    return data;
}

/** POST /api/portfolios/portfolios/{id}/deactivate/ */
export async function deactivatePortfolio(id: string): Promise<Portfolio> {
    const { data } = await portfolioHttp.post(`/portfolios/portfolios/${id}/deactivate/`);
    return data;
}

// ─── Position Management ──────────────────────────────────────────────────────

/** GET /api/portfolios/positions/ */
export async function getPositions(portfolioId?: string): Promise<Position[]> {
    const params = portfolioId ? { portfolio: portfolioId } : {};
    const { data } = await portfolioHttp.get('/portfolios/positions/', { params });
    return data;
}

/** GET /api/portfolios/positions/{id}/ */
export async function getPosition(id: string): Promise<Position> {
    const { data } = await portfolioHttp.get(`/portfolios/positions/${id}/`);
    return data;
}

/** POST /api/portfolios/positions/ */
export async function createPosition(position: Partial<Position>): Promise<Position> {
    const { data } = await portfolioHttp.post('/portfolios/positions/', position);
    return data;
}

/** PATCH /api/portfolios/positions/{id}/ */
export async function updatePosition(id: string, position: Partial<Position>): Promise<Position> {
    const { data } = await portfolioHttp.patch(`/portfolios/positions/${id}/`, position);
    return data;
}

/** DELETE /api/portfolios/positions/{id}/ */
export async function deletePosition(id: string): Promise<void> {
    await portfolioHttp.delete(`/portfolios/positions/${id}/`);
}

/** POST /api/portfolios/positions/{id}/update_price/ */
export async function updatePositionPrice(id: string): Promise<Position> {
    const { data } = await portfolioHttp.post(`/portfolios/positions/${id}/update_price/`);
    return data;
}

/** GET /api/portfolios/positions/by_symbol/?symbol=AAPL */
export async function getPositionsBySymbol(symbol: string): Promise<Position[]> {
    const { data } = await portfolioHttp.get('/portfolios/positions/by_symbol/', {
        params: { symbol }
    });
    return data;
}

/** GET /api/portfolios/snapshots/ */
export async function getPortfolioSnapshots(portfolioId?: string): Promise<PortfolioSnapshot[]> {
    const params = portfolioId ? { portfolio: portfolioId } : {};
    const { data } = await portfolioHttp.get('/portfolios/snapshots/', { params });
    return data;
}
