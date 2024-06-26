'use client';

import List from '@/components/List/list';
import {
  getAsignatura,
  getCursosAsignatura,
} from '@/lib/data/funcionario/actions';
import { Asignatura, Curso, Examen } from '@/lib/definitions';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function CursosActaPage({
  params,
}: {
  params: { asignaturaId: string };
}) {
  const [rows, setRows] = useState([]);
  const [asignatura, setAsignatura] = useState<Asignatura>();
  const [rowsLoading, setRowsLoading] = useState(true);
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeCurso = await getCursosAsignatura(params.asignaturaId);
      const asignatura = await getAsignatura(params.asignaturaId);
      setAsignatura(asignatura);
      if (existeCurso) {
        const cursos = existeCurso.map((curso: Curso) => ({
          id: curso.id,
          fechaInicio: new Date(curso.fechaInicio).toLocaleDateString('es-ES'),
          fechaFin: new Date(curso.fechaFin).toLocaleDateString('es-ES'),
        }));
        setRows(cursos);
        setRowsLoading(false);
      } else {
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
                {`Seleccione el curso de ${asignatura?.nombre.toLowerCase()} a generar acta`}
              </h3>
            </div>
            <List
              rows={rows}
              rowsLoading={rowsLoading}
              columnsType='actaCurso'
            />
          </div>
        </div>
      )}
    </>
  );
}
