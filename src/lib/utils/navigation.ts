/**
 * Navigation utilities - simplified without subdomain routing
 */

/**
 * Get the URL for a path - returns the path as-is since we're not using subdomains
 */
export function getNavigationUrl(path: string): string {
  return path;
}

/**
 * Check if we need a cross-subdomain redirect - always false now
 */
export function needsCrossSubdomainRedirect(path: string): boolean {
  return false;
}

export function navigateToAuthUrl(path: string): string {
  return path;
}
