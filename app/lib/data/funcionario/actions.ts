'use server';

import { authToken } from '@/utils/auth';
import { Calificacion, CalificacionExamen, DocenteState, PeriodoExamenState } from '@/lib/definitions';
import {
  AltaDocenteFormSchema,
  RegistrarPeriopdoExamenFormSchema,
} from '../schemasZod';
import { GridRowModel } from '@mui/x-data-grid/models/gridRows';
import { HorarioCurso } from '@/lib/definitions';
import { getCarrera } from '../coordinador/actions';

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

export async function calificarCursoFetch(id: number, califiaciones: Calificacion[]) {
  const token = authToken();
  if(token){
    const response = await fetch(
      `${apiRoute}/inscripcionCurso/${id}/calificar`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(califiaciones),
      }
    );
    if (response.ok) {
      return {
        message: 'Calificaciones guardadas con exito. 200',
      };
    } else {
      return {
        message: 'Error al cargar calificaciones',
      };
    }
  }
}

export async function calificarExamenFetch(id: number, califiaciones: CalificacionExamen[]) {
  const token = authToken();
  if(token){
    const response = await fetch(
      `${apiRoute}/examenes/${id}/calificar`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(califiaciones),
      }
    );
    if (response.ok) {
      return {
        message: 'Calificaciones guardadas con exito. 200',
      };
    } else {
      return {
        message: 'Error al cargar calificaciones',
      };
    }
  }
}

export async function getEstudiantesPorCurso(id: string) {
  const token = authToken();
  const response = await fetch(`${apiRoute}/cursos/${id}/estudiantes`, {
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

export async function getEstudiantesInscriptosExamen(id: string) {
  const token = authToken();
  const estudiantes = await fetch(`${apiRoute}/examenes/${id}/estudiantes-inscriptos`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (estudiantes.ok) {
    const estudiantesJson = await estudiantes.json();      
    return { estudiantes: estudiantesJson };
  } else {
    return { estudiantesJson: [] };
  }
}

export async function getCurso(id: string) {
  const token = authToken();
  const response = await fetch(`${apiRoute}/cursos/${id}`, {
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

export async function getDocente(id: string) {
  const token = authToken();
  const response = await fetch(`${apiRoute}/docentes/${id}`, {
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

export async function registrarPeriodoExamen(
  prevState: PeriodoExamenState,
  formData: FormData
) {
  const token = authToken();
  if (token) {
    const validatedFields = RegistrarPeriopdoExamenFormSchema.safeParse({
      fechaInicio: formData.get('fechaInicio'),
      fechaFin: formData.get('fechaFin'),
      carreraId: formData.get('carreraId'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Subject.',
      };
    } else {
      const { fechaInicio, fechaFin, carreraId } = validatedFields.data;
      const carrId = parseInt(carreraId);

      const response = await fetch(`${apiRoute}/periodoExamen/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: 0,
          fechaInicio,
          fechaFin,
          carreraid: carrId,
        }),
      });
      if (response.ok) {
        return {
          message: 'Registrado con exito. 200',
        };
      } else {
        return {
          message:
            'Error al registrar periodo de examen. Verifique que las no correspodan a un periodo ya existente y sean coherentes entre ellas. ',
        };
      }
    }
  } else {
    return {
      message: 'Debe ser un funcionario para registrar periodos de examen',
    };
  }
}

export async function getSolicitudesInscripcionCarreras() {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/tramites/inscripcion-carrera-pendientes`,
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
  } else {
    return null;
  }
}

export async function aprobarSolicitudInscripcionCarrera(tramiteId: string) {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/tramites/aprobar-tramite-solicitud-titulo/${tramiteId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export async function rechazarSolicitudInscripcionCarrera(
  tramiteId: string,
  motivoRechazo: string
) {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/tramites/rechazar-tramite-solicitud-titulo/${tramiteId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ motivoRechazo }),
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      return null;
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

export async function registrarHorarioDiaCurso(
  horario: HorarioCurso,
  cursoId: string
) {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/cursos/${cursoId}/horarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dia: horario.dia,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
      }),
    }).then((res) => {
      return res.json();
    });
    return { message: response.message };
  }
}

export async function getCursosAsignatura(id: string) {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/asignaturas/${id}/cursos`, {
      method: 'GET',
      headers: {
        Authotization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return { message: 'Error al obtener los examenes vigentes' };
    }
  }
}

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

export async function geExamenesPendientesCalificacion() {
  const token = authToken();
  if (token) {
    const examenes = await fetch(`${apiRoute}/examenes/examenes-pendientes`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (examenes.ok) {
      const examenesJson = await examenes.json();      
      return { examenes: examenesJson.content };
    } else {
      return { examenesJson: [] };
    }
  } else {
    return null;
  }
}