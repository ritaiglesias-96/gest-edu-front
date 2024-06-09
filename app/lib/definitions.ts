export const initialState = { message: '', errors: {} };

export const defaultImagen =
  'https://firebasestorage.googleapis.com/v0/b/gestedu2024.appspot.com/o/defaultUserImage.png?alt=media&token=72b03305-8f00-4aff-bde0-7964ab3046c0';

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

export type Curso = {
  asignaturaId: number;
  diasPrevInsc: number;
  docenteId: number;
  estado: string;
  fechaFin: string;
  fechaInicio: string;
};

export type HorarioCurso = {
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

//Regex para CI ^[1-9][\.]?\d{3}[\.]?\d{3}[\.\-/_]?[1-9]
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
export type Examen = {
  id: number;
  fecha: string;
  diasPrevInsc: number;
  asignaturaNombre: string;
  asignatura: Asignatura;
  docentes: Docente[];
}