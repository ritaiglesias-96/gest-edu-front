'use server';
import { RegisterState } from '@/lib/definitions';
import { RegisterFormSchema } from '../schemasZod';
import { authToken } from '@/utils/auth';
import { getCarrera } from '../coordinador/actions';

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
  }
}

export const obtenerCarrerasInscriptoFetch = async () => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/estudiantes/carreras-inscripto`, {
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
      const carrerasJson = await response.json();
      return carrerasJson;
    } else {
      return response.json();
    }
  }
};

export const obtenerAsignaturasPorCarreran = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/carreras/${id}/asignaturas`, {
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

export const inscribirseExamenFetch = async (
  email: string,
  examenId: string
) => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/examenes/inscribirse`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, examenId }),
    }).then((res) => {
      return res.json();
    });

    if (response.status === 200) {
      return {
        message: 'Insripcion exitosa.',
      };
    } else {
      return {
        message: response.message,
      };
    }
  }
};

export const inscribirseCarreraFetch = async (carreraId: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/tramites/nuevo-tramite?carreraId=${carreraId}&tipoTramite=INSCRIPCION_A_CARRERA`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      return res.json();
    });
    return response;
  }
};

export const obtenerCursosVigentes = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/asignaturas/${id}/cursos`, {
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

export const inscribirseCursoFetch = async (
  estudianteId: string,
  cursoId: string
) => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/inscripcionCurso`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estudianteId, cursoId }),
    }).then((res) => {
      return res.json();
    });

    if (response.status === 200) {
      return {
        message: 'Insripcion exitosa.',
      };
    } else {
      return {
        message: response.message,
      };
    }
  }
};

export const obtenerAsignaturasParaInscripcionFetch = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/estudiantes/${id}/asignaturas-inscripcion`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const asignaturasJson = await response.json();
      return { asignaturas: asignaturasJson.content };
    } else {
      return { asignauras: [] };
    }
  }
};

export const obtenerAsignaturasParaInscripcionExamenFetch = async (
  id: string
) => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/estudiantes/${id}/asignaturas-a-examen`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const asignaturasJson = await response.json();
      return asignaturasJson;
    } else {
      return response.json();
    }
  }
};

export const bajaExamenFetch = async (examenId: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/examenes/${examenId}/baja`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    });

    if (response.status === 200) {
      return {
        message: 'Se dio de baja exitosamente.',
      };
    } else {
      return {
        message: response.message,
      };
    }
  }
};

export const obtenerCursosInscriptoFetch = async () => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/inscripcionCurso/cursos-inscripto`,
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
};

export const solicitarTituloFetch = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/tramites/nuevo-tramite?carreraId=${id}&tipoTramite=SOLICITUD_DE_TITULO`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      return res.json();
    });

    if (response.status === 200) {
      return {
        message: 'Se ha realizado la solicitud del titulo',
      };
    } else {
      return {
        message: response.message,
      };
    }
  }
};

export const obtenerAsignaturasPendientes = async (id: number) => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/estudiantes/${id}/asignaturas-pendientes`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const asignaturasJson = await response.json();
      return { asignaturas: asignaturasJson.content };
    } else {
      return { asignaturas: [] };
    }
  }
};

export const obtenerCarrerasNoInscripto = async () => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/estudiantes/carreras-no-inscripto`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const carrerasJson = await response.json();
      return carrerasJson;
    } else {
      return [];
    }
  }
};

export async function getCarreraYAsignaturaPendientes(id: string) {
  const token = authToken();
  if (token) {
    const carreraJson = await getCarrera(id);
    if (!carreraJson) return null;
    const asignaturasPendientes = await fetch(
      `${apiRoute}/estudiantes/${id}/asignaturas-pendientes`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (asignaturasPendientes.ok) {
      const asignaturasJson = await asignaturasPendientes.json();
      return { carrera: carreraJson, asignaturas: asignaturasJson.content };
    } else {
      return { carrera: carreraJson, asignaturas: [] };
    }
  } else {
    return null;
  }
}

export const bajaCursoFetch = async (id: string) => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/inscripcionCurso/${id}/eliminar`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      return res.json();
    });

    if (response.ok) {
      return {
        message: response.message,
      };
    }
  }
};

export async function getHorariosCursosEstudiante() {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `${apiRoute}/inscripcionCurso/cursos-inscripto`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const cursosJson = await response.json();
      return cursosJson;
    } else {
      return [];
    }
  }
}

export async function solicitarCertificadoFetch(id: string) {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/estudiantes/${id}/certificado`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const certificadoJson = await response.json();
      return certificadoJson;
    } else {
      return { message: 'No se pudo obtener certificado.' };
    }
  }
}

export async function getTramitesEstudiantes() {
  const token = authToken();
  if (token) {
    const response = await fetch(`${apiRoute}/tramites/tramites-estudiante`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const tramitesJson = await response.json();
    return tramitesJson;
  } else {
    return { message: 'Error al obtener trámites.' };
  }
}

export const obtenerAsignaturasInscriptoFetch = async () => {
  const token = authToken();
  if (token) {
    const response = await fetch(
      `https://localhost:8080/gest-edu/api/estudiantes/carreras-inscripto`, //TODO falta endpoint de asignaturas de las cual esta insccipto el estudiante a algun curso
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const carrerasJson = await response.json();
      return carrerasJson;
    } else {
      return response.json();
    }
  }
};
