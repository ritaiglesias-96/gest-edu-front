'use client';
import List from '@/components/List/list';
import { obtenerAsignaturasParaInscripcionExamenFetch } from '@/lib/data/estudiante/actions';
import { useState, useEffect } from 'react';

export default function ExamenesEstudiante({
  params,
}: {
  params: { id: string };
}) {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      obtenerAsignaturasParaInscripcionExamenFetch(params.id).then((data) => {
        setRows(data.content ? data.content : []);
        setRowsLoading(false);
      });
    }
  }, [params.id]);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Inscripciones a examen</h1>
      <h6 className='text-center font-bold'>Seleccione una asignatura</h6>
      <div className='h-fit w-full p-4'>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='asignatura-examenes'
        />
      </div>
    </div>
  );
}
