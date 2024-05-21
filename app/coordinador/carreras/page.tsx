'use client';
import styles from './page.module.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EyeIcon from '@/assets/svg/visibility.svg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/button';
import { getCarreras } from '@/lib/data/coordinador/actions';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'nombre',
    headerName: 'Nombre',
    cellClassName: 'w-full',
  },
  {
    field: 'duracionAnios',
    headerName: 'Duracion',
    type: 'number',
  },
  {
    field: 'creditos',
    headerName: 'Creditos',
    type: 'number',
  },
  {
    field: 'detalles',
    headerName: 'Detalles',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`/coordinador/carreras/${params.id}`}
        className='flex h-fit w-fit mx-auto'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export default function CarrerasPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getCarreras().then((data) => {
      setRows(data.content);
    });
  }, []);
  return (
    <div className='relative h-full w-full md:w-2/3 m-w-fit overflow-auto justify-center box-border'>
      <h1 className='font-bold text-center'>Carreras</h1>
      <div className='h-fit w-full p-4'>
        <div className='flex flex-row rounded-md my-4 p-4 box-content bg-ivory'>
          <Link href='/coordinador/carreras/agregar'>
            <Button styling='primary'>Agregar Carrera</Button>
          </Link>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          rowSelection={false}
          autosizeOnMount={true}
          pageSizeOptions={[5, 10]}
          className={styles.dataTable}
          autosizeOptions={{ expand: true }}
        />
      </div>
    </div>
  );
}
