import { Role } from '@/lib/definitions';
import { authRol } from '@/utils/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/ingresar', '/registrarse', '/resetPass', '/'];

export default function middleware(req: NextRequest) {
  const rol = authRol();
  const isLoggedIn = rol !== Role.public;

  if (!isLoggedIn && !publicRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (req.nextUrl.pathname === '/logout') {
    return NextResponse.next();
  } else if (
    rol === Role.estudiante &&
    !req.nextUrl.pathname.includes('estudiante')
  ) {
    const absoluteURL = new URL('/estudiante', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (
    rol === Role.coordinador &&
    !req.nextUrl.pathname.includes('coordinador')
  ) {
    const absoluteURL = new URL('/coordinador', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (
    rol === Role.funcionario &&
    !req.nextUrl.pathname.includes('funcionario')
  ) {
    const absoluteURL = new URL('/funcionario', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (
    rol === Role.admin &&
    !req.nextUrl.pathname.includes('administrador')
  ) {
    const absoluteURL = new URL('/administrador', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
