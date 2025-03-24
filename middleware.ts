import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with /admin and is not the login page
  if (pathname.startsWith('/admin') && pathname !== '/admin-login') {
    const token = await getToken({ req: request });

    // Redirect to login if not authenticated or not an admin
    if (!token || token.role !== 'admin') {
      const url = new URL('/admin-login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
