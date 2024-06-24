'use client';
import {
  Dispatch,
  PropsWithChildren,
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

interface SessionContextType {
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
}

// Create the session context
export const SessionCtx = createContext<SessionContextType>({
  session: null,
  setSession: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <SessionCtx.Provider value={{ session, setSession }}>
      {children}
    </SessionCtx.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionCtx);
};
