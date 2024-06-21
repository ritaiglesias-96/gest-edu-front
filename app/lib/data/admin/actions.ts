'use server';
import { RegisterUserFormSchema } from '../schemasZod';
import { RegisterUserState } from '@/lib/definitions';
import { authToken } from '@/utils/auth';

const apiRoute = process.env.BACK_API;

export async function registerUserFromAdmin(
  prevState: RegisterUserState,
  formData: FormData
) {
  const token = authToken();
  const validatedFields = RegisterUserFormSchema.safeParse({
    ci: formData.get('ci'),
    nombre: formData.get('nombre'),
    apellido: formData.get('apellido'),
    email: formData.get('email'),
    password: formData.get('password'),
    telefono: formData.get('telefono'),
    domicilio: formData.get('domicilio'),
    confirmPassword: formData.get('confirmPassword'),
    fechaNac: formData.get('fechaNac'),
    tipoUsuario: formData.get('tipoUsuario'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const {
    ci,
    nombre,
    apellido,
    email,
    password,
    telefono,
    domicilio,
    fechaNac,
    tipoUsuario,
  } = validatedFields.data;

  const response = await fetch(`${apiRoute}/administrador/altaUsuario`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ci,
      nombre,
      apellido,
      email,
      password,
      telefono,
      domicilio,
      fechaNac,
      tipoUsuario,
    }),
  });

  if (response.ok) {
    return {
      message: 'Registrado con exito. 200',
    };
  } else {
    console.error('Error en la respuesta del servidor:', response.statusText);
    return {
      message: 'Error al registrar',
      errors: { email: ['Error al registrar'] },
    };
  }
}

export async function getUsuarios() {
  const token = authToken();

  const response = await fetch(`${apiRoute}/usuario/listar?page=0&size=1000`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}

export async function getUserByCi(ci: string) {
  const token = authToken();
  const response = await fetch(`${apiRoute}/usuario/buscar/${ci}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}

export async function desactivarCuenta(id: string) {
  const token = authToken();
  console.log(id);
  const response = await fetch(`${apiRoute}/administrador/desactivarUsuario`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(id),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    return null;
  }
}

export async function getActividadUsuarios(id: string) {
  const token = authToken();

  const response = await fetch(`${apiRoute}/actividades/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null;
  }
}

