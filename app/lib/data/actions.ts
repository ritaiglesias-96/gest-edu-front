'use server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { ResetPassState, CambiarPassState, EditarPerfilState } from '../definitions';
import { Cookie } from 'next/font/google';
const apiRoute = process.env.BACK_API;

export const loginFetch = async (data: { email: string; password: string }) => {
  const response = await fetch(`https://localhost:8080/gest-edu/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
  cookies().set({
    name: 'token',
    value: response.jwt.toString(),
  });
  return response;
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
  return response;
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
  const validatedFields = z
    .object({
      password: z
        .string({ required_error: 'Campo requerido' })
        .min(4, { message: 'La contraseña debe tener al menos 8 caracteres' }),
      confirmPassword: z
        .string({ required_error: 'Campo requerido' })
        .min(4, { message: 'La contraseña debe tener al menos 8 caracteres' }),
      tokenPassword: z.string({ required_error: 'Campo requerido' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'], // path of error
    })
    .safeParse({
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

export const editarPerfilFetch = async (prevState: EditarPerfilState, formData: FormData) => {
  const SignInFormSchema = z.object({
    telefono: z
      .string({ required_error: 'Campo requerido' }),
    domicilio: z
      .string({ required_error: 'Campo requerido' }),
    imagen: z
      .string({ required_error: 'Campo requerido' }),
  });
  const validatedFields = SignInFormSchema.safeParse({
    telefono: formData.get('telefono'),
    domicilio: formData.get('domicilio'),
    imagen: formData.get('imagen'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Edit User.',
    };
  } 
  else {   
    if(cookies().get('token') !== null){
      const token = cookies().get('token')!.value;      
      
      const response = await fetch(`${apiRoute}/usuario/perfil`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
      }).then((res) => {
        return res.json();
      });

      if(response.status === 200){
        return {
          message: 'Perfil editado con exito.',
        };
      }
      else if (response.status === 403) {
        return {
          errors: { imagen: ['Token invalido.'] },
        };
      } 
    }   
  }
};
// Session
