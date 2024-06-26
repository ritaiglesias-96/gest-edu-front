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
import { convertirFecha, convertirFechaCurso } from '@/utils/utils';

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

  useEffect(() => {
    const fetch = async () => {
      const existePeriodos = await getPeriodosExamenCarrera(params.id);
      const existeCursos = await getCursosAsignatura(params.asignaturaId);

      if (existePeriodos && existeCursos) {
        const periodos = existePeriodos.periodos.map((item: any) => ({
          ...item,
          fechaInicio: convertirFecha(item.fechaInicio),
          fechaFin: convertirFecha(item.fechaFin),
        }));
        setRowsExamen(periodos);
        setRowsExamenLoading(false);
        const cursos = existeCursos.map((item: Curso) => ({
          ...item,
          fechaInicio: convertirFechaCurso(item.fechaInicio),
          fechaFin: convertirFechaCurso(item.fechaFin),
        }));
        setRowsCurso(cursos);
        setRowsCursoLoading(false);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.asignaturaId, params.id]);

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
                  href={`/funcionario/calendario/${params.id}/${params.asignaturaId}/agregar-fecha-examen`}
                >
                  <Button className='w-full' styling='primary'>
                    Registrar Fecha de Examen
                  </Button>
                </Link>
              </div>
            </div>
            <h3>Cursos</h3>
            <List
              rows={rowsCurso}
              rowsLoading={rowsCursoLoading}
              columnsType='cursos'
            />
            <h3>Periodos de Examen</h3>
            <List
              rows={rowsExamen}
              rowsLoading={rowsExamenLoading}
              columnsType='periodosExamen'
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
