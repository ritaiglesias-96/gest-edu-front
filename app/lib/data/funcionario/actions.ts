'use server';

import { authToken } from '@/utils/auth';
import {
  AltaDocenteFormSchema,
  RegistrarPeriopdoExamenFormSchema,
} from '../schemasZod';
import { DocenteState, PeriodoExamenState } from '@/lib/definitions';
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

export async function registrarPeriodoExamen(
  prevState: PeriodoExamenState,
  formData: FormData
) {
  const token = authToken();

  if (token) {
    const validatedFields = RegistrarPeriopdoExamenFormSchema.safeParse({
      fechaInicio: formData.get('fechaInicio'),
      fechaFin: formData.get('fechaFin'),
      carreraId: formData.get('carreraId'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Subject.',
      };
    } else {
      const { fechaInicio, fechaFin, carreraId } = validatedFields.data;
      const carrId = parseInt(carreraId);

      const response = await fetch(`${apiRoute}/periodoExamen/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: 0,
          fechaInicio,
          fechaFin,
          carreraId: carrId,
        }),
      });
      if (response.ok) {
        return {
          message: 'Registrado con exito. 200',
        };
      } else {
        return {
          message: 'Error al registrar periodo de examen',
        };
      }
    }
  }
}
