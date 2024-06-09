'use client';

import List from '@/components/List/list';
import { getInscriptosAExamen } from '@/lib/data/funcionario/actions';
import { Estudiante, Examen } from '@/lib/definitions';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function inscriptosExamenPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeInscriptos = await getInscriptosAExamen(params.id);
      if (existeInscriptos) {
        const inscriptos = existeInscriptos.map(
          (inscripcion: { estudiante: Estudiante }) => ({
            id: inscripcion.estudiante.id,
            ci: inscripcion.estudiante.ci,
            nombre: inscripcion.estudiante.nombre,
            apellido: inscripcion.estudiante.apellido,
            email: inscripcion.estudiante.email,
            telefono: inscripcion.estudiante.telefono,
            domicilio: inscripcion.estudiante.domicilio,
          })
        );
        setRows(inscriptos);
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
      {!loading && (
        <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
          <h1 className='text-center font-bold'>Inscriptos</h1>
          <List
            rows={rows}
            rowsLoading={rowsLoading}
            columnsType='inscriptosExamenFuncionario'
          />
        </div>
      )}
    </>
  );
}
