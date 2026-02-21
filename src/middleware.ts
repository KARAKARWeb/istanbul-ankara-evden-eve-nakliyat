import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Karakar route'ları koru
  if (pathname.startsWith('/karakar')) {
    // Login sayfası hariç
    if (pathname === '/karakar/login') {
      return NextResponse.next();
    }
    
    // Session kontrolü
    const session = request.cookies.get('dashboard-session');
    
    if (!session) {
      return NextResponse.redirect(new URL('/karakar/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/karakar/:path*',
};
