'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { initialState } from '@/lib/definitions';
import { registrarPeriodoExamen } from '@/lib/data/funcionario/actions';
import InputField from '@/components/InputField/inputField';

function Form({ carrera }: any) {
  const [registro, dispatch] = useFormState(
    registrarPeriodoExamen,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (registro.message.includes('200')) {
      router.back();
    }
  }, [registro.message, router]);

  return (
    <FormContainer>
      <form
        className='flex min-h-full w-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'
        action={dispatch}
      >
        <h1 className='pb-4 text-center text-2xl font-bold leading-snug text-black'>
          Agregar periodo de examen de la carrera {carrera.nombre}
        </h1>
        <InputField
          type='date'
          name='fechaInicio'
          label='Fecha de inicio del periodo'
          pattern='dd-mm-yyyy'
        ></InputField>
        <div id='fechaInicio-error' aria-live='polite' aria-atomic='true'>
          {registro?.errors?.fechaInicio &&
            registro.errors.fechaInicio.map((error: string) => (
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
          {registro?.errors?.fechaFin &&
            registro.errors.fechaFin.map((error: string) => (
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
          value={carrera.id}
        />
        <div id='carreraId-error' aria-live='polite' aria-atomic='true'>
          {registro?.errors?.carreraId &&
            registro.errors.carreraId.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className='flex w-2/3 flex-col justify-between gap-1 sm:w-full sm:flex-row'>
          <RegistrarPeriodoButton />
        </div>
      </form>
    </FormContainer>
  );
}

function RegistrarPeriodoButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' styling='primary' disabled={pending}>
      {pending ? 'Registrando...' : 'Registrar'}
    </Button>
  );
}

export default function FuncionarioHorariosExamenesAgregarHome() {
  const [carrera, setcarrera] = useState({
    id: 2,
    nombre: 'Tecnologo informatico InitData',
    descripcion:
      'Carrera de tecnologo informatico donde se enseña a programar en java, c++, c# y python',
    duracionAnios: 1.5,
    creditos: 9,
    existePlanEstudio: true,
  });

  return (
    <section className='text-ivory'>
      <Form carrera={carrera} className='inset-1/2' />
    </section>
  );
}
