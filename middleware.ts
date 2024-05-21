import { Role } from '@/lib/definitions';
import { authRol } from '@/utils/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const funcionarioPath = ['/funcionario', '/funcionario/*'];
const estudiantePath = ['/estudiante', '/estudiante/*'];
const administradorPath = ['/administrador', '/administrador/*'];
const coordinadorPath = ['/coordinador', '/coordinador/*'];

const protectedRoutes = [
  ...funcionarioPath,
  ...estudiantePath,
  ...administradorPath,
  ...coordinadorPath,
];

const publicRoutes = ['/ingresar', '/estudiante/registrar', '/resetPass'];

export default function middleware(req: NextRequest) {
  // req.cookies.delete('token');
  const rol = authRol();
  const isLoggedIn = rol !== Role.public;

  if (
    !isLoggedIn &&
    protectedRoutes.includes(req.nextUrl.pathname) &&
    !publicRoutes.includes(req.nextUrl.pathname)
  ) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else {
    if (
      rol === Role.estudiante &&
      !req.nextUrl.pathname.includes('estudiante')
    ) {
      const absoluteURL = new URL('/estudiante', req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else if (
      rol === Role.coordinador &&
      !coordinadorPath.includes(req.nextUrl.pathname)
    ) {
      const absoluteURL = new URL('/coordinador', req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else if (
      rol === Role.funcionario &&
      !funcionarioPath.includes(req.nextUrl.pathname)
    ) {
      const absoluteURL = new URL('/funcionario', req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else if (
      rol === Role.admin &&
      !administradorPath.includes(req.nextUrl.pathname)
    ) {
      const absoluteURL = new URL('/administrador', req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
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
