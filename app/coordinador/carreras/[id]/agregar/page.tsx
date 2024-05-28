'use client';
import Button from '@/components/Button/button';
import InputField from '@/components/InputField/inputField';
import FormContainer from '@/components/FormContainer/formContainer';
import { useFormState, useFormStatus } from 'react-dom';
import { altaAsignatura } from '@/lib/data/coordinador/actions';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { initialState } from '@/lib/definitions';

export default function AltaAsignaturaPage() {
  const pathname = usePathname();
  const carreraId = pathname.split('/')[3];
  const [alta, dispatch] = useFormState(altaAsignatura, initialState);
  const router = useRouter();

  useEffect(() => {
    if (alta.message.includes('200')) {
      router.back();
    }
  }, [alta.message, router]);

  return (
    <FormContainer className='w-2/3'>
      <form
        className='flex min-h-full w-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'
        action={dispatch}
      >
        <h1 className='pb-4 text-center text-2xl font-bold leading-snug text-black'>
          Agregar asignatura a carrera
        </h1>
        <InputField
          placeholder='Nombre'
          type='text'
          name='nombre'
          label='Nombre'
        ></InputField>
        <div id='nombre-error' aria-live='polite' aria-atomic='true'>
          {alta?.errors?.nombre &&
            alta.errors.nombre.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
        </div>
        <InputField
          placeholder='Descripcion'
          type='textarea'
          name='descripcion'
          label='Descripcion'
        ></InputField>
        <div id='descripcion-error' aria-live='polite' aria-atomic='true'>
          {alta?.errors?.descripcion &&
            alta.errors.descripcion.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
        </div>
        <InputField
          placeholder='Creditos'
          type='number'
          name='creditos'
          label='Creditos'
        ></InputField>
        <div id='creditos-error' aria-live='polite' aria-atomic='true'>
          {alta?.errors?.creditos &&
            alta.errors.creditos.map((error: string) => (
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
          value={parseInt(carreraId)}
        />
        <div id='carreraId-error' aria-live='polite' aria-atomic='true'>
          {alta?.errors?.creditos &&
            alta.errors.creditos.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className='flex w-2/3 flex-col justify-between gap-1 sm:w-full sm:flex-row'>
          <AltaAsignaturaButton />
        </div>
      </form>
    </FormContainer>
  );
}

function AltaAsignaturaButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' styling='primary' disabled={pending}>
      {pending ? 'Agregando...' : 'Agregar'}
    </Button>
  );
}
