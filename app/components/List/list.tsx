import styles from './list.module.css';
import {
  asignaturaColumns,
  carreraColumns,
  noPreviaturasColumns,
  previaturasColumns,
  usuarioColumns,
  estudianteColumns,
  periodosExamenColumns,
  inscriptoColumns,
  cursosColumns,
  asignaturaFuncionarioColumns,
  calificarCursosColumns,
  carrerasEstudiante,
  asignaturaExamenColumns,
  asignaturaCursoColumns,
  carreraCalificacionesColumns,
  calificarExamenesColumns,
  datosEstudianteColumns,
  carrerasFuncionario,
  carreraInscripcionFuncionarioColumns,
  asignaturaExamenFuncionarioColumns,
  ExamenFuncionarioColumns,
  InscriptosExamenFuncionarioColumns,
  asignaturaBajaCursoColumns,
  consultaTramitesEstudiante,
  solicitudTituloColumns,
  carrerasCalificacionesColums,
  asignaturaCalificacionesColumns,
  cursosCalificadosColumns,
  calificacionCursoColumns,
  examenesCalificadosColumns,
  calificacionExamenColumns,
  actasFuncionarioColumn,
  actasAsignaturasFuncionarioColumn,
  actaExamenColumn,
  horariosColumns,
  actividadUsuarioColumns,
} from './columnTypes';
import React, { useContext, useEffect, useState } from 'react';
import Button from '@/components/Button/button';
import EditIcon from '@/assets/svg/edit.svg';
import DeleteIcon from '@/assets/svg/delete.svg';
import SaveIcon from '@/assets/svg/done.svg';
import Enroll from '@/assets/svg/enroll-lesson.svg';
import EnrollC from '@/assets/svg/enroll-exam.svg';
import Close from '@/assets/svg/close.svg';
import Schedule from '@/assets/svg/schedule.svg';
import Grading from '@/assets/svg/grading.svg';
import School from '@/assets/svg/school.svg';
import Download from '@/assets/svg/download.svg';
import CheckIcon from '@mui/icons-material/Check';
import CertificadoPDF from '../DocumentosPDF/CertificadoPDF';
import EscolaridadPDF from '../DocumentosPDF/EscolaridadPDF';

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import {
  editDocente,
  deleteDocente,
  rechazarSolicitudInscripcionCarrera,
  aprobarSolicitudInscripcionCarrera,
} from '@/lib/data/funcionario/actions';
import Link from 'next/link';
import {
  Asignatura,
  HorarioCurso,
  Certificado,
  Escolaridad,
  Carrera,
} from '@/lib/definitions';
import { altaPlanEstudio } from '@/lib/data/coordinador/actions';
import { useRouter } from 'next/navigation';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Collapse,
  Alert,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
} from '@mui/material';
import {
  bajaExamenFetch,
  inscribirseCarreraFetch,
  inscribirseCursoFetch,
  inscribirseExamenFetch,
  solicitarCertificadoFetch,
  solicitarTituloFetch,
  solicitarEscolaridadFetch,
} from '@/lib/data/estudiante/actions';
import { SessionCtx } from '../../../context/SessionContext';
import { convertirFecha } from '@/utils/utils';
import InputField from '../InputField/inputField';
import { obtenerDatosUsuarioFetch } from '@/lib/data/actions';

type columnType =
  | 'carrera'
  | 'asignatura'
  | 'usuario'
  | 'estudiante'
  | 'carreras-estudiante'
  | 'datos-estudiante'
  | 'asignatura-examenes'
  | 'asignatura-curso'
  | 'inscripto'
  | 'previtaturas'
  | 'noPrevitaturas'
  | 'periodosExamen'
  | 'cursos'
  | 'asignaturaFuncionario'
  | 'carrera-calificaciones'
  | 'calficar-examenes'
  | 'calficar-cursos'
  | 'carreras-funcionario'
  | 'carreraInscripcionFuncionario'
  | 'asignaturaExamenFuncionario'
  | 'examenFuncionario'
  | 'inscriptosExamenFuncionario'
  | 'asignaturaBajaCurso'
  | 'consultaTramitesEstudiante'
  | 'solicitudTitulo'
  | 'carreraCalificaciones'
  | 'asignaturaCalificaciones'
  | 'cursosCalificados'
  | 'calificacionCurso'
  | 'examenesCalificados'
  | 'calificacionExamen'
  | 'actasFuncionario'
  | 'actasAsignaturasFuncionario'
  | 'actaExamen'
  | 'horarios'
  | 'actividadUsuario'
  | 'none';
interface ListProps {
  isEditableDocentes?: boolean;
  isInscripcionExamen?: boolean;
  isInscripcionCurso?: boolean;
  isInscripcionCarrera?: boolean;
  isEditableAsignaturas?: boolean;
  editarCalificacionCurso?: boolean;
  editarCalificacionExamen?: boolean;
  isApproveRejectCarrera?: boolean;
  isHorarioCursoConsulta?: boolean;
  isSolicitudTramite?: boolean;
  rows: GridRowsProp[];
  rowsLoading: boolean;
  columnsType: columnType;
}

export default function List({
  isEditableDocentes,
  isInscripcionCarrera,
  isInscripcionExamen,
  isInscripcionCurso,
  isEditableAsignaturas,
  editarCalificacionCurso,
  editarCalificacionExamen,
  isApproveRejectCarrera,
  isHorarioCursoConsulta,
  isSolicitudTramite,
  rows,
  rowsLoading,
  columnsType,
}: ListProps) {
  let columns: GridColDef[] = [];
  switch (columnsType) {
    case 'carrera':
      columns = carreraColumns;
      break;
    case 'asignatura':
      columns = asignaturaColumns;
      break;
    case 'usuario':
      columns = usuarioColumns;
      break;
    case 'estudiante':
      columns = estudianteColumns;
      break;
    case 'datos-estudiante':
      columns = datosEstudianteColumns;
      break;
    case 'carreras-estudiante':
      columns = carrerasEstudiante;
      break;
    case 'carreras-funcionario':
      columns = carrerasFuncionario;
      break;
    case 'asignatura-examenes':
      columns = asignaturaExamenColumns;
      break;
    case 'asignatura-curso':
      columns = asignaturaCursoColumns;
      break;
    case 'previtaturas':
      columns = previaturasColumns;
      break;
    case 'noPrevitaturas':
      columns = noPreviaturasColumns;
      break;
    case 'periodosExamen':
      columns = periodosExamenColumns;
      break;
    case 'asignaturaFuncionario':
      columns = asignaturaFuncionarioColumns;
      break;
    case 'inscripto':
      columns = inscriptoColumns;
      break;
    case 'cursos':
      columns = cursosColumns;
      break;
    case 'carrera-calificaciones':
      columns = carreraCalificacionesColumns;
      break;
    case 'calficar-cursos':
      columns = calificarCursosColumns;
      break;
    case 'calficar-examenes':
      columns = calificarExamenesColumns;
      break;
    case 'carreraInscripcionFuncionario':
      columns = carreraInscripcionFuncionarioColumns;
      break;
    case 'asignaturaExamenFuncionario':
      columns = asignaturaExamenFuncionarioColumns;
      break;
    case 'examenFuncionario':
      columns = ExamenFuncionarioColumns;
      break;
    case 'inscriptosExamenFuncionario':
      columns = InscriptosExamenFuncionarioColumns;
      break;
    case 'asignaturaBajaCurso':
      columns = asignaturaBajaCursoColumns;
      break;
    case 'consultaTramitesEstudiante':
      columns = consultaTramitesEstudiante;
      break;
    case 'solicitudTitulo':
      columns = solicitudTituloColumns;
      break;
    case 'carreraCalificaciones':
      columns = carrerasCalificacionesColums;
      break;
    case 'asignaturaCalificaciones':
      columns = asignaturaCalificacionesColumns;
      break;
    case 'cursosCalificados':
      columns = cursosCalificadosColumns;
      break;
    case 'calificacionCurso':
      columns = calificacionCursoColumns;
      break;
    case 'examenesCalificados':
      columns = examenesCalificadosColumns;
      break;
    case 'calificacionExamen':
      columns = calificacionExamenColumns;
    case 'actasFuncionario':
      columns = actasFuncionarioColumn;
      break;
    case 'actasAsignaturasFuncionario':
      columns = actasAsignaturasFuncionarioColumn;
      break;
    case 'actaExamen':
      columns = actaExamenColumn;
      break;
    case 'horarios':
      columns = horariosColumns;
      break;
    case 'actividadUsuario':
      columns = actividadUsuarioColumns;
      break;
    default:
      break;
  }
  return (
    <div className={styles.dataGridContainer}>
      {columnsType !== 'none' && (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          loading={rowsLoading}
          autoHeight={true}
          rowSelection={false}
          autosizeOnMount={true}
          pageSizeOptions={[5, 10]}
          className={styles.dataTable}
          autosizeOptions={{ expand: true }}
        />
      )}
      {isEditableDocentes && (
        <EditableDocentesDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {isInscripcionExamen && (
        <InscripcionExamenDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {isEditableAsignaturas && (
        <EditableAsignaturasDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {editarCalificacionCurso && (
        <EditarCalificacionCursoDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {isApproveRejectCarrera && (
        <ApproveRejectDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {isInscripcionCurso && (
        <InscripcionCursoDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {isInscripcionCarrera && (
        <InscripcionCarreraDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {isHorarioCursoConsulta && (
        <HorariosCursosEstudiante
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {isSolicitudTramite && (
        <SolicitudTramiteDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
      {editarCalificacionExamen && (
        <EditarCalificacionExamenDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
    </div>
  );
}

function EditableDocentesDataGrid({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  useEffect(() => {
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const deleteD = async () => {
      const data = await deleteDocente(`${id}`);
      if (data && rows) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
    deleteD();
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const edit = async (docente: GridRowModel) => {
      const data = await editDocente(docente);
      if (data) {
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      } else {
        return rows;
      }
    };
    return edit(updatedRow);
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      type: 'number',
      headerName: 'ID',
      width: 90,
      editable: false,
    },
    { field: 'nombre', headerName: 'Nombre', width: 180, editable: true },
    {
      field: 'apellido',
      headerName: 'Apellido',
      width: 180,
      editable: true,
    },
    {
      field: 'documento',
      headerName: 'Cedula',
      width: 180,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon className='h-auto w-6 fill-garnet sm:w-8' />}
              label='Save'
              sx={{
                color: '#802c2c',
              }}
              onClick={handleSaveClick(id)}
              key={id}
            />,
            <GridActionsCellItem
              icon={<Close className='h-auto w-6 fill-garnet sm:w-8' />}
              label='Cancel'
              onClick={handleCancelClick(id)}
              key={`${id}-cancel`}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon className='h-auto w-6 fill-garnet sm:w-8 ' />}
            label='Edit'
            onClick={handleEditClick(id)}
            key={id}
            sx={{
              color: '#802c2c',
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon className='h-auto w-6 fill-garnet sm:w-8' />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            key={`${id}-delete`}
            sx={{
              color: '#802c2c',
              height: '100%',
            }}
          />,
        ];
      },
    },
  ];

  return (
    <div className='m-4 h-fit w-full'>
      <div className='my-4 box-content flex flex-row justify-end rounded-md bg-ivory p-4'>
        <Link href='/funcionario/docentes/agregar'>
          <Button styling='primary'>Agregar Docente</Button>
        </Link>
      </div>
      <DataGrid
        rows={rows}
        loading={rowsLoading}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        autosizeOnMount={true}
        autoHeight={true}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{ backgroundColor: '#f6f6e9', color: 'black' }}
      />
    </div>
  );
}

function EditableAsignaturasDataGrid({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const router = useRouter();
  const [carreraId, setCarreraId] = useState<string>('');
  const [disabled, setDisabled] = useState(true);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  useEffect(() => {
    setCarreraId(rowsParent[0]?.carreraId);
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  useEffect(() => {
    for (const row of rows) {
      if (row.semestrePlanEstudio === 0) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [rows]);

  const agregarPlanDeEstudio = async () => {
    const res = await altaPlanEstudio(rows as Asignatura[], carreraId);
    if (res.message === 'Creado con exito. 200') {
      router.back();
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      type: 'number',
      headerName: 'ID',
      width: 90,
      editable: false,
    },
    { field: 'nombre', headerName: 'Nombre', width: 180, editable: false },
    {
      field: 'descripcion',
      headerName: 'Descripcion',
      width: 180,
      editable: false,
    },
    {
      field: 'creditos',
      headerName: 'Creditos',
      width: 180,
      editable: false,
    },
    {
      field: 'semestrePlanEstudio',
      headerName: 'Semestre',
      width: 180,
      type: 'number',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon className='h-auto w-6 fill-garnet sm:w-8' />}
              label='Save'
              sx={{
                color: '#802c2c',
              }}
              onClick={handleSaveClick(id)}
              key={id}
            />,
            <GridActionsCellItem
              icon={<Close className='h-auto w-6 fill-garnet sm:w-8' />}
              label='Cancel'
              onClick={handleCancelClick(id)}
              key={`${id}-cancel`}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon className='h-auto w-6 fill-garnet sm:w-8 ' />}
            label='Agregar semestre'
            onClick={handleEditClick(id)}
            key={id}
            sx={{
              color: '#802c2c',
            }}
          />,
        ];
      },
    },
  ];

  return (
    <div className='h-fit w-full p-4'>
      <div className='my-4 box-content flex flex-row justify-end rounded-md bg-ivory p-4'>
        <Button
          onClick={agregarPlanDeEstudio}
          disabled={disabled}
          styling='primary'
        >
          Agregar Plan de Estudio
        </Button>
      </div>
      <DataGrid
        rows={rows}
        loading={rowsLoading}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        autosizeOnMount={true}
        autoHeight={true}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{ backgroundColor: '#f6f6e9', color: 'black' }}
      />
    </div>
  );
}

function EditarCalificacionCursoDataGrid({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [calificaciones, setCalificaciones] = useState<{
    [key: number]: string;
  }>({});

  const handleChange = (id: number) => (event: SelectChangeEvent) => {
    setCalificaciones((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };

  useEffect(() => {
    sessionStorage.setItem('calificaciones', JSON.stringify(calificaciones));
  }, [calificaciones]);

  useEffect(() => {
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const columns: GridColDef[] = [
    { field: 'id', type: 'number', headerName: 'ID' },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'apellido', headerName: 'Apellido', flex: 1 },
    { field: 'ci', headerName: 'Cedula', flex: 1 },
    {
      field: 'calificacion',
      headerName: 'Calificación',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        const id = params.id as number; // asegurarse de que params.id es un número
        return (
          <div>
            <FormControl
              fullWidth
              variant='standard'
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel
                id={`demo-simple-select-standard-label-${id}`}
                sx={{ color: 'black' }}
              >
                Calificación
              </InputLabel>
              <Select
                labelId={`demo-simple-select-label-${id}`}
                id={`select-${id}`}
                value={calificaciones[id] || ''}
                label='Calificación'
                onChange={handleChange(id)}
                sx={{
                  '&.MuiInputBase-root': {
                    color: 'inherit',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <MenuItem value='EXONERADO'>Exonerado</MenuItem>
                <MenuItem value='AEXAMEN'>A Examen</MenuItem>
                <MenuItem value='RECURSA'>Recursa</MenuItem>
                <MenuItem value='PENDIENTE'>Pendiente</MenuItem>
              </Select>
            </FormControl>
          </div>
        );
      },
    },
  ];

  return (
    <div className='h-fit w-full p-4'>
      <DataGrid rows={rows} loading={rowsLoading} columns={columns} />
    </div>
  );
}

function InscripcionExamenDataGrid({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isBajaExamen, setIsBajaExamen] = useState(false);
  const [examenId, setExamenId] = useState('');
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const session = useContext(SessionCtx);

  useEffect(() => {
    if (session.session?.email) {
      setEmail(session.session.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //Se convierte la fecha a formato dd/MM/yyyy
    rowsParent.forEach((examen) => {
      examen.fecha = convertirFecha(examen.fecha);
    });
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const handleClickConfirmarInscripcion = () => {
    if (email && examenId) {
      inscribirseExamenFetch(email, examenId).then((data) => {
        if (data?.message) {
          setMensajeError(data.message);
          setAlertError(true);
          setAlertOk(false);
        } else {
          setMensajeError('');
          setAlertError(false);
          setAlertOk(true);
        }
      });
    }
    setIsOpen(false);
  };

  const handleClickConfirmarBaja = () => {
    if (examenId) {
      bajaExamenFetch(examenId).then((data) => {
        if (data?.message) {
          setMensajeError(data.message);
          setAlertError(true);
          setAlertOk(false);
        } else {
          setMensajeError('');
          setAlertError(false);
          setAlertOk(true);
        }
      });
    }
    setIsOpen(false);
    setIsBajaExamen(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      cellClassName: 'flex items-center self-end',
      headerClassName: 'header-center',
      flex: 1,
    },
    {
      field: 'fecha',
      headerName: 'Fecha',
      cellClassName: 'flex justify-center self-end',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'inscripcion',
      headerName: 'Inscripcion',
      cellClassName: 'flex text-center self-end',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <>
          <Link
            href={`${window.location.pathname}`}
            onClick={() => {
              setIsOpen(true);
              setExamenId(params.id.toString());
            }}
            className='mx-auto flex size-fit'
          >
            <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
          </Link>
          <Link
            href={`${window.location.pathname}`}
            onClick={() => {
              setIsOpen(true);
              setIsBajaExamen(true);
              setExamenId(params.id.toString());
            }}
            className='mx-auto flex size-fit'
          >
            <Close className='h-auto w-6 fill-garnet sm:w-8' />
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <div>
        <DataGrid
          className='w-full'
          rows={rows}
          loading={rowsLoading}
          columns={columns}
          sx={{ backgroundColor: '#f6f6e9', color: 'black' }}
        />
      </div>

      {isOpen && (
        <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 p-0'>
                {isBajaExamen ? 'Darse de baja' : 'Inscripción a examen'}
              </h5>
              <div className='flex flex-col'>
                <p className='font-bold'>
                  {isBajaExamen
                    ? '¿Desea darse de baja al exámen?'
                    : '¿Desea confirmar inscripción al exámen?'}
                </p>
              </div>
              <div className='items-center md:space-x-6'>
                <div className='inline-block'>
                  <Button
                    styling='primary'
                    className='lg:w-20'
                    onClick={
                      isBajaExamen
                        ? handleClickConfirmarBaja
                        : handleClickConfirmarInscripcion
                    }
                  >
                    Si
                  </Button>
                </div>
                <div className='inline-block'>
                  <Button
                    styling='secondary'
                    onClick={() => setIsOpen(false)}
                    className='lg:w-20'
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {alertOk && (
        <Collapse
          in={alertOk}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            variant='filled'
            onClose={() => {
              setAlertOk(false);
            }}
          >
            ¡Inscripcion editados correctamente!
          </Alert>
        </Collapse>
      )}
      {alertError && (
        <Collapse
          in={alertError}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='error'
            variant='filled'
            onClose={() => {
              setAlertError(false);
            }}
          >
            {mensajeError}
          </Alert>
        </Collapse>
      )}
    </>
  );
}

function ApproveRejectDataGrid({
  rowsParent,
  rowsLoadingParent,
}: {
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [showModal, setShowModal] = useState(false);
  const [tramiteId, setTramiteId] = useState<GridRowId>();
  const [motivoRechazo, setMotivoRechazo] = useState<string>('');

  useEffect(() => {
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  useEffect(() => {
    if (motivoRechazo !== '' && !showModal) {
      const rechazarInscripcion = async () => {
        const data = await rechazarSolicitudInscripcionCarrera(
          `${tramiteId}`,
          motivoRechazo
        );
        if (data) {
          if (rows) setRows(rows.filter((row) => row.id !== tramiteId));
        }
        setRowModesModel({
          ...rowModesModel,
          [tramiteId as number]: { mode: GridRowModes.View },
        });
      };
      rechazarInscripcion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const handleSaveClick = (id: GridRowId) => async () => {
    const aprobarInscripcion = async () => {
      const data = await aprobarSolicitudInscripcionCarrera(`${id}`);
      if (data) {
        if (rows) setRows(rows.filter((row) => row.id !== id));
      }
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    aprobarInscripcion();
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setShowModal(true);
    setTramiteId(id);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      type: 'number',
      headerName: 'ID',
    },
    {
      field: 'usuarioSolicitanteNombre',
      type: 'string',
      headerName: 'Nombre',
    },
    {
      field: 'usuarioSolicitanteApellido',
      type: 'string',
      headerName: 'Apelido',
    },
    {
      field: 'usuarioSolicitanteEmail',
      type: 'string',
      headerName: 'Email',
    },
    {
      field: 'usuarioSolicitanteCi',
      type: 'string',
      headerName: 'Cedula',
    },
    {
      field: 'fechaCreacion',
      type: 'string',
      headerName: 'Fecha',
      align: 'left',
      valueGetter: (params) => {
        return new Date(params).toLocaleDateString('es-UY');
      },
    },
    {
      field: 'nombreCarrera',
      type: 'string',
      headerName: 'Carrera',
    },
    {
      field: 'estado',
      type: 'string',
      headerName: 'Estado',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Aceptar | Rechazar',
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<SaveIcon className='h-auto w-6 fill-garnet sm:w-8' />}
            label='Save'
            sx={{
              color: '#802c2c',
            }}
            onClick={handleSaveClick(params.row.id)}
            key={params.row.id}
          />,
          <GridActionsCellItem
            icon={<Close className='h-auto w-6 fill-garnet sm:w-8' />}
            label='Cancel'
            onClick={handleCancelClick(params.row.id)}
            key={`${params.row.id}-cancel`}
          />,
        ];
      },
    },
  ];

  return (
    <div className='relative size-full'>
      <DataGrid
        rows={rows}
        loading={rowsLoading}
        columns={columns}
        rowModesModel={rowModesModel}
        autosizeOnMount={true}
        autoHeight={true}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        rowSelection={false}
        autosizeOptions={{ expand: true }}
        sx={{ backgroundColor: '#f6f6e9', color: 'black' }}
      />
      {showModal && (
        <div className='absolute inset-0 z-20 m-auto flex h-fit max-w-fit flex-col rounded-xl bg-ivory  p-4 shadow-lg shadow-garnet md:p-6'>
          <button
            className='right-0 block w-fit cursor-pointer self-end'
            onClick={() => setShowModal(false)}
          >
            <Close className='self-end fill-garnet hover:fill-bittersweet sm:size-10' />
          </button>
          <h4 className='text-center text-black'>Motivo de rechazo</h4>
          <form
            className='flex min-h-full w-full flex-col items-center justify-between gap-2 md:mx-auto md:h-full md:max-w-full md:gap-2'
            onSubmit={(e) => {
              setShowModal(false);
              e.preventDefault();
              setMotivoRechazo(e.currentTarget.motivo.value);
            }}
          >
            <InputField
              placeholder='De un motivo al estudiante...'
              type='textarea'
              name='motivo'
              label='Motivo'
              required
            />
            <div className='flex w-2/3 flex-col items-center gap-1 sm:w-full'>
              <Button className='w-auto' styling='primary' type='submit'>
                Aceptar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function InscripcionCursoDataGrid({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState('');
  const [isOpenCurso, setIsOpenCurso] = useState(false);
  const [cursoId, setCursoId] = useState('');
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    obtenerDatosUsuarioFetch().then((res) => {
      setUsuarioId(res.id);
    });
  }, []);

  useEffect(() => {
    //Se convierte la fecha a formato dd/MM/yyyy
    rowsParent.forEach((examen) => {
      examen.fecha = convertirFecha(examen.fecha);
    });
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const handleClickConfirmarInscripcionCurso = () => {
    if (usuarioId && cursoId) {
      inscribirseCursoFetch(usuarioId, cursoId).then((data) => {
        if (data?.message) {
          setMensajeError(data.message);
          setAlertError(true);
          setAlertOk(false);
        } else {
          setMensajeError('');
          setAlertError(false);
          setAlertOk(true);
        }
      });
    }
    setIsOpenCurso(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      cellClassName: 'flex items-center self-end',
      headerClassName: 'header-center',
      flex: 1,
    },
    {
      field: 'fechaInicio',
      headerName: 'Fecha de Inicio',
      cellClassName: 'flex items-center self-end',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'fechaFin',
      headerName: 'Fecha de Fin',
      cellClassName: 'flex items-center self-end',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'inscribirse',
      headerName: 'Inscribirse',
      cellClassName: 'flex text-center self-end',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <Link
          href={`${window.location.pathname}`}
          onClick={() => {
            setIsOpenCurso(true);
            setCursoId(params.id.toString());
          }}
          className='mx-auto flex size-fit'
        >
          <Enroll className='h-auto w-6 fill-garnet sm:w-8' />
        </Link>
      ),
    },
  ];

  return (
    <>
      <div>
        <DataGrid
          className='w-full'
          rows={rows}
          loading={rowsLoading}
          columns={columns}
          sx={{ backgroundColor: '#f6f6e9', color: 'black' }}
        />
      </div>
      {isOpenCurso && (
        <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 p-0'>Inscripción a curso</h5>
              <div className='flex flex-col'>
                <p className='font-bold'>
                  ¿Desea confirmar inscripción al curso?
                </p>
              </div>
              <div className='items-center md:space-x-6'>
                <div className='inline-block'>
                  <Button
                    styling='primary'
                    className='lg:w-20'
                    onClick={handleClickConfirmarInscripcionCurso}
                  >
                    Si
                  </Button>
                </div>
                <div className='inline-block'>
                  <Button
                    styling='secondary'
                    onClick={() => setIsOpenCurso(false)}
                    className='lg:w-20'
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {alertOk && (
        <Collapse
          in={alertOk}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            variant='filled'
            onClose={() => {
              setAlertOk(false);
            }}
          >
            ¡Datos editados correctamente!
          </Alert>
        </Collapse>
      )}
      {alertError && (
        <Collapse
          in={alertError}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='error'
            variant='filled'
            onClose={() => {
              setAlertError(false);
            }}
          >
            {mensajeError}
          </Alert>
        </Collapse>
      )}
    </>
  );
}

function EditarCalificacionExamenDataGrid({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [calificaciones, setCalificaciones] = useState<{
    [key: number]: string;
  }>({});

  const handleChange = (id: number) => (event: SelectChangeEvent) => {
    setCalificaciones((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };

  useEffect(() => {
    sessionStorage.setItem('calificaciones', JSON.stringify(calificaciones));
  }, [calificaciones]);

  useEffect(() => {
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const columns: GridColDef[] = [
    { field: 'id', type: 'number', headerName: 'ID' },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'apellido', headerName: 'Apellido', flex: 1 },
    { field: 'ci', headerName: 'Cedula', flex: 1 },
    {
      field: 'calificacion',
      headerName: 'Calificación',
      flex: 1,
      renderCell: (params: GridRenderCellParams<any>) => {
        const id = params.id as number; // asegurarse de que params.id es un número
        return (
          <div>
            <FormControl
              fullWidth
              variant='standard'
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel
                id={`demo-simple-select-standard-label-${id}`}
                sx={{ color: 'black' }}
              >
                Calificación
              </InputLabel>
              <Select
                labelId={`demo-simple-select-label-${id}`}
                id={`select-${id}`}
                value={calificaciones[id] || ''}
                label='Calificación'
                onChange={handleChange(id)}
                sx={{
                  '&.MuiInputBase-root': {
                    color: 'inherit',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <MenuItem value='APROBADO'>Aprobado</MenuItem>
                <MenuItem value='REPROBADO'>Reprobado</MenuItem>
                <MenuItem value='PENDIENTE'>Pendiente</MenuItem>
              </Select>
            </FormControl>
          </div>
        );
      },
    },
  ];

  return (
    <div className='h-fit w-full p-4'>
      <DataGrid rows={rows} loading={rowsLoading} columns={columns} />
    </div>
  );
}

function HorariosCursosEstudiante({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [horarios, setHorarios] = useState<HorarioCurso[]>([]);

  useEffect(() => {
    //Se convierte la fecha a formato dd/MM/yyyy
    rowsParent.forEach((curso) => {
      curso.fechaInicio = convertirFecha(curso.fechaInicio);
      curso.fechaFin = convertirFecha(curso.fechaFin);
    });
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const handleHorario = (id: string) => {
    if (rows) {
      const cursoEncontrados = rows.find((c) => c.id.toString() === id);
      if (cursoEncontrados) {
        const horarioEncontrado = cursoEncontrados.horarios;
        setHorarios(horarioEncontrado);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      cellClassName: 'flex items-center self-end',
      headerClassName: 'header-center',
      flex: 1,
    },
    {
      field: 'asignaturaNombre',
      headerName: 'Asignatura',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'docente',
      headerName: 'Docente',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'fechaInicio',
      headerName: 'Fecha de Inicio',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'fechaFin',
      headerName: 'Fecha de Fin',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'horarios',
      headerName: 'Horarios',
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <Link
          href={`${window.location.pathname}`}
          onClick={() => {
            setIsOpen(true);
            handleHorario(params.id.toString());
          }}
          className='mx-auto flex size-fit'
        >
          <Schedule className='h-auto w-6 fill-garnet sm:w-8' />
        </Link>
      ),
    },
  ];

  return (
    <>
      <div>
        <DataGrid
          className='w-full'
          rows={rows}
          loading={rowsLoading}
          columns={columns}
          sx={{ backgroundColor: '#f6f6e9', color: 'black' }}
        />
      </div>
      {isOpen && (
        <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 p-0'>Horarios</h5>
              {horarios.length > 0 ? (
                <div>
                  {horarios.map((h, index) => (
                    <TableContainer
                      key={`${h.dia}-${h.horaInicio}-${h.horaFin}-${index}`}
                    >
                      <Table aria-label='simple table'>
                        <TableBody>
                          <TableRow
                            key={h.dia}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              py: 1,
                            }}
                          >
                            <TableCell align='right'>
                              <span className='font-bold text-black'>
                                {h.dia}
                              </span>
                              : {h.horaInicio} - {h.horaFin}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ))}
                </div>
              ) : (
                <p className='text-black'>
                  No hay horarios ingresados para el curso
                </p>
              )}
              <div className='items-center md:space-x-6'>
                <div className='inline-block'>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className=' lg:w-48'
                    styling='primary'
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SolicitudTramiteDataGrid({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [isOpenTitulo, setIsOpenTitulo] = useState(false);
  const [isOpenCertificado, setIsOpenCertificado] = useState(false);
  const [isOpenEscolaridad, setIsOpenEscolaridad] = useState(false);
  const [carreraId, setCarreraId] = useState('');
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [modalCertificado, setModalCertificado] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [certificado, setCertificado] = useState<Certificado>();
  const [modalEscolaridad, setModalEscolaridad] = useState(false);
  const [escolaridad, setEscolaridad] = useState<Escolaridad>();



  useEffect(() => {
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const setAlertHelper = () => {
    setAlertOk(false);
    setAlertError(false);
  };

  const handleClickSolicitudTitulo = () => {
    if (carreraId) {
      solicitarTituloFetch(carreraId).then((data) => {
        if (data?.message) {
          setMensajeError(data.message);
          setAlertError(true);
          setAlertOk(false);
        } else {
          setMensajeError('');
          setAlertError(false);
          setAlertOk(true);
        }
      });
    }
    setIsOpenTitulo(false);
    setAlertOk(false);
    setTimeout(setAlertHelper, 5000);
  };

  const handleClickSolicitudCertificado = () => {
    if (carreraId) {
      solicitarCertificadoFetch(carreraId).then((data) => {
        if (data?.message) {
          setMensajeError(data.message);
          setAlertError(true);
          setAlertOk(false);
        } else {
          setModalCertificado(true);
          setMensajeError('');
          setAlertError(false);
          setCertificado(data);
        }
      });
    }
    setIsOpenCertificado(false);
    setAlertOk(false);
    setTimeout(setAlertHelper, 5000);
  };

  const handleClickSolicitudEscolaridad = () => {
    if (carreraId) {
      solicitarEscolaridadFetch(carreraId).then((data) => {
        if (data?.message) {
          setMensajeError(data.message);
          setAlertError(true);
          setAlertOk(false);
        } else {
          setModalEscolaridad(true);
          setMensajeError('');
          setAlertError(false);
          setEscolaridad(data);
        }
      });
    }
    setIsOpenEscolaridad(false);
    setAlertOk(false);
    setTimeout(setAlertHelper, 5000);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'nombre',
      headerName: 'Nombre',
      cellClassName: 'w-full',
      flex: 1,
    },
    {
      field: 'duracionAnios',
      headerName: 'Duracion',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'creditos',
      headerName: 'Creditos',
      type: 'number',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'solicitudTitulo',
      headerName: 'Solicitar Titulo',
      cellClassName: 'flex items-center self-end',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => {
            setIsOpenTitulo(true);
            setCarreraId(params.id.toString());
          }}
          className='mx-auto flex size-fit'
        >
          <School className='h-auto w-6 fill-garnet sm:w-8' />
        </button>
      ),
    },
    {
      field: 'solicitarCertificado',
      headerName: 'Solicitar Certificado',
      cellClassName: 'flex items-center self-end',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => {
            setIsOpenCertificado(true);
            setCarreraId(params.id.toString());
          }}
          className='mx-auto flex size-fit'
        >
          <Grading className='h-auto w-6 fill-garnet sm:w-8' />
        </button>
      ),
    },
    {
      field: 'solicitarEscolaridad',
      headerName: 'Solicitar Escolaridad',
      cellClassName: 'flex items-center self-end',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <button
          onClick={() => {
            setIsOpenEscolaridad(true);
            setCarreraId(params.id.toString());
          }}
          className='mx-auto flex size-fit'
        >
          <Download className='h-auto w-6 fill-garnet sm:w-8' />
        </button>
      ),
    },
  ];

  return (
    <>
      <div>
        <DataGrid
          className='w-full'
          rows={rows}
          loading={rowsLoading}
          columns={columns}
          sx={{ backgroundColor: '#f6f6e9', color: 'black' }}
        />
      </div>
      {isOpenTitulo && (
        <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 p-0'>Solicitud de Titulo</h5>
              <div className='flex flex-col'>
                <p className='font-bold'>¿Desea solicitar el titulo?</p>
              </div>
              <div className='items-center md:space-x-6'>
                <div className='inline-block'>
                  <Button
                    styling='primary'
                    className='lg:w-20'
                    onClick={handleClickSolicitudTitulo}
                  >
                    Si
                  </Button>
                </div>
                <div className='inline-block'>
                  <Button
                    styling='secondary'
                    onClick={() => setIsOpenTitulo(false)}
                    className='lg:w-20'
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpenCertificado && (
        <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 p-0'>Solicitud de Certificado</h5>
              <div className='flex flex-col'>
                <p className='font-bold'>¿Desea solicitar el Certificado?</p>
              </div>
              <div className='items-center md:space-x-6'>
                <div className='inline-block'>
                  <Button
                    styling='primary'
                    className='lg:w-20'
                    onClick={handleClickSolicitudCertificado}
                  >
                    Si
                  </Button>
                </div>
                <div className='inline-block'>
                  <Button
                    styling='secondary'
                    onClick={() => setIsOpenCertificado(false)}
                    className='lg:w-20'
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalCertificado && (
        <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory p-8 shadow-lg shadow-garnet'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 mb-6 p-0'>¿Descargar certificado?</h5>
              <div className='flex items-center space-x-2'>
                <div>
                  <CertificadoPDF certificado={certificado!} />
                </div>
                <div>
                  <Button
                    styling='secondary'
                    onClick={() => setModalCertificado(false)}
                    className='lg:w-48'
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {alertOk && (
        <Collapse
          in={alertOk}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            variant='filled'
            onClose={() => {
              setAlertOk(false);
            }}
          >
            ¡Titulo Solicitado!
          </Alert>
        </Collapse>
      )}
      {alertError && (
        <Collapse
          in={alertError}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='error'
            variant='filled'
            onClose={() => {
              setAlertError(false);
            }}
          >
            {mensajeError}
          </Alert>
        </Collapse>
      )}
      {isOpenEscolaridad && (
        <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 p-0'>Solicitud de Certificado de Escolaridad</h5>
              <div className='flex flex-col'>
                <p className='font-bold'>¿Desea solicitar el Certificado de Escolaridad?</p>
              </div>
              <div className='items-center md:space-x-6'>
                <div className='inline-block'>
                  <Button
                    styling='primary'
                    className='lg:w-20'
                    onClick={handleClickSolicitudEscolaridad}
                  >
                    Si
                  </Button>
                </div>
                <div className='inline-block'>
                  <Button
                    styling='secondary'
                    onClick={() => setIsOpenEscolaridad(false)}
                    className='lg:w-20'
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalEscolaridad && (
        <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory p-8 shadow-lg shadow-garnet'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 mb-6 p-0'>¿Descargar escolaridad?</h5>
              <div className='flex items-center space-x-2'>
                <div>
                  <EscolaridadPDF escolaridad={escolaridad!} />
                </div>
                <div>
                  <Button
                    styling='secondary'
                    onClick={() => setModalEscolaridad(false)}
                    className='lg:w-48'
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InscripcionCarreraDataGrid({
  rowsParent,
  rowsLoadingParent,
}: Readonly<{
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}>) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [showModal, setShowModal] = useState(false);
  const [carrera, setCarrera] = useState<Carrera>();
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    console.log(rowsParent);
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const handleSaveClick = (id: GridRowId) => async () => {
    const carrera = rows.find((c) => c.id === id) as Carrera;
    if (carrera) {
      setCarrera(carrera);
      setShowModal(true);
    }
  };

  const inscribirseCarrera = async (id: string) => {
    const data = await inscribirseCarreraFetch(id);
    console.log(data);
    if (data.estado === 'PENDIENTE') {
      setShowModal(false);
      setAlertOk(true);
    }
    if (data.message) {
      setShowModal(false);
      setAlertError(true);
      setMensajeError(data.message);
    }
  };

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
      field: 'actions',
      type: 'actions',
      headerName: 'Inscribirse',
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EnrollC className='h-auto w-6 fill-garnet sm:w-8' />}
            label='inscribirse'
            sx={{
              color: '#802c2c',
            }}
            onClick={handleSaveClick(params.row.id)}
            key={params.row.id}
          />,
        ];
      },
    },
  ];

  return (
    <div className='relative size-full'>
      <DataGrid
        rows={rows}
        loading={rowsLoading}
        columns={columns}
        rowModesModel={rowModesModel}
        autosizeOnMount={true}
        autoHeight={true}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[25, 50, 100]}
        rowSelection={false}
        autosizeOptions={{ expand: true }}
        sx={{ backgroundColor: '#f6f6e9', color: 'black' }}
      />
      {showModal && (
        <div className='absolute inset-0 z-20 m-auto flex h-fit max-w-fit flex-col rounded-xl bg-ivory  p-4 shadow-lg shadow-garnet md:p-6'>
          <button
            className='right-0 block w-fit cursor-pointer self-end'
            onClick={() => setShowModal(false)}
          >
            <Close className='self-end fill-garnet hover:fill-bittersweet sm:size-10' />
          </button>
          <div className='rounded-md text-center font-bold text-black'>
            <h5 className='m-0 p-0'>{carrera?.nombre}</h5>
            <p>{carrera?.descripcion}</p>
            <p>
              <span className='font-bold'>Creditos: </span>
              {carrera?.creditos}
            </p>
            <div className='flex flex-col'>
              <p className='font-bold'>
                ¿Desea confirmar inscripción a carrera?
              </p>
            </div>
            <div className='items-center md:space-x-6'>
              <div className='inline-block'>
                <Button
                  styling='primary'
                  className='lg:w-20'
                  onClick={() => inscribirseCarrera(carrera!.id.toString())}
                >
                  Si
                </Button>
              </div>
              <div className='inline-block'>
                <Button
                  styling='secondary'
                  onClick={() => setShowModal(false)}
                  className='lg:w-20'
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {alertOk && (
        <Collapse
          in={alertOk}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            variant='filled'
            onClose={() => {
              setAlertOk(false);
            }}
          >
            Su inscripcion ha sido solicidada correctamente
          </Alert>
        </Collapse>
      )}
      {alertError && (
        <Collapse
          in={alertError}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            severity='warning'
            variant='filled'
            onClose={() => {
              setAlertError(false);
            }}
          >
            {mensajeError}
          </Alert>
        </Collapse>
      )}
    </div>
  );
}
