import { GridColDef } from '@mui/x-data-grid';
import EyeIcon from '@/assets/svg/visibility.svg';
import Link from 'next/link';
import formatDate from '@/utils/dateFormatter';

export const carreraColumns: GridColDef[] = [
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
        href={`${window.location.pathname}/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const asignaturaColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'nombre',
    headerName: 'Nombre',
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
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
        href={`${window.location.pathname}/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const usuarioColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'ci',
    headerName: 'Cedula',
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
  },
  {
    field: 'rol',
    headerName: 'Rol',
    type: 'string',
  },
  {
    field: 'detalles',
    headerName: 'Detalles',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.row.ci}`}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const periodosExamenColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fechaInicio',
    headerName: 'Fecha de inicio',
  },
  {
    field: 'fechaFin',
    headerName: 'Fecha de fin',
  },
];
