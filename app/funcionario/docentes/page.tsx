'use client';

import List from '@/components/List/list';
import { getDocentes } from '@/lib/data/funcionario/actions';
import { useEffect, useState } from 'react';

export default function DocentePage() {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    getDocentes().then((data) => {
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
  }, []);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Docentes</h1>
      <List
        isEditableDocentes={true}
        rows={rows}
        rowsLoading={rowsLoading}
        columnsType='none'
      />
    </div>
  );
}
