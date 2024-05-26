'use server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { ResetPassState, CambiarPassState } from '../definitions';
import { redirect } from 'next/navigation';
import { ResetPassFormSchema } from './schemasZod';
const apiRoute = process.env.BACK_API;

export const loginFetch = async (data: { email: string; password: string }) => {
  const response = await fetch(`https://localhost:8080/gest-edu/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const data = await response.json();
    cookies().set({
      name: 'token',
      value: data.jwt.toString(),
    });
    return data;
  } else {
    return response.json();
  }
};

export const logoutFetch = async (token: string) => {
  const response = await fetch(`https://localhost:8080/gest-edu/api/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    console.log(res);
    return res.status;
  });
  cookies().delete('token');
  redirect('/');
};

export const resetPassFetch = async (
  prevState: ResetPassState,
  formData: FormData
) => {
  const validatedFields = z
    .object({
      email: z
        .string({ required_error: 'Campo requerido' })
        .email({ message: 'Ingrese un correo valido' }),
    })
    .safeParse({
      email: formData.get('email'),
    });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error en los campos ingresados',
    };
  } else {
    const { email } = validatedFields.data;
    const response = await fetch(
      `https://localhost:8080/gest-edu/api/usuario/resetPassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mailTo: email }),
      }
    ).then((res) => {
      return res;
    });

    if (response.status === 200) {
      return {
        message:
          'Se ha enviado un correo con las instrucciones para restablecer la contraseña. 200',
      };
    } else if (response.status === 404) {
      return {
        errors: { email: ['No se encontró un usuario con ese correo'] },
        message: 'Error en los campos ingresados',
      };
    } else {
      return {
        message: 'Error en el servidor',
      };
    }
  }
};

export const cambiarPassFetch = async (
  prevState: CambiarPassState,
  formData: FormData
) => {
  const validatedFields = ResetPassFormSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    tokenPassword: formData.get('tokenPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error en los campos ingresados',
    };
  } else {
    const { password, confirmPassword, tokenPassword } = validatedFields.data;
    const response = await fetch(
      `https://localhost:8080/gest-edu/api/usuario/cambiarPassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword, tokenPassword }),
      }
    ).then((res) => {
      return res;
    });
    console.log(response);

    if (response.status === 200) {
      return {
        message: 'La contraseña se a restaurado con exito. 200',
      };
    } else if (response.status === 404) {
      return {
        errors: {
          confirmPassword: [
            'El link utilizado ha vencido o no es valido, vuelva a solicitar nuevamente el cambio.',
          ],
        },
        message: 'Error',
      };
    } else {
      return {
        message: 'Error en el servidor',
      };
    }
  }
};
// Session
