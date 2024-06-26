'use client';
import { useEffect, useState } from 'react';
import { getCarreras } from '@/lib/data/coordinador/actions';
import Button from '@/components/Button/button';
import Link from 'next/link';
import List from '@/components/List/list';

export default function CarrerasPage() {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    getCarreras().then((data) => {
      console.log('🚀 ~ getCarreras ~ data:', data);
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
  }, []);
  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Carreras</h1>
      <div className='h-fit w-full p-4'>
        <div className='my-4 box-content flex flex-row justify-end rounded-md bg-ivory p-4'>
          <Link href='/coordinador/carreras/agregar'>
            <Button styling='primary'>Agregar Carrera</Button>
          </Link>
        </div>
        <List rows={rows} rowsLoading={rowsLoading} columnsType='carrera' />
      </div>
    </div>
  );
}
