'use server';

import { authToken } from '@/utils/auth';
import { AltaDocenteFormSchema } from '../schemasZod';
import { DocenteState } from '@/lib/definitions';
import { GridRowModel } from '@mui/x-data-grid/models/gridRows';
const apiRoute = process.env.BACK_API;

export const getDocentes = async () => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/docentes`, {
      method: 'GET',
      headers: {
        Authotization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      return null;
    }
  }
};

export async function altaDocente(prevState: DocenteState, formData: FormData) {
  const token = authToken();
  const validatedFields = AltaDocenteFormSchema.safeParse({
    nombre: formData.get('nombre'),
    apellido: formData.get('apellido'),
    documento: formData.get('documento'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Career.',
    };
  } else {
    const { nombre, apellido, documento } = validatedFields.data;

    const response = await fetch(`${apiRoute}/docentes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        apellido,
        documento,
      }),
    });
    if (response.ok) {
      return {
        message: 'Creada con exito. 201',
      };
    } else {
      return {
        message: 'Error al crear carrera',
      };
    }
  }
}

export async function editDocente(docentes: GridRowModel) {
  const token = authToken();
  const { id, documento, nombre, apellido } = docentes;
  const response = await fetch(`${apiRoute}/docentes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, documento, nombre, apellido }),
  });
  console.log(response);
  if (response.ok) {
    return response.json();
  } else {
    return null;
  }
}

export async function deleteDocente(id: string) {
  const token = authToken();
  const response = await fetch(`${apiRoute}/docentes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  if (response.ok) {
    return response.status;
  } else {
    return null;
  }
}

export async function getEstudiantes() {
  const token = authToken();
  const response = await fetch(`${apiRoute}/estudiantes/listar`, {
    method: 'GET',
    headers: {
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

export async function getEstudiante(ci: string) {
  const token = authToken();
  const response = await fetch(`${apiRoute}/estudiantes/buscar/${ci}`, {
    method: 'GET',
    headers: {
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

