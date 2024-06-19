import { Certiticado } from '@/lib/definitions';
import { convertirFecha } from '@/utils/utils';
import { useEffect, useState } from 'react';
import FormContainer from '../FormContainer/formContainer';

export default function Certificado() {
  const [certificado, setCertificado] = useState<Certiticado>();

  useEffect(() => {
    const data = sessionStorage.getItem('datos-certificado');
    if (data) {
      let objetoJson = JSON.parse(data);
      console.log(objetoJson);

      setCertificado(objetoJson);
    }
  }, []);

  return (
    <div className=' text-black sm:w-4/5 md:w-2/3'>
      {certificado && (
        <>
          <h2>Estudiante</h2>
          <div>
            <b>CI:</b> {certificado.estudiante.ci}
          </div>

          <div>
            <b>Nombre:</b> {certificado.estudiante.nombre}
          </div>
          <div>
            <b>Apellido:</b> {certificado.estudiante.apellido}
          </div>
          <h2>Carrera</h2>
          <h4>{certificado.carrera}</h4>
          <div>
            <b>Fecha:</b> {convertirFecha(certificado.fecha)}
          </div>
        </>
      )}
    </div>
  );
}
