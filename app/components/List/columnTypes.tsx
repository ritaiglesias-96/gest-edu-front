import { GridColDef } from '@mui/x-data-grid';
import EyeIcon from '@/assets/svg/visibility.svg';
import Enroll from '@/assets/svg/enroll-lesson.svg';
import Link from 'next/link';

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


export const estudianteColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'ci', headerName: 'Cedula' },
  { field: 'nombre', headerName: 'Nombre' },
  { field: 'apellido', headerName: 'Apellido' },
  { field: 'email', headerName: 'Email' },
  { field: 'telefono', headerName: 'Telefono' },
  { field: 'domicilio', headerName: 'Domicilio' },
  { field: 'fechaNac', headerName: 'Fecha de Nacimiento'},
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

export const carrerasEstudiante: GridColDef[] = [
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
    field: 'cursos',
    headerName: 'Cursos',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}/cursos`}
        onClick={() => sessionStorage.setItem('carrera_id', params.id.toString())}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
  {
    field: 'examenes',
    headerName: 'Examenes',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}/examenes`}
        onClick={() => sessionStorage.setItem('carrera_id', params.id.toString())}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const asignaturaExamenColumns: GridColDef[] = [
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
    field: 'inscribirse',
    headerName: 'Inscribirse',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/confirmar-examen`}
        onClick={() => sessionStorage.setItem('asignatura_id', params.id.toString())}
        className='mx-auto flex size-fit'
      >
        <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const examenColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fecha',
    headerName: 'Fecha',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
  },
  {
    field: 'inscribirse',
    headerName: 'Inscribirse',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}`}
        onClick={() => sessionStorage.setItem('examen_id', params.id.toString())}
        className='mx-auto flex size-fit'
      >
        <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];