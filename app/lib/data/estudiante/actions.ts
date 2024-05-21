'use server';
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
      .min(4, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z
      .string({ required_error: 'Campo requerido' })
      .min(4, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // path of error
  });

export async function registerUser(prevState: State, formData: FormData) {
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
    } = validatedFields.data;

    const response = await fetch(`${apiRoute}/usuario/registro`, {
      method: 'POST',
      body: JSON.stringify({
        ci,
        nombre,
        apellido,
        email,
        password,
        telefono,
        domicilio,
        fechaNac,
        TipoUsuario: 'ESTUDIANTE',
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
        message: 'Registrado con exito',
      };
    } else {
      return {
        message: 'Error al registrar',
      };
    }
    // TODO update this to do login after register with backend
  }
}
