import styles from './navbar.module.css';
import GestEduIcon from '@/assets/svg/logo-black-horizontal.svg';
import Login from '@/assets/svg/login.svg';
import Logout from '@/assets/svg/logout.svg';
import User from '@/assets/svg/user.svg';
import Pencil from '@/assets/svg/edit.svg';
import Link from 'next/link';
import { Role } from '@/lib/definitions';

export default function Navbar({ type }: { type: Role }): JSX.Element {
  switch (type) {
    case 'admin':
      return <NavbarAdmin />;
    case 'estudiante':
      return <NavbarEstudiante />;
    case 'funcionario':
      return (
        <nav className={styles.navbar}>
          <Link href='/'>
            <GestEduIcon />
          </Link>
          <div className='flex flex-row gap-4'>
            <Link
              className='flex flex-col gap-1  text-wrap align-middle text-sm'
              href={'/'}
            >
              <User className='h-6 sm:w-auto' />
              <span>Perfil</span>
            </Link>
            <LogoutButton />
          </div>
        </nav>
      );
      break;
    case 'coordinador':
      return (
        <nav className={styles.navbar}>
          <Link href='/'>
            <GestEduIcon />
          </Link>
          <LogoutButton />
        </nav>
      );
      break;
    default:
      return (
        <nav className={styles.navbar}>
          <Link href='/'>
            <GestEduIcon />
          </Link>
          <div className='flex flex-row gap-4'>
            <Link
              className='flex flex-col gap-1 text-wrap align-middle text-sm'
              href={'/ingresar'}
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
  return (
    <form
    // action={} TODO add logout action
    >
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
          href={'/estudiante/inscripciones'}
        >
          <Pencil className='h-6 self-center sm:w-auto' />
          <span>Inscripciones</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href={'/estudiante/perfil'}
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
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href={'/'}
        >
          <User className='h-6 sm:w-auto' />
          <span>Perfil</span>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}
