'use client';
import styles from './navbar.module.css';
import { styled } from '@mui/material/styles';
import GestEduIcon from '@/assets/svg/logo-black-horizontal.svg';
import Login from '@/assets/svg/login.svg';
import Logout from '@/assets/svg/logout.svg';
import Close from '@/assets/svg/close.svg';
import User from '@/assets/svg/user.svg';
import Users from '@/assets/svg/people.svg';
import Hat from '@/assets/svg/school.svg';
import Pencil from '@/assets/svg/edit.svg';
import Calendar from '@/assets/svg/calendar.svg';
import Lessons from '@/assets/svg/enroll-lesson.svg';
import Done from '@/assets/svg/done.svg';
import Link from 'next/link';
import ListIcon from '@/assets/svg/list.svg';
import MenuIcon from '@/assets/svg/menu.svg';
import Rule from '@/assets/svg/rule.svg';
import Grading from '@/assets/svg/grading.svg';
import { Role } from '@/lib/definitions';
import React, { useEffect } from 'react';
import Button from '../Button/button';
import {
  Drawer,
  IconButton,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { logoutFetch } from '@/lib/data/actions';
import { Session, useSession } from '../../../context/SessionContext';
import { IconName, NavSection, strings } from './strings';
import FcmTokenComp from '@/utils/hooks/firebaseForeground';
import { usePathname } from 'next/navigation';

export default function Navbar({ rol, mail }: { rol: Role; mail: string }) {
  const context = useSession();
  useEffect(() => {
    context.setSession({ email: mail, rol: rol } as Session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mail]);

  switch (rol) {
    case Role.admin:
      return <DrawerNavbar links={strings.navAdmin['links']} />;
    case Role.estudiante:
      return <DrawerNavbarStudent links={strings.navEstudiante['links']} />;
    case Role.funcionario:
      return <DrawerNavbar links={strings.navFuncionario['links']} />;
    case Role.coordinador:
      return <DrawerNavbar links={strings.navCoordinador['links']} />;
    default:
      return <DrawerNavbar links={strings.navPublic['links']} />;
  }
}

function NavbarEstudiante() {
  return (
    <nav className={styles.navbar}>
      <Link href='/estudiante'>
        <GestEduIcon />
      </Link>
      <div className='flex flex-row gap-6'>
        <Link
          className='flex flex-col gap-1  text-wrap align-middle text-sm'
          href='/estudiante/instructivos'
        >
          <Rule className='h-6 self-center sm:w-auto' />
          <span>Instructivos</span>
        </Link>
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
      </div>
    </nav>
  );
}

function NavbarFuncionario() {
  return (
    <Drawer variant='permanent' anchor='left'>
      <List>
        {strings.navFuncionario.links.map(({ href, iconName, label }) =>
          href !== '' ? (
            <ListItem component={Link} href={href} key={href}>
              <ListItemIcon>{getIconByName(iconName as IconName)}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ) : null
        )}
        <MenuCalificaciones />
      </List>
    </Drawer>
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
        <Grading className='h-6 self-center sm:w-auto' />
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

function getIconByName(name: IconName): any {
  const icons: Record<IconName, any> = {
    GestEduIcon: <GestEduIcon className='w-6 self-center sm:h-auto' />,
    List: <ListIcon className='h-6 self-center sm:w-auto' />,
    Calendar: <Calendar className='h-6 self-center sm:w-auto' />,
    Users: <Users className='h-6 self-center sm:w-auto' />,
    Lessons: <Lessons className='h-6 self-center sm:w-auto' />,
    User: <User className='h-6 self-center sm:w-auto' />,
    Logout: <Logout className='h-6 self-center sm:w-auto' />,
    Login: <Login className='h-6 self-center sm:w-auto' />,
    Hat: <Hat className='h-6 self-center sm:w-auto' />,
    Pencil: <Pencil className='h-6 self-center sm:w-auto' />,
    Done: <Done className='h-6 self-center sm:w-auto' />,
    Menu: <MenuIcon className='h-6 self-center sm:w-auto' />,
    Rule: <Rule className='h-6 self-center sm:w-auto' />,
    Grading: <Grading className='h-6 self-center sm:w-auto' />,
  };

  return icons[name] || null;
}

function DrawerNavbarStudent(sectionLinks: NavSection) {
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));
  return (
    <nav className={styles.navbar}>
      <FcmTokenComp />
      <Link href='/'>
        <GestEduIcon />
      </Link>
      <IconButton
        aria-label='open drawer'
        edge='end'
        onClick={() => handleDrawerOpen()}
        sx={{ ...(open && { display: 'none' }) }}
      >
        <MenuIcon className='h-6 self-center fill-garnet sm:w-auto' />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: 'ivory',
          },
        }}
        variant='temporary'
        anchor='right'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <Close className='h-6 self-center sm:w-auto' />
          </IconButton>
        </DrawerHeader>
        <List>
          {sectionLinks.links.map(({ href, iconName, label }) => (
            <ListItem key={label} disablePadding>
              {href !== '' && label !== 'Salir' && (
                <ListItemButton href={href}>
                  <ListItemIcon>
                    {getIconByName(iconName as IconName)}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              )}
              {href === '' && label !== 'Salir' && (
                <ListItemText primary={label} />
              )}
              {label === 'Salir' && (
                <ListItemButton onClick={() => logoutFetch()}>
                  <ListItemIcon>
                    {getIconByName(iconName as IconName)}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
}

function DrawerNavbar(sectionLinks: NavSection) {
  const [open, setOpen] = React.useState(false);
  const drawerWidth = 240;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));
  return (
    <nav className={styles.navbar}>
      <Link href='/'>
        <GestEduIcon />
      </Link>
      <IconButton
        aria-label='open drawer'
        edge='end'
        onClick={() => handleDrawerOpen()}
        sx={{ ...(open && { display: 'none' }) }}
      >
        <MenuIcon className='h-6 self-center fill-garnet sm:w-auto' />
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: 'ivory',
          },
        }}
        variant='temporary'
        anchor='right'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <Close className='h-6 self-center sm:w-auto' />
          </IconButton>
        </DrawerHeader>
        <List>
          {sectionLinks.links.map(({ href, iconName, label }) => (
            <ListItem key={label} disablePadding>
              {href !== '' && label !== 'Salir' && (
                <ListItemButton href={href}>
                  <ListItemIcon>
                    {getIconByName(iconName as IconName)}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              )}
              {href === '' && label !== 'Salir' && (
                <ListItemText primary={label} />
              )}
              {label === 'Salir' && (
                <ListItemButton onClick={() => logoutFetch()}>
                  <ListItemIcon>
                    {getIconByName(iconName as IconName)}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </nav>
  );
}
