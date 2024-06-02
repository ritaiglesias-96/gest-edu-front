import styles from "./list.module.css";
import {
  asignaturaColumns,
  carreraColumns,
  noPreviaturasColumns,
  previaturasColumns,
  usuarioColumns,
  estudianteColumns,
  inscriptoColumns,
  carrerasEstudiante,
  asignaturaExamenColumns,
  examenColumns,
} from "./columnTypes";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/Button/button";
import EditIcon from "@/assets/svg/edit.svg";
import DeleteIcon from "@/assets/svg/delete.svg";
import SaveIcon from "@/assets/svg/done.svg";
import CancelIcon from "@/assets/svg/close.svg";
import Enroll from "@/assets/svg/enroll-lesson.svg";
import CheckIcon from "@mui/icons-material/Check";
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
} from "@mui/x-data-grid";
import { editDocente, deleteDocente } from "@/lib/data/funcionario/actions";
import Link from "next/link";
import { inscribirseExamenFetch } from "@/lib/data/estudiante/actions";
import { SessionContext } from "../../../context/SessionContext";
import { convertirFecha } from "@/utils/utils";
import { Collapse, Alert } from "@mui/material";
import { Asignatura } from '@/lib/definitions';
import { altaPlanEstudio } from '@/lib/data/coordinador/actions';
import { useRouter } from 'next/navigation';

type columnType =
  | "carrera"
  | "asignatura"
  | "usuario"
  | "docente"
  | "estudiante"
  | "carreras-estudiante"
  | "asignatura-examenes"
  | "examen"
  | 'inscripto'
  | 'previtaturas'
  | 'noPrevitaturas'
  | "none";
interface ListProps {
  isEditableDocentes?: boolean;
  isInscripcionExamen?: boolean;
  isEditableAsignaturas?: boolean;
  rows: GridRowsProp[];
  rowsLoading: boolean;
  columnsType: columnType;
}

export default function List({
  isEditableDocentes,
  isInscripcionExamen,
  isEditableAsignaturas,
  rows,
  rowsLoading,
  columnsType,
}: ListProps) {
  return (
    <div className={styles.dataGridContainer}>
      {!isEditableDocentes && !isInscripcionExamen && (
        <NormalDataGrid
          rows={rows}
          columnsType={columnsType}
          rowsLoading={rowsLoading}
        />
      )}
      {isEditableDocentes && !isInscripcionExamen && (
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
    case "carrera":
      columns = carreraColumns;
      break;
    case "asignatura":
      columns = asignaturaColumns;
      break;
    case "usuario":
      columns = usuarioColumns;
      break;
    case "estudiante":
      columns = estudianteColumns;
      break;
    case "carreras-estudiante":
      columns = carrerasEstudiante;
      break;
    case "asignatura-examenes":
      columns = asignaturaExamenColumns;
      break;
    case "examen":
      columns = examenColumns;
      break;
    case 'previtaturas':
      columns = previaturasColumns;
      break;
    case 'noPrevitaturas':
      columns = noPreviaturasColumns;  
      break;
    case 'inscripto':
      columns = inscriptoColumns;
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
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
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
      field: "id",
      type: "number",
      headerName: "ID",
      width: 90,
      editable: false,
    },
    { field: "nombre", headerName: "Nombre", width: 180, editable: true },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 180,
      editable: true,
    },
    {
      field: "documento",
      headerName: "Cedula",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon className="h-auto w-6 fill-garnet sm:w-8" />}
              label="Save"
              sx={{
                color: "#802c2c",
              }}
              onClick={handleSaveClick(id)}
              key={id}
            />,
            <GridActionsCellItem
              icon={<CancelIcon className="h-auto w-6 fill-garnet sm:w-8" />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              key={`${id}-cancel`}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon className="h-auto w-6 fill-garnet sm:w-8 " />}
            label="Edit"
            onClick={handleEditClick(id)}
            key={id}
            sx={{
              color: "#802c2c",
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon className="h-auto w-6 fill-garnet sm:w-8" />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            key={`${id}-delete`}
            sx={{
              color: "#802c2c",
              height: "100%",
            }}
          />,
        ];
      },
    },
  ];

  return (
    <div className="h-fit w-full p-4">
      <div className="my-4 box-content flex flex-row justify-end rounded-md bg-ivory p-4">
        <Link href="/funcionario/docentes/agregar">
          <Button styling="primary">Agregar Docente</Button>
        </Link>
      </div>
      <DataGrid
        rows={rows}
        loading={rowsLoading}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        autosizeOnMount={true}
        autoHeight={true}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{ backgroundColor: "#f6f6e9", color: "black" }}
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
    // TODO agregar llamada a la API para agregar el plan de estudio
    console.log(rows);
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

  const edit = async (docente: GridRowModel) => {
    // const data: any = await editDocente(docente);
    // return data;
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
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

function InscripcionExamenDataGrid({
  rowsParent,
  rowsLoadingParent,
}: {
  rowsParent: GridRowsProp;
  rowsLoadingParent: boolean;
}) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [examenId, setExamenId] = useState("");
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');


  const session = useContext(SessionContext);

  useEffect(() => {
    if (session.session?.email) {
      setEmail(session.session.email);
    }
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      cellClassName: "flex items-center self-end",
      headerClassName: "header-center",
      flex: 1,
    },
    {
      field: "fecha",
      headerName: "Fecha",
      cellClassName: "flex items-center self-end",
      headerAlign: "center",
      flex: 1,
    },
    {
      field: "inscribirse",
      headerName: "Inscribirse",
      cellClassName: "flex text-center self-end",
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => (
        <Link
          href={`${window.location.pathname}`}
          onClick={() => {
            setIsOpen(true), setExamenId(params.id.toString());
          }}
          className="mx-auto flex size-fit"
        >
          <Enroll className="h-auto w-6 fill-garnet sm:w-8" />
        </Link>
      ),
    },
  ];

  return (
    <>
      <div>
        <DataGrid
          className="w-full"
          rows={rows}
          loading={rowsLoading}
          columns={columns}
          sx={{ backgroundColor: "#f6f6e9", color: "black" }}
        />
      </div>

      {isOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl shadow-lg shadow-garnet bg-ivory rounded-md px-4 py-2">
          <div className="my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline">
            <div className="rounded-md text-center font-bold text-black">
              <h5 className="m-0 p-0">Inscripción a examen</h5>
              <div className="flex flex-col">
                <p className="font-bold">
                  ¿Desea confirmar inscripción al exámen?
                </p>
              </div>
              <div className="md:space-x-6 items-center">
                <div className="inline-block">
                  <Button
                    styling="primary"
                    className="lg:w-20"
                    onClick={handleClickConfirmarInscripcion}
                  >
                    Si
                  </Button>
                </div>
                <div className="inline-block">
                  <Button
                    styling="secondary"
                    onClick={() => setIsOpen(false)}
                    className="lg:w-20"
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet"
        >
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            variant="filled"
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet"
        >
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="error"
            variant="filled"
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
