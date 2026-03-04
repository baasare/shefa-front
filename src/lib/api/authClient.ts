/**
 * Auth API Client
 * Isolated module for all authentication API calls.
 * Stores tokens in localStorage after successful login.
 */

import axios from 'axios';

import { API_BASE } from './config';

const authHttp = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// ─── Token Management ─────────────────────────────────────────────────────────

export const tokenStorage = {
    getAccess: () => (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null),
    getRefresh: () => (typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null),
    setTokens: (access: string, refresh: string) => {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    },
    clearTokens: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
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
    password: string;
    password_confirm: string;
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
    const { data } = await authHttp.post<AuthResponse>('auth/login/', credentials);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
}

/** POST /api/auth/registration/ */
export async function register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await authHttp.post<AuthResponse>('auth/registration/', userData);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
}

/** POST /api/auth/logout/ */
export async function logout(): Promise<void> {
    try {
        await authHttp.post('auth/logout/', { refresh: tokenStorage.getRefresh() });
    } finally {
        tokenStorage.clearTokens();
    }
}

/** POST /api/auth/password/reset/ */
export async function requestPasswordReset(email: string): Promise<void> {
    await authHttp.post('auth/password/reset/', { email });
}

/** POST /api/auth/password/reset/confirm/ */
export async function resetPassword(data: {
    uid: string;
    token: string;
    password: string;
    password_confirm: string;
}): Promise<void> {
    await authHttp.post('auth/password/reset/confirm/', data);
}

/** POST /api/auth/registration/verify-email/ */
export async function verifyEmail(key: string): Promise<void> {
    await authHttp.post('auth/registration/verify-email/', { key });
}

/** GET /api/auth/profile/ */
export async function getCurrentUser(): Promise<any> {
    const { data } = await authHttp.get('auth/profile/');
    return data;
}

/** PATCH /api/auth/profile/update/ */
export async function updateProfile(profileData: any): Promise<any> {
    const { data } = await authHttp.patch('auth/profile/update/', profileData);
    return data;
}

/** POST /api/auth/password/change/ */
export async function changePassword(data: {
    old_password: string;
    new_password1: string;
    new_password2: string;
}): Promise<void> {
    await authHttp.post('auth/password/change/', data);
}

/** DELETE /api/auth/delete-account/ */
export async function deleteAccount(): Promise<void> {
    await authHttp.delete('auth/delete-account/');
    tokenStorage.clearTokens();
}

/** GET /api/auth/active-sessions/ */
export async function getActiveSessions(): Promise<any> {
    const { data } = await authHttp.get('auth/active-sessions/');
    return data;
}

/** POST /api/auth/token/refresh/ */
export async function refreshToken(): Promise<string> {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) throw new Error('No refresh token');
    const { data } = await authHttp.post('auth/token/refresh/', { refresh });
    tokenStorage.setTokens(data.access, refresh);
    return data.access;
}

/** POST /api/auth/token/verify/ */
export async function verifyToken(): Promise<boolean> {
    try {
        const token = tokenStorage.getAccess();
        if (!token) return false;
        await authHttp.post('auth/token/verify/', { token });
        return true;
    } catch {
        return false;
    }
}
