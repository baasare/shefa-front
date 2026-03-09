/**
 * Navigation utilities for handling host-based routing
 */

import {
  getNavigationUrlForHost,
  isAppPath,
  isLocalDevelopmentHost,
} from '@/lib/config/domain-routing';

function getHostname(): string {
  return typeof window !== 'undefined' ? window.location.hostname : '';
}

/**
 * Get the full URL for a path based on the current environment
 * @param path - The path to navigate to (e.g., '/dashboard', '/login')
 * @returns Full URL with appropriate subdomain
 */
export function getNavigationUrl(path: string): string {
  const hostname = getHostname();
  return getNavigationUrlForHost(path, hostname);
}

/**
 * Check if we need to do a full page redirect (cross-subdomain navigation)
 * @param path - The path to check
 * @returns true if cross-subdomain redirect is needed
 */
export function needsCrossSubdomainRedirect(path: string): boolean {
  const hostname = getHostname();
  if (!hostname || isLocalDevelopmentHost(hostname) || process.env.NODE_ENV === 'development') {
    return false;
  }

  const url = getNavigationUrl(path);
  return url.startsWith('http');
}

export function navigateToAuthUrl(path: string): string {
  return getNavigationUrl(path);
}
