'use client';
import { useEffect, useState } from 'react';
import { getAsignatura, getPrevituras } from '@/lib/data/coordinador/actions';
import List from '@/components/List/list';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { Asignatura } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export default function AsignaturaPage({
  params,
}: {
  params: { id: string; asignaturaId: string };
}) {
  const router = useRouter();
  const [asignatura, setAsignatura] = useState<Asignatura>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeAsignatura = await getAsignatura(params.asignaturaId);
      if (existeAsignatura) {
        setAsignatura(existeAsignatura);
      } else {
        setFallout(true);
      }
      const previas = await getPrevituras(params.asignaturaId);
      if (previas) {
        setRows(previas);
      }
      setRowsLoading(false);
    };
    fetch().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#802c2c' }} />
        </Box>
      )}
      <div className='relative box-border size-full justify-center overflow-auto px-3 md:w-5/6'>
        {!fallout && !loading && (
          <>
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
            </div>
            <div>
              <List
                rows={rows}
                rowsLoading={rowsLoading}
                columnsType='previtaturas'
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
