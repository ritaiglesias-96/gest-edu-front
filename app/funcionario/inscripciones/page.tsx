'use client';
import { useEffect, useState } from 'react';
import { getCarreras } from '@/lib/data/actions';
import List from '@/components/List/list';
import Link from 'next/link';
import Button from '@/components/Button/button';

export default function CarrerasPage() {
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
      <div className='h-fit w-full'>
        <div className='my-4 flex flex-row items-center justify-between rounded-md bg-ivory p-4'>
          <h3 className='text-center font-bold text-black'>Inscripciones</h3>
          <Link href={`/funcionario/inscripciones/solicitudes`}>
            <Button className='w-full' styling='primary'>
              Solicitudes de inscripcion a carrera
            </Button>
          </Link>
        </div>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='carreraInscripcionFuncionario'
        />
      </div>
    </div>
  );
}
