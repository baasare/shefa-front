/**
 * Next.js Middleware for Route Protection
 * Handles authentication checks and redirects
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const publicPaths = [
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

// Auth routes (redirect to dashboard if already authenticated)
const authPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/confirm-email',
  '/callback',
];

// Dashboard routes requiring authentication
const protectedPaths = [
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
];

// Onboarding routes requiring authentication but not completion
const onboardingPaths = [
  '/welcome',
  '/risk-profile',
  '/connect-broker',
  '/create-portfolio',
  '/create-strategy',
  '/complete',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Skip subdomain logic for localhost
  const isLocalhost = hostname.startsWith('localhost') || hostname.startsWith('127.0.0.1');
  if (isLocalhost) {
    return NextResponse.next();
  }

  // Check subdomain
  const isAppSubdomain = hostname.startsWith('app.');
  const isMainDomain = hostname === 'shefafx.com' || hostname === 'www.shefafx.com';

  // Check if path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isOnboardingPath = onboardingPaths.some((path) => pathname.startsWith(path));

  // Main domain (shefafx.com) - only allow marketing pages
  if (isMainDomain && !isAppSubdomain) {
    // If accessing protected routes on main domain, redirect to app subdomain
    if (isProtectedPath || isOnboardingPath || isAuthPath) {
      const appUrl = new URL(request.url);
      appUrl.hostname = 'app.shefafx.com';
      return NextResponse.redirect(appUrl);
    }
    return NextResponse.next();
  }

  // App subdomain (app.shefafx.com) - only allow app pages
  if (isAppSubdomain) {
    // If accessing marketing pages on app subdomain, redirect to main domain
    if (isPublicPath && !isProtectedPath && !isAuthPath && !isOnboardingPath) {
      const mainUrl = new URL(request.url);
      mainUrl.hostname = 'shefafx.com';
      return NextResponse.redirect(mainUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
