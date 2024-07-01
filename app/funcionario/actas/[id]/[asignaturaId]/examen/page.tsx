'use client';

import List from '@/components/List/list';
import { getExamenesAsignatura } from '@/lib/data/funcionario/actions';
import { Examen } from '@/lib/definitions';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ExamenesActaPage({
  params,
}: {
  params: { asignaturaId: string };
}) {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeExamen = await getExamenesAsignatura(params.asignaturaId);
      if (!existeExamen.message) {
        const examenes = existeExamen.content.map((examen: Examen) => ({
          id: examen.id,
          fecha: new Date(examen.fecha).toLocaleDateString('es-ES'),
          asignaturaNombre: examen.asignatura.nombre,
        }));
        setRows(examenes);
        setRowsLoading(false);
      } else {
        setRowsLoading(false);

        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.asignaturaId]);
  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#802c2c' }} />
        </Box>
      )}
      {!loading && (
        <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
          <div className='h-fit w-full'>
            <div className='my-4 flex flex-row items-center justify-between rounded-md bg-ivory p-4'>
              <h3 className='text-center font-bold text-black'>
                Seleccione el examen a generar acta
              </h3>
            </div>
            <div className='h-fit w-full p-4'>
              <List
                rows={rows}
                rowsLoading={rowsLoading}
                columnsType='actaExamen'
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
