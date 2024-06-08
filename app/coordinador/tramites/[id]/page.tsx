'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import { getSolicitudesTituloPendientes } from '@/lib/data/coordinador/actions';
import { SolicitudTitulo } from '@/lib/definitions';
import { useEffect, useState } from 'react';

export default function ResolverSolicitudPage({
  params,
}: {
  params: { id: string };
}) {
  const [solicitud, setSolicitud] = useState<SolicitudTitulo>();

  const fetchDatosSolicitud = async () => {
    const data = await getSolicitudesTituloPendientes().then((data) => {
      const matchingSolicitud = data.find(
        (solicitud: SolicitudTitulo) => solicitud.id.toString() === params.id
      );
      setSolicitud(data);
    });
  };

  useEffect(() => {
    fetchDatosSolicitud();
    const fetchUsuario = async () => {
      const data = await getSolicitudesTituloPendientes().then((data) => {
        const matchingSolicitud = data.find(
          (solicitud: SolicitudTitulo) => solicitud.id.toString() === params.id
        );
        setSolicitud(data);
      });
    };
  }, []);

  return (
    <>
      <FormContainer className=' text-black sm:w-4/5 md:w-2/3'>
        <div className=' grid w-full grid-cols-1 items-center justify-items-center gap-4 sm:grid-cols-2'></div>
        <div className=' col-span-full'>
          <h4>Datos Personlanes:</h4>
        </div>
        <div id='divCi' className='flex w-full flex-row justify-center gap-2'>
          <div>{solicitud?.usuarioSolicitante.ci}</div>
        </div>
        <div
          id='divNombreApellido'
          className='flex w-full flex-row justify-center gap-2'
        >
          <div>
            {solicitud?.usuarioSolicitante.nombre}{' '}
            {solicitud?.usuarioSolicitante.nombre}
          </div>
        </div>
        <div
          id='divDocumento'
          className='flex w-full flex-row justify-center gap-2'
        >
          <div>
            {solicitud?.usuarioSolicitante.nombre}{' '}
            {solicitud?.usuarioSolicitante.nombre}
          </div>
        </div>
        <div className='col-span-full'>
          <Button
            id='btnEditar'
            styling='primary'
            onClick={
              console.log('buenas')
              /* handleClickEditar */
            }
          >
            Editar datos
          </Button>
        </div>
        {/* <Collapse in={isOpen} className='col-span-full'>
            <Alert
              icon={<CheckIcon fontSize='inherit' />}
              severity='success'
              variant='filled'
              onClose={() => {
                setOpen(false);
              }}
            >
              ¡Datos editados correctamente!
            </Alert>
          </Collapse> */}
      </FormContainer>
    </>
  );
}
