/**
 * Auth API Client
 * Isolated module for all authentication API calls.
 * Stores tokens in localStorage after successful login.
 */

import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const authHttp = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// ─── Token Management ─────────────────────────────────────────────────────────

export const tokenStorage = {
    getAccess: () => (typeof window !== 'undefined' ? localStorage.getItem('shefa_access') : null),
    getRefresh: () => (typeof window !== 'undefined' ? localStorage.getItem('shefa_refresh') : null),
    setTokens: (access: string, refresh: string) => {
        localStorage.setItem('shefa_access', access);
        localStorage.setItem('shefa_refresh', refresh);
    },
    clearTokens: () => {
        localStorage.removeItem('shefa_access');
        localStorage.removeItem('shefa_refresh');
    },
};

// ─── Request Interceptor — attach access token ────────────────────────────────

authHttp.interceptors.request.use((config) => {
    const token = tokenStorage.getAccess();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ─── Auth API Calls ───────────────────────────────────────────────────────────

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password1: string;
    password2: string;
    first_name?: string;
    last_name?: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
    };
}

/** POST /api/auth/login/ */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await authHttp.post<AuthResponse>('/auth/login/', credentials);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
}

/** POST /api/auth/registration/ */
export async function register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await authHttp.post<AuthResponse>('/auth/registration/', userData);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
}

/** POST /api/auth/logout/ */
export async function logout(): Promise<void> {
    try {
        await authHttp.post('/auth/logout/', { refresh: tokenStorage.getRefresh() });
    } finally {
        tokenStorage.clearTokens();
    }
}

/** POST /api/auth/password/reset/ */
export async function requestPasswordReset(email: string): Promise<void> {
    await authHttp.post('/auth/password/reset/', { email });
}

/** POST /api/auth/password/reset/confirm/ */
export async function resetPassword(data: {
    uid: string;
    token: string;
    new_password1: string;
    new_password2: string;
}): Promise<void> {
    await authHttp.post('/auth/password/reset/confirm/', data);
}

/** POST /api/auth/registration/verify-email/ */
export async function verifyEmail(key: string): Promise<void> {
    await authHttp.post('/auth/registration/verify-email/', { key });
}

/** GET /api/auth/user/ */
export async function getCurrentUser(): Promise<AuthResponse['user']> {
    const { data } = await authHttp.get<AuthResponse['user']>('/auth/user/');
    return data;
}
