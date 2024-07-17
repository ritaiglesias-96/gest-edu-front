'use client';
import List from '@/components/List/list';
import { getHorariosCursosEstudiante } from '@/lib/data/estudiante/actions';
import { useEffect, useState } from 'react';
import Clock from '@/assets/svg/schedule.svg';

export default function CursosEstudiante() {
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);

  useEffect(() => {
    getHorariosCursosEstudiante().then((horarioCursos: any[]) => {
      console.log(horarioCursos);
      if (horarioCursos) {
        let horarios = horarioCursos.map((horario: any) => {
          const id = horario.cursoId;
          const docente = horario.docenteNombre + ' ' + horario.docenteApellido;
          return { ...horario, id, docente };
        });
        horarios = horarios.filter(
          (horario: any) => horario.estado === 'ACTIVO'
        );
        console.log(horarios);
        setRows(horarios);
        setRowsLoading(false);
      }
    });
  }, []);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Horarios de cursos</h1>
      <h6 className='text-center font-bold'>
        Para ver los horarios haga clic en el{' '}
        <Clock className='inline-block h-6 w-auto' /> del curso
      </h6>
      <div className='h-fit w-full p-4'>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='none'
          isHorarioCursoConsulta={true}
        />
      </div>
    </div>
  );
}
