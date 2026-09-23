/**
 * Token storage utilities using localStorage
 */

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Token storage using localStorage
 */
export const tokenStorage = {
  getAccess: (): string | null => {
    if (typeof window === 'undefined') return null;
    const value = localStorage.getItem(ACCESS_TOKEN_KEY);
    return value && value !== 'undefined' && value !== 'null' ? value : null;
  },

  getRefresh: (): string | null => {
    if (typeof window === 'undefined') return null;
    const value = localStorage.getItem(REFRESH_TOKEN_KEY);
    return value && value !== 'undefined' && value !== 'null' ? value : null;
  },

  setTokens: (access: string, refresh: string): void => {
    if (typeof window === 'undefined') return;
    if (!access || !refresh) throw new Error('The server did not return a valid session. Please sign in again.');
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },

  clearTokens: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  /**
   * No-op for backwards compatibility
   */
  migrateFromLocalStorage: (): void => {
    // No migration needed - already using localStorage
  },
};
