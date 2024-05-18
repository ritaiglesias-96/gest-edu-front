import { UUID } from 'crypto';

export const initialState = { message: '', errors: {} };

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
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

export type UserUpdate = {
  name: string;
  email: string;
  password: string;
  birthdate: Date;
  ci: string;
  image: string;
};

export enum Role {
  estudiante = 'ROL_ESTUDIANTE',
  funcionario = 'ROL_FUNCIONARIO',
  coordinador = 'ROL_COORDINADOR',
  admin = 'ROL_ADMINISTRADOR',
  public = 'public',
}

//Regex para CI ^[1-9][\.]?\d{3}[\.]?\d{3}[\.\-/_]?[1-9]
