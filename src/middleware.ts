import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('jyanipur_session');
  const { pathname } = request.nextUrl;

  // Allow public access to the login page and the incoming CloudMailin webhook
  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth') || pathname.startsWith('/api/mail/incoming')) {
    return NextResponse.next();
  }

  // If no session cookie exists, redirect them to /login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};