'use server';
const bcrypt = require('bcryptjs');
import { z } from 'zod';
import { redirect } from 'next/navigation';

const apiRoute = process.env.BACK_API;

export type State = {
  errors?: {
    nombre?: string[];
    descripcion?: string[];
  };
  message?: string | null;
};
// forms
const AltaCarreraFormSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Ingrese un nombre valido',
    required_error: 'Campo requerido',
  }),
  descripcion: z.string({
    invalid_type_error: 'Ingrese un descripcion valida',
    required_error: 'Campo requerido',
  }),
});

export async function altaCarrera(prevState: State, formData: FormData) {
  const validatedFields = AltaCarreraFormSchema.safeParse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Career.',
    };
  } else {
    const { nombre, descripcion } = validatedFields.data;
    console.log(
      JSON.stringify({
        nombre,
        descripcion,
      })
    );
    //TODO sacar duracionAnios y creditos cuando en el back lo calculen
    const response = await fetch(`${apiRoute}/carrera`, {
      method: 'POST',
      body: JSON.stringify({
        nombre,
        descripcion,
        duracionAnios: 69,
        creditos: 420,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res);
      return res;
    });

    if (response.status === 201) {
      return {
        message: 'Creada con exito',
      };
    } else {
      return {
        message: 'Error al crear carrera',
      };
    }
  }
}
