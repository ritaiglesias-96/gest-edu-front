'use client';
import { getEstudiantes } from '@/lib/data/funcionario/actions';
import { useEffect, useState } from 'react';
import List from '@/components/List/list';

export default function EstudiantePage() {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    getEstudiantes().then((data) => {
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Estudiantes</h1>
      <List rows={rows} rowsLoading={rowsLoading} columnsType='estudiante' />
    </div>
  );
}
