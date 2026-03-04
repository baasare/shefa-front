/**
 * Brokers API Client
 * All broker connection-related API calls
 */

import axios from 'axios';
import { tokenStorage } from './authClient';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const brokersHttp = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Attach access token to requests
brokersHttp.interceptors.request.use((config) => {
    const token = tokenStorage.getAccess();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BrokerConnection {
    id: string;
    user: string;
    broker_name: 'alpaca' | 'interactive_brokers' | 'td_ameritrade';
    api_key: string;
    api_secret: string;
    paper_trading: boolean;
    is_active: boolean;
    last_connected_at: string | null;
    created_at: string;
    updated_at: string;
}

// ─── Broker Connection Management ────────────────────────────────────────────

/** GET /api/brokers/connections/ */
export async function getBrokerConnections(): Promise<BrokerConnection[]> {
    const { data } = await brokersHttp.get('/brokers/connections/');
    return data;
}

/** GET /api/brokers/connections/{id}/ */
export async function getBrokerConnection(id: string): Promise<BrokerConnection> {
    const { data } = await brokersHttp.get(`/brokers/connections/${id}/`);
    return data;
}

/** POST /api/brokers/connections/ */
export async function createBrokerConnection(connection: Partial<BrokerConnection>): Promise<BrokerConnection> {
    const { data } = await brokersHttp.post('/brokers/connections/', connection);
    return data;
}

/** PATCH /api/brokers/connections/{id}/ */
export async function updateBrokerConnection(id: string, connection: Partial<BrokerConnection>): Promise<BrokerConnection> {
    const { data } = await brokersHttp.patch(`/brokers/connections/${id}/`, connection);
    return data;
}

/** DELETE /api/brokers/connections/{id}/ */
export async function deleteBrokerConnection(id: string): Promise<void> {
    await brokersHttp.delete(`/brokers/connections/${id}/`);
}

/** GET /api/brokers/connections/alpaca-auth-url/ */
export async function getAlpacaAuthUrl(): Promise<{ auth_url: string }> {
    const { data } = await brokersHttp.get('/brokers/connections/alpaca-auth-url/');
    return data;
}

/** POST /api/brokers/connections/{id}/test_connection/ */
export async function testBrokerConnection(id: string): Promise<{
    success: boolean;
    message: string;
    account_info?: any;
}> {
    const { data } = await brokersHttp.post(`/brokers/connections/${id}/test_connection/`);
    return data;
}
