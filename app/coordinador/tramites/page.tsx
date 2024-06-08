'use client';
import { useEffect, useState } from 'react';
import { getSolicitudesTituloPendientes } from '@/lib/data/coordinador/actions';
import List from '@/components/List/list';
import { formatDate } from '@/utils/utils';
import { SolicitudTitulo } from '@/lib/definitions';

export default function CarrerasPage() {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  useEffect(() => {
    getSolicitudesTituloPendientes().then((data) => {
      data.forEach((solicitud: SolicitudTitulo) => {
        solicitud.fechaCreacion = formatDate(solicitud.fechaCreacion); // Remove the time component
      });

      setRows(data ? data : []);
      setRowsLoading(false);
    });
  }, []);
  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Solicitudes de Titulo</h1>
      <div className='h-fit w-full p-4'>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='solicitudTitulo'
        />
      </div>
    </div>
  );
}
