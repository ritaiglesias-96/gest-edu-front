'use client';

import List from '@/components/List/list';
import { getExamenesAsignatura } from '@/lib/data/funcionario/actions';
import { Examen } from '@/lib/definitions';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ExamenActivoPage({
  params,
}: {
  params: { id: string; asignaturaId: string };
}) {
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeExamen = await getExamenesAsignatura(params.asignaturaId);
      console.log('🚀 ~ fetch ~ existeExamen:', existeExamen);
      if (!existeExamen.message) {
        const examenes = existeExamen.content.map((examen: Examen) => ({
          id: examen.id,
          fecha: new Date(examen.fecha).toLocaleDateString('es-ES'),
          asignaturaNombre: examen.asignatura.nombre,
        }));
        setRows(examenes);
      }
      setRowsLoading(false);
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
      {!loading && (
        <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
          <h1 className='text-center font-bold'>Examenes</h1>
          <List
            rows={rows}
            rowsLoading={rowsLoading}
            columnsType='examenFuncionario'
          />
        </div>
      )}
    </>
  );
}
