'use server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { ResetPassFormSchema, SignInFormSchema } from './schemasZod';
import {
  ResetPassState,
  CambiarPassState,
  EditarPerfilState,
  LoginState,
} from '../definitions';
import { authToken } from '@/utils/auth';
const apiRoute = process.env.BACK_API;

export const loginFetch = async (prevState: LoginState, formData: FormData) => {
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
  const { email, password } = validatedFields.data;
  const response = await fetch(`${apiRoute}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const data = await response.json();
    cookies().set({
      name: 'token',
      value: data.jwt.toString(),
    });
    return {
      message: 'Inicio de sesion con exito. 200',
    };
  }
  return {
    errors: { password: ['Correo o contraseña incorrectos'] },
    message: 'Correo o contraseña incorrectos',
  };
};

export const logoutFetch = async () => {
  const token = authToken();
  await fetch(`${apiRoute}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
    const response = await fetch(`${apiRoute}/correoPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mailTo: email }),
    }).then((res) => {
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
    const response = await fetch(`${apiRoute}/cambiarPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, confirmPassword, tokenPassword }),
    }).then((res) => {
      return res;
    });
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

export const editarUsuarioFetch = async (
  telefono: string,
  domicilio: string,
  imagen: string
) => {
  const token = authToken();
  if (token !== '') {
    const response = await fetch(`${apiRoute}/usuario/perfil`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ telefono, domicilio, imagen }),
    }).then((res) => {
      return res.json();
    });

    if (response.status === 200) {
      return {
        message: 'Perfil editado con exito.',
      };
    } else if (response.status === 403) {
      return {
        message: 'Error al editar datos.',
      };
    }
  }
};

//No se usa
export const editarPerfilFetch = async (
  prevSate: EditarPerfilState,
  formData: FormData
) => {
  const SignInFormSchema = z.object({
    telefono: z.string({ required_error: 'Campo requerido' }),
    domicilio: z.string({ required_error: 'Campo requerido' }),
    imagen: z.string({ required_error: 'Campo requerido' }),
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
  } else {
    const token = authToken();
    if (token !== '') {
      const { telefono, domicilio, imagen } = validatedFields.data;
      const response = await fetch(`${apiRoute}/usuario/perfil`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telefono, domicilio, imagen }),
      }).then((res) => {
        return res.json();
      });

      if (response.status === 200) {
        return {
          message: 'Perfil editado con exito.',
        };
      } else if (response.status === 403) {
        return {
          message: 'Error al editar datos.',
        };
      }
    }
  }
};

export const obtenerDatosUsuarioFetch = async () => {
  const token = authToken();

  if (token) {
    try {
      const response = await fetch(`${apiRoute}/usuario/perfil`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        // Manejar errores HTTP
        console.error(`HTTP Error: ${response.status}`);
        return null;
      }

      // Lee el cuerpo de la respuesta como JSON
      const data = await response.json();
      return data;
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error('Fetch Error:', error);
      return null;
    }
  } else {
    console.error('No token available');
    return null;
  }
};

export const getCarreras = async () => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/carreras`, {
      method: 'GET',
      headers: {
        Authotization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  }
};

export const getAsignaturasCarrera = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/carreras/${id}/asignaturas`, {
      method: 'GET',
      headers: {
        Authotization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  }
}
