'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { initialState } from '@/lib/definitions';
import { registrarFechaExamen } from '@/lib/data/funcionario/actions';
import InputField from '@/components/InputField/inputField';

function Form({ asignaturaId }: any) {
  const [registro, dispatch] = useFormState(registrarFechaExamen, initialState);
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
          Agregar periodo de examen a la carrera
        </h1>
        <InputField
          type='datetime-local'
          name='fecha'
          label='Fecha y hora de examen'
        ></InputField>
        <div id='fecha-error' aria-live='polite' aria-atomic='true'>
          {registro?.errors?.fecha &&
            registro.errors.fecha.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
        </div>
        <InputField
          type='number'
          name='diasPrevInsc'
          label='Dias para inscribirse'
        ></InputField>
        <div id='diasPrevInsc-error' aria-live='polite' aria-atomic='true'>
          {registro?.errors?.diasPrevInsc &&
            registro.errors.diasPrevInsc.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
        </div>
        <InputField
          type='number'
          name='asignaturaId'
          label='Asignatura ID'
          className='hidden'
          value={asignaturaId}
        />
        <div id='asignaturaId-error' aria-live='polite' aria-atomic='true'>
          {registro?.errors?.asignaturaId &&
            registro.errors.asignaturaId.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className='flex w-2/3 flex-col justify-between gap-1 sm:w-full sm:flex-row'>
          <RegistrarFechaButton />
        </div>
      </form>
    </FormContainer>
  );
}

function RegistrarFechaButton() {
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
  return (
    <section className='text-ivory'>
      <Form carreraId={params.id} className='inset-1/2' />
    </section>
  );
}
