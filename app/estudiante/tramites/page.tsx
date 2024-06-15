'use client';

import List from '@/components/List/list';
import { getTramitesEstudiantes } from '@/lib/data/estudiante/actions';
import { Examen, TramiteEstudiante } from '@/lib/definitions';
import { convertirFecha } from '@/utils/utils';
import { useEffect, useState } from 'react';

export default function TramitesEstudiantes() {
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);

  useEffect(() => {
    getTramitesEstudiantes().then((response) => {
      if (!response.message) {
        console.log(response);
        const tramites: TramiteEstudiante[] = response.map((r: any) => {
          const tramite: TramiteEstudiante = {
            id: r.id,
            carreraId: r.carreraId,
            nombreCarrera: '', //TODO luego cambiar por el nombre
            tipo:
              r.tipo.toLowerCase().replace(/_/g, ' ').charAt(0).toUpperCase() +
              r.tipo.toLowerCase().replace(/_/g, ' ').slice(1),
            motivoRechazo: r.motivoRechazo,
            estado: r.estado,
            fechaCreacion: convertirFecha(r.fechaCreacion),
            fechaActualizacion: convertirFecha(r.fechaActualizacion),
          };
          return tramite;
        });
        setRows(tramites);
      }
      setRowsLoading(false);
    });
  }, []);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Trámites</h1>

      <div className='h-fit w-full p-4'>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='consultaTramitesEstudiante'
        />
      </div>
    </div>
  );
}
