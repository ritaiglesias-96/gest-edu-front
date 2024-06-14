'use client';
import List from '@/components/List/list';
import {
  obtenerAsignaturasParaInscripcionFetch,
  obtenerCursosInscriptoFetch,
} from '@/lib/data/estudiante/actions';
import { convertirFecha } from '@/utils/utils';
import { useState, useEffect } from 'react';

export default function CursosEstudiante() {
  const [rows, setRows] = useState([]);
  const [rowsBaja, setRowsBaja] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [rowsLoadingBaja, setRowsLoadingBaja] = useState(true);
  const [carreraId, setCarrera] = useState('');

  useEffect(() => {
    let id = sessionStorage.getItem('carrera_id');
    if (id) {
      setCarrera(id);
    }
  }, []);

  useEffect(() => {
    if (carreraId) {
      obtenerAsignaturasParaInscripcionFetch(carreraId).then((data) => {
        if (data) {
          setRows(data.asignaturas);
          setRowsLoading(false);
        }
      });
    }
  }, [carreraId]);

  useEffect(() => {
    obtenerCursosInscriptoFetch().then((data) => {
      if (data) {
        data.forEach((curso: any) => {
          curso.fechaInicio = convertirFecha(curso.fechaInicio);
          curso.fechaFin = convertirFecha(curso.fechaFin);
        });
        const cursos = data.map((curso: any) => {
          const id = curso.cursoId;
          return { ...curso, id };
        });
        setRowsBaja(cursos.filter((curso: any) => curso.estado === 'ACTIVO'));
        setRowsLoadingBaja(false);
      }
    });
  }, []);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Inscripciones a curso</h1>
      <h6 className='text-center font-bold'>
        Seleccione una asignatura para inscribirse
      </h6>
      <div className='h-fit w-full p-4'>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='asignatura-curso'
        />
      </div>
      <h6 className='text-center font-bold'>
        Seleccione un curso para darse de baja
      </h6>
      <div className='h-fit w-full p-4'>
        <List
          rows={rowsBaja}
          rowsLoading={rowsLoadingBaja}
          columnsType='asignaturaBajaCurso'
        />
      </div>
    </div>
  );
}
