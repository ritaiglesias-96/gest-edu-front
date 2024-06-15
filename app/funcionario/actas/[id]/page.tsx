'use client';

import List from '@/components/List/list';
import { getAsignaturasCarrera } from '@/lib/data/actions';
import { useEffect, useState } from 'react';

export default function AsignaturasActasPage({
  params,
}: {
  params: { id: string };
}) {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    getAsignaturasCarrera(params.id).then((data) => {
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
  }, [params.id]);
  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <div className='h-fit w-full'>
        <div className='my-4 flex flex-row items-center justify-between rounded-md bg-ivory p-4'>
          <h3 className='text-center font-bold text-black'>
            Seleccione la asignatura para generar acta
          </h3>
        </div>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='actasAsignaturasFuncionario'
        />
      </div>
    </div>
  );
}
