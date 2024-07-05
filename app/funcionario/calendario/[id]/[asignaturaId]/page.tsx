'use client';
import { useEffect, useState } from 'react';
import {
  getAsignatura,
  getPeriodosExamenCarrera,
  getCursosAsignatura,
  getExamenesAsignaturaTodos,
} from '@/lib/data/funcionario/actions';
import { Curso, Docente, Examen, ExamenList } from '@/lib/definitions';
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
  const [rowsPeriodoExamen, setRowsPeriodoExamen] = useState<any[]>([]);
  const [rowsPeriodoExamenLoading, setRowsPeriodoExamenLoading] =
    useState(true);
  const [rowsCurso, setRowsCurso] = useState<any[]>([]);
  const [rowsCursoLoading, setRowsCursoLoading] = useState(true);
  const [rowsExamen, setRowsExamen] = useState<any[]>([]);
  const [rowsExamenLoading, setRowsExamenLoading] = useState(true);
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
      const existeExamenes = await getExamenesAsignaturaTodos(
        params.asignaturaId
      );
      if (existePeriodos) {
        const periodos = existePeriodos.periodos.map((item: any) => ({
          ...item,
          fechaInicio: convertirFecha(item.fechaInicio),
          fechaFin: convertirFecha(item.fechaFin),
        }));
        setRowsPeriodoExamen(periodos);
        setRowsPeriodoExamenLoading(false);
      }
      if (existeCursos) {
        const cursos = existeCursos.map((curso: Curso) => ({
          ...curso,
          fechaInicio: convertirFechaCurso(curso.fechaInicio),
          fechaFin: convertirFechaCurso(curso.fechaFin),
        }));
        setRowsCurso(cursos);
        setRowsCursoLoading(false);
      }
      if (existeExamenes) {
        const examenes = existeExamenes.map((examen: ExamenList) => ({
          id: examen.id,
          fecha: convertirFecha(examen.fecha.toString()),
          asignatura: examen.asignatura.nombre,
          docentes: examen.docentes.map((docente: Docente) => {
            return docente.nombre;
          }),
        }));
        setRowsExamen(examenes);
        setRowsExamenLoading(false);
      }
      if (!existePeriodos && !existeCursos && !existeExamenes) {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.asignaturaId, params.id]);

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
      <div className='h-fit w-full p-2'>
        <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
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
            <Link
              href={`/funcionario/calendario/${params.id}/${params.asignaturaId}/agregar-curso`}
            >
              <Button className='w-full' styling='primary'>
                Registrar Fecha de Curso
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
        <h3>Examenes</h3>
        <List
          rows={rowsExamen}
          rowsLoading={rowsExamenLoading}
          columnsType='examen'
        />
        <h3>Periodos de Examen</h3>
        <List
          rows={rowsPeriodoExamen}
          rowsLoading={rowsPeriodoExamenLoading}
          columnsType='periodosExamen'
        />
      </div>
    </div>
  );
}
