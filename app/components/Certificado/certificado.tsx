import { Certiticado } from '@/lib/definitions';
import { convertirFecha } from '@/utils/utils';
import { useEffect, useState } from 'react';

export default function Certificado() {
  const [certificado, setCertificado] = useState<Certiticado>();

  useEffect(() => {
    const data = sessionStorage.getItem('datos-certificado');
    if (data) {
      let objetoJson = JSON.parse(data);
      setCertificado(objetoJson);
    }
  },[]);

  return (
    <div className=' text-black sm:w-4/5 md:w-2/3'>
      <div className=' grid w-full grid-cols-1 items-center justify-items-center gap-4 sm:grid-cols-2'></div>
      {certificado && (
        <>
          <div>Nombre: {certificado.estudiante.nombre}</div>
          <div>Apellido: {certificado.estudiante.apellido}</div>
          <div>Carrera: {certificado.carrera}</div>
          <div>Fecha: {convertirFecha(certificado.fecha)}</div>
        </>
      )}
    </div>
  );
}
