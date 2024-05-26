'use server';
import { RegisterState } from '@/lib/definitions';
import { RegisterFormSchema } from '../schemasZod';

const apiRoute = process.env.BACK_API;

export async function registerUser(
  prevState: RegisterState,
  formData: FormData
) {
  const validatedFields = RegisterFormSchema.safeParse({
    ci: formData.get('ci'),
    nombre: formData.get('nombre'),
    apellido: formData.get('apellido'),
    email: formData.get('email'),
    telefono: formData.get('telefono'),
    domicilio: formData.get('domicilio'),
    password: formData.get('password'),
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

    const response = await fetch(`${apiRoute}/registro`, {
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
        message: 'Registrado con exito. 201',
      };
    } else {
      return {
        message: 'Error al registrar',
      };
    }
    // TODO update this to do login after register with backend
  }
}
