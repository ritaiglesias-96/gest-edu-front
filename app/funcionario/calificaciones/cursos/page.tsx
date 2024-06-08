'use client';
import { useEffect, useState } from 'react';
import { getCarreras } from '@/lib/data/coordinador/actions';
import List from '@/components/List/list';

export default function CarrerasPageCursos() {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    getCarreras().then((data) => {
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
  }, []);
  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Calificaciones</h1>
      <h4 className='text-center font-bold'>Seleccione una carrera</h4>
      <div className='h-fit w-full p-4'>
        <List rows={rows} rowsLoading={rowsLoading} columnsType='carrera-calificaciones' />
      </div>
    </div>
  );
}