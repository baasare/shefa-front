/**
 * Notifications API Client
 * All notification-related API calls
 */

import axios from 'axios';
import { tokenStorage } from './authClient';

import { API_BASE } from './config';

const notificationsHttp = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});

// Attach access token to requests
notificationsHttp.interceptors.request.use((config) => {
    const token = tokenStorage.getAccess();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Notification {
    id: string;
    user: string;
    type: 'order_filled' | 'order_rejected' | 'strategy_alert' | 'agent_decision' | 'system';
    title: string;
    message: string;
    data: any;
    is_read: boolean;
    sent_via_email: boolean;
    sent_via_push: boolean;
    sent_via_sms: boolean;
    created_at: string;
}

// ─── Notification Management ──────────────────────────────────────────────────

/** GET /api/notifications/ */
export async function getNotifications(filters?: {
    is_read?: boolean;
    type?: string;
}): Promise<Notification[]> {
    const { data } = await notificationsHttp.get('notifications/', {
        params: filters
    });
    return data;
}

/** GET /api/notifications/{id}/ */
export async function getNotification(id: string): Promise<Notification> {
    const { data } = await notificationsHttp.get(`notifications/${id}/`);
    return data;
}

/** POST /api/notifications/ */
export async function createNotification(notification: Partial<Notification>): Promise<Notification> {
    const { data } = await notificationsHttp.post('notifications/', notification);
    return data;
}

/** PATCH /api/notifications/{id}/ */
export async function updateNotification(id: string, notification: Partial<Notification>): Promise<Notification> {
    const { data } = await notificationsHttp.patch(`notifications/${id}/`, notification);
    return data;
}

/** DELETE /api/notifications/{id}/ */
export async function deleteNotification(id: string): Promise<void> {
    await notificationsHttp.delete(`notifications/${id}/`);
}

/** POST /api/notifications/{id}/mark_read/ */
export async function markAsRead(id: string): Promise<Notification> {
    const { data } = await notificationsHttp.post(`notifications/${id}/mark_read/`);
    return data;
}

/** POST /api/notifications/mark_all_read/ */
export async function markAllAsRead(): Promise<void> {
    await notificationsHttp.post('notifications/mark_all_read/');
}

/** GET /api/notifications/unread/ */
export async function getUnreadNotifications(): Promise<Notification[]> {
    const { data } = await notificationsHttp.get('notifications/unread/');
    return data;
}
