'use client';

import Button from '@/components/Button/button';
import List from '@/components/List/list';
import { getUsuarios } from '@/lib/data/admin/actions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdministradorHome() {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    getUsuarios().then((data) => {
      console.log(data);
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
  }, []);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Usuarios</h1>
      <div className='h-fit w-full p-4'>
        <div className='my-4 box-content flex flex-row justify-end rounded-md bg-ivory p-4'>
          <Link href='/administrador/usuarios/agregar'>
            <Button styling='primary'>Agregar usuario</Button>
          </Link>
        </div>
        <List rows={rows} rowsLoading={rowsLoading} columnsType='usuario' />
      </div>
    </div>
  );
}
