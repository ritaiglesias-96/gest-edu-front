import { cookies } from 'next/headers';

export async function GET(request: Request) {
  cookies().delete('token');
  console.log('token', cookies().get('token'));
  return new Response('Logged out', { status: 200 });
}