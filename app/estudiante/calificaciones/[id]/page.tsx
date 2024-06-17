'use client';
import { useEffect, useState } from 'react';
import {
  editCarrera,
  getCarreraYAsignatura,
  getCarrera,
} from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import Link from 'next/link';
import PencilIcon from '@/assets/svg/edit.svg';
import Close from '@/assets/svg/close.svg';
import { Carrera, initialState } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import InputField from '@/components/InputField/inputField';
import List from '@/components/List/list';

export default function CarreraPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [carrera, setCarrera] = useState<Carrera>();
  const [fallout, setFallout] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeCarrera = await getCarreraYAsignatura(params.id);
      if (existeCarrera) {
        setCarrera(existeCarrera.carrera);
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
    <>
      <div className='relative box-border size-full justify-center overflow-auto md:w-5/6'>
        {!fallout && !loading && (
          <div className='h-fit w-full p-2'>
            <div className='my-2 box-content flex flex-col items-center justify-around gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
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
            <List
              rows={rows}
              rowsLoading={rowsLoading}
              columnsType='asignaturaCalificaciones'
            />
          </div>
        )}
      </div>
    </>
  );
}
