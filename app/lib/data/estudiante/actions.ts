'use server';
const bcrypt = require('bcryptjs');
import { z } from 'zod';

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
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z
      .string({ required_error: 'Campo requerido' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'], // path of error
  });

export async function registerUser(prevState: State, formData: FormData) {
  const validatedFields = RegisterFormSchema.safeParse({
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    ci: formData.get('ci'),
    fechaNac: formData.get('fechaNac'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { nombre, email, password, ci, fechaNac } = validatedFields.data;

  // TODO update this to do register with backend
  // if (await findUserByEmail(email)) {
  //   return {
  //     errors: { email: ['Correo electronico ya registrado'] },
  //     message: 'Ya existe una cuenta con este correo electronico',
  //   };
  // } else {
  //   const response = await fetch(registrarURL, {
  //     method: 'POST',
  //     body: JSON.stringify({ nombre, email, password, ci, fechaNac }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((res) => res.json());

  // TODO update this to do login after register with backend
  // if (response.ok) {
  //   try {
  //     await signIn('credentials', formData);
  //     return { message: 'Success' };
  //   } catch (error) {
  //     if (error instanceof AuthError) {
  //       switch (error.type) {
  //         case 'CredentialsSignin':
  //           return { message: 'Credenciales invalidas' };
  //         default:
  //           return { message: 'Failed to Create User.' };
  //       }
  //     } else {
  //       return { message: 'Failed to Create User.' };
  //     }
  //   }
  // } else {
  return { message: 'Failed to register User.' };
  // }
  // }
}
