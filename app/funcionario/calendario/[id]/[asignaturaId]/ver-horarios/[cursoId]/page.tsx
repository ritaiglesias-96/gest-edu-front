'use client';

import { useState, useEffect } from 'react';
import List from '@/components/List/list';
import Button from '@/components/Button/button';
import { useRouter } from 'next/navigation';
import { getHorariosCurso } from '@/lib/data/funcionario/actions';
import { Box, CircularProgress } from '@mui/material';
import { HorarioCurso } from '@/lib/definitions';

export default function HorariosPage({
  params,
}: {
  params: { cursoId: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [fallout, setFallout] = useState(false);

  const formatoHora = (hora: string) => {
    const [hours, minutes] = hora.split(':');
    return `${hours}:${minutes}`;
  };

  // Definir el orden de los días de la semana
  const diaOrden = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];

  // Función para obtener el índice del día de la semana
  const obtenerIndiceDia = (dia: string): number => {
    return diaOrden.indexOf(dia.toUpperCase());
  };

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const existenHorarios = await getHorariosCurso(params.cursoId);
        if (existenHorarios.length > 0) {
          const horariosCurso = existenHorarios.map(
            (horarioCurso: HorarioCurso) => ({
              id: horarioCurso.id,
              dia: horarioCurso.dia,
              horaInicio: formatoHora(horarioCurso.horaInicio),
              horaFin: formatoHora(horarioCurso.horaFin),
            })
          );
          // Ordenar los horarios por día de la semana
          horariosCurso.sort(
            (a: any, b: any) =>
              obtenerIndiceDia(a.dia) - obtenerIndiceDia(b.dia)
          );
          setRows(horariosCurso);
        }
        setRowsLoading(false);
      } catch (error) {
        console.error('Error fetching horarios:', error);
        setFallout(true);
      }
    };
    fetchHorarios().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.cursoId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{ color: '#802c2c' }} />
      </Box>
    );
  }

  if (fallout && !loading) {
    return (
      <div className='mx-auto flex flex-col items-center justify-center text-ivory'>
        <h1>Ha ocurrido un error</h1>
        <Button onClick={() => router.back()} styling='primary'>
          Regresar
        </Button>
      </div>
    );
  }
  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Horarios</h1>
      <List rows={rows} rowsLoading={rowsLoading} columnsType='horarios' />
    </div>
  );
}
