"use client";

import { useState, useEffect } from 'react';
import List from '@/components/List/list';
import { getHorariosCurso } from '@/lib/data/funcionario/actions';
import { Box, CircularProgress } from '@mui/material';
import { HorarioCurso } from '@/lib/definitions';

export default function HorariosPage({ params }: { params: { cursoId: string } }) {
  const [horariosCurso, setHorariosCurso] = useState<HorarioCurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [fallout, setFallout] = useState(false);

    const formatoHora = (hora: string) => {
        const [hours, minutes] = hora.split(':');
        return `${hours}:${minutes}`;
    }

    // Definir el orden de los días de la semana
    const diaOrden = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];

    // Función para obtener el índice del día de la semana
    const obtenerIndiceDia = (dia: string): number => {
    return diaOrden.indexOf(dia.toUpperCase());
    };
  
  
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const existenHorarios = await getHorariosCurso(params.cursoId);
        
        if (existenHorarios.length > 0) {
          const horariosCurso = existenHorarios.map((horarioCurso: HorarioCurso) => ({
            id: horarioCurso.id,
            dia: horarioCurso.dia,
            horaInicio: formatoHora(horarioCurso.horaInicio),
            horaFin: formatoHora(horarioCurso.horaFin),
          }));
          console.log(horariosCurso)
          // Ordenar los horarios por día de la semana
            horariosCurso.sort((a:any, b:any) => obtenerIndiceDia(a.dia) - obtenerIndiceDia(b.dia));

          setRows(horariosCurso);
        } else {
            setFallout(true);
        }
        setRowsLoading(false);
      } catch (error) {
        console.error("Error fetching horarios:", error);
        setFallout(true);
      }
    };
    fetchCursos().finally(() => setLoading(false));
  }, [params.cursoId]);

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#802c2c' }} />
        </Box>
      ) : (
        <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
          <h1 className='text-center font-bold'>Horarios</h1>
          <List
            rows={rows}
            rowsLoading={rowsLoading}
            columnsType='horarios'
          />
        </div>
      )}
    </>
  );
}