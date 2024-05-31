'use server';
import { RegisterState } from '@/lib/definitions';
import { RegisterFormSchema } from '../schemasZod';
import { utils } from '@utils'
import { authToken } from '@/utils/auth';

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
    const imagen = '/public/images/defaultUserImage.png';
    const response = await fetch(`${apiRoute}/registro`, {
      method: 'POST',
      body: JSON.stringify({
        ci,
        nombre,
        apellido,
        email,
        password,
        telefono,
        imagen,
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

export const obtenerCarrerasInscriptoFetch = async () => {
  const token = authToken();
  if(token){
    const response = await fetch(`https://localhost:8080/gest-edu/api/estudiantes/carreras-inscripto`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const carrerasJson = await response.json();      
      return carrerasJson;
    } else {
      return response.json();
    }
  }  
};

export const obtenerInscripcionesVigentesExamen = async (id: string) => {
  const token = authToken();
  if(token){
    const response = await fetch(`https://localhost:8080/gest-edu/api/asignaturas/${id}/examenesVigentes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const carrerasJson = await response.json();      
      return carrerasJson;
    } else {
      return response.json();
    }
  }  
};

export const obtenerAsignaturasPorCarreran = async (id: string) => {
  const token = authToken();
  if(token){
    const response = await fetch(`https://localhost:8080/gest-edu/api/carreras/${id}/asignaturas`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const asignaturasJson = await response.json();      
      return asignaturasJson;
    } else {
      return response.json();
    }
  }  
};