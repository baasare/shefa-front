/**
 * Navigation utilities for handling subdomain-based routing
 */

/**
 * Get the full URL for a path based on the current environment
 * @param path - The path to navigate to (e.g., '/dashboard', '/login')
 * @returns Full URL with appropriate subdomain
 */
export function getNavigationUrl(path: string): string {
  // In development, use relative paths
  if (process.env.NODE_ENV === 'development') {
    return path;
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

  // Marketing pages (should be on main domain)
  const marketingPaths = ['/', '/features', '/pricing', '/about', '/blog', '/contact', '/demo', '/waitlist', '/legal'];
  const isMarketingPath = marketingPaths.some(p => path === p || path.startsWith(p + '/'));

  // Auth pages (can be on either domain, but redirect to app after login)
  const authPaths = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email', '/confirm-email', '/callback'];
  const isAuthPath = authPaths.some(p => path === p || path.startsWith(p + '/'));

  // App pages (dashboard, portfolio, etc.)
  const appPaths = ['/dashboard', '/portfolio', '/strategies', '/agents', '/orders', '/approvals', '/market', '/education', '/settings', '/notifications', '/help', '/welcome', '/risk-profile', '/connect-broker', '/create-portfolio', '/create-strategy', '/complete'];
  const isAppPath = appPaths.some(p => path === p || path.startsWith(p + '/'));

  // Determine the correct domain
  if (isMarketingPath) {
    // Marketing pages should be on main domain
    if (hostname.startsWith('app.')) {
      return `https://shefafx.com${path}`;
    }
    return path; // Already on main domain or localhost
  }

  if (isAppPath || isAuthPath) {
    // App and auth pages should be on app subdomain
    if (hostname === 'shefafx.com' || hostname === 'www.shefafx.com') {
      return `https://app.shefafx.com${path}`;
    }
    return path; // Already on app subdomain or localhost
  }

  // Default: return path as-is
  return path;
}

/**
 * Check if we need to do a full page redirect (cross-subdomain navigation)
 * @param path - The path to check
 * @returns true if cross-subdomain redirect is needed
 */
export function needsCrossSubdomainRedirect(path: string): boolean {
  if (process.env.NODE_ENV === 'development') {
    return false;
  }

  const url = getNavigationUrl(path);
  return url.startsWith('http');
}
