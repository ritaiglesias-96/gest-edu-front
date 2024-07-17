'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Role } from '@/lib/definitions';

export type User = {
  id: number;
  ci: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  domicilio: string;
  fechaNac: string;
  imagen: string;
};

export type Session = {
  email: string;
  rol: Role;
  usuario: User;
};

export type Notificacion = {
  descripcion: string;
  fecha: string;
  id: number;
  leido: boolean;
  titulo: string;
};

interface SessionContextType {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  notifications: Notificacion[];
  setNotifications: Dispatch<SetStateAction<Notificacion[] | []>>;
  notReadNotifications: number;
  setNotReadNotifications: Dispatch<SetStateAction<number>>;
  usuario: User | null;
  setUsuario: Dispatch<SetStateAction<User | null>>;
}

// Create the session context
export const SessionCtx = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
  notifications: [],
  setNotifications: () => {},
  notReadNotifications: 0,
  setNotReadNotifications: () => {},
  usuario: null,
  setUsuario: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [notifications, setNotifications] = useState<Notificacion[] | []>([]);
  const [notReadNotifications, setNotReadNotifications] = useState<number>(0);
  const [usuario, setUsuario] = useState<User | null>(null);

  return (
    <SessionCtx.Provider
      value={{
        session,
        setSession,
        notifications,
        setNotifications,
        notReadNotifications,
        setNotReadNotifications,
        usuario,
        setUsuario,
      }}
    >
      {children}
    </SessionCtx.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionCtx);
};
