'use client';
import List from '@/components/List/list';
import Button from '@/components/Button/button';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { getCarrera } from '@/lib/data/coordinador/actions';
import { useRouter } from 'next/navigation';
import { convertirFecha } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { Carrera, Examen, ExamenFlattened } from '@/lib/definitions';
import { geExamenesPendientesCalificacion } from '@/lib/data/funcionario/actions';

export default function ExamenesPendientesPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [carrera, setCarrera] = useState<Carrera>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCarrera(params.id).then((data) => {
      setCarrera(data);
    });
  }, [params.id]);

  useEffect(() => {
    geExamenesPendientesCalificacion().then((data) => {
      if (data) {
        const arrayExamenesCarrera: ExamenFlattened[] = [];
        if (data.examenes) {
          data.examenes.forEach((element: Examen) => {
            if (element.asignatura.carreraId.toString() === params.id) {
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
        setLoading(false);
        setFallout(false);
        setRowsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carrera]);

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
      {!fallout && !loading && (
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
          <h3>Examenes</h3>
          <List
            rows={rows}
            rowsLoading={rowsLoading}
            columnsType='calficar-examenes'
          />
        </div>
      )}
    </div>
  );
}
