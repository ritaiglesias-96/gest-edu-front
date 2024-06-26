export const initialState = { message: '', errors: {} };

export enum Role {
  estudiante = 'ROL_ESTUDIANTE',
  funcionario = 'ROL_FUNCIONARIO',
  coordinador = 'ROL_COORDINADOR',
  admin = 'ROL_ADMINISTRADOR',
  public = 'public',
}

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type RegisterState = {
  errors?: {
    nombre?: string[];
    apellido?: string[];
    email?: string[];
    ci?: string[];
    fechaNac?: string[];
    domicilio?: string[];
    telefono?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export type RegisterUserState = {
  errors?: {
    nombre?: string[];
    apellido?: string[];
    email?: string[];
    password?: string[];
    ci?: string[];
    fechaNac?: string[];
    domicilio?: string[];
    telefono?: string[];
    confirmPassword?: string[];
    tipoUsuario?: string[];
  };
  message?: string | null;
};

export type ResetPassState = {
  errors?: {
    email?: string[];
  };
  message?: string | null;
};

export type CambiarPassState = {
  errors?: {
    password?: string[];
    confirmPassword?: string[];
    tokenPassword?: string[];
  };
  message?: string | null;
};

export type CarreraState = {
  errors?: {
    nombre?: string[];
    descripcion?: string[];
    carreraId?: string[];
  };
  message?: string | null;
};

export type EditarPerfilState = {
  errors?: {
    telefono?: string[];
    domicilio?: string[];
    imagen?: string[];
  };
  message?: string | null;
};

export type AsignaturaState = {
  errors?: {
    nombre?: string[];
    descripcion?: string[];
    creditos?: string[];
    asignaturaId?: string[];
    carreraId?: string[];
  };
  message?: string | null;
};

export type DocenteState = {
  errors?: {
    nombre?: string[];
    apellido?: string[];
    documento?: string[];
  };
  message?: string | null;
};

export type User = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  role: Role;
  imagen: string;
  fechaNac: string;
  ci: string;
  telefono: string;
  domicilio: string;
};

export const emptyUser: User = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  role: Role.estudiante,
  imagen: '',
  fechaNac: '',
  ci: '',
  telefono: '',
  domicilio: '',
};

export type Carrera = {
  id: number;
  nombre: string;
  descripcion: string;
  duracionAnios: number;
  creditos: number;
  existePlanEstudio: boolean;
};

export type Asignatura = {
  id: number;
  nombre: string;
  descripcion: string;
  creditos: number;
  carreraId: number;
  semestrePlanEstudio: number;
};

export type PeriodoExamenState = {
  errors?: {
    fechaInicio?: string[];
    fechaFin?: string[];
    carreraId?: string[];
  };
  message?: string | null;
};

export type Estudiante = {
  id: number;
  ci: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  domicilio: string;
  fechaNac?: string;
  imagen?: string;
};

export type Examen = {
  id: number;
  fecha: Date;
  diasPrevInsc: string;
  estado: string;
  asignatura: {
    id: number;
    nombre: string;
    descripcion: string;
    creditos: number;
    semestrePlanEstudios: number;
    carreraId: number;
  };
  docentes: [];
};
export type Curso = {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  diasPrevInsc: number;
  estado: string;
  asignaturaId: number;
  docenteId: number;
};

export type CursoAsignatura = {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  diasPrevInsc: number;
  estado: string;
  asignaturaId: number;
  nombreAsignatura: string;
  docenteId: number;
};

export type HorarioCurso = {
  id: number;
  dia: string;
  horaFin: string;
  horaInicio: string;
};

export type FechaExamenState = {
  errors?: {
    fecha?: string[];
    diasPrevInsc?: number;
    asignaturaId?: string;
    docentes?: number[];
  };
  message?: string | null;
};

export type Docente = {
  id: number;
  documento: string;
  nombre: string;
  apellido: string;
};

export interface Usuario {
  id: number;
  ci: string;
  nombre: string;
  apellido: string;
  email: string;
}

export interface InscripcionCarreraPendiente {
  id: number;
  motivoRechazo: string;
  estado: string;
  fechaActualizacion: string;
  fechaCreacion: string;
  tipo: string;
  nombreCarrera: string;
  usuarioSolicitante: Usuario;
  usuarioResponsable: Usuario;
}

export type Calificacion = {
  estudianteId: string;
  calificacionCurso: string;
};

export type CalificacionExamen = {
  estudianteId: string;
  calificacion: string;
};
export type CarreraAsignaturas = {
  carrera: Carrera;
  asignaturas: Asignatura[];
};

export interface InscripcionCarreraPendienteFlattened {
  id: number;
  motivoRechazo: string;
  estado: string;
  fechaActualizacion: string;
  fechaCreacion: string;
  tipo: string;
  nombreCarrera: string;
  usuarioSolicitanteId: number;
  usuarioSolicitanteCi: string;
  usuarioSolicitanteNombre: string;
  usuarioSolicitanteApellido: string;
  usuarioSolicitanteEmail: string;
  usuarioResponsable: any;
}

export interface SolicitudTitulo {
  id: number;
  carreraId: string;
  creditosAprobados: string;
  motivoRechazo: string;
  estado: string;
  fechaActualizacion: string;
  fechaCreacion: string;
  tipo: string;
  nombreCarrera: string;
  usuarioResponsable: any;
  usuarioSolicitante: {
    id: number;
    ci: string;
    nombre: string;
    apellido: string;
    email: string;
  };
}

export interface ExamenFlattened {
  id: number;
  fecha: string;
  diasPrevInsc: string;
  estado: string;
  idAsignatura: number;
  nombreAsignatura: string;
  descripcionAsignatura: string;
  creditos: number;
  semestrePlanEstudios: number;
  carreraId: number;
  docentes: [];
}

export type Certificado = {
  id: number;
  carrera: string;
  codigoValidacion: string;
  fecha: string;
  estudiante: Estudiante;
};

export type TramiteEstudiante = {
  id: string;
  carreraId: string;
  nombreCarrera: string;
  tipo: string;
  motivoRechazo: string;
  estado: string;
  fechaCreacion: string;
  fechaActualizacion: string;
};

export type Certiticado = {
  id: string;
  carrera: string;
  codigoValidacion: string;
  fecha: string;
  estudiante: Estudiante;
};

export interface CursoHorario {
  cursoId: number;
  fechaInicio: string;
  fechaFin: string;
  diasPrevInsc: number;
  estado: string;
  asignaturaNombre: string;
  docenteNombre: string;
  docenteApellido: string;
  //horarios: HorarioCurso[];
}

export interface ActividadUsuario {
  id: number;
  fecha: string;
  tipoActividad: string;
  descripcion: string;
}

export type ActaExamen = {
  id: number;
  fecha: string;
  inscriptos: Estudiante[];
  asignaturaNombre: string;
  docentes: Docente[];
};

export type ActaCurso = {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  inscriptos: Estudiante[];
  asignaturaNombre: string;
  docente: Docente;
};

//Regex para CI ^[1-9][\.]?\d{3}[\.]?\d{3}[\.\-/_]?[1-9]
