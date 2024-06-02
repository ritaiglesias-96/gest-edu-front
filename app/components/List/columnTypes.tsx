import { GridColDef } from '@mui/x-data-grid';
import EyeIcon from '@/assets/svg/visibility.svg';
import School from '@/assets/svg/school.svg';
import Enroll from '@/assets/svg/enroll-exam.svg';
import Link from 'next/link';
import Button from '@/components/Button/button';
import { altaPreviaFetch } from '@/lib/data/coordinador/actions';
import type { Estudiante as e} from '@/lib/definitions';

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
  {
    field: 'inscriptos',
    headerName: 'Inscriptos',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.row.id}/inscriptos`}
        className='mx-auto flex size-fit'
      >
        <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
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
    field: 'semestrePlanEstudio',
    headerName: 'Semestre',
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
  {
    field: 'previas',
    headerName: 'Previas',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/previas/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <School className='h-auto w-6 fill-garnet sm:w-8' />
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
    field: 'tipoUsuario',
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

export const previaturasColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'nombre',
    headerName: 'Nombre',
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    type: 'string',
  },
];

export const noPreviaturasColumns: GridColDef[] = [  
  { 
    field: 'idAsignatura', 
    headerName: 'ID Asignatura' ,
    renderHeader: () => null,
    renderCell: () => null
  },
  { 
    field: 'id', 
    headerName: 'ID' 
  },
  {
    field: 'semestrePlanEstudio',
    headerName: 'Semestre'
  },
  {
    field: 'nombre',
    headerName: 'Nombre',
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
  },
  {
    field: 'agregar',
    headerName: '',
    cellClassName: 'flex items-center ',
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div className='my-2 box-content flex flex-col items-center justify-center rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
        <Button           
          className="w-full"
          styling='primary' 
          onClick={() => {
            altaPreviaFetch(params.row.idAsignatura, params.row.id);
            location.reload();
          }}          
          >
          Agregar
        </Button>
      </div>
    ),
  }
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

export const inscriptoColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'ci', headerName: 'Cédula'},
  { field: 'nombre', headerName: 'Nombre'},
  { field: 'apellido', headerName: 'Apellido'},
  { field: 'email', headerName: 'Email'},
  { field: 'estado', headerName: 'Estado' },
  { field: 'fechaInscripcion', headerName: 'Fecha de Inscripción' },
  {field: 'creditosObtenidos', headerName: 'Creditos Obtenidos', type: 'number'},
];

export const cursosColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'estado', headerName: 'Estado'},
  {
    field: 'calificaciones',
    headerName: 'Calificaciones',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/cursos/${params.row.id}`}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];