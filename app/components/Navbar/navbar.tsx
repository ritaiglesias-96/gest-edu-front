'use client';
import styles from './navbar.module.css';
import { createTheme, styled } from '@mui/material/styles';
import GestEduIcon from '@/assets/svg/logo-black-horizontal.svg';
import Login from '@/assets/svg/login.svg';
import Logout from '@/assets/svg/logout.svg';
import Close from '@/assets/svg/close.svg';
import User from '@/assets/svg/user.svg';
import Users from '@/assets/svg/people.svg';
import UserAdd from '@/assets/svg/user-add.svg';
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
import {
  Drawer,
  IconButton,
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  ThemeProvider,
  Menu,
  MenuItem,
  Box,
  Modal,
} from '@mui/material';
import { logoutFetch } from '@/lib/data/actions';
import { marcarComoLeida } from '@/lib/data/estudiante/actions';
import {
  Session,
  useSession,
  Notificacion,
} from '../../../context/SessionContext';
import { IconName, NavSection, strings } from './strings';
import FcmTokenComp from '@/utils/hooks/firebaseForeground';
import { Notifications } from '@mui/icons-material';
import Button from '../Button/button';
import { convertirFecha, formatText } from '@/utils/utils';

const theme = createTheme({
  palette: {
    primary: {
      main: '#802c2c',
    },
  },
  components: {
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#ff9362',
          color: 'black',
        },
      },
    },
  },
});

const drawerWidth = 240;
const ITEM_HEIGHT = 48;

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

function DrawerNavbarStudent(sectionLinks: NavSection) {
  const context = useSession();
  const notifications: Notificacion[] = context.notifications;
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<Notificacion>(
    {} as Notificacion
  );
  const openNotifications = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openNotification = ({
    titulo,
    descripcion,
    fecha,
    leido,
    id,
  }: Notificacion) => {
    const formattedTitulo = formatText(titulo);
    const formattedDescripcion = formatText(descripcion);
    setModalContent({
      titulo: formattedTitulo,
      descripcion: formattedDescripcion,
      fecha,
      leido,
      id,
    });
    setModalOpen(true);
  };

  const marcarNotificacionLeida = (id: number) => {
    const fetch = async () => {
      const response = await marcarComoLeida(id);
      if (response) {
        const newNotifications = notifications.map((notificacion) => {
          if (notificacion.id === id) {
            notificacion.leido = true;
          }
          return notificacion;
        });
        context.setNotifications(newNotifications);
        context.setNotReadNotifications(
          context.notReadNotifications - 1 > 0
            ? context.notReadNotifications - 1
            : 0
        );
        setModalOpen(false);
      }
    };
    fetch();
  };

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
    <ThemeProvider theme={theme}>
      <nav className={styles.navbar}>
        <FcmTokenComp />
        <Link href='/'>
          <GestEduIcon />
        </Link>
        <span>
          <IconButton
            aria-label='notificatons'
            id='long-button'
            aria-controls={openNotifications ? 'long-menu' : undefined}
            aria-expanded={openNotifications ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
          >
            <Badge badgeContent={context.notReadNotifications}>
              <Notifications color='primary' />
            </Badge>
          </IconButton>
          <IconButton
            aria-label='open drawer'
            edge='end'
            onClick={() => handleDrawerOpen()}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon className='h-6 self-center fill-garnet sm:w-auto' />
          </IconButton>
        </span>
        <Menu
          id='long-menu'
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          slotProps={{ paper: { sx: { maxWidth: '60%' } } }}
          anchorEl={anchorEl}
          open={openNotifications}
          onClose={handleClose}
        >
          {notifications.map(({ titulo, descripcion, fecha, leido, id }) =>
            !leido ? (
              <MenuItem
                key={id}
                sx={{ alignItems: 'flex-start' }}
                className='flex flex-col'
                onClick={() =>
                  openNotification({ titulo, descripcion, fecha, leido, id })
                }
              >
                <span className='font-bold'>{formatText(titulo)}</span>
                {convertirFecha(fecha)}
              </MenuItem>
            ) : (
              <MenuItem
                key={id}
                sx={{ alignItems: 'flex-start' }}
                className='flex flex-col'
                onClick={() =>
                  openNotification({ titulo, descripcion, fecha, leido, id })
                }
              >
                <span>{formatText(titulo)}</span>
                {convertirFecha(fecha)}
              </MenuItem>
            )
          )}
        </Menu>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'fit-content',
              bgcolor: 'ivory',
              borderRadius: 15,
              boxShadow: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 2,
              p: 4,
            }}
          >
            <p>{convertirFecha(modalContent.fecha)}</p>
            <h3>{modalContent.titulo}</h3>
            <p>{modalContent.descripcion}</p>

            {!modalContent.leido && (
              <Button
                styling='primary'
                onClick={() => marcarNotificacionLeida(modalContent.id)}
              >
                Marcar como leído
              </Button>
            )}
            <Button styling='secondary' onClick={() => setModalOpen(false)}>
              Cerrar
            </Button>
          </Box>
        </Modal>
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
            {sectionLinks.links.map(({ href, iconName, label }, index) =>
              href === '' && label === '' && iconName === '' ? (
                <Divider key={'divider-' + index} />
              ) : (
                <ListItem
                  key={label}
                  disablePadding={href === '' && label !== 'Salir'}
                  alignItems={
                    href === '' && label !== 'Salir' ? 'center' : 'flex-start'
                  }
                >
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
              )
            )}
          </List>
        </Drawer>
      </nav>
    </ThemeProvider>
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
          {sectionLinks.links.map(({ href, iconName, label }, index) =>
            href === '' && label === '' && iconName === '' ? (
              <Divider key={'divider-' + index} />
            ) : (
              <ListItem
                key={label}
                disablePadding={href === '' && label !== 'Salir'}
                alignItems={
                  href === '' && label !== 'Salir' ? 'center' : 'flex-start'
                }
              >
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
            )
          )}
        </List>
      </Drawer>
    </nav>
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
    UserAdd: <UserAdd className='h-6 self-center sm:w-auto' />,
  };

  return icons[name] || null;
}
