'use client';
import List from '@/components/List/list';
import Button from '@/components/Button/button';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { getCarreraYAsignatura } from '@/lib/data/coordinador/actions';
import { useRouter } from 'next/navigation';
import { convertirFecha } from '@/utils/utils';
import { useEffect, useState } from 'react';
import {
  Asignatura,
  Carrera,
  Examen,
  ExamenFlattened,
  Curso,
  CursoAsignatura,
} from '@/lib/definitions';
import {
  geExamenesPendientesCalificacion,
  getExamenesCalificadosAsignatura,
  getCursosCalificadosAsignatura,
  getCursosCarrera,
} from '@/lib/data/funcionario/actions';

export default function CalificacionesPendientesPage({
  params,
}: {
  params: { carreraId: string };
}) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsCurso, setRowsCurso] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [rowsLoadingCurso, setRowsLoadingCurso] = useState(true);
  const [examenesCalificados, setExamenesCalificados] = useState<any[]>([]);
  const [examenesCalificadosLoading, setExamenesCalificadosLoading] =
    useState(true);
  const [cursosCalificados, setCursosCalificados] = useState<any[]>([]);
  const [cursosCalificadosLoading, setCursosCalificadosLoading] =
    useState(true);
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState<Carrera>({} as Carrera);
  const [as, setAs] = useState<Asignatura[]>([]);

  const fetchExamenesCalificados = async () => {
    try {
      const allExamenesAsignatura = [];
      for (const asignatura of as) {
        const data = await getExamenesCalificadosAsignatura(asignatura.id);
        allExamenesAsignatura.push(...data);
      }
      allExamenesAsignatura.forEach((element) => {
        element.nombreAsignatura = element.asignatura.nombre;
        element.fecha = convertirFecha(element.fecha);
      });
      setExamenesCalificados(allExamenesAsignatura);
    } catch (error) {
      console.error('Error fetching examenes calificados:', error);
    } finally {
      setExamenesCalificadosLoading(false);
    }
  };

  const fetchExamenesNoCalificados = async () => {
    const data = await geExamenesPendientesCalificacion();
    if (data) {
      console.log(data);
      const arrayExamenesCarrera: ExamenFlattened[] = [];
      if (data.examenes) {
        data.examenes.forEach((element: Examen) => {
          if (element.asignatura.carreraId.toString() === params.carreraId) {
            arrayExamenesCarrera.push({
              id: element.id,
              fecha: convertirFecha(element.fecha.toString()),
              diasPrevInsc: element.diasPrevInsc,
              estado: element.estado,
              idAsignatura: element.asignatura.id,
              nombreAsignatura: element.asignatura.nombre,
              descripcionAsignatura: element.asignatura.descripcion,
              creditos: element.asignatura.creditos,
              semestrePlanEstudios: element.asignatura.semestrePlanEstudios,
              carreraId: element.asignatura.carreraId,
              docentes: [],
            });
          }
        });
      }
      setRows(arrayExamenesCarrera);
      setRowsLoading(false);
    }
  };

  const fetchCursos = async () => {
    try {
      const data = await getCursosCarrera(params.carreraId);
      if (data?.cursos.length > 0) {
        const cursosAsignatura: CursoAsignatura[] = [];
        data?.cursos.forEach((c: Curso) => {
          as.forEach((a: Asignatura) => {
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
              cursosAsignatura.push(ca);
            }
          });
        });
        setRowsCurso(cursosAsignatura);
      }
    } catch (error) {
      console.error('Error fetching cursos:', error);
    } finally {
      setRowsLoadingCurso(false);
    }
  };

  const fetchCursosCalificados = async () => {
    try {
      const allCursosAsignatura: CursoAsignatura[] = [];
      for (const asignatura of as) {
        const data = await getCursosCalificadosAsignatura(asignatura.id);
        data.forEach((element: CursoAsignatura) => {
          element.nombreAsignatura = asignatura.nombre;
          allCursosAsignatura.push(element);
        });
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

  useEffect(() => {
    const fetch = async () => {
      getCarreraYAsignatura(params.carreraId)
        .then((data) => {
          if (data) {
            setCar(data.carrera);
            setAs(data.asignaturas);
          }
        })
        .catch(() => {
          setFallout(true);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchExamenesNoCalificados();
    fetchCursos();
    fetchExamenesCalificados();
    fetchCursosCalificados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [as]);

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
            <h3 className='m-0 p-0'>{car?.nombre}</h3>
            <div className='flex flex-col'>
              <p className='font-bold'>Descripcion:</p>
              <p>{car?.descripcion}</p>
            </div>
          </div>
          <div className='flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center'>
            <div className='flex flex-col'>
              <p className='font-bold'>Duracion:</p>
              <p>{car?.duracionAnios + ' años'}</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-bold'>Creditos:</p>
              <p>{car?.creditos + ' creditos'}</p>
            </div>
          </div>
        </div>
        <h3>Calificar Cursos</h3>
        <List
          rows={rowsCurso}
          rowsLoading={rowsLoadingCurso}
          columnsType='calficar-cursos'
        />
        <h3>Calificar Examenes</h3>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='calficar-examenes'
        />
        <h3>Ver Calificaciones cursos</h3>
        <List
          rows={cursosCalificados}
          rowsLoading={cursosCalificadosLoading}
          columnsType='cursosCalificados'
        />
        <h3>Ver Calificaciones examenes</h3>
        <List
          rows={examenesCalificados}
          rowsLoading={examenesCalificadosLoading}
          columnsType='examenesCalificados'
        />
      </div>
    </div>
  );
}
