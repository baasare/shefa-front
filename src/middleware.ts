/**
 * Next.js Middleware for Route Protection
 * Handles authentication checks and redirects
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  getAppHostname,
  getMainHostname,
  getSiteSection,
  isAppHostname,
  isLocalDevelopmentHost,
  isMainHostname,
} from '@/lib/config/domain-routing';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;

  if (isLocalDevelopmentHost(hostname)) {
    return NextResponse.next();
  }

  const section = getSiteSection(pathname);

  if (isMainHostname(hostname)) {
    if (section === 'app') {
      const appUrl = new URL(request.url);
      appUrl.hostname = getAppHostname();
      return NextResponse.redirect(appUrl);
    }

    return NextResponse.next();
  }

  if (isAppHostname(hostname)) {
    if (section === 'marketing' || section === 'auth') {
      const mainUrl = new URL(request.url);
      mainUrl.hostname = getMainHostname();
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
