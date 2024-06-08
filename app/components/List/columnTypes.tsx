import { GridColDef } from '@mui/x-data-grid';
import EyeIcon from '@/assets/svg/visibility.svg';
import Enter from '@/assets/svg/chevron-right.svg';
import Enroll from '@/assets/svg/enroll-exam.svg';
import Schedule from '@/assets/svg/schedule.svg';
import Grading from '@/assets/svg/grading.svg';
import Subject from '@/assets/svg/subject.svg';
import Close from '@/assets/svg/close.svg';
import Link from 'next/link';
import Add from '@/assets/svg/add.svg';
import { altaPreviaFetch } from '@/lib/data/coordinador/actions';
import Button from '../Button/button';
import { bajaCursoFetch } from '@/lib/data/estudiante/actions';
import Evaluate from '@/assets/svg/rule.svg';
import { Grade } from '@mui/icons-material';
import { School } from '@mui/icons-material';

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

export const carrerasFuncionario: GridColDef[] = [
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
    field: '',
    headerName: '',
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <Enter className='h-auto w-6 fill-garnet sm:w-8' />
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
  },
  {
    field: 'creditos',
    headerName: 'Creditos',
    type: 'number',
  },
];

export const noPreviaturasColumns: GridColDef[] = [
  {
    field: 'idAsignatura',
    headerName: '',
    disableColumnMenu: true,
    sortable: false,
    resizable: false,
    cellClassName: 'invisible', // hidden column
    headerClassName: 'invisible', // hidden column
  },
  {
    field: 'id',
    headerName: 'ID',
    align: 'left',
  },
  {
    field: 'semestrePlanEstudio',
    headerName: 'Semestre',
    align: 'right',
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
    headerName: 'Agregar',
    cellClassName: 'flex items-center ',
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <div className='mx-auto flex size-fit'>
        <Add
          onClick={() => {
            altaPreviaFetch(params.row.idAsignatura, params.row.id);
            location.reload();
          }}
          className='h-auto w-6 fill-garnet sm:w-8'
        />
      </div>
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
  { field: 'fechaNac', headerName: 'Fecha de Nacimiento' },
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
        onClick={() =>
          sessionStorage.setItem('carrera_id', params.id.toString())
        }
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
        onClick={() =>
          sessionStorage.setItem('carrera_id', params.id.toString())
        }
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
    field: 'inscripcion',
    headerName: 'Inscripcion',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/confirmar-examen`}
        onClick={() =>
          sessionStorage.setItem('asignatura_id', params.id.toString())
        }
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

export const registroExamenColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fecha',
    headerName: 'Fecha',
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
    field: 'inscripcion',
    headerName: 'Inscripcion',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}`}
        onClick={() =>
          sessionStorage.setItem('examen_id', params.id.toString())
        }
        className='mx-auto flex size-fit'
      >
        <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const inscriptoColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'ci', headerName: 'Cédula' },
  { field: 'nombre', headerName: 'Nombre' },
  { field: 'apellido', headerName: 'Apellido' },
  { field: 'email', headerName: 'Email' },
  { field: 'estado', headerName: 'Estado' },
  { field: 'fechaInscripcion', headerName: 'Fecha de Inscripción' },
  {
    field: 'creditosObtenidos',
    headerName: 'Creditos Obtenidos',
    type: 'number',
  },
];

export const cursosColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'fechaInicio', headerName: 'Fecha de Inicio' },
  { field: 'fechaFin', headerName: 'Fecha de Fin' },
  {
    field: 'agregarHorarios',
    headerName: 'Crear Horarios',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.row.id}`}
        className='mx-auto flex size-fit'
      >
        <Schedule className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const calificarCursosColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'estado', headerName: 'Estado' },
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

export const carreraFuncionarioColumns: GridColDef[] = [
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

export const asignaturaFuncionarioColumns: GridColDef[] = [
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
];

export const asignaturaCursoColumns: GridColDef[] = [
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
        href={`${window.location.pathname}/confirmar-curso`}
        onClick={() =>
          sessionStorage.setItem('asignatura_id', params.id.toString())
        }
        className='mx-auto flex size-fit'
      >
        <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const solicitudTituloColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fechaCreacion',
    headerName: 'Fecha de creacion',
    cellClassName: 'w-full',
  },
  {
    field: 'resolver',
    headerName: 'Resolver',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <Grading className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const solicitudTituloColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fechaCreacion',
    headerName: 'Fecha de creacion',
    cellClassName: 'w-full',
  },
  {
    field: 'resolver',
    headerName: 'Resolver',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <Grading className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const ExamenFuncionarioColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fecha',
    headerName: 'Fecha',
  },
  {
    field: 'asignaturaNombre',
    headerName: 'Asignatura',
  },
  {
    field: 'inscriptos',
    headerName: 'Inscriptos',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <Subject className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const InscriptosExamenFuncionarioColumns: GridColDef[] = [
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
    field: 'apellido',
    headerName: 'Apellido',
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  {
    field: 'telefono',
    headerName: 'Telefono',
    type: 'number',
  },
  {
    field: 'domicilio',
    headerName: 'Direccion',
  },
];

export const asignaturaBajaCursoColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'asignaturaNombre', headerName: 'Nombre' },
  { field: 'fechaInicio', headerName: 'Fecha de Inicio' },
  { field: 'fechaFin', headerName: 'Fecha de Fin' },
  {
    field: 'baja',
    headerName: 'Baja',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Button
        styling='outline'
        onClick={async () => {
          const baja = confirm('¿Desea darse de baja del curso?');
          if (baja) {
            bajaCursoFetch(params.id.toString()).then((response) => {
              if (!response) {
                alert('Se ha dado de baja exitosamente.');
                location.reload();
              } else {
                alert(response.message);
              }
            });
          }
        }}
        className='mx-auto flex size-fit'
      >
        <Close className='h-auto w-6 fill-garnet sm:w-8' />
      </Button>
    ),
  },
];
