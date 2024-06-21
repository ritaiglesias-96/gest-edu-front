'use client';

import { useEffect, useState } from 'react';
import List from '@/components/List/list';
import {
  obtenerCarrerasInscriptoFetch,
  obtenerCarrerasNoInscripto,
} from '@/lib/data/estudiante/actions';
import { Tabs } from '@mui/base/Tabs';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tab } from '@mui/base/Tab';
import Box from '@mui/material/Box';

export default function InscripcionesHome() {
  const [rows, setRows] = useState([]);
  const [rowsCarrerasNoIns, setRowsCarrerasNoIns] = useState([]);
  const [rowsLoadingCarrerasNoIns, setRowsLoadingCarrerasNoIns] =
    useState(true);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    obtenerCarrerasInscriptoFetch().then((data) => {
      setRows(data.content ? data.content : []);
      setRowsLoading(false);
    });
    obtenerCarrerasNoInscripto().then((data) => {
      setRowsCarrerasNoIns(data.content ? data.content : []);
      setRowsLoadingCarrerasNoIns(false);
    });
  }, []);

  return (
    <div className='relative box-border size-full justify-center md:w-2/3'>
      <h1 className='text-center font-bold'>Carreras</h1>
      <div className='h-fit w-full p-4'>
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
                Mis Carreras
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
                Otras carreras
              </Tab>
            </TabsList>
            <TabPanel className='w-full' value={1}>
              <List
                rows={rows}
                rowsLoading={rowsLoading}
                columnsType='carreras-estudiante'
              />
            </TabPanel>
            <TabPanel className='w-full' value={2}>
              <List
                rows={rowsCarrerasNoIns}
                rowsLoading={rowsLoadingCarrerasNoIns}
                columnsType='none'
                isInscripcionCarrera={true}
              />
            </TabPanel>
          </Tabs>
        </Box>
      </div>
    </div>
  );
}
