import { Role } from '@/lib/definitions';
import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';

export const isAuthenticated = () => {
  const cookie = cookies().get('token');
  return !!(cookie && cookie.value !== '');
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

export const authMail = () => {
  const cookie = cookies().get('token');
  if (cookie && cookie.value !== '') {
    const { sub } = decodeJwt(cookie.value);
    return sub as string;
  } else {
    return '';
  }
};

export const authToken = () => {
  const cookie = cookies().get('token');

  return cookie && cookie.value !== '' ? cookie.value : '';
};
