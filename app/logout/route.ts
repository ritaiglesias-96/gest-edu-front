import { cookies } from 'next/headers';

export async function GET(request: Request) {
  cookies().delete('token');
  return Response.redirect(new URL('/', request.url));
}
