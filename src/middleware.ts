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

  // Check if path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isOnboardingPath = onboardingPaths.some((path) => pathname.startsWith(path));

  // Allow public paths
  if (isPublicPath && !isProtectedPath) {
    return NextResponse.next();
  }

  // Allow auth paths (protection handled client-side via AuthInitializer)
  if (isAuthPath) {
    return NextResponse.next();
  }

  // Allow protected paths (protection handled client-side via dashboard layout)
  // This is necessary because we store tokens in localStorage, not cookies
  // Server-side middleware can't access localStorage
  if (isProtectedPath || isOnboardingPath) {
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
