'use client';
import { useEffect, useState } from 'react';
import { getAsignatura } from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Box, Collapse } from '@mui/material';
import Button from '@/components/Button/button';
import {
  Curso,
  Asignatura,
  Docente,
  Calificacion,
  Estudiante,
} from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';
import {
  calificarCursoFetch,
  getCurso,
  getDocente,
  getEstudiantesPorCurso,
} from '@/lib/data/funcionario/actions';
import { convertirFecha } from '@/utils/utils';
import CheckIcon from '@mui/icons-material/Check';

export default function CursoPage({
  params,
}: Readonly<{ params: { cursoId: string } }>) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [curso, setCurso] = useState<Curso>();
  const [asignatura, setAsignatura] = useState<Asignatura>();
  const [docente, setDocente] = useState<Docente>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [alertOk, setAlertOk] = useState(false);

  useEffect(() => {
    if (params.cursoId) {
      getCurso(params.cursoId).then((dataCurso) => {
        setCurso(dataCurso);
      });
    }
  }, [params.cursoId]);

  useEffect(() => {
    if (curso?.id) {
      curso.fechaInicio = convertirFecha(curso.fechaInicio);
      curso.fechaFin = convertirFecha(curso.fechaFin);
      getEstudiantesPorCurso(curso.id.toString()).then(
        (arrayEstudiantes: any) => {
          if (arrayEstudiantes) {
            arrayEstudiantes.forEach((element: Estudiante) => {
              element.fechaNac = convertirFecha(element.fechaNac!);
            });
            setDisabled(arrayEstudiantes.length === 0);
            setRows(arrayEstudiantes);
            setRowsLoading(false);
            setLoading(false);
            setFallout(false);
          }
        }
      );
      getAsignatura(curso.asignaturaId.toString()).then((dataAsignatura) => {
        setAsignatura(dataAsignatura);
      });
      getDocente(curso.docenteId.toString()).then((dataDocente) => {
        setDocente(dataDocente);
      });
    }
  }, [curso]);

  useEffect(() => {
    if (alertOk) {
      setTimeout(() => {
        setAlertOk(false);
        router.back();
      }, 3000);
    }
  }, [alertOk]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{ color: '#802c2c' }} />
      </Box>
    );
  }

  if (fallout && !loading) {
    return (
      <div className='mx-auto flex flex-col items-center justify-center text-ivory'>
        <h1>Ha ocurrido un error</h1>
        <Button onClick={() => router.back()} styling='primary'>
          Regresar
        </Button>
      </div>
    );
  }

  function handleClickCalifiaciones() {
    const calificacionesSession = sessionStorage.getItem('calificaciones');

    if (calificacionesSession && curso?.id) {
      const parsedCalificaciones = JSON.parse(calificacionesSession);

      const calificaciones: Calificacion[] = [];

      for (let clave in parsedCalificaciones) {
        if (parsedCalificaciones.hasOwnProperty(clave)) {
          const calificacion: Calificacion = {
            estudianteId: clave,
            calificacionCurso: parsedCalificaciones[clave],
          };
          calificaciones.push(calificacion);
        }
      }

      if (calificaciones) {
        calificarCursoFetch(curso!.id, calificaciones).then((data) => {
          setAlertOk(true);
        });
      }
    }

    setOpen(false);
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{ color: '#802c2c' }} />
      </Box>
    );
  }

  if (fallout && !loading) {
    return (
      <div className='mx-auto flex flex-col items-center justify-center text-ivory'>
        <h1>Ha ocurrido un error</h1>
        <Button onClick={() => router.back()} styling='primary'>
          Regresar
        </Button>
      </div>
    );
  }

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-5/6'>
      <h1 className='text-center'>Calificar curso</h1>
      <div className='h-fit w-full p-2'>
        <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
          <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
            <h3 className='m-0 p-0'>Datos del curso</h3>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Asignatura: </p>
              <p>{asignatura?.nombre}</p>
            </div>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Fecha de inicio: </p>
              <p>{curso?.fechaInicio.toString()}</p>
            </div>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Fecha de fin: </p>
              <p>{curso?.fechaFin.toString()}</p>
            </div>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Docente: </p>
              <p>{docente?.nombre + ' ' + docente?.apellido}</p>
            </div>
          </div>
          <div className='my-4 box-content flex flex-row justify-end rounded-md bg-ivory p-4'>
            <Button
              disabled={disabled}
              styling='primary'
              onClick={() => setOpen(true)}
            >
              Ingresar calificaciones
            </Button>
          </div>
        </div>
        <h3>Estudiantes inscriptos al curso</h3>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='datos-estudiante'
        />
      </div>
      {open && (
        <>
          <div className='fixed inset-0 z-10 bg-black/50'></div>
          <div className='absolute inset-x-1/2 top-1/2 z-20 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
            <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
              <div className='rounded-md text-center font-bold text-black'>
                <h3 className='m-0 p-0'>Calificaciones</h3>
                <div className='flex flex-col'>
                  <p className='font-bold'>
                    Ingrese las calificaciones para los estudiantes
                  </p>
                </div>
                <List
                  rows={rows}
                  rowsLoading={rowsLoading}
                  columnsType='none'
                  editarCalificacionCurso={true}
                />
                <div className='items-center md:space-x-6'>
                  <div className='inline-block'>
                    <Button
                      styling='primary'
                      onClick={handleClickCalifiaciones}
                    >
                      Guardar
                    </Button>
                  </div>
                  <div className='inline-block'>
                    <Button styling='secondary' onClick={() => setOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {alertOk && (
        <Collapse
          in={alertOk}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            variant='filled'
            onClose={() => {
              setAlertOk(false);
            }}
          >
            ¡Inscripcion editados correctamente!
          </Alert>
        </Collapse>
      )}
    </div>
  );
}
