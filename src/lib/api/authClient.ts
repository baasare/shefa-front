/**
 * Auth API Client
 * Isolated module for all authentication API calls.
 * Uses the centralized API client for consistency.
 */

import apiClient from './client';
import axios from 'axios';
import { API_BASE } from './config';

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
    const { data } = await apiClient.post<AuthResponse>('auth/login/', credentials);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
}

/** POST /api/auth/registration/ */
export async function register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('auth/registration/', userData);
    tokenStorage.setTokens(data.access, data.refresh);
    return data;
}

/** POST /api/auth/logout/ */
export async function logout(): Promise<void> {
    try {
        await apiClient.post('auth/logout/', { refresh: tokenStorage.getRefresh() });
    } finally {
        tokenStorage.clearTokens();
    }
}

/** POST /api/auth/password/reset/ */
export async function requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('auth/password/reset/', { email });
}

/** POST /api/auth/password/reset/confirm/ */
export async function resetPassword(data: {
    uid: string;
    token: string;
    password: string;
    password_confirm: string;
}): Promise<void> {
    await apiClient.post('auth/password/reset/confirm/', data);
}

/** POST /api/auth/registration/verify-email/ */
export async function verifyEmail(key: string): Promise<void> {
    await axios.post(`${API_BASE}auth/registration/verify-email/`, { key }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

/** POST /api/auth/registration/resend-email/ */
export async function resendEmail(email: string): Promise<void> {
    await axios.post(`${API_BASE}auth/registration/resend-email/`, { email }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

/** GET /api/auth/profile/ */
export async function getCurrentUser(): Promise<any> {
    const { data } = await apiClient.get('auth/profile/');
    return data;
}

/** PATCH /api/auth/profile/update/ */
export async function updateProfile(profileData: any): Promise<any> {
    const { data } = await apiClient.patch('auth/profile/update/', profileData);
    return data;
}

/** POST /api/auth/password/change/ */
export async function changePassword(data: {
    old_password: string;
    new_password1: string;
    new_password2: string;
}): Promise<void> {
    await apiClient.post('auth/password/change/', data);
}

/** DELETE /api/auth/delete-account/ */
export async function deleteAccount(): Promise<void> {
    await apiClient.delete('auth/delete-account/');
    tokenStorage.clearTokens();
}

/** GET /api/auth/active-sessions/ */
export async function getActiveSessions(): Promise<any> {
    const { data } = await apiClient.get('auth/active-sessions/');
    return data;
}

/** POST /api/auth/token/refresh/ */
export async function refreshToken(): Promise<string> {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) throw new Error('No refresh token');
    const { data } = await apiClient.post('auth/token/refresh/', { refresh });
    tokenStorage.setTokens(data.access, refresh);
    return data.access;
}

/** POST /api/auth/token/verify/ */
export async function verifyToken(): Promise<boolean> {
    try {
        const token = tokenStorage.getAccess();
        if (!token) return false;
        await apiClient.post('auth/token/verify/', { token });
        return true;
    } catch {
        return false;
    }
}
