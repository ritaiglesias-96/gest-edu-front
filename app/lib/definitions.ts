import { UUID } from 'crypto';

export type User = {
  id?: UUID;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: Role;
  image: string;
  birthdate: Date;
  ci: string;
  phone: string;
  address: string;
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
  estudiante = 'estudiante',
  funcionario = 'funcionario',
  coordinador = 'coordinador',
  admin = 'admin',
  public = 'public',
}

//Regex para CI ^[1-9][\.]?\d{3}[\.]?\d{3}[\.\-/_]?[1-9]
