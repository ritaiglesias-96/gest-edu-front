import { Role } from '@/lib/definitions';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';

export const isAuthenticated = () => {
  const cookie = cookies().get('token');
  return cookie && cookie.value !== '' ? true : false;
};

export const authRol = () => {
  const cookie = cookies().get('token');
  if (cookie && cookie.value !== '') {
    const { roles } = decodeJwt(cookie.value);
    return roles as Role;
  } else {
    return Role.public;
  }
};

export const authToken = () => {
  const cookie = cookies().get('token');

  return cookie && cookie.value !== '' ? cookie.value : '';
};
