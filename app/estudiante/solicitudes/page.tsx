'use client';

import List from '@/components/List/list';
import { obtenerCarrerasInscriptoFetch } from '@/lib/data/estudiante/actions';
import { useEffect, useState } from 'react';

export default function SolicitudesHome() {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    obtenerCarrerasInscriptoFetch().then((data) => {
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
  }, []);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Carreras del estudiante</h1>
      <div className='h-fit w-full p-4'>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='none'
          isSolicitudTramite={true}
        />
      </div>
    </div>
  );
}
