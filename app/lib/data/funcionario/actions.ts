'use server';

import { authToken } from '@/utils/auth';
import { AltaDocenteFormSchema } from '../schemasZod';
import { DocenteState } from '@/lib/definitions';
import { GridRowModel } from '@mui/x-data-grid/models/gridRows';
const apiRoute = process.env.BACK_API;

export const getDocentes = async () => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/docentes`, {
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

export async function altaDocente(prevState: DocenteState, formData: FormData) {
  const token = authToken();
  const validatedFields = AltaDocenteFormSchema.safeParse({
    nombre: formData.get('nombre'),
    apellido: formData.get('apellido'),
    documento: formData.get('documento'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Career.',
    };
  } else {
    const { nombre, apellido, documento } = validatedFields.data;

    const response = await fetch(`${apiRoute}/docentes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombre,
        apellido,
        documento,
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

export async function editDocente(docentes: GridRowModel) {
  const token = authToken();
  const { id, documento, nombre, apellido } = docentes;
  const response = await fetch(`${apiRoute}/docentes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, documento, nombre, apellido }),
  });
  console.log(response);
  if (response.ok) {
    return response.json();
  } else {
    return null;
  }
}

export async function deleteDocente(id: string) {
  const token = authToken();
  const response = await fetch(`${apiRoute}/docentes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  if (response.ok) {
    return response.status;
  } else {
    return null;
  }
}

export async function getEstudiantes() {
  const token = authToken();
  const response = await fetch(`${apiRoute}/estudiantes/listar`, {
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

export async function getEstudiante(ci: string) {
  const token = authToken();
  const response = await fetch(`${apiRoute}/estudiantes/buscar/${ci}`, {
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

export async function getPeriodosExamenCarrera(id: string) {
  const token = authToken();
  const carreraJson = await getCarrera(id);
  if (token) {
    const periodos = await fetch(`${apiRoute}/carreras/${id}/periodos-examen`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (periodos.ok) {
      const periodosJson = await periodos.json();
      return { carrera: carreraJson, periodos: periodosJson.content };
    } else {
      return { carrera: carreraJson, periodos: [] };
    }
  } else {
    return null;
  }
}

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

export const getExamenesAsignaturaVigentes = async (asignaturaId: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/asignaturas/${asignaturaId}/examenesVigentes`,
      {
        method: 'GET',
        headers: {
          Authotization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      return { message: 'Error al obtener los examenes vigentes' };
    }
  }
};

export async function registrarFechaExamen(data: any) {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/examenes/crear`, {
      method: 'POST',
      headers: {
        Authotization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fecha: data.fecha,
        diasPrevInsc: data.diasPrevInsc,
        asignaturaId: data.asignaturaId,
        docenteIds: data.docenteIds,
      }),
    }).then((res) => {
      return res.json();
    });
    return { message: response.message };
  }
}

export async function registrarHorarioDiaCurso(horario: any, cursoId: any) {
  const token = authToken();
  console.log('🚀 ~ registrarHorarioDiaCurso ~ token:', token);
  console.log('🚀 ~ tamo en vivo');
  console.log('🚀 ~ registrarHorarioDiaCurso ~ horario:', horario);

  if (token) {
    fetch(`${apiRoute}/cursos/${cursoId}/horarios`, {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido
        Authorization: `Bearer ${token}`, // Añade tu token de autenticación
      },
      body: JSON.stringify({
        dia: horario.dia,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
      }), // Convierte el objeto a una cadena JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data); // Maneja la respuesta del servidor
      })
      .catch((error) => {
        console.error('Error:', error); // Maneja los errores
      });
  }
}
