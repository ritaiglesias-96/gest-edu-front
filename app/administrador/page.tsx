'use client';

import { useEffect, useContext } from 'react';
import { SessionContext } from '../../context/SessionContext';
import { Role } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export default function EstudianteHome() {
  const session = useContext(SessionContext);
  const router = useRouter();
  useEffect(() => {
    if (!session.session) {
      router.push('/');
    } else if (session.session?.rol !== Role.admin) {
      switch (session.session?.rol) {
        case Role.estudiante:
          router.push('/estudiante');
          break;
        case Role.coordinador:
          router.push('/coordinador');
          break;
        case Role.funcionario:
          router.push('/funcionario');
          break;
        default:
          break;
      }
    }
  }, [router, session.session]);

  return (
    <section className=" text-ivory">
      <h1>Admin</h1>
    </section>
  );
}
