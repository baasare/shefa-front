/**
 * Cookie utilities for cross-subdomain authentication
 * Tokens are stored in cookies with domain=.rootDomain so they're shared across subdomains
 */

import { getRootDomain, isLocalDevelopmentHost } from '@/lib/config/domain-routing';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Get the cookie domain for cross-subdomain sharing
 * Returns .shefafx.com in production, undefined for localhost
 */
function getCookieDomain(): string | undefined {
  if (typeof window === 'undefined') return undefined;

  const hostname = window.location.hostname;

  // Don't set domain for localhost - cookies work without it
  if (isLocalDevelopmentHost(hostname)) {
    return undefined;
  }

  // For production, use .rootDomain to share across subdomains
  return `.${getRootDomain()}`;
}

/**
 * Parse cookies from document.cookie string
 */
function parseCookies(): Record<string, string> {
  if (typeof document === 'undefined') return {};

  return document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Set a cookie with cross-subdomain support
 */
function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof document === 'undefined') return;

  const domain = getCookieDomain();
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const domainStr = domain ? `; Domain=${domain}` : '';

  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Expires=${expires}; SameSite=Lax${secure}${domainStr}`;
}

/**
 * Delete a cookie
 */
function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;

  const domain = getCookieDomain();
  const domainStr = domain ? `; Domain=${domain}` : '';

  // Delete with domain
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${domainStr}`;

  // Also delete without domain (for any cookies set before this change)
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

/**
 * Get a cookie value
 */
function getCookie(name: string): string | null {
  const cookies = parseCookies();
  return cookies[name] || null;
}

/**
 * Token storage using cookies for cross-subdomain support
 */
export const tokenStorage = {
  getAccess: (): string | null => getCookie(ACCESS_TOKEN_KEY),

  getRefresh: (): string | null => getCookie(REFRESH_TOKEN_KEY),

  setTokens: (access: string, refresh: string): void => {
    // Access token - shorter expiry (1 day, will be refreshed)
    setCookie(ACCESS_TOKEN_KEY, access, 1);
    // Refresh token - longer expiry (7 days)
    setCookie(REFRESH_TOKEN_KEY, refresh, 7);
  },

  clearTokens: (): void => {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);

    // Also clear localStorage for migration from old system
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  /**
   * Migrate tokens from localStorage to cookies (one-time migration)
   */
  migrateFromLocalStorage: (): void => {
    if (typeof localStorage === 'undefined') return;

    const accessFromStorage = localStorage.getItem('access_token');
    const refreshFromStorage = localStorage.getItem('refresh_token');

    // If we have tokens in localStorage but not in cookies, migrate them
    if (accessFromStorage && refreshFromStorage && !getCookie(ACCESS_TOKEN_KEY)) {
      setCookie(ACCESS_TOKEN_KEY, accessFromStorage, 1);
      setCookie(REFRESH_TOKEN_KEY, refreshFromStorage, 7);

      // Clear localStorage after migration
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },
};
