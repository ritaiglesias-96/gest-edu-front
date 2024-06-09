'use client';

import {
  getCarreraYAsignaturaPendientes,
  obtenerAsignaturasPendientes,
  obtenerCarrerasInscriptoFetch,
} from '@/lib/data/estudiante/actions';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Asignatura, Carrera, CarreraAsignaturas } from '@/lib/definitions';
import { previaturasColumns } from '@/components/List/columnTypes';

export default function ConsultarCarreras() {
  const [carrerasIncripto, setCarreras] = useState<Carrera[]>([]);
  const [carrerasAsignaturas, setCarrerasAsignaturas] = useState<CarreraAsignaturas[]>([]);

  useEffect(() => {
    obtenerCarrerasInscriptoFetch().then((data) => {
      setCarreras(data.content); 
    });
  }, []);

  useEffect(() => {
    carrerasIncripto.map((carrera) => {
      getCarreraYAsignaturaPendientes(carrera.id.toString()).then((data) => { 
        const prevCarreras = carrerasAsignaturas;
        const carrera: Carrera = data?.carrera; 
        const asignaturas: Asignatura[] = data?.asignaturas; 
        const carreraAsignaturas: CarreraAsignaturas = { carrera, asignaturas };
        //TODO: Hacer if para que no agrege mas de una vez la carrera
        prevCarreras.push(carreraAsignaturas);
        setCarrerasAsignaturas(prevCarreras);
        console.log(prevCarreras);
        
      });
    })
  }, [carrerasIncripto]);

  // useEffect(() => {
  //   if (carreras.length > 0) {
  //     carreras.forEach((carrera) => {
  //       obtenerAsignaturasPendientes(carrera.id)
  //         .then((data) => {
  //           if (data?.asignaturas) {
  //             const pendientes = data.asignaturas;
  //             setAsignaturas((prevAsignaturas) => ({
  //               ...prevAsignaturas,
  //               pendientes,
  //             }));
  //           }
  //         })
  //         .catch((error) => {
  //           console.error(
  //             `Error fetching asignaturas for carrera ${carrera.id}:`,
  //             error
  //           );
  //         });
  //     });
  //   }
  // }, [carreras]);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-3/4'>
      <h1 className='text-center font-bold'>Carreras del estudiante</h1>
      <h5 className='text-center font-bold'>
        Puede visulaizar las asignaturas pendientes expandiendo cada carrera.
      </h5>
      <div>
        {carrerasAsignaturas.map((carrera) => (
          <Accordion key={carrera.carrera.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              {carrera.carrera.nombre}
            </AccordionSummary>
            <AccordionDetails>
            {carrera.asignaturas.length > 0 ? (
                <ul>
                  {carrera.asignaturas
                    .map((asignatura) => (
                      <li key={asignatura.id}>{asignatura.nombre}</li>
                    ))}
                </ul>
              ) : (
                <p>Cargando asignaturas...</p>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
