import { GridColDef } from '@mui/x-data-grid';
import EyeIcon from '@/assets/svg/visibility.svg';
import Enter from '@/assets/svg/chevron-right.svg';
import Enroll from '@/assets/svg/enroll-exam.svg';
import Schedule from '@/assets/svg/schedule.svg';
import Search from '@/assets/svg/search.svg';
import Grading from '@/assets/svg/grading.svg';
import Subject from '@/assets/svg/subject.svg';
import Close from '@/assets/svg/close.svg';
import List from '@/assets/svg/list.svg';
import Link from 'next/link';
import Add from '@/assets/svg/add.svg';
import Calendar from '@/assets/svg/calendar.svg';
import { altaPreviaFetch } from '@/lib/data/coordinador/actions';
import Button from '../Button/button';
import { bajaCursoFetch } from '@/lib/data/estudiante/actions';
import { convertirFecha } from '@/utils/utils';

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
    renderCell: (params) =>
      window.location.pathname.includes('estudiante') ? null : (
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
        href={`${window.location.pathname}/detalles/${params.row.ci}`}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
  {
    field: 'actividad',
    headerName: 'Actividad',
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

export const examenColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'asignatura',
    headerName: 'Asignatura',
  },
  {
    field: 'fecha',
    headerName: 'Fecha',
  },
  {
    field: 'docentes',
    headerName: 'Docentes',
    type: 'singleSelect',
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
    field: 'detalles',
    headerName: 'Detalles',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}/carrera`}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
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
        <Calendar className='h-auto w-6 fill-garnet sm:w-8' />
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
        <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
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
        <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
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

export const inscriptoColumns: GridColDef[] = [
  { field: 'ci', headerName: 'Cédula' },
  {
    field: 'nombreCompleto',
    headerName: 'Nombre Completo',
    valueGetter: (value, row) => `${row.nombre || ''} ${row.apellido || ''}`,
  },
  { field: 'nombre', headerName: 'Nombre' },
  { field: 'apellido', headerName: 'Apellido' },
  { field: 'email', headerName: 'Email' },
  { field: 'estado', headerName: 'Estado' },
  { field: 'fechaInscripcion', headerName: 'Fecha de Inscripción' },
  {
    field: 'creditosObtenidos',
    headerName: 'Creditos',
    type: 'number',
  },
];

export const cursosColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'estado', headerName: 'Estado' },
  { field: 'fechaInicio', headerName: 'Fecha de Inicio' },
  { field: 'fechaFin', headerName: 'Fecha de Fin' },
  { field: 'horario', headerName: 'Horario' },
  {
    field: 'agregarHorarios',
    headerName: 'Crear Horarios',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) =>
      params.row.estado !== 'FINALIZADO' ||
      (params.row.horario && (
        <Link
          href={`${window.location.pathname}/${params.row.id}`}
          className='mx-auto flex size-fit'
        >
          <Schedule className='h-auto w-6 fill-garnet sm:w-8' />
        </Link>
      )),
  },
  {
    field: 'verHorarios',
    headerName: 'Ver Horarios',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/ver-horarios/${params.row.id}`}
        className='mx-auto flex size-fit'
      >
        <Search className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const calificarCursosColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'nombreAsignatura', headerName: 'Asignatura' },
  { field: 'fechaInicio', headerName: 'Fecha de Inicio' },
  { field: 'fechaFin', headerName: 'Fecha de Fin' },
  {
    field: 'calificaciones',
    headerName: 'Calificar',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => {
      const disabled =
        params.row.fechaFin > convertirFecha(new Date().toISOString());
      return !disabled ? (
        <Link
          href={`${window.location.pathname}/curso/${params.row.id}`}
          className='mx-auto flex size-fit disabled:pointer-events-none disabled:cursor-none'
          aria-hidden={
            params.row.fechaFin > convertirFecha(new Date().toISOString())
          }
        >
          <Enter className='h-auto w-6 fill-garnet sm:w-8' />
        </Link>
      ) : (
        <Enter className='mx-auto h-auto w-6 fill-grey-600 sm:w-8' />
      );
    },
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

export const carreraCalificacionesColumns: GridColDef[] = [
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

export const carreraInscripcionFuncionarioColumns: GridColDef[] = [
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
    field: 'examenes',
    headerName: 'Examenes',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}/asignatura-examen`}
        className='mx-auto flex size-fit'
      >
        <Subject className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const asignaturaExamenFuncionarioColumns: GridColDef[] = [
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
    field: 'examenes',
    headerName: 'Examenes',
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

export const calificarExamenesColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'fecha', headerName: 'Fecha' },
  { field: 'nombreAsignatura', headerName: 'Asignatura' },
  {
    field: 'calificaciones',
    headerName: 'Calificar',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => {
      const disabled =
        params.row.fecha > convertirFecha(new Date().toISOString());
      return !disabled ? (
        <Link
          href={`${window.location.pathname}/examen/${params.row.id}`}
          className='mx-auto flex size-fit'
        >
          <Enter className='h-auto w-6 fill-garnet sm:w-8' />
        </Link>
      ) : (
        <Enter className='h-auto w-6 fill-grey-600 sm:w-8' />
      );
    },
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
          bajaCursoFetch(params.id.toString()).then((response) => {
            if (response) {
              alert(response.message);
              location.reload();
            }
          });
        }}
        className='mx-auto flex size-fit'
      >
        <Close className='h-auto w-6 fill-garnet sm:w-8' />
      </Button>
    ),
  },
];

export const datosEstudianteColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'ci', headerName: 'Cedula' },
  { field: 'nombre', headerName: 'Nombre' },
  { field: 'apellido', headerName: 'Apellido' },
  { field: 'email', headerName: 'Email' },
  { field: 'telefono', headerName: 'Telefono' },
  { field: 'domicilio', headerName: 'Domicilio' },
  { field: 'fechaNac', headerName: 'Fecha de Nacimiento' },
];

export const consultaTramitesEstudiante: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'carreraId', headerName: 'Carrera' },
  { field: 'tipo', headerName: 'Tipo' },
  { field: 'motivoRechazo', headerName: 'Respuesta' },
  {
    field: 'estado',
    headerName: 'Estado',
    renderCell: (params) => <span>{params.row.estado}</span>,
  },
  { field: 'fechaCreacion', headerName: 'Fecha' },
  { field: 'fechaActualizacion', headerName: 'Actualizado' },
];

export const carrerasCalificacionesColums: GridColDef[] = [
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
    headerName: 'Listar Asignaturas',
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

export const actasFuncionarioColumn: GridColDef[] = [
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
    field: 'asignaturas',
    headerName: 'Asignaturas',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}`}
        onClick={() =>
          sessionStorage.setItem('carrera_id', params.id.toString())
        }
        className='mx-auto flex size-fit'
      >
        <List className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const asignaturaCalificacionesColumns: GridColDef[] = [
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
    field: '',
    headerName: 'Listar Cursos',
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

export const cursosCalificadosColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'nombreAsignatura', headerName: 'Asignatura' },
  { field: 'fechaInicio', headerName: 'Fecha de Inicio' },
  { field: 'fechaFin', headerName: 'Fecha de Fin' },
  {
    field: 'calificaciones',
    headerName: 'Ver Calificaciones',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/curso/${params.row.id}/verCalificaciones`}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const calificacionCursoColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'estudianteCi', headerName: 'Cedula' },
  { field: 'estudianteNombre', headerName: 'Nombre' },
  { field: 'estudianteApellido', headerName: 'Apellido' },
  { field: 'calificacionCurso', headerName: 'Calificacion' },
];

export const examenesCalificadosColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'nombreAsignatura', headerName: 'Asignatura' },
  { field: 'fecha', headerName: 'Fecha' },
  {
    field: 'calificaciones',
    headerName: 'Ver Calificaciones',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/examen/${params.row.id}/verCalificaciones`}
        className='mx-auto flex size-fit'
      >
        <EyeIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const calificacionExamenColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'estudianteCi', headerName: 'Cedula' },
  { field: 'estudianteNombre', headerName: 'Nombre' },
  { field: 'estudianteApellido', headerName: 'Apellido' },
  { field: 'calificacion', headerName: 'Calificacion' },
];

export const horariosColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'dia', headerName: 'Dia' },
  { field: 'horaInicio', headerName: 'Hora inicio' },
  { field: 'horaFin', headerName: 'Hora fin' },
];

export const actividadUsuarioColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'fecha', headerName: 'Fecha' },
  { field: 'hora', headerName: 'Hora' },
  { field: 'tipoActividad', headerName: 'Tipo de actividad' },
  { field: 'descripcion', headerName: 'Descripción' },
];

export const actasAsignaturasFuncionarioColumn: GridColDef[] = [
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
    field: 'curso',
    headerName: 'Curso',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}/curso`}
        className='mx-auto flex size-fit'
      >
        <List className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
  {
    field: 'examen',
    headerName: 'Examen',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}/examen`}
        className='mx-auto flex size-fit'
      >
        <List className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const actaExamenColumn: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fecha',
    headerName: 'Fecha',
  },
  { field: 'asignaturaNombre', headerName: 'Asignatura' },

  {
    field: 'acta',
    headerName: 'Acta',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <List className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const actaCursoColumn: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'fechaInicio',
    headerName: 'Fecha de inicio',
  },
  {
    field: 'fechaFin',
    headerName: 'Fecha de fin',
  },
  {
    field: 'acta',
    headerName: 'Acta',
    cellClassName: 'flex items-center self-end',
    headerAlign: 'center',
    renderCell: (params) => (
      <Link
        href={`${window.location.pathname}/${params.id}`}
        className='mx-auto flex size-fit'
      >
        <List className='h-auto w-6 fill-garnet sm:w-8' />
      </Link>
    ),
  },
];

export const columnsMap: ColumnDefinitions = {
  carrera: carreraColumns,
  asignatura: asignaturaColumns,
  examen: examenColumns,
  usuario: usuarioColumns,
  estudiante: estudianteColumns,
  'datos-estudiante': datosEstudianteColumns,
  'carreras-estudiante': carrerasEstudiante,
  'carreras-funcionario': carrerasFuncionario,
  'asignatura-examenes': asignaturaExamenColumns,
  'asignatura-curso': asignaturaCursoColumns,
  previtaturas: previaturasColumns,
  noPrevitaturas: noPreviaturasColumns,
  periodosExamen: periodosExamenColumns,
  asignaturaFuncionario: asignaturaFuncionarioColumns,
  inscripto: inscriptoColumns,
  cursos: cursosColumns,
  'carrera-calificaciones': carreraCalificacionesColumns,
  'calficar-cursos': calificarCursosColumns,
  'calficar-examenes': calificarExamenesColumns,
  carreraInscripcionFuncionario: carreraInscripcionFuncionarioColumns,
  asignaturaExamenFuncionario: asignaturaExamenFuncionarioColumns,
  examenFuncionario: ExamenFuncionarioColumns,
  inscriptosExamenFuncionario: InscriptosExamenFuncionarioColumns,
  asignaturaBajaCurso: asignaturaBajaCursoColumns,
  consultaTramitesEstudiante: consultaTramitesEstudiante,
  solicitudTitulo: solicitudTituloColumns,
  carreraCalificaciones: carrerasCalificacionesColums,
  asignaturaCalificaciones: asignaturaCalificacionesColumns,
  cursosCalificados: cursosCalificadosColumns,
  calificacionCurso: calificacionCursoColumns,
  examenesCalificados: examenesCalificadosColumns,
  calificacionExamen: calificacionExamenColumns,
  actasFuncionario: actasFuncionarioColumn,
  actasAsignaturasFuncionario: actasAsignaturasFuncionarioColumn,
  actaExamen: actaExamenColumn,
  actaCurso: actaCursoColumn,
  horarios: horariosColumns,
  actividadUsuario: actividadUsuarioColumns,
  none: [],
};

export interface ColumnDefinitions {
  [key: string]: GridColDef[]; // This line allows any string as a key
}
