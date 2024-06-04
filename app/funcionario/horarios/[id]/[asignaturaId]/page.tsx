'use client';
import { useEffect, useState } from 'react';
import {
  getAsignatura,
  getPeriodosExamenCarrera,
  getCursosAsignatura,
} from '@/lib/data/funcionario/actions';
import { Curso } from '@/lib/definitions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import List from '@/components/List/list';
import Link from 'next/link';
import { Asignatura } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/utils';

export default function AsignaturaPage({
  params,
}: {
  params: { id: string; asignaturaId: string };
}) {
  const router = useRouter();
  const [rowsExamen, setRowsExamen] = useState<any[]>([]);
  const [rowsCurso, setRowsCurso] = useState<any[]>([]);
  const [rowsExamenLoading, setRowsExamenLoading] = useState(true);
  const [rowsCursoLoading, setRowsCursoLoading] = useState(true);
  const [asignatura, setAsignatura] = useState<Asignatura>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeAsignatura = await getAsignatura(params.asignaturaId);
      if (existeAsignatura) {
        setAsignatura(existeAsignatura);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.asignaturaId]);

  function formatDate(dateString: string): string {
    const parts = dateString.split('T');
    if (parts.length !== 2) {
      throw new Error('Invalid date format. Expected YYYY-MM-DDTHH:mm');
    }

    const datePart = parts[0];
    const [year, month, day] = datePart.split('-');

    // Ensure two-digit formatting for month and day
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  function formatDateCurso(dateString: string): string {
    // Check for empty string input (optional)
    if (!dateString) {
      return '';
    }

    // Create a Date object from the string
    const date = new Date(dateString);

    // Check for invalid date format
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string provided: ' + dateString); // Throw an error for invalid format
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

    return `${day}/${month}/${year}`; // Format the date string
  }

  useEffect(() => {
    const fetch = async () => {
      const existePeriodos = await getPeriodosExamenCarrera(params.id);
      const existeCursos = await getCursosAsignatura(params.asignaturaId);

      if (existePeriodos && existeCursos) {
        const periodos = existePeriodos.periodos.map((item: any) => ({
          ...item,
          fechaInicio: formatDate(item.fechaInicio),
          fechaFin: formatDate(item.fechaFin),
        }));
        setRowsExamen(periodos);
        setRowsExamenLoading(false);
        const cursos = existeCursos.map((item: Curso) => ({
          ...item,
          fechaInicio: formatDateCurso(item.fechaInicio),
          fechaFin: formatDateCurso(item.fechaFin),
        }));
        setRowsCurso(cursos);
        setRowsCursoLoading(false);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.id]);

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#802c2c' }} />
        </Box>
      )}
      <div className='relative box-border size-full w-3/6 justify-center overflow-auto'>
        {!fallout && !loading && (
          <div className='h-fit w-full p-2'>
            <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
              <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
                <h3 className='m-0 p-0'>{asignatura?.nombre}</h3>
                <div className='flex flex-col'>
                  <p className='font-bold'>Descripcion:</p>
                  <p>{asignatura?.descripcion}</p>
                </div>
              </div>
              <div className='flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center'>
                <div className='flex flex-col'>
                  <p className='font-bold'>Creditos:</p>
                  <p>{asignatura?.creditos + ' creditos'}</p>
                </div>
              </div>
              <div className='flex w-full flex-col justify-center rounded-md md:max-w-52'>
                <Link
                  href={`/funcionario/horarios/${params.id}/${params.asignaturaId}/agregar-fecha-examen`}
                >
                  <Button className='w-full' styling='primary'>
                    Registrar Fecha de Examen
                  </Button>
                </Link>
              </div>
            </div>
            <h3>Periodos de Examen</h3>
            <List
              rows={rowsExamen}
              rowsLoading={rowsExamenLoading}
              columnsType='periodosExamen'
            />
            <h3>Cursos</h3>
            <List
              rows={rowsCurso}
              rowsLoading={rowsCursoLoading}
              columnsType='cursos'
            />
          </div>
        )}
        {fallout && !loading && (
          <div className='mx-auto flex flex-col items-center justify-center text-ivory'>
            <h1>Ha ocurrido un error</h1>
            <Button onClick={() => router.back()} styling='primary'>
              Regresar
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
