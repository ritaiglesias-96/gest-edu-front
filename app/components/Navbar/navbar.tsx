'use client';
import styles from './navbar.module.css';
import GestEduIcon from '@/assets/svg/logo-black-horizontal.svg';
import Login from '@/assets/svg/login.svg';
import Logout from '@/assets/svg/logout.svg';
import User from '@/assets/svg/user.svg';
import Users from '@/assets/svg/people.svg';
import Hat from '@/assets/svg/school.svg';
import Pencil from '@/assets/svg/edit.svg';
import Calendar from '@/assets/svg/calendar.svg';
import Lessons from '@/assets/svg/enroll-lesson.svg';
import Link from 'next/link';
import Rule from '@/assets/svg/rule.svg';
import { Role } from '@/lib/definitions';
import React, { useEffect } from 'react';
import Button from '../Button/button';
import { Menu, MenuItem } from '@mui/material';
import { logoutFetch } from '@/lib/data/actions';
import { Session, useSession } from '../../../context/SessionContext';

export default function Navbar({ rol, mail }: { rol: Role; mail: string }) {
  const context = useSession();

  useEffect(() => {
    context.setSession({ email: mail, rol: rol } as Session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mail]);

  switch (rol) {
    case Role.admin:
      return <NavbarAdmin />;
    case Role.estudiante:
      return <NavbarEstudiante />;
    case Role.funcionario:
      return <NavbarFuncionario />;
    case Role.coordinador:
      return <NavbarCoordinador />;
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
  return (
    <form action={() => logoutFetch()}>
      <button className='flex flex-col gap-1 text-wrap align-middle text-sm'>
        <Logout className='h-auto sm:w-auto' />
        <span>Salir</span>
      </button>
    </form>
  );
}

function NavbarEstudiante() {
  return (
    <nav className={styles.navbar}>
      <Link href='/estudiante'>
        <GestEduIcon />
      </Link>
      <div className='flex flex-row gap-6'>
        <MenuConsulta />
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/estudiante/solicitudes'
        >
          <Lessons className='h-6 self-center sm:w-auto' />
          <span>Solicitudes</span>
        </Link>
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
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/administrador/usuarios'
        >
          <Users className='h-6 w-auto self-center' />
          <span>Usuarios</span>
        </Link>
        <Link
          className='flex flex-col  gap-1 text-wrap align-middle text-sm'
          href='/administrador/perfil'
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
      <Link href='/coordinador'>
        <GestEduIcon />
      </Link>
      <div className='flex flex-row gap-4'>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/coordinador/tramites'
        >
          <Rule className='h-6 sm:w-auto' />
          <span>Tramites</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/coordinador/carreras'
        >
          <Hat className='h-6 sm:w-auto' />
          <span>Carreras</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/coordinador/perfil'
        >
          <User className='h-6 sm:w-auto' />
          <span>Perfil</span>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}

function NavbarFuncionario() {
  return (
    <nav className={styles.navbar}>
      <Link href='/'>
        <GestEduIcon />
      </Link>
      <div className='flex flex-row gap-4'>
        <MenuCalificaciones />
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/funcionario/calendario'
        >
          <Calendar className='h-6 sm:w-auto' />
          <span>Calendario</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/funcionario/estudiantes'
        >
          <Users className='h-6 w-auto self-center' />
          <span>Estudiantes</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/funcionario/inscripciones'
        >
          <Lessons className='h-6 sm:w-auto' />
          <span>Inscripciones</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/funcionario/docentes'
        >
          <Users className='h-6 w-auto self-center' />
          <span>Docentes</span>
        </Link>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/funcionario/perfil'
        >
          <User className='h-6 sm:w-auto' />
          <span>Perfil</span>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}

function MenuCalificaciones() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (opcion: string) => {
    if (opcion === 'cursos')
      window.location.href = `/funcionario/calificaciones/cursos`;
    else if (opcion === 'examenes')
      window.location.href = `/funcionario/calificaciones/examenes`;
    setAnchorEl(null);
  };

  return (
    <>
      <Button styling='link' onClick={handleClick}>
        <Lessons className='h-6 self-center sm:w-auto' />
        <span className='text-sm'>Calificaciones</span>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose('cursos')}>Cursos</MenuItem>
        <MenuItem onClick={() => handleClose('examenes')}>Examenes</MenuItem>
      </Menu>
    </>
  );
}

function MenuConsulta() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (opcion: string) => {
    if (opcion === 'pendientes') {
      window.location.href = `/estudiante/pendientes`;
    }
    if (opcion === 'horarios') {
      window.location.href = `/estudiante/horarios`;
    }
    if (opcion === 'tramites') {
      window.location.href = `/estudiante/tramites`;
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button styling='link' onClick={handleClick}>
        <Lessons className='h-6 self-center sm:w-auto' />
        <span className='text-sm'>Consultar</span>
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose('pendientes')}>
          Asignaturas pendientes
        </MenuItem>
        <MenuItem onClick={() => handleClose('horarios')}>Horarios</MenuItem>
        <MenuItem onClick={() => handleClose('tramites')}>Trámites</MenuItem>
      </Menu>
    </>
  );
}
