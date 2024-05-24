'use server';
import { cookies } from 'next/headers';
import { z } from 'zod';
const apiRoute = process.env.BACK_API;

export type State = {
  errors?: {
    nombre?: string[];
    descripcion?: string[];
  };
  message?: string | null;
};

// forms
export const getCarreras = async () => {
  const token = cookies().get('token');
  if (token) {
    const response = await fetch(`${apiRoute}/carreras`, {
      method: 'GET',
      headers: {
        Authotization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    });
    return response;
  }
};

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

    const response = await fetch(`${apiRoute}/carreras`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${cookies().get('token')}`,
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        duracionAnios: 5,
        creditos: 200,
      }),
    }).then((res) => {
      console.log(res);
      return res;
    });

    if (response.status === 200) {
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

export const getAsignaturas = async (idCarrera:string) => {
  const token = cookies().get('token');
  if (token) {    
    const response = await fetch(`${apiRoute}/carreras/${idCarrera}/asignaturas`, {
      method: 'GET',
      headers: {
        Authotization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    });
    
    return response;
  }
};

const AltaAsignaturaFormSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Ingrese un nombre valido',
    required_error: 'Campo requerido',
  }),
  descripcion: z.string({
    invalid_type_error: 'Ingrese un descripcion valida',
    required_error: 'Campo requerido',
  }),
  creditos: z.string({
    invalid_type_error: 'Ingrese una cantidad de creditos valida',
    required_error: 'Campo requerido',
  }),
  carreraId: z.string({
    invalid_type_error: 'Ingrese una cantidad de creditos valida',
    required_error: 'Campo requerido',
  }),
});

export async function altaAsignatura(prevState: State, formData: FormData) {
  const validatedFields = AltaAsignaturaFormSchema.safeParse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    creditos: formData.get('creditos'),
    carreraId: formData.get('carreraId')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Career.',
    };
  } else {
    const { nombre, descripcion, creditos, carreraId } = validatedFields.data;
    console.log("HHHHHHHHHHHHHHHHHHOOOOOOOOOOOOOLLLLLLLLLLLLLLLLLAAAAAAAAAAAAAAAA");
    console.log(carreraId);
    const response = await fetch(`${apiRoute}/asignaturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${cookies().get('token')}`,
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        creditos,
        carreraId,
      }),
    }).then((res) => {
      console.log(res);
      return res;
    });

    if (response.status === 200) {
      return {
        message: 'Creada con exito. 201',
      };
    } else {
      return {
        message: 'Error al crear la asignatura',
      };
    }
  }
}