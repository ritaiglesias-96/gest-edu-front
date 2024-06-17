"use client";

import { useState, useEffect } from 'react';
import List from '@/components/List/list';
import { getCursosHorariosCarrera } from '@/lib/data/funcionario/actions';
import { Box, CircularProgress } from '@mui/material';
import { CursoHorario } from '@/lib/definitions';

export default function CursosPage({ params }: { params: { id: string } }) {
  const [cursosHorarios, setCursosHorarios] = useState<CursoHorario[]>([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [fallout, setFallout] = useState(false);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const existenCursos = await getCursosHorariosCarrera(params.id);
        console.log('Datos recibidos de la API:', existenCursos);
  
        if (existenCursos.length > 0) {
          const cursosHorarios = existenCursos.map((cursoHorario: CursoHorario) => ({
            id: cursoHorario.cursoId,
            fechaInicio: cursoHorario.fechaInicio,
            fechaFin: cursoHorario.fechaFin,
            diasPrevInsc: cursoHorario.diasPrevInsc,
            estado: cursoHorario.estado,
            asignaturaNombre: cursoHorario.asignaturaNombre,
            docenteNombre: cursoHorario.docenteNombre,
            docenteApellido: cursoHorario.docenteApellido,
            horarios: cursoHorario.horarios,
          }));
          console.log('Datos procesados para rows:', cursosHorarios);
          setRows(cursosHorarios);
          setRowsLoading(false);
        } else {
          setFallout(true);
        }
      } catch (error) {
        console.error("Error fetching cursos:", error);
        setFallout(true);
      }
    };
    fetchCursos().finally(() => setLoading(false));
  }, [params.id]);

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#802c2c' }} />
        </Box>
      ) : (
        <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
          <h1 className='text-center font-bold'>Cursos</h1>
          <List
            rows={rows}
            rowsLoading={rowsLoading}
            columnsType='horariosCursos'
          />
        </div>
      )}
    </>
  );
}