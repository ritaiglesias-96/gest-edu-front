'use client';
import { useEffect, useState } from 'react';
import { getPeriodosExamenCarrera } from '@/lib/data/funcionario/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import Link from 'next/link';
import { Carrera } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';

export default function InscripcionesPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [carrera, setCarrera] = useState<Carrera>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetch = async () => {
      const existePeriodos = await getPeriodosExamenCarrera(params.id);
      if (existePeriodos) {
        const modifiedData = existePeriodos.periodos.map((item: any) => ({
          ...item,
          fechaInicio: formatDate(item.fechaInicio),
          fechaFin: formatDate(item.fechaFin),
        }));
        setCarrera(existePeriodos.carrera);
        setRows(modifiedData);
        setRowsLoading(false);
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
      <div className='relative box-border size-full justify-center overflow-auto md:w-5/6'>
        {!fallout && !loading && (
          <div className='h-fit w-full p-2'>
            <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
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
              <div className='flex w-fit max-w-52 flex-col justify-center rounded-md'>
                {carrera?.existePlanEstudio && (
                  <Link
                    href={`/funcionario/carreras/${params.id}/agregar-periodo-examen`}
                  >
                    <Button className='w-full' styling='primary'>
                      Registrar periodo de examen
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <List
              rows={rows}
              rowsLoading={rowsLoading}
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
