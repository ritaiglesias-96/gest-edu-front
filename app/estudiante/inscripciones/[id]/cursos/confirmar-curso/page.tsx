'use client';
import List from '@/components/List/list';
import {
  getAsignatura,
} from '@/lib/data/coordinador/actions';
import { obtenerCursosVigentes } from '@/lib/data/estudiante/actions';
import { Asignatura } from '@/lib/definitions';
import React from 'react';
import { useEffect, useState } from 'react';

export default function ConfirmarInscripcionCurso() {
  const [asignatura, setAsignatura] = useState<Asignatura>();
  const [asignaturaId, setAsignaturaId] = useState('');
  const [cursoId, setCursoId] = useState(
    sessionStorage.getItem('curso_id') || ''
  );
  const [cursos, setCursos] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    let id = sessionStorage.getItem('asignatura_id');
    if (id) {
      setAsignaturaId(id);
    }
  }, []);

  useEffect(() => {
    let id = sessionStorage.getItem('curso_id');
    if (id) {
      setCursoId(id);
    }
  }, []);

  useEffect(() => {
    getAsignatura(asignaturaId).then((data) => {
      setAsignatura(data);
    });
  }, [asignaturaId]);

  useEffect(() => {
    obtenerCursosVigentes(asignaturaId).then((data) => {
      if (data) {
        setRows(data ? data : []);
        setRowsLoading(false);
        setCursos(data);
      }
    });
  }, [asignaturaId]);

  console.log(rows);
  return (
    <div className='relative box-border size-full w-3/6 justify-center overflow-auto'>
      <h1 className='text-center font-bold'>Confirmar inscripción a curso</h1>

      {asignatura && (
        <div>
          <div>
            <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
              <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
                <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
                  <h3 className='m-0 p-0'>{asignatura?.nombre}</h3>
                  <div className='flex flex-col'>
                    <p className='font-bold'>Descripcion:</p>
                    <p>{asignatura?.descripcion}</p>
                  </div>
                </div>
                <div className='flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center'>
                  <div className='flex flex-col'>
                    <p className='font-bold'>Creditos:</p>
                    <p>{asignatura?.creditos + ' creditos'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <List
            rows={rows}
            rowsLoading={rowsLoading}
            columnsType='none'
            isInscripcionCurso={true}
          />
        </div>
      )}
    </div>
  );
}
