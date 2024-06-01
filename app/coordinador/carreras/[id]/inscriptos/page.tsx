'use client';

import List from '@/components/List/list';
import { getEstudiantesInscriptos } from '@/lib/data/coordinador/actions';
import { useEffect, useState } from 'react';

export default function EstudiantesInscriptosPage({
  params,
}: {
  params: { id: string };
}) {
  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(true);3

  const fetch = async () => {
    
    const existenInscriptos = await getEstudiantesInscriptos(params.id);
    if (existenInscriptos) {
        const estudiantes = existenInscriptos.map((inscripcion: any)  => ({
            id: inscripcion.estudiante.id,
            ci: inscripcion.estudiante.ci,
            nombre: inscripcion.estudiante.nombre,
            apellido: inscripcion.estudiante.apellido,
            email: inscripcion.estudiante.email,
            estado: inscripcion.estado,
            fechaInscripcion: new Date (inscripcion.fechaInscripcion).toLocaleDateString('es-ES'),
            creditosObtenidos: inscripcion.creditosObtenidos ? inscripcion.creditosObtenidos : 0,
          }));
          setRows(estudiantes);
    

      //setRows(existenInscriptos);
      setRowsLoading(false);
      console.log(existenInscriptos);
      
    }
  };
  
  useEffect(() => {
    fetch();
  }, []);


  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
      <h1 className='text-center font-bold'>Estudiantes</h1>
      <List
        isEditableDocentes={false}
        rows={rows}
        rowsLoading={rowsLoading}
        columnsType='inscripto'
      />
    </div>
  );
}
