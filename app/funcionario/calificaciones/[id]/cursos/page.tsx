'use client';
import { SetStateAction, useEffect, useState } from 'react';
import {
  getAsignatura,
  getCarreraYAsignatura,
} from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Link } from '@mui/material';
import Button from '@/components/Button/button';
import { Curso, Asignatura, Docente, Estudiante } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';

export default function CursoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [curso, setCurso] = useState<Curso>();
  const [asignatura, setAsignatura] = useState<Asignatura>();
  const [docente, setDocente] = useState<Docente>();
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  //Temporalmente se guarda un curso hasta tener pronto el back
  const tempCurso: any = {
    id: 1,
    asignaturaId: 1,
    diasPrevInsc: 30,
    fechaInicio: '01/01/2024',
    fechaFin: '31/12/2024',
    docenteId: 1,
    estado: 'ACTIVO',
  };

  //Temporalmente se guarda lista de estudiantes hasta tener el back
  const array = [
    {
      id: 3,
      ci: '3.333.333-3',
      nombre: 'Nombreestudiante2InitData',
      apellido: 'estudiante2',
      email: 'estudiante2InitData@yahoo.com',
      telefono: 12345678,
      fechaNac: '01/01/2000',
      domicilio: 'calle falsa 1234',
    },
    {
      id: 4,
      ci: '4.444.444-4',
      nombre: 'Nombreestudiante3InitData',
      apellido: 'estudiante3',
      cursoId: 1,
      email: 'estudiante3InitData@yahoo.com',
      telefono: 12345678,
      fechaNac: '02/02/3000',
      domicilio: 'calle re falsa 4567',
    },
  ];

  useEffect(() => {
    if (tempCurso) {
      getAsignatura(tempCurso.asignaturaId.toString()).then(
        (dataAsignatura) => {
          setAsignatura(dataAsignatura);
        }
      );
    }
  }, []);

  useEffect(() => {
    //TODO obtener el curso
    setCurso(tempCurso);
    setLoading(false);
    setFallout(false);
    setRowsLoading(false);
    setRows(array); //TODO: luego reemplazar con la lista de estudiantes obtenida del back
  }, []);

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

  function handleClickCalifiaciones() {
    setOpen(false);
  }

  return (
    <>
      <div className='relative box-border size-full justify-center overflow-auto md:w-5/6'>
        <h1 className='text-center'>Curso</h1>
        {!fallout && !loading && (
          <div className='h-fit w-full p-2'>
            <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
              <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
                <h3 className='m-0 p-0'>Datos del curso</h3>
                <div className='flex space-x-2'>
                  <p className='font-bold w-32'>Asignatura: </p>
                  <p>{asignatura?.nombre}</p>
                </div>
                <div className='flex space-x-2'>
                  <p className='font-bold w-32'>Fecha de inicio: </p>
                  <p>{curso?.fechaInicio.toString()}</p>
                </div>
                <div className='flex space-x-2'>
                  <p className='font-bold w-32'>Fecha de fin: </p>
                  <p>{curso?.fechaFin.toString()}</p>
                </div>
              </div>
              <div className='my-4 box-content flex flex-row justify-end rounded-md bg-ivory p-4'>
                <Button styling='primary' onClick={() => setOpen(true)}>
                  Ingresar calificaciones
                </Button>
              </div>
            </div>
            <h3>Estudiantes inscriptos al curso</h3>
            <List
              rows={rows}
              rowsLoading={rowsLoading}
              columnsType='estudiante'
            />
          </div>
        )}
        {open && (
          <>
            <div className='fixed inset-0 z-10 bg-black bg-opacity-50'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 inset-x-1/2 shadow-lg shadow-garnet bg-ivory rounded-md px-4 py-2 z-20'>
              <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
                <div className='rounded-md text-center font-bold text-black'>
                  <h3 className='m-0 p-0'>Calificaciones</h3>
                  <div className='flex flex-col'>
                    <p className='font-bold'>
                      Ingrese las calificaciones para los estudiantes
                    </p>
                  </div>
                  <List 
                    rows={rows}
                    rowsLoading={rowsLoading}
                    columnsType='none'
                    editarCalificacionCurso={true}
                  />
                  <div className='md:space-x-6 items-center'>
                    <div className='inline-block'>
                      <Button
                        styling='primary'
                        onClick={handleClickCalifiaciones}
                      >
                        Guardar
                      </Button>
                    </div>
                    <div className='inline-block'>
                      <Button
                        styling='secondary'
                        onClick={() => setOpen(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
