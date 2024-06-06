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
} from './columnTypes';
import { useEffect, useState } from 'react';
import Button from '@/components/Button/button';
import EditIcon from '@/assets/svg/edit.svg';
import DeleteIcon from '@/assets/svg/delete.svg';
import SaveIcon from '@/assets/svg/done.svg';
import CancelIcon from '@/assets/svg/close.svg';
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
import InputField from '../InputField/inputField';

type columnType =
  | 'carrera'
  | 'asignatura'
  | 'usuario'
  | 'docente'
  | 'estudiante'
  | 'periodosExamen'
  | 'inscripto'
  | 'previtaturas'
  | 'noPrevitaturas'
  | 'cursos'
  | 'carreraFuncionario'
  | 'asignaturaFuncionario'
  | 'registroExamen'
  | 'none';
interface ListProps {
  isEditableDocentes?: boolean;
  isEditableAsignaturas?: boolean;
  editarCalificacionCurso?: boolean;
  isApproveRejectCarrera?: boolean;
  rows: GridRowsProp[];
  rowsLoading: boolean;
  columnsType: columnType;
}

export default function List({
  isEditableDocentes,
  isEditableAsignaturas,
  editarCalificacionCurso,
  isApproveRejectCarrera,
  rows,
  rowsLoading,
  columnsType,
}: ListProps) {
  return (
    <div className={styles.dataGridContainer}>
      {columnsType !== 'none' && (
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
    case 'previtaturas':
      columns = previaturasColumns;
      break;
    case 'noPrevitaturas':
      columns = noPreviaturasColumns;
      break;
    case 'estudiante':
      columns = estudianteColumns;
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
    // TODO agregar llamada a la API para eliminar el docente
    const deleteD = async () => {
      return await deleteDocente(`${id}`);
    };
    const data: any = deleteD();
    if (data) {
      if (rows) setRows(rows.filter((row) => row.id !== id));
    }
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

  const edit = async (docente: GridRowModel) => {
    const data: any = await editDocente(docente);
    return data;
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    const data: any = edit(updatedRow);
    if (data) {
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    } else {
      return rows;
    }
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

function ApproveRejectDataGrid({
  rowsParent,
  rowsLoadingParent,
}: {
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [showModal, setShowModal] = useState(true);
  const [motivoRechazo, setMotivoRechazo] = useState<string>('');

  useEffect(() => {
    setRows(rowsParent);
    setRowsLoading(rowsLoadingParent);
  }, [rowsLoadingParent, rowsParent]);

  const handleSaveClick = (id: GridRowId) => () => {
    //TODO aceptar solicitud
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setShowModal(true);
    if (motivoRechazo === '' && !showModal) {
      alert('Debe ingresar un motivo de rechazo');
    } else {
      const rechazarInscripcion = async () => {
        return await rechazarSolicitudInscripcionCarrera(
          `${id}`,
          motivoRechazo
        );
      };
      const data: any = rechazarInscripcion();
      if (data) {
        if (rows) setRows(rows.filter((row) => row.id !== id));
      }
    }
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
          <form className='flex min-h-full w-full flex-col items-center justify-between gap-2 md:mx-auto md:h-full md:max-w-full md:gap-2 '>
            <InputField
              placeholder='De un motivo al estudiante...'
              type='textarea'
              name='motivo'
              label='Motivo'
              required={true}
              onChange={(e) => setMotivoRechazo(e.target.value)}
            ></InputField>
            <div className='flex w-2/3 flex-col items-center gap-1 sm:w-full'>
              <Button className='w-auto' styling='primary'>
                Aceptar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}