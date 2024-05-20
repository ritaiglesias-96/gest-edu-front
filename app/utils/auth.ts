import { Role } from '@/lib/definitions';

export const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const session = sessionStorage.getItem('session');

    if (session) {
      const { token } = JSON.parse(session);
      if (token) {
        return true;
      }
    }
  }
  return false;
};

export const authRol = () => {
  if (typeof window !== 'undefined') {
    const session = sessionStorage.getItem('session');
    if (session) {
      const { rol } = JSON.parse(session);
      if (rol) {
        return rol;
      }
    }
  }
  return Role.public;
};
