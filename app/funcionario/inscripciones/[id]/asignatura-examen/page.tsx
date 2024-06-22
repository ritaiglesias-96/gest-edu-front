'use client';

import List from '@/components/List/list';
import { getAsignaturasConExamenActivo } from '@/lib/data/funcionario/actions';
import { useEffect, useState } from 'react';

export default function AsignaturasExamenPage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const asignatura = await getAsignaturasConExamenActivo(params.id);
      setRows(asignatura);
      setRowsLoading(false);
    };
    fetch();
  }, [params.id]);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>
        Asignaturas con examenes activos
      </h1>
      <List
        rows={rows}
        rowsLoading={rowsLoading}
        columnsType='asignaturaExamenFuncionario'
      />
    </div>
  );
}
