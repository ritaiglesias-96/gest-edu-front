'use client';
import { useEffect, useState } from 'react';
import { getAsignatura } from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import { Curso, Asignatura, Docente } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';
import {
  getCurso,
  getDocente,
  getEstudiantesCalificadosCurso,
  getEstudiantesCalificadosExamen,
} from '@/lib/data/funcionario/actions';
import { convertirFecha } from '@/utils/utils';

export default function CalificacionesExamenPage({
  params,
}: Readonly<{ params: { examenId: string } }>) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [examen, setExamen] = useState<any>();
  const [asignatura, setAsignatura] = useState<Asignatura>();
  const [docente, setDocente] = useState<Docente>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.examenId) {
      getExamen(params.examenId).then((dataExamen) => {
        setExamen(dataExamen);
      });
    }
  }, [params.examenId]);

  useEffect(() => {
    if (examen?.id) {
      examen.fecha = convertirFecha(examen.fecha);
      getEstudiantesCalificadosExamen(examen.id).then(
        (arrayEstudiantes: any[]) => {
          if (arrayEstudiantes) {
            arrayEstudiantes.forEach((element: any) => {
              element.id = element.estudianteId;
            });
            setRows(arrayEstudiantes);
            setRowsLoading(false);
          }
          setFallout(false);
          setLoading(false);
        }
      );
      getAsignatura(examen.asignaturaId.toString()).then((dataAsignatura) => {
        setAsignatura(dataAsignatura);
      });
      getDocente(examen.docenteId.toString()).then((dataDocente) => {
        setDocente(dataDocente);
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

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-5/6'>
      <h1 className='text-center'>Calificar examen</h1>
      <div className='h-fit w-full p-2'>
        <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
          <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
            <h3 className='m-0 p-0'>Datos del examen</h3>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Asignatura: </p>
              <p>{asignatura?.nombre}</p>
            </div>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Fecha: </p>
              <p>{examen?.fecha.toString()}</p>
            </div>
            <div className='flex space-x-2'>
              <p className='w-32 font-bold'>Docente: </p>
              <p>{docente?.nombre + ' ' + docente?.apellido}</p>
            </div>
          </div>
        </div>
        <h3>Estudiantes inscriptos al examen</h3>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='calificacionExamen'
        />
      </div>
    </div>
  );
}
