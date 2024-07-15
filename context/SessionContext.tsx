'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Role } from '@/lib/definitions';

export type Session = {
  email: string;
  rol: Role;
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
}

// Create the session context
export const SessionCtx = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
  notifications: [],
  setNotifications: () => {},
  notReadNotifications: 0,
  setNotReadNotifications: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [notifications, setNotifications] = useState<Notificacion[] | []>([]);
  const [notReadNotifications, setNotReadNotifications] = useState<number>(0);

  return (
    <SessionCtx.Provider
      value={{
        session,
        setSession,
        notifications,
        setNotifications,
        notReadNotifications,
        setNotReadNotifications,
      }}
    >
      {children}
    </SessionCtx.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionCtx);
};
