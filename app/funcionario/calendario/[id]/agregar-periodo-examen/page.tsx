'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { initialState } from '@/lib/definitions';
import { registrarPeriodoExamen } from '@/lib/data/funcionario/actions';
import InputField from '@/components/InputField/inputField';
import { Alert, Collapse } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

function RegistrarPeriodoButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' styling='primary' disabled={pending}>
      {pending ? 'Registrando...' : 'Registrar'}
    </Button>
  );
}

export default function FuncionarioHorariosExamenesAgregarHome({
  params,
}: {
  params: { id: string };
}) {
  const [registro, dispatch] = useFormState(
    registrarPeriodoExamen,
    initialState
  );
  const router = useRouter();
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    if (registro.message) {
      if (registro.message.includes('200')) {
        setAlertOk(true);
        setMensajeError('Periodo de examen registrado con éxito');
      } else {
        setAlertError(true);
        setMensajeError(registro.message);
      }
    }
  }, [registro.message]);

  return (
    <FormContainer>
      <form
        className='flex min-h-full w-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'
        action={dispatch}
      >
        <h1 className='pb-4 text-center text-2xl font-bold leading-snug text-black'>
          Agregar periodo de examen a la carrera
        </h1>
        <InputField
          type='date'
          name='fechaInicio'
          label='Fecha de inicio del periodo'
          pattern='dd-mm-yyyy'
        ></InputField>
        <div id='fechaInicio-error' aria-live='polite' aria-atomic='true'>
          {registro?.errors?.fechaInicio?.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
        </div>
        <InputField
          type='date'
          name='fechaFin'
          label='Fecha de fin del periodo'
          pattern='dd-mm-yyyy'
        ></InputField>
        <div id='fechaFin-error' aria-live='polite' aria-atomic='true'>
          {registro?.errors?.fechaFin?.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
        </div>
        <InputField
          type='number'
          name='carreraId'
          label='Carrera ID'
          className='hidden'
          value={params.id}
        />
        <div id='carreraId-error' aria-live='polite' aria-atomic='true'>
          {registro?.errors?.carreraId?.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className='flex w-2/3 flex-col justify-between gap-1 sm:flex-row'>
          <RegistrarPeriodoButton />
        </div>
      </form>
      {alertOk && (
        <Collapse
          in={alertOk}
          className='absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            variant='filled'
            onClose={() => {
              setAlertOk(false);
              router.back();
            }}
          >
            {mensajeError}
          </Alert>
        </Collapse>
      )}
      {alertError && (
        <Collapse
          in={alertError}
          className='absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='error'
            variant='filled'
            onClose={() => {
              setAlertError(false);
            }}
          >
            {mensajeError}
          </Alert>
        </Collapse>
      )}
    </FormContainer>
  );
}
