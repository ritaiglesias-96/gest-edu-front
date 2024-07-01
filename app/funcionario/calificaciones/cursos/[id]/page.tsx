'use client';
import { useEffect, useState } from 'react';
import { getCarreraYAsignatura } from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import { Asignatura, Carrera, Curso, CursoAsignatura } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';
import {
  getCursosCalificadosAsignatura,
  getCursosCarrera,
} from '@/lib/data/funcionario/actions';
import { convertirFecha } from '@/utils/utils';

export default function CalificacionCursoPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [cursosCalificados, setCursosCalificados] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [cursosCalificadosLoading, setCursosCalificadosLoading] =
    useState(true);
  const [carrera, setCarrera] = useState<Carrera>();
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeCarrera = await getCarreraYAsignatura(params.id);
      if (existeCarrera) {
        setCarrera(existeCarrera.carrera);
        setAsignaturas(existeCarrera.asignaturas);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    const fetch = async () => {
      const existeCursos = await getCursosCarrera(params.id);
      if (existeCursos) {
        const cursos = existeCursos.cursos;
        const crusosAsignarua: CursoAsignatura[] = [];

        cursos.map((c: Curso) => {
          asignaturas.map((a: Asignatura) => {
            if (c.asignaturaId === a.id) {
              const ca: CursoAsignatura = {
                id: c.id,
                fechaInicio: convertirFecha(c.fechaInicio),
                fechaFin: convertirFecha(c.fechaFin),
                diasPrevInsc: c.diasPrevInsc,
                estado: c.estado,
                asignaturaId: c.asignaturaId,
                nombreAsignatura: a.nombre,
                docenteId: c.docenteId,
              };
              crusosAsignarua.push(ca);
            }
          });
        });
        setRows(crusosAsignarua);
        setRowsLoading(false);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asignaturas]);

  useEffect(() => {
    const fetchCursosCalificados = async () => {
      try {
        const allCursosAsignatura = [];
        for (const asignatura of asignaturas) {
          const data = await getCursosCalificadosAsignatura(asignatura.id);
          data[0].nombreAsignatura = asignaturas.find(
            (a) => a.id === asignatura.id
          )?.nombre;
          allCursosAsignatura.push(...data);
        }
        allCursosAsignatura.forEach((element) => {
          element.fechaInicio = convertirFecha(element.fechaInicio);
          element.fechaFin = convertirFecha(element.fechaFin);
        });
        setCursosCalificados(allCursosAsignatura);
      } catch (error) {
        console.error('Error fetching cursos calificados:', error);
      } finally {
        setCursosCalificadosLoading(false);
      }
    };
    fetchCursosCalificados();
  }, [asignaturas]);

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
      <h1 className='text-center font-bold'>Calificaciones</h1>
      <h4 className='text-center font-bold'>Seleccione un curso</h4>
      <div className='h-fit w-full p-2'>
        <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
          <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
            <h3 className='m-0 p-0'>{carrera?.nombre}</h3>
            <div className='flex flex-col'>
              <p className='font-bold'>Descripcion:</p>
              <p>{carrera?.descripcion}</p>
            </div>
          </div>
          <div className='flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center'>
            <div className='flex flex-col'>
              <p className='font-bold'>Duracion:</p>
              <p>{carrera?.duracionAnios + ' años'}</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-bold'>Creditos:</p>
              <p>{carrera?.creditos + ' creditos'}</p>
            </div>
          </div>
        </div>
        <h3>Calificar Cursos</h3>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='calficar-cursos'
        />
        <h3>Ver Calificaciones</h3>
        <List
          rows={cursosCalificados}
          rowsLoading={cursosCalificadosLoading}
          columnsType='cursosCalificados'
        />
      </div>
    </div>
  );
}
