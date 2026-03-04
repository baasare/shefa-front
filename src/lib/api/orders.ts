/**
 * Orders & Trades API Client
 * All order and trade-related API calls including HITL approvals
 */

import axios from 'axios';
import { tokenStorage } from './authClient';

import { API_BASE } from './config';

const ordersHttp = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Attach access token to requests
ordersHttp.interceptors.request.use((config) => {
    const token = tokenStorage.getAccess();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Order {
    id: string;
    user: string;
    portfolio: string;
    strategy: string | null;
    symbol: string;
    order_type: 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop';
    side: 'buy' | 'sell';
    quantity: string;
    price: string | null;
    stop_price: string | null;
    trailing_percent: string | null;
    time_in_force: 'day' | 'gtc' | 'ioc' | 'fok';
    status: 'pending_approval' | 'approved' | 'rejected' | 'submitted' | 'filled' | 'partially_filled' | 'cancelled' | 'failed';
    filled_quantity: string;
    average_fill_price: string | null;
    requires_approval: boolean;
    approved_by: string | null;
    approval_notes: string;
    broker_order_id: string;
    created_at: string;
    updated_at: string;
    filled_at: string | null;
}

export interface Trade {
    id: string;
    order: string;
    symbol: string;
    side: 'buy' | 'sell';
    quantity: string;
    price: string;
    commission: string;
    total_value: string;
    executed_at: string;
    broker_trade_id: string;
}

export interface ApprovalDecision {
    decision: 'approve' | 'reject';
    notes?: string;
}

// ─── Order Management ─────────────────────────────────────────────────────────

/** GET /api/orders/ */
export async function getOrders(filters?: {
    portfolio?: string;
    strategy?: string;
    status?: string;
    symbol?: string;
}): Promise<Order[]> {
    const { data } = await ordersHttp.get('orders/', { params: filters });
    return data;
}

/** GET /api/orders/{id}/ */
export async function getOrder(id: string): Promise<Order> {
    const { data } = await ordersHttp.get(`orders/${id}/`);
    return data;
}

/** POST /api/orders/ */
export async function createOrder(order: Partial<Order>): Promise<Order> {
    const { data } = await ordersHttp.post('orders/', order);
    return data;
}

/** PATCH /api/orders/{id}/ */
export async function updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    const { data } = await ordersHttp.patch(`orders/${id}/`, order);
    return data;
}

/** DELETE /api/orders/{id}/ */
export async function deleteOrder(id: string): Promise<void> {
    await ordersHttp.delete(`orders/${id}/`);
}

/** POST /api/orders/{id}/approve_order/ */
export async function approveOrder(id: string, decision: ApprovalDecision): Promise<Order> {
    const { data } = await ordersHttp.post(`orders/${id}/approve_order/`, decision);
    return data;
}

/** POST /api/orders/{id}/cancel/ */
export async function cancelOrder(id: string): Promise<Order> {
    const { data } = await ordersHttp.post(`orders/${id}/cancel/`);
    return data;
}

/** GET /api/orders/pending_approval/ */
export async function getPendingApprovals(): Promise<Order[]> {
    const { data } = await ordersHttp.get('orders/pending_approval/');
    return data;
}

/** GET /api/orders/by_symbol/?symbol=AAPL */
export async function getOrdersBySymbol(symbol: string): Promise<Order[]> {
    const { data } = await ordersHttp.get('orders/by_symbol/', {
        params: { symbol }
    });
    return data;
}

/** GET /api/orders/{id}/audit_trail/ */
export async function getAuditTrail(id: string): Promise<any> {
    const { data } = await ordersHttp.get(`orders/${id}/audit_trail/`);
    return data;
}

// ─── Trade Management ─────────────────────────────────────────────────────────

/** GET /api/orders/trades/ */
export async function getTrades(filters?: {
    order?: string;
    symbol?: string;
}): Promise<Trade[]> {
    const { data } = await ordersHttp.get('orders/trades/', { params: filters });
    return data;
}

/** GET /api/orders/trades/{id}/ */
export async function getTrade(id: string): Promise<Trade> {
    const { data } = await ordersHttp.get(`orders/trades/${id}/`);
    return data;
}

/** GET /api/orders/trades/by_symbol/?symbol=AAPL */
export async function getTradesBySymbol(symbol: string): Promise<Trade[]> {
    const { data } = await ordersHttp.get('orders/trades/by_symbol/', {
        params: { symbol }
    });
    return data;
}

/** GET /api/orders/trades/performance/ */
export async function getTradingPerformance(): Promise<any> {
    const { data } = await ordersHttp.get('orders/trades/performance/');
    return data;
}
