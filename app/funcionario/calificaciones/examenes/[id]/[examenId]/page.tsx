'use client';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import { Estudiante, Examen, CalificacionExamen } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';
import {
  calificarExamenFetch,
  geExamenesPendientesCalificacion,
  getEstudiantesInscriptosExamen,
} from '@/lib/data/funcionario/actions';
import { convertirFecha } from '@/utils/utils';

export default function CursoPage({
  params,
}: Readonly<{
  params: { examenId: string };
}>) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [examen, setExamen] = useState<Examen>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (params.examenId) {
      geExamenesPendientesCalificacion().then((data) => {
        if (data) {
          const examenes = data?.examenes;
          const examenEncontrado = examenes.find(
            (examen: Examen) => examen.id.toString() === params.examenId
          );
          setExamen(examenEncontrado);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (examen?.id) {
      const arrayEstudiantes: Estudiante[] = [];
      getEstudiantesInscriptosExamen(examen.id.toString()).then((data) => {
        if (data.estudiantes) {
          data.estudiantes.forEach((element: any) => {
            arrayEstudiantes.push(element.estudiante);
          });
        }
        setRows(arrayEstudiantes);
        setRowsLoading(false);
        setLoading(false);
        setFallout(false);
      });
    }
  }, [examen]);

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

    if (calificacionesSession && examen?.id) {
      const parsedCalificaciones = JSON.parse(calificacionesSession);

      const calificaciones: CalificacionExamen[] = [];

      for (let clave in parsedCalificaciones) {
        if (parsedCalificaciones.hasOwnProperty(clave)) {
          const calificacion: CalificacionExamen = {
            estudianteId: clave,
            calificacion: parsedCalificaciones[clave],
          };
          calificaciones.push(calificacion);
        }
      }

      if (calificaciones) {
        calificarExamenFetch(examen.id, calificaciones).then((data) => {
          //TODO: mostrar mensaje de confirmacion
        });
      }
    }

    setOpen(false);
  }

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-5/6'>
      <h1 className='text-center'>Examen</h1>
      <div className='h-fit w-full p-2'>
        <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
          <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
            <h3 className='m-0 p-0'>Datos del examen</h3>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Asignatura: </p>
              <p>{examen?.asignatura?.nombre}</p>
            </div>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Fecha de inicio: </p>
              <p>
                {examen?.fecha ? convertirFecha(examen?.fecha.toString()) : ''}
              </p>
            </div>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Docentes: </p>
              <p>{examen?.docentes}</p>
            </div>
          </div>
          <div className='my-4 box-content flex flex-row justify-end rounded-md bg-ivory p-4'>
            <Button styling='primary' onClick={() => setOpen(true)}>
              Ingresar calificaciones
            </Button>
          </div>
        </div>
        <h3>Estudiantes inscriptos al examen</h3>
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
                  editarCalificacionExamen={true}
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
    </div>
  );
}
