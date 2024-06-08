import styles from './list.module.css';
import {
  asignaturaColumns,
  carreraColumns,
  noPreviaturasColumns,
  previaturasColumns,
  usuarioColumns,
  estudianteColumns,
  periodosExamenColumns,
  registroExamenColumns,
  inscriptoColumns,
  cursosColumns,
  carreraFuncionarioColumns,
  asignaturaFuncionarioColumns,
  calificarCursosColumns,
  carrerasEstudiante,
  asignaturaExamenColumns,
  asignaturaCursoColumns,
  examenColumns,
} from './columnTypes';
import { useContext, useEffect, useState } from 'react';
import Button from '@/components/Button/button';
import EditIcon from '@/assets/svg/edit.svg';
import DeleteIcon from '@/assets/svg/delete.svg';
import SaveIcon from '@/assets/svg/done.svg';
import CancelIcon from '@/assets/svg/close.svg';
import Enroll from '@/assets/svg/enroll-lesson.svg';
import CheckIcon from '@mui/icons-material/Check';
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
import { Asignatura, Calificacion } from '@/lib/definitions';
import { altaPlanEstudio } from '@/lib/data/coordinador/actions';
import { useRouter } from 'next/navigation';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import FormContainer from '../FormContainer/formContainer';
import {
  inscribirseCursoFetch,
  inscribirseExamenFetch,
} from '@/lib/data/estudiante/actions';
import { SessionContext } from '../../../context/SessionContext';
import { convertirFecha } from '@/utils/utils';
import { Collapse, Alert } from '@mui/material';
import InputField from '../InputField/inputField';
import { obtenerDatosUsuarioFetch } from '@/lib/data/actions';

type columnType =
  | 'carrera'
  | 'asignatura'
  | 'usuario'
  | 'docente'
  | 'estudiante'
  | 'carreras-estudiante'
  | 'asignatura-examenes'
  | 'asignatura-curso'
  | 'examen'
  | 'inscripto'
  | 'previtaturas'
  | 'noPrevitaturas'
  | 'registroExamen'
  | 'periodosExamen'
  | 'cursos'
  | 'carreraFuncionario'
  | 'asignaturaFuncionario'
  | 'registroExamen'
  | 'calficar-cursos'
  | 'none';
interface ListProps {
  isNormalDataGrid?: boolean;
  isEditableDocentes?: boolean;
  isInscripcionExamen?: boolean;
  isInscripcionCurso?: boolean;
  isEditableAsignaturas?: boolean;
  editarCalificacionCurso?: boolean;
  isApproveRejectCarrera?: boolean;
  rows: GridRowsProp[];
  rowsLoading: boolean;
  columnsType: columnType;
}

export default function List({
  isNormalDataGrid,
  isEditableDocentes,
  isInscripcionExamen,
  isInscripcionCurso,
  isEditableAsignaturas,
  editarCalificacionCurso,
  isApproveRejectCarrera,
  rows,
  rowsLoading,
  columnsType,
}: ListProps) {
  return (
    <div className={styles.dataGridContainer}>
      { isNormalDataGrid && (
        <NormalDataGrid
          rows={rows}
          columnsType={columnsType}
          rowsLoading={rowsLoading}
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
      )}{' '}
      {isInscripcionCurso && (
        <InscripcionCursoDataGrid
          rowsParent={rows}
          rowsLoadingParent={rowsLoading}
        />
      )}
    </div>
  );
}

function NormalDataGrid({
  rows,
  columnsType,
  rowsLoading,
}: {
  rows: any[];
  columnsType: columnType;
  rowsLoading: boolean;
}) {
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
    case 'carreras-estudiante':
      columns = carrerasEstudiante;
      break;
    case 'asignatura-examenes':
      columns = asignaturaExamenColumns;
      break;
    case 'asignatura-curso':
      columns = asignaturaCursoColumns;
      break;
    case 'examen':
      columns = examenColumns;
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
    case 'registroExamen':
      columns = registroExamenColumns;
      break;
    case 'carreraFuncionario':
      columns = carreraFuncionarioColumns;
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
    case 'calficar-cursos':
      columns = calificarCursosColumns;
      break;
    case 'registroExamen':
      columns = registroExamenColumns;
      break;
    case 'periodosExamen':
      columns = periodosExamenColumns;
      break;
    default:
      break;
  }
  return (
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
  );
}

function EditableDocentesDataGrid({
  rowsParent,
  rowsLoadingParent,
}: {
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}) {
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
      if (data) {
        if (rows) setRows(rows.filter((row) => row.id !== id));
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
              icon={<CancelIcon className='h-auto w-6 fill-garnet sm:w-8' />}
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
    <div className='h-fit w-full p-4'>
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
}: {
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}) {
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
              icon={<CancelIcon className='h-auto w-6 fill-garnet sm:w-8' />}
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
}: {
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [calificaciones, setCalificaciones] = useState<{
    [key: number]: string;
  }>({});

  const handleChange = (id: number) => (event: SelectChangeEvent) => {
    setCalificaciones((prev) => ({
      ...prev,
      [id]: event.target.value as string,
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
}: {
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCurso, setIsOpenCurso] = useState(false);
  const [examenId, setExamenId] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const session = useContext(SessionContext);

  useEffect(() => {
    if (session.session?.email) {
      setEmail(session.session.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setIsOpen(false);
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
            setIsOpen(true), setExamenId(params.id.toString());
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

      {isOpen && (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl shadow-lg shadow-garnet bg-ivory rounded-md px-4 py-2'>
          <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='rounded-md text-center font-bold text-black'>
              <h5 className='m-0 p-0'>Inscripción a examen</h5>
              <div className='flex flex-col'>
                <p className='font-bold'>
                  ¿Desea confirmar inscripción al exámen?
                </p>
              </div>
              <div className='md:space-x-6 items-center'>
                <div className='inline-block'>
                  <Button
                    styling='primary'
                    className='lg:w-20'
                    onClick={handleClickConfirmarInscripcion}
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
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
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
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
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
          console.log(data);
          if (rows) setRows(rows.filter((row) => row.id !== tramiteId));
        }
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
            icon={<CancelIcon className='h-auto w-6 fill-garnet sm:w-8' />}
            label='Cancel'
            onClick={handleCancelClick(params.row.id)}
            key={`${params.row.id}-cancel`}
          />,
        ];
      },
    },
  ];

  return (
    <div className='relative size-full p-4'>
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
        <div className='absolute inset-x-1/3 top-0 z-20 flex size-fit flex-col rounded-xl bg-ivory p-6 shadow-lg shadow-garnet md:p-10'>
          <button
            className='right-0 block w-fit cursor-pointer self-end'
            onClick={() => setShowModal(false)}
          >
            <CancelIcon className='self-end fill-garnet hover:fill-bittersweet sm:size-10' />
          </button>
          <h3 className='text-center text-black'>Motivo de rechazo</h3>
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
}: {
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState('');
  const [isOpenCurso, setIsOpenCurso] = useState(false);
  const [cursoId, setCursoId] = useState('');
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const session = useContext(SessionContext);

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
            setIsOpenCurso(true), setCursoId(params.id.toString());
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
