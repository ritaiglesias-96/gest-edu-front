'use client';

import FingerprintIcon from '@/assets/svg/fingerprint.svg';
import Button from '@/components/Button/button';
import InputField from '@/components/InputField/inputField';
import UserIcon from '@/assets/svg/user.svg';
import FormContainer from '@/components/FormContainer/formContainer';
import { useFormState, useFormStatus } from 'react-dom';
import { altaDocente } from '@/lib/data/funcionario/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initialState } from '@/lib/definitions';

export default function AltaDocentePage() {
  const [alta, dispatch] = useFormState(altaDocente, initialState);
  const router = useRouter();

  useEffect(() => {
    if (alta.message.includes('201')) {
      router.back();
    }
  }, [alta.message, router]);

  return (
    <FormContainer className='w-1/3'>
      <form
        className='flex min-h-full w-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'
        action={dispatch}
      >
        <h1 className='pb-4 text-center text-2xl font-bold leading-snug text-black'>
          Agregar Docente
        </h1>
        <InputField
          placeholder='Nombre'
          type='text'
          name='nombre'
          label='Nombre'
        >
          <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
        </InputField>
        <div id='nombre-error' aria-live='polite' aria-atomic='true'>
          {alta?.errors?.nombre?.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
        </div>
        <InputField
          placeholder='Apellido'
          type='text'
          name='apellido'
          label='Apellido'
        >
          <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
        </InputField>
        <div id='apellido-error' aria-live='polite' aria-atomic='true'>
          {alta?.errors?.apellido?.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
        </div>
        <InputField
          placeholder='12347890 (sin puntos ni guiones)'
          type='text'
          name='documento'
          label='Cedula de Identidad'
          pattern='^[1-9]\d{3}\d{3}[1-9]'
        >
          <FingerprintIcon className='h-auto w-6 fill-garnet sm:w-8' />
        </InputField>
        <div id='ci-error' aria-live='polite' aria-atomic='true'>
          {alta?.errors?.documento?.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
        </div>
        <div className='flex w-2/3 flex-col justify-between gap-1 sm:w-full sm:flex-row'>
          <AltaDocenteButton />
        </div>
      </form>
    </FormContainer>
  );
}

function AltaDocenteButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' styling='primary' disabled={pending}>
      {pending ? 'Agregando...' : 'Agregar'}
    </Button>
  );
}
