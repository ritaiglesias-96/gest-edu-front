import { Role } from '@/lib/definitions';
import { authRol } from '@/utils/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// TODO: Add the routes for each role
// const funcionarioPath = ['/funcionario', '/funcionario/*'];
// const estudiantePath = ['/estudiante', '/estudiante/*'];
// const administradorPath = ['/administrador', '/administrador/*'];
// const coordinadorPath = ['/coordinador', 'coordinador/*'];

const publicRoutes = ['/ingresar', '/registrarse', '/resetPass', '/'];

export default function middleware(req: NextRequest) {
  // req.cookies.delete('token');
  const rol = authRol();
  //console.log(rol);
  const isLoggedIn = rol !== Role.public;
  //console.log(isLoggedIn);

  if (!isLoggedIn && !publicRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else if (req.nextUrl.pathname === '/logout') {
    return NextResponse.next();
  } else {
    if (
      rol === Role.estudiante &&
      !req.nextUrl.pathname.includes('estudiante')
    ) {
      const absoluteURL = new URL('/estudiante', req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else if (
      rol === Role.coordinador &&
      !req.nextUrl.pathname.includes('coordinador')
    ) {
      console.log('redirecting');

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
