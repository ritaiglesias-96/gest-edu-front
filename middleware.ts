import { Role } from '@/lib/definitions';
import { authRol, isAuthenticated } from '@/utils/auth';
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
  if (
    !isAuthenticated &&
    protectedRoutes.includes(req.nextUrl.pathname) &&
    !publicRoutes.includes(req.nextUrl.pathname)
  ) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else {
    const rol = authRol();
    if (
      rol === Role.estudiante &&
      !estudiantePath.includes(req.nextUrl.pathname)
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
