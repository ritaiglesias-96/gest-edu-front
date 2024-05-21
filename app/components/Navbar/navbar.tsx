'use client';
import styles from './navbar.module.css';
import GestEduIcon from '@/assets/svg/logo-black-horizontal.svg';
import Login from '@/assets/svg/login.svg';
import Logout from '@/assets/svg/logout.svg';
import User from '@/assets/svg/user.svg';
import Hat from '@/assets/svg/school.svg';
import Pencil from '@/assets/svg/edit.svg';
import Link from 'next/link';
import { Role } from '@/lib/definitions';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../../context/SessionContext';

export default function Navbar() {
  const session = useContext(SessionContext);
  const [rol, setRol] = useState<Role>(Role.public);
  useEffect(() => {
    if (session.session) setRol(session.session?.rol);
    else setRol(Role.public);
  }, [session.session]);

  switch (rol) {
    case Role.admin:
      return <NavbarAdmin />;
    case Role.estudiante:
      return <NavbarEstudiante />;
    case Role.funcionario:
      return (
        <nav className={styles.navbar}>
          <Link href='/'>
            <GestEduIcon />
          </Link>
          <div className='flex flex-row gap-4'>
            <Link
              className='flex flex-col gap-1  text-wrap align-middle text-sm'
              href='/'
            >
              <User className='h-6 sm:w-auto' />
              <span>Perfil</span>
            </Link>
            <LogoutButton />
          </div>
        </nav>
      );
    case Role.coordinador:
      return (
        <nav className={styles.navbar}>
          <Link href='/'>
            <GestEduIcon />
          </Link>
          <LogoutButton />
        </nav>
      );
    default:
      return (
        <nav className={styles.navbar}>
          <Link href='/'>
            <GestEduIcon />
          </Link>
          <div className='flex flex-row gap-4'>
            <Link
              className='flex flex-col gap-1 text-wrap align-middle text-sm'
              href='/ingresar'
            >
              <Login className='h-6 w-auto self-center' />
              <span>Ingresar</span>
            </Link>
          </div>
        </nav>
      );
  }
}

function LogoutButton() {
  const session = useContext(SessionContext);
  return (
    <form action={session.logout}>
      <button className='flex flex-col gap-1 text-wrap align-middle text-sm'>
        <Logout className='h-auto sm:w-auto' />
        <span>Salir</span>
      </button>
    </form>
  );
}

// TODO navnar for coordinador and funcionario

function NavbarEstudiante() {
  return (
    <nav className={styles.navbar}>
      <Link href='/estudiante'>
        <GestEduIcon />
      </Link>
      <div className='flex flex-row gap-6'>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/estudiante/inscripciones'
        >
          <Pencil className='h-6 self-center sm:w-auto' />
          <span>Inscripciones</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/estudiante/perfil'
        >
          <User className='h-6 sm:w-auto' />
          <span>Perfil</span>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}

function NavbarAdmin() {
  return (
    <nav className={styles.navbar}>
      <Link href='/'>
        <GestEduIcon />
      </Link>
      <div className='flex flex-row gap-4'>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm active:color-bittersweet'
          href='/'
        >
          <Hat className='h-6 sm:w-auto' />
          <span>Perfil</span>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}

function NavbarCoordinador() {
  return (
    <nav className={styles.navbar}>
      <Link href='/'>
        <GestEduIcon />
      </Link>
      <div className='flex flex-row gap-4'>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/carreras'
        >
          <User className='h-6 sm:w-auto' />
          <span>Carreras</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/'
        >
          <User className='h-6 sm:w-auto' />
          <span>Perfil</span>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}
