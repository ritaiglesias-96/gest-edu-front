'use client';
import styles from './page.module.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EyeIcon from '@/assets/svg/visibility.svg';
import Link from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', maxWidth: 70 },
  { field: 'nombre', headerName: 'Nombre', maxWidth: 200 },
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
    cellClassName: 'flex items-center',
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

const rows = [
  {
    id: 1,
    nombre: 'Tecnologo informatico InitData',
    descripcion:
      'Carrera de tecnologo informatico donde se enseña a programar en java, c++, c# y python',
    duracionAnios: 3,
    creditos: 256,
    existePlanEstudio: false,
  },
  {
    id: 2,
    nombre: 'Diseño UX/UI InitData',
    descripcion:
      'Carrera de diseño UX/UI donde se enseña a diseñar interfaces de usuario y experiencia de usuario',
    duracionAnios: 2,
    creditos: 180,
    existePlanEstudio: false,
  },
];

export default function CarrerasPage() {
  return (
    <div className='relative h-full m-w-fit overflow-auto justify-center py-10 box-border'>
      <div className='h-fit w-fit px-4'>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          rowSelection={false}
          disableColumnResize={true}
          pageSizeOptions={[5, 10]}
          className={styles.dataTable}
        />
      </div>
    </div>
  );
}
