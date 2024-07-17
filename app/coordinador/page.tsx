'use client';
import GestEduLogo from '@/assets/svg/logo-light-vertical.svg';
import { useSession } from '../../context/SessionContext';

export default function CoordinadorHome() {
  const { usuario } = useSession();
  return (
    <section>
      <div className='flex flex-1 flex-col items-center justify-center text-center'>
        {usuario?.nombre && (
          <h1 className='pt-6 text-ivory'>
            Bienvenid@ {usuario?.nombre + ' ' + usuario?.apellido}!
          </h1>
        )}
        <p className='pb-6 text-peach-yellow'>Coordinador</p>
        <GestEduLogo />
        <h4 className='text-md'>Administrador de gestión educativa</h4>
      </div>
    </section>
  );
}
