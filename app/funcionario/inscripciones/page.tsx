'use client';
import { useEffect, useState } from 'react';
import { getCarreras } from '@/lib/data/actions';
import List from '@/components/List/list';
import Box from '@mui/material/Box';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import { getSolicitudesInscripcionCarreras } from '@/lib/data/funcionario/actions';
import { InscripcionCarreraPendiente } from '@/lib/definitions';

export default function InscripcionesPage() {
  const [rowsSolicitud, setRowsSolicitud] = useState<any[]>([]);
  const [rowsLoadingSolicitud, setRowsLoadingSolicitud] = useState(true);
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);

  function flattenArray(arr: InscripcionCarreraPendiente[]) {
    return arr.map((item) => {
      const { usuarioSolicitante, ...rest } = item;
      return {
        ...rest,
        usuarioSolicitanteId: usuarioSolicitante.id,
        usuarioSolicitanteCi: usuarioSolicitante.ci,
        usuarioSolicitanteNombre: usuarioSolicitante.nombre,
        usuarioSolicitanteApellido: usuarioSolicitante.apellido,
        usuarioSolicitanteEmail: usuarioSolicitante.email,
      };
    });
  }

  useEffect(() => {
    getCarreras().then((data) => {
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
    const fetchData = async () => {
      const response = await getSolicitudesInscripcionCarreras();
      if (response) {
        const array = flattenArray(response);
        setRowsSolicitud(array);
        setRowsLoadingSolicitud(false);
      } else {
        setRows([]);
        setRowsLoadingSolicitud(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <div className='h-fit w-full'>
        <h3 className='text-center font-bold text-ivory'>Inscripciones</h3>
      </div>
      <Box>
        <Tabs defaultValue={1}>
          <TabsList className='mb-4 flex size-full content-between items-center justify-center rounded-xl bg-garnet shadow-lg'>
            <Tab
              slotProps={{
                root: ({ selected, disabled }) => ({
                  className: `${
                    selected
                      ? 'text-black font-bold bg-white'
                      : 'text-white font-normal bg-garnet focus:text-white hover:bg-bittersweet/50'
                  } ${
                    disabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer'
                  } text-base font-bold w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0`,
                }),
              }}
              value={1}
            >
              Inscripciones a carrera
            </Tab>
            <Tab
              slotProps={{
                root: ({ selected, disabled }) => ({
                  className: `${
                    selected
                      ? 'text-black font-bold bg-white'
                      : 'text-white font-normal bg-garnet focus:text-white hover:bg-bittersweet/50'
                  } ${
                    disabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer'
                  } text-base w-full p-2 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0`,
                }),
              }}
              value={2}
            >
              Inscripciones a examen
            </Tab>
          </TabsList>
          <TabPanel className='w-full' value={1}>
            <List
              rows={rowsSolicitud}
              rowsLoading={rowsLoadingSolicitud}
              columnsType='none'
              isApproveRejectCarrera={true}
            />
          </TabPanel>
          <TabPanel className='w-full' value={2}>
            <List
              rows={rows}
              rowsLoading={rowsLoading}
              columnsType='carreraInscripcionFuncionario'
            />
          </TabPanel>
        </Tabs>
      </Box>
    </div>
  );
}
