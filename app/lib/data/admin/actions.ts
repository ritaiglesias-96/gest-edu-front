'use server';

const bcrypt = require('bcryptjs');
import { cookies } from 'next/headers';
import { z } from 'zod';

const apiRoute = process.env.BACK_API;

export type State = {
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

// forms
const RegisterFormSchema = z
  .object({
    nombre: z.string({
      invalid_type_error: 'Ingrese un nombre valido',
      required_error: 'Campo requerido',
    }),
    apellido: z.string({
      invalid_type_error: 'Ingrese un apellido valido',
      required_error: 'Campo requerido',
    }),
    email: z
      .string({ required_error: 'Campo requerido' })
      .email({ message: 'Ingrese un correo valido' }),
    ci: z
      .string({ required_error: 'Campo requerido' })
      .regex(/^[1-9][\.]?\d{3}[\.]?\d{3}[\.\-/_]?[1-9]/, {
        message: 'Ingrese un CI valido',
      }),
    fechaNac: z.string({ required_error: 'Campo requerido' }).date(),
    domicilio: z.string({ required_error: 'Campo requerido' }),
    telefono: z.string({ required_error: 'Campo requerido' }),
    password: z
      .string({ required_error: 'Campo requerido' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z
      .string({ required_error: 'Campo requerido' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    tipoUsuario: z.string({ required_error: 'Campo requerido'}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // path of error
  });

export async function registerUserFromAdmin(prevState: State, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
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
  } else {
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

    console.log(
        JSON.stringify({
          ci,
          nombre,
          apellido,
          email,
          password,
          telefono,
          domicilio,
          fechaNac,
          tipoUsuario,
        })
    );

    const token = cookies().get('token')
    try {
      const response = await fetch(`${apiRoute}/administrador/altaUsuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${cookies().get('token')}`,
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
          message: 'Registrado con exito',
        };
      } else {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData);
        return {
          message: 'Error al registrar',
          errors: errorData.errors || {},
        };
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
      return {
        message: 'Error al registrar. Por favor intente de nuevo más tarde.',
        errors: { general: ['Error de red o del servidor'] },
      };
    }
  }
}