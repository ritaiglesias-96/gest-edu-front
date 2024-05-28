'use server';
import { AsignaturaState, CarreraState, DocenteState } from '@/lib/definitions';
import { authToken } from '@/utils/auth';
import { revalidatePath } from 'next/cache';
import {
  AltaAsignaturaFormSchema,
  AltaDocenteFormSchema,
  CarreraFormSchema,
} from '../schemasZod';
const apiRoute = process.env.BACK_API;

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
      console.log(data);
      return data;
    } else {
      return null;
    }
  }
};

export const getAsignatura = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/asignaturas/${id}`, {
      method: 'GET',
      headers: {
        Authotization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      return null;
    }
  }
};

export async function getCarrera(id: string) {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/carreras/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export async function getCarreraYAsignatura(id: string) {
  const token = authToken();
  if (token) {
    const carreraJson = await getCarrera(id);
    if (!carreraJson) return null;
    const asignaturas = await fetch(`${apiRoute}/carreras/${id}/asignaturas`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (asignaturas.ok) {
      const asignaturasJson = await asignaturas.json();
      return { carrera: carreraJson, asignaturas: asignaturasJson.content };
    } else {
      return { carrera: carreraJson, asignaturas: [] };
    }
  } else {
    return null;
  }
}

export async function altaCarrera(prevState: CarreraState, formData: FormData) {
  const token = authToken();
  const validatedFields = CarreraFormSchema.safeParse({
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        descripcion,
      }),
    });
    if (response.ok) {
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

export async function editCarrera(prevState: CarreraState, formData: FormData) {
  const token = authToken();
  const validatedFields = CarreraFormSchema.safeParse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    carreraId: formData.get('carreraId'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Career.',
    };
  } else {
    const { nombre, descripcion, carreraId } = validatedFields.data;

    const response = await fetch(`${apiRoute}/carreras/${carreraId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        descripcion,
      }),
    });
    if (response.ok) {
      revalidatePath(`/coordinador/carreras/${carreraId}`);
      return {
        message: 'Editada con exito. 200',
      };
    } else {
      return {
        message: 'Error al editar carrera',
      };
    }
  }
}

export async function editAsignatura(
  prevState: AsignaturaState,
  formData: FormData
) {
  const token = authToken();
  const validatedFields = CarreraFormSchema.safeParse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    carreraId: formData.get('carreraId'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Career.',
    };
  } else {
    const { nombre, descripcion, carreraId } = validatedFields.data;

    // const response = await fetch(`${apiRoute}/carreras/${carreraId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     nombre,
    //     descripcion,
    //   }),
    // });
    if (false) {
      revalidatePath(`/coordinador/carreras/${carreraId}`);
      return {
        message: 'Editada con exito. 200',
      };
    } else {
      return {
        message: 'Error al editar carrera',
      };
    }
  }
}

export async function altaAsignatura(
  prevState: AsignaturaState,
  formData: FormData
) {
  const token = authToken();
  const validatedFields = AltaAsignaturaFormSchema.safeParse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    creditos: formData.get('creditos'),
    carreraId: formData.get('carreraId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Subject.',
    };
  } else {
    const { nombre, descripcion, creditos, carreraId } = validatedFields.data;
    const cred = parseInt(creditos);
    const carrId = parseInt(carreraId);
    const response = await fetch(`${apiRoute}/asignaturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        descripcion,
        creditos: cred,
        carreraId: carrId,
      }),
    });
    if (response.ok) {
      return {
        message: 'Creada con exito. 200',
      };
    } else {
      return {
        message: 'Error al crear asignatura',
      };
    }
  }
}
