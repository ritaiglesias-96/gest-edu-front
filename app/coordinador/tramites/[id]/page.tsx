'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import {
  aprobarSolicitud,
  getCarrera,
  getSolicitudesTituloPendientes,
  rechazarSolicitud,
} from '@/lib/data/coordinador/actions';
import { Carrera, SolicitudTitulo } from '@/lib/definitions';
import { Alert, Collapse } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResolverSolicitudPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [solicitud, setSolicitud] = useState<SolicitudTitulo>();
  const [carrera, setCarrera] = useState<Carrera>();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalRechazo, setIsModalRechazo] = useState(false);
  const [isAprobar, setIsAprobar] = useState<Boolean>();
  const [alertOk, setAlertOk] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState('');

  useEffect(() => {
    getSolicitudesTituloPendientes().then((data) => {
      const matchingSolicitud = data.find(
        (solicitud: SolicitudTitulo) => solicitud.id.toString() === params.id
      );
      setSolicitud(matchingSolicitud);
    });
    if (solicitud) {
      getCarrera(solicitud.carreraId).then((data) => {
        setCarrera(data);
      });
    }
  }, []);

  useEffect(() => {
    if (solicitud) {
      getCarrera(solicitud.carreraId).then((data) => {
        setCarrera(data);
      });
    }
  }, [solicitud]);

  const setAlertHelper = () => {
    setAlertOk(false);
    router.back();
  };

  const handleAprobar = () => {
    if (isAprobar) {
      if (solicitud?.id) {
        aprobarSolicitud(solicitud?.id.toString()).then(() => {
          setIsOpen(false);
          setAlertOk(true);
          setTimeout(setAlertHelper, 4000);
        });
      }
    } else {
      setIsModalRechazo(true);
      setIsOpen(false);
    }
  };

  const handleRechazar = () => {
    if (solicitud?.id) {
      rechazarSolicitud(solicitud?.id.toString(), motivoRechazo).then(() => {
        setIsModalRechazo(false);
        setAlertOk(true);
        setTimeout(setAlertHelper, 4000);
      });
    }
  };

  return (
    <>
      <FormContainer className='text-black sm:w-4/5 md:w-2/3'>
        <div className='h-fit w-full p-2'>
          <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
              <h3 className='m-0 w-12 p-0'>{carrera?.nombre}</h3>
            </div>
            <div className='flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center'>
              <div className='flex flex-col'>
                <p className='font-bold'>Creditos Totales:</p>
                <p>{carrera?.creditos}</p>
              </div>
            </div>
            <div className='flex w-full flex-col justify-center rounded-md md:max-w-52'>
              <Button
                className='w-full py-8'
                styling='primary'
                onClick={() => {
                  setIsOpen(true);
                  setIsAprobar(true);
                }}
              >
                Aprobar
              </Button>
            </div>
          </div>
        </div>
        <div className='h-fit w-full p-2'>
          <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
              <h3 className='m-0 w-12 p-0'>
                {solicitud?.usuarioSolicitante.nombre +
                  ' ' +
                  solicitud?.usuarioSolicitante.apellido}
              </h3>
            </div>
            <div className='flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center'>
              <div className='flex flex-col'>
                <p className='font-bold'>Cedula:</p>
                <p>
                  {solicitud?.usuarioSolicitante.ci.replace(
                    /(\d+)(?=\d$)/g,
                    '$1-'
                  )}
                </p>
              </div>
              <div className='flex flex-col'>
                <p className='font-bold'>Creditos Aprobados:</p>
                <p>{solicitud?.creditosAprobados}</p>
              </div>
            </div>
            <div className='flex w-full flex-col justify-center rounded-md md:max-w-52'>
              <Button
                className='w-full py-8'
                styling='primary'
                onClick={() => {
                  setIsOpen(true);
                  setIsAprobar(false);
                }}
              >
                Rechazar
              </Button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
            <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
              <div className='rounded-md text-center font-bold text-black'>
                <h5 className='m-0 p-0'>
                  {isAprobar
                    ? '¿Desea aprobar esta solicitud de titulo?'
                    : '¿Desea rechazar esta solicitud de titulo?'}
                </h5>
                <div className='items-center md:space-x-6'>
                  <div className='inline-block'>
                    <Button
                      styling='primary'
                      className='lg:w-20'
                      onClick={handleAprobar}
                    >
                      Si
                    </Button>
                  </div>
                  <div className='inline-block'>
                    <Button
                      styling='secondary'
                      onClick={() => setIsOpen(false)}
                      className='lg:w-20'
                    >
                      No
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModalRechazo && (
          <div className='absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-ivory px-4 py-2 shadow-lg shadow-garnet'>
            <div className='my-2 box-content items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
              <div className='rounded-md text-center font-bold text-black'>
                <h5 className='m-0 p-0'>Ingrese la razon del rechazo</h5>
                <div className='items-center md:space-x-6'>
                  <div >
                    <textarea
                      value={motivoRechazo}
                      onChange={(event) => {
                        setMotivoRechazo(event.target.value);
                      }}
                      placeholder='Enter your text here'                      
                    />
                  </div>
                  <div >
                    <Button
                      styling='primary'
                      className='lg:w-200'
                      onClick={handleRechazar}
                    >
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {alertOk && (
          <Collapse
            in={alertOk}
            className={
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
            }
          >
            <Alert
              icon={<CheckIcon fontSize='inherit' />}
              severity={isAprobar ? 'success' : 'error'}
              variant='filled'
              onClose={() => {
                () => {
                  setAlertOk(false);
                  router.back();
                };
              }}
            >
              {isAprobar ? 'Aprobado' : 'Rechazado'}
            </Alert>
          </Collapse>
        )}
      </FormContainer>
    </>
  );
}
