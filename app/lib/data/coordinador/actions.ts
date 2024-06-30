'use server';
import { Asignatura, AsignaturaState, CarreraState } from '@/lib/definitions';
import { authToken } from '@/utils/auth';
import { revalidatePath } from 'next/cache';
import {
  AltaAsignaturaFormSchema,
  AsignaturaEditFormSchema,
  CarreraEditFormSchema,
  CarreraFormSchema,
} from '../schemasZod';
const apiRoute = process.env.BACK_API;

export const getCarreras = async () => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/carreras`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('🚀 ~ getCarreras ~ response:', response);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return { content: [] };
    }
  }
};

export const getAsignatura = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/asignaturas/${id}`, {
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
  console.log(formData);

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
    console.log({ nombre, descripcion });
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
    console.log(response);
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
  const validatedFields = CarreraEditFormSchema.safeParse({
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
  const validatedFields = AsignaturaEditFormSchema.safeParse({
    nombre: formData.get('nombre'),
    descripcion: formData.get('descripcion'),
    asignaturaId: formData.get('asignaturaId'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Career.',
    };
  } else {
    const { nombre, descripcion, asignaturaId, carreraId } =
      validatedFields.data;

    const response = await fetch(`${apiRoute}/asignaturas/${asignaturaId}`, {
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
    if (response) {
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

export async function getPrevituras(id: string) {
  const token = authToken();
  if (token) {
    const previas = await fetch(`${apiRoute}/asignaturas/${id}/previas`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (previas.ok) {
      const data = await previas.json();
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export const obtenerExamenesVigentes = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/asignaturas/${id}/examenesVigentes`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const examenesJson = await response.json();
      return { exmanes: examenesJson.content };
    } else {
      return { exmanes: [] };
    }
  }
};

export async function altaPreviaFetch(asignaturaId: string, previaId: string) {
  const token = authToken();
  if (token) {
    const previaturas = await fetch(
      `${apiRoute}/asignaturas/${asignaturaId}/previa/${previaId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (previaturas.ok) {
      return {
        message: 'Previa creada con exito.',
      };
    } else {
      return {
        message: 'Error al crear previatura',
      };
    }
  }
}

export async function altaPlanEstudio(asignaturas: Asignatura[], id: string) {
  const token = authToken();
  const response = await fetch(
    `${apiRoute}/carreras/${id}/asignaturas/semestre-plan-estudio`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(asignaturas),
    }
  );
  if (response.ok) {
    return {
      message: 'Creado con exito. 200',
    };
  } else {
    return {
      message: 'Error al crear plan de estudio',
    };
  }
}

export async function getEstudiantesInscriptos(id: string) {
  const token = authToken();
  const response = await fetch(
    `${apiRoute}/carreras/${id}/estudiantes-inscriptos`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    return null;
  }
}

export async function getNoPrevituras(id: string) {
  const token = authToken();
  if (token) {
    const noPrevias = await fetch(`${apiRoute}/asignaturas/${id}/no-previas`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (noPrevias.ok) {
      const data = await noPrevias.json();
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export async function getSolicitudesTituloPendientes() {
  const token = authToken();
  if (token) {
    const solicitudes = await fetch(
      `${apiRoute}/tramites/solicitud-titulo-pendientes`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (solicitudes.ok) {
      const data = await solicitudes.json();
      return data;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export async function aprobarSolicitud(id: string) {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/tramites/aprobar-tramite-inscripcion-carrera/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function rechazarSolicitud(id: string, motivoRechazo: string) {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/tramites/rechazar-tramite-solicitud-titulo/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(motivoRechazo),
      }
    );
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
