import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); 
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/', 
    '/movies', 
    '/tv-show', 
    '/my-list', 
    '/movies/[id]', 
    '/tv-show/[id]',
    '/search',
  ], };
