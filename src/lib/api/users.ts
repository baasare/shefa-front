import client from './client';

export interface UserProfile {
  investment_goals?: string;
  time_horizon?: string;
  preferred_asset_classes?: string[];
  timezone: string;
  default_paper_trading: boolean;
  max_daily_loss_pct: string;
  max_position_size_pct: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string;
  risk_tolerance: 'conservative' | 'moderate' | 'aggressive';
  experience_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  mfa_enabled: boolean;
  approval_threshold: string;
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  profile?: UserProfile;
}

export interface UpdateUserData {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  risk_tolerance?: 'conservative' | 'moderate' | 'aggressive';
  experience_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  approval_threshold?: string;
  email_notifications?: boolean;
  push_notifications?: boolean;
  sms_notifications?: boolean;
  profile?: {
    timezone?: string;
    default_paper_trading?: boolean;
    investment_goals?: string;
    time_horizon?: string;
    preferred_asset_classes?: string[];
    max_daily_loss_pct?: string;
    max_position_size_pct?: string;
    avatar_url?: string;
    bio?: string;
  };
}

export interface UpdateProfileData {
  investment_goals?: string;
  time_horizon?: string;
  preferred_asset_classes?: string[];
  timezone?: string;
  default_paper_trading?: boolean;
  max_daily_loss_pct?: string;
  max_position_size_pct?: string;
  avatar_url?: string;
  bio?: string;
}

/**
 * Get current user profile
 */
export async function getUserProfile(): Promise<User> {
  const response = await client.get<User>('/auth/profile/');
  return response.data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(data: UpdateUserData): Promise<User> {
  const response = await client.patch<User>('/auth/profile/update/', data);
  return response.data;
}

/**
 * Delete user account
 */
export async function deleteAccount(): Promise<{ message: string }> {
  const response = await client.delete<{ message: string }>('/auth/delete-account/');
  return response.data;
}

/**
 * Get active sessions
 */
export async function getActiveSessions(): Promise<{
  active_sessions_count: number;
  sessions: Array<{
    session_key: string;
    expire_date: string;
    is_current: boolean;
    device: string;
    browser: string;
    os: string;
    location: string;
    ip_address: string;
  }>;
}> {
  const response = await client.get('/auth/active-sessions/');
  return response.data;
}

/**
 * Change password
 */
export async function changePassword(data: {
  old_password: string;
  new_password1: string;
  new_password2: string;
}): Promise<{ detail: string }> {
  const response = await client.post<{ detail: string }>('/auth/password/change/', data);
  return response.data;
}

/**
 * Revoke a session
 */
export async function revokeSession(sessionKey: string): Promise<{ message: string }> {
  const response = await client.post<{ message: string }>('/auth/revoke-session/', {
    session_key: sessionKey
  });
  return response.data;
}
