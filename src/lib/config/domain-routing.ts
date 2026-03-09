const DEFAULT_ROOT_DOMAIN = 'shefafx.com';
const DEFAULT_APP_SUBDOMAIN = 'app';

export const marketingPaths = [
  '/',
  '/features',
  '/pricing',
  '/about',
  '/blog',
  '/contact',
  '/demo',
  '/waitlist',
  '/legal',
  '/status',
  '/maintenance',
];

export const authPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/confirm-email',
  '/callback',
];

export const appPaths = [
  '/dashboard',
  '/portfolio',
  '/strategies',
  '/agents',
  '/orders',
  '/approvals',
  '/market',
  '/education',
  '/settings',
  '/notifications',
  '/help',
  '/admin',
  '/welcome',
  '/risk-profile',
  '/connect-broker',
  '/create-portfolio',
  '/create-strategy',
  '/complete',
];

export type SiteSection = 'marketing' | 'auth' | 'app' | 'other';

function stripQueryAndHash(path: string): string {
  const normalizedPath = path || '/';
  return normalizedPath.split(/[?#]/, 1)[0] || '/';
}

function matchesPath(path: string, candidates: string[]): boolean {
  const normalizedPath = stripQueryAndHash(path);

  return candidates.some((candidate) => {
    if (candidate === '/') {
      return normalizedPath === '/';
    }

    return normalizedPath === candidate || normalizedPath.startsWith(`${candidate}/`);
  });
}

export function isMarketingPath(path: string): boolean {
  return matchesPath(path, marketingPaths);
}

export function isAuthPath(path: string): boolean {
  return matchesPath(path, authPaths);
}

export function isAppPath(path: string): boolean {
  return matchesPath(path, appPaths);
}

export function getSiteSection(path: string): SiteSection {
  if (isAuthPath(path)) {
    return 'auth';
  }

  if (isAppPath(path)) {
    return 'app';
  }

  if (isMarketingPath(path)) {
    return 'marketing';
  }

  return 'other';
}

export function getRootDomain(): string {
  return (process.env.NEXT_PUBLIC_ROOT_DOMAIN || DEFAULT_ROOT_DOMAIN).trim().toLowerCase();
}

export function getAppSubdomain(): string {
  return (process.env.NEXT_PUBLIC_APP_SUBDOMAIN || DEFAULT_APP_SUBDOMAIN).trim().toLowerCase();
}

export function getMainHostname(): string {
  return getRootDomain();
}

export function getAppHostname(): string {
  return `${getAppSubdomain()}.${getRootDomain()}`;
}

export function normalizeHostname(hostname: string): string {
  return hostname.trim().toLowerCase().split(':')[0];
}

export function isLocalDevelopmentHost(hostname: string): boolean {
  const normalizedHostname = normalizeHostname(hostname);
  return (
    normalizedHostname === 'localhost' ||
    normalizedHostname === '127.0.0.1' ||
    normalizedHostname.endsWith('.localhost')
  );
}

export function isMainHostname(hostname: string): boolean {
  const normalizedHostname = normalizeHostname(hostname);
  const rootDomain = getRootDomain();
  return normalizedHostname === rootDomain || normalizedHostname === `www.${rootDomain}`;
}

export function isAppHostname(hostname: string): boolean {
  return normalizeHostname(hostname) === getAppHostname();
}

export function buildAbsoluteUrl(hostname: string, path: string, protocol = 'https'): string {
  return `${protocol}://${hostname}${path}`;
}

export function getNavigationUrlForHost(path: string, hostname: string): string {
  const normalizedHostname = normalizeHostname(hostname);

  if (!normalizedHostname || isLocalDevelopmentHost(normalizedHostname) || process.env.NODE_ENV === 'development') {
    return path;
  }

  const section = getSiteSection(path);

  if ((section === 'marketing' || section === 'auth') && isAppHostname(normalizedHostname)) {
    return buildAbsoluteUrl(getMainHostname(), path);
  }

  if (section === 'app' && isMainHostname(normalizedHostname)) {
    return buildAbsoluteUrl(getAppHostname(), path);
  }

  return path;
}
