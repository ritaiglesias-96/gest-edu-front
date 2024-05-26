import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './list.module.css';
import {
  asignaturaColumns,
  carreraColumns,
  docenteColumns,
  usuarioColumns,
} from './columnTypes';

interface ListProps {
  rows: any[];
  rowsLoading: boolean;
  columnsType: 'carrera' | 'asignatura' | 'usuario' | 'docente' | 'estudiante';
}

export default function List({ rows, rowsLoading, columnsType }: ListProps) {
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
    case 'docente':
      columns = docenteColumns;
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
