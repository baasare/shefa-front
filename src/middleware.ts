import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (['app.shefafx.com', 'www.shefafx.com'].includes(request.nextUrl.hostname)) {
    const url = request.nextUrl.clone();
    url.hostname = 'shefafx.com';
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
