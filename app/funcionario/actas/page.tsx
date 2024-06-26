'use client';

import List from '@/components/List/list';
import { getCarreras } from '@/lib/data/actions';
import { Carrera } from '@/lib/definitions';
import { useEffect, useState } from 'react';

export default function CarrerasActasPage() {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    getCarreras().then((data) => {
      const filteredRows = data.content
        ? data.content.filter((carrera: Carrera) => carrera.existePlanEstudio)
        : [];
      setRows(filteredRows);
      setRowsLoading(false);
    });
  }, []);
  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <div className='h-fit w-full'>
        <div className='my-4 flex flex-row items-center justify-between rounded-md bg-ivory p-4'>
          <h3 className='text-center font-bold text-black'>
            Generación de actas
          </h3>
        </div>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='actasFuncionario'
        />
      </div>
    </div>
  );
}
