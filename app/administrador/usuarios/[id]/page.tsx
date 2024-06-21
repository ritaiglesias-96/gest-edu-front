'use client';

import List from '@/components/List/list';
import { useEffect, useState } from 'react';
import { getActividadUsuarios } from '@/lib/data/admin/actions';
import { ActividadUsuario } from '@/lib/definitions';


function formatFecha(fecha: string) {
  const date = new Date(fecha);
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: undefined,
    minute: undefined,
    second: undefined
  }).replace(',', '');
}

function formatHora(fecha: string) {
  const date = new Date(fecha);
  return date.toLocaleString('en-GB', {
    year: undefined,
    month: undefined,
    day: undefined,
    hour: '2-digit',
    minute: '2-digit',
    second: undefined
  }).replace(',', '');
}

export default function ActividadUsuarioPage({ params }: { params: { id: string } }) {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const existeActividad = await getActividadUsuarios(params.id);
        
        if (existeActividad.length > 0) {
          const actividadUsuario = existeActividad.map((actividad: ActividadUsuario) => ({
            id: actividad.id,
            fecha: formatFecha(actividad.fecha),
            hora: formatHora(actividad.fecha),
            tipoActividad: actividad.tipoActividad,
            descripcion: actividad.descripcion,
          }));

          setRows(actividadUsuario);
        } else {
            setFallout(true);
        }
        setRowsLoading(false);
      } catch (error) {
        console.error("Error fetching horarios:", error);
        setFallout(true);
      }
    };
    fetchActividad().finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Usuarios</h1>
      <div className='h-fit w-full p-4'>
        <List rows={rows} rowsLoading={rowsLoading} columnsType='actividadUsuario' />
      </div>
    </div>
  );
}
