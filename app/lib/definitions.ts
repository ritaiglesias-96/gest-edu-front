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

//Regex para CI ^[1-9][\.]?\d{3}[\.]?\d{3}[\.\-/_]?[1-9]
