'use client';

import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Estudiante } from '@/lib/definitions';
import { getEstudiante } from '@/lib/data/funcionario/actions';

export default function EstudiantePage({ params }: { params: { ci: string } }) {
  const router = useRouter();
  const [estudiante, setEstudiante] = useState<Estudiante>();
  const [loading, setLoading] = useState(true);
  const [fallout, setFallout] = useState(false);

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const data = await getEstudiante(params.ci);
        setEstudiante(data);
        console.log(estudiante?.ci);      
      } catch (error) {
        setFallout(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEstudiante();
  }, [params.ci]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{ color: '#802c2c' }} />
      </Box>
    );
  }

  if (fallout) {
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
    <div className='relative box-border size-full justify-center overflow-auto md:w-auto'>
      <div className='h-fit w-full p-2'>
        <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
          <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
            <h3 className='m-0 p-0 text-center'>{estudiante?.nombre} {estudiante?.apellido}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              <div className='flex flex-col'>
                <p className='font-bold'>Cedula:</p>
                <p>{estudiante?.ci}</p>
              </div>
              <div className='flex flex-col'>
                <p className='font-bold'>Email:</p>
                <p>{estudiante?.email}</p>
              </div>
              <div className='flex flex-col'>
                <p className='font-bold'>Teléfono:</p>
                <p>{estudiante?.telefono}</p>
              </div>
              <div className='flex flex-col'>
                <p className='font-bold'>Domicilio:</p>
                <p>{estudiante?.domicilio}</p>
              </div>
              <div className='flex flex-col'>
                <p className='font-bold'>Fecha de Nacimiento:</p>
                <p>{estudiante?.fechaNac ? new Date(estudiante.fechaNac).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
