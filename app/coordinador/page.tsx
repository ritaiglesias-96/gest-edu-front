'use client';

import { useEffect, useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { Role } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export default function CoordinadorHome() {
  const session = useContext(SessionContext);
  const router = useRouter();
  useEffect(() => {
    if (!session.session) {
      router.push('/');
    } else if (session.session?.rol !== Role.coordinador) {
      switch (session.session?.rol) {
        case Role.admin:
          router.push('/administrador');
          break;
        case Role.funcionario:
          router.push('/funcionario');
          break;
        case Role.estudiante:
          router.push('/estudiante');
          break;
        default:
          break;
      }
    }
  }, [router, session.session]);

  return <h1>Coordinador</h1>;
}
