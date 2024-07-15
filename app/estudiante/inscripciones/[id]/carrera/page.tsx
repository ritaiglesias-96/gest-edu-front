'use client';
import { useEffect, useState } from 'react';
import { getCarreraYAsignatura } from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import Link from 'next/link';
import { Carrera } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';

export default function CarreraPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [carrera, setCarrera] = useState<Carrera>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeCarrera = await getCarreraYAsignatura(params.id);
      if (existeCarrera) {
        const fetchedCarrera = existeCarrera.carrera;
        if (fetchedCarrera.duracionAnios === null) {
          fetchedCarrera.duracionAnios = 0;
        }
        if (fetchedCarrera.creditos === null) {
          fetchedCarrera.creditos = 0;
        }
        setCarrera(fetchedCarrera);
        setRows(existeCarrera.asignaturas);
        setRowsLoading(false);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.id]);

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
        <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 lg:flex-row lg:align-baseline'>
          <div className='flex max-w-full flex-col break-all rounded-md text-center font-bold text-black lg:max-w-md lg:text-left'>
            <h3 className=''>{carrera?.nombre}</h3>
            <div className='flex flex-col'>
              <p className='font-bold'>Descripcion:</p>
              <p>{carrera?.descripcion}</p>
            </div>
          </div>
          <div className='flex w-full flex-row justify-evenly rounded-md text-black lg:w-fit lg:flex-col lg:justify-center'>
            <div className='flex flex-col'>
              <p className='font-bold'>Duracion:</p>
              <p>{carrera?.duracionAnios ?? 0} años</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-bold'>Creditos:</p>
              <p>{carrera?.creditos ?? 0} creditos</p>
            </div>
          </div>
          <div className='flex w-full flex-col justify-center rounded-md lg:max-w-52'>
            {rows.length > 0 && (
              <Link href={`${window.location.pathname}/plan-estudio`}>
                <Button className='w-full' styling='primary'>
                  Ver Plan de estudio
                </Button>
              </Link>
            )}
          </div>
        </div>
        <List rows={rows} rowsLoading={rowsLoading} columnsType='asignatura' />
      </div>
    </div>
  );
}
