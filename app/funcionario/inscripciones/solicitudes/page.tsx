'use client';

import List from '@/components/List/list';
import { getSolicitudesInscripcionCarreras } from '@/lib/data/funcionario/actions';
import {
  InscripcionCarreraPendiente,
  InscripcionCarreraPendienteFlattened,
} from '@/lib/definitions';
import { useEffect, useState } from 'react';

export default function SolicitudesPage() {
  const [rows, setRows] = useState<any[]>([]);
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
    const fetchData = async () => {
      const response = await getSolicitudesInscripcionCarreras();
      if (response) {
        const array = flattenArray(response);
        setRows(array);
        setRowsLoading(false);
      } else {
        setRows([]);
        setRowsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='size-full'>
      <h2 className='text-center font-bold'>
        Solicitudes de inscripción a carrera
      </h2>
      <List
        rows={rows}
        rowsLoading={rowsLoading}
        columnsType='none'
        isApproveRejectCarrera={true}
      />
    </div>
  );
}
