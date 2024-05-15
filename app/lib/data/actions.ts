'use server';
const bcrypt = require('bcryptjs');
import { z } from 'zod';

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const SignInFormSchema = z.object({
  email: z
    .string({ required_error: 'Campo requerido' })
    .email({ message: 'Ingrese un correo valido' }),
  password: z
    .string({ required_error: 'Campo requerido' })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

export async function login(prevState: LoginState, formData: FormData) {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to login User.',
    };
  }
  const data = validatedFields.data;
  // TODO update this to do login with backend
  // const user = await findUserByEmail(data.email);
  // if (!user) {
  //   return {
  //     errors: { email: ['Correo electronico no registrado'] },
  //     message: 'Failed to login User.',
  //   };
  // }
  // const passwordsMatch = await verifyPasswords(data.password, user.password);
  // if (!passwordsMatch) {
  //   return {
  //     errors: { password: ['Contraseña incorrecta'] },
  //     message: 'Failed to login User.',
  //   };
  // }
  // try {
  //   await signIn('credentials', formData);
  //   return { message: 'Success' };
  // } catch (error) {
  //   if (error instanceof AuthError) {
  //     switch (error.type) {
  //       case 'CredentialsSignin':
  //         return { message: 'Credenciales invalidas' };
  //       default:
  //         return { message: 'Failed to Create User.' };
  //     }
  //   } else {
  return { message: 'Failed to Create User.' };
  //   }
  // }
}

// Session
