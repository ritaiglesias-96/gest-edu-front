'use client';
import React, { createContext, useEffect, useState } from 'react';
import { decodeJwt } from 'jose';
import { Role, initialState } from '@/lib/definitions';
import { LoginState, loginFetch, logoutFetch } from '@/lib/data/actions';
import { z } from 'zod';

const apiRoute = process.env.BACK_API;
// Define the shape of the session context

type Session = {
  jwt: string;
  email: string;
  rol: Role;
} | null;

interface SessionContextType {
  session: Session | null;
  login: (prevState: LoginState, formData: FormData) => Promise<LoginState>;
  logout: () => void;
}

// Create the session context
export const SessionContext = createContext<SessionContextType>({
  session: null,
  login: async (
    prevState: LoginState,
    formData: FormData
  ): Promise<LoginState> => {
    return initialState;
  },
  logout: () => {},
});

// Create a session provider component
export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session>(() => {
    if (typeof window !== 'undefined') {
      const savedSession = window.sessionStorage.getItem('session');
      return savedSession ? JSON.parse(savedSession) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (session) {
        window.sessionStorage.setItem('session', JSON.stringify(session));
      } else {
        window.sessionStorage.removeItem('session');
      }
    }
  }, [session]);

  const login = async (prevState: LoginState, formData: FormData) => {
    const SignInFormSchema = z.object({
      email: z
        .string({ required_error: 'Campo requerido' })
        .email({ message: 'Ingrese un correo valido' }),
      password: z
        .string({ required_error: 'Campo requerido' })
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    });
    const validatedFields = SignInFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to login User.',
      };
    } else {
      const response = await loginFetch(validatedFields.data);
      console.log(response);
      if (!response.status) {
        return {
          message: 'Fail to login User. Please check your credentials.',
        };
      } else {
        const { email, jwt } = response;
        const { roles } = decodeJwt(jwt);
        setSession({ email, jwt, rol: roles as Role });
        return {
          message: 'Inicio de sesion con exito. Welcome!',
        };
      }
    }
  };

  const logout = async () => {
    if (session === null) {
      setSession(null);
    } else {
      const response = await logoutFetch(session.jwt);
      console.log(response);
      if (response && response === 204) {
        setSession(null);
      }
    }
  };

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
