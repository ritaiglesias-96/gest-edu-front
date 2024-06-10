import { cookies } from 'next/headers';

export async function GET(request: Request) {
  cookies().delete('token');
  console.log('token', cookies().get('token'));
  return Response.redirect(new URL('/', request.url), 302);
}
