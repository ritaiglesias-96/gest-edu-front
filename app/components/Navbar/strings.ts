export type IconName =
  | 'GestEduIcon'
  | 'List'
  | 'Calendar'
  | 'Users'
  | 'Lessons'
  | 'User'
  | 'Logout'
  | 'Login'
  | 'Hat'
  | 'Pencil'
  | 'Done'
  | 'Menu'
  | 'Rule'
  | 'Grading'
  | 'UserAdd';

export type NavLink = {
  href: string;
  iconName: string;
  label: string;
};

export type NavSection = {
  links: NavLink[];
};

export type Strings = {
  navEstudiante: NavSection;
  navFuncionario: NavSection;
  navCoordinador: NavSection;
  navAdmin: NavSection;
  navPublic: NavSection;
};

export const strings = {
  navEstudiante: {
    links: [
      {
        href: '/estudiante/instructivos',
        iconName: 'Rule',
        label: 'Instructivos',
      },
      {
        href: '',
        iconName: 'Grading',
        label: 'Consultar',
      },
      {
        href: '',
        iconName: '',
        label: '',
      },
      {
        href: '/estudiante/pendientes',
        iconName: 'Calendar',
        label: 'Asignaturas pendientes',
      },
      { href: '/estudiante/horarios', iconName: 'Calendar', label: 'Horarios' },
      { href: '/estudiante/tramites', iconName: 'Book', label: 'Tramites' },
      {
        href: '',
        iconName: '',
        label: '',
      },
      {
        href: '/estudiante/solicitudes',
        iconName: 'Lessons',
        label: 'Solicitudes',
      },
      {
        href: '/estudiante/inscripciones',
        iconName: 'Pencil',
        label: 'Inscripciones',
      },
      { href: '/estudiante/perfil', iconName: 'User', label: 'Perfil' },
      { href: '/', iconName: 'Logout', label: 'Salir' },
    ],
  },
  navFuncionario: {
    links: [
      { href: '/funcionario/perfil', iconName: 'User', label: 'Perfil' },
      {
        href: '/funcionario/estudiantes',
        iconName: 'Users',
        label: 'Estudiantes',
      },
      { href: '/funcionario/docentes', iconName: 'Users', label: 'Docentes' },
      {
        href: '/funcionario/calendario',
        iconName: 'Calendar',
        label: 'Calendario',
      },
      {
        href: '/funcionario/inscripciones',
        iconName: 'Lessons',
        label: 'Inscripciones',
      },
      { href: '/funcionario/actas', iconName: 'List', label: 'Actas' },
      {
        href: '',
        iconName: 'Lessons',
        label: 'Calificaciones',
      },
      { href: '', iconName: '', label: '' },
      {
        href: '/funcionario/calificaciones/cursos',
        iconName: 'Grading',
        label: 'Cursos',
      },
      {
        href: '/funcionario/calificaciones/examenes',
        iconName: 'Grading',
        label: 'Examenes',
      },
      { href: '', iconName: '', label: '' },
      { href: '/', iconName: 'Logout', label: 'Salir' },
    ],
  },
  navCoordinador: {
    links: [
      { href: '/coordinador/tramites', iconName: 'Rule', label: 'Tramites' },
      { href: '/coordinador/carreras', iconName: 'Hat', label: 'Carreras' },
      { href: '/coordinador/perfil', iconName: 'User', label: 'Perfil' },
      { href: '/', iconName: 'Logout', label: 'Salir' },
    ],
  },
  navAdmin: {
    links: [
      { href: '/administrador/usuarios', iconName: 'Users', label: 'Usuarios' },
      { href: '/administrador/perfil', iconName: 'User', label: 'Perfil' },
      { href: '/', iconName: 'Logout', label: 'Salir' },
    ],
  },
  navPublic: {
    links: [
      { href: '/ingresar', iconName: 'Login', label: 'Iniciar Sesión' },
      { href: '/certificado', iconName: 'Done', label: 'Validar certificado' },
      { href: '/registrarse', iconName: 'UserAdd', label: 'Registrarse' },
    ],
  },
} as Strings;
