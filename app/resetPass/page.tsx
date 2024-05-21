'use client';
import FormContainer from '@/components/FormContainer/formContainer';
import InputField from '@/components/InputField/inputField';
import EmailIcon from '@/assets/svg/email.svg';
import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components/Button/button';
import { initialState } from '@/lib/definitions';
import { resetPassFetch } from '@/lib/data/actions';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ResetPaswordPage() {
  const [confirmSent, setConfirmSent] = useState(false);
  const [resetPass, dispatch] = useFormState(resetPassFetch, initialState);
  useEffect(() => {
    if (resetPass.message.includes('200')) {
      setConfirmSent(true);
    }
  }, [resetPass.message]);
  return (
    <FormContainer>
      {confirmSent ? (
        <ModalConfirm />
      ) : (
        <form
          className='flex h-full flex-col items-center justify-between gap-2 md:gap-2 md:px-6'
          action={dispatch}
        >
          <h1 className='text-center text-2xl font-bold text-black'>
            Restablecer contraseña
          </h1>
          <InputField
            type='email'
            name='email'
            label='Email'
            placeholder='myemail@email.com'
            required
          >
            <EmailIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='email-error' aria-live='polite' aria-atomic='true'>
            {resetPass?.errors?.email &&
              resetPass.errors.email.map((error: string) => (
                <p className='mt-2 text-sm text-garnet' key={error}>
                  {error}
                </p>
              ))}
          </div>
          <RestablecerButton />
        </form>
      )}
    </FormContainer>
  );
}

function ModalConfirm() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-center text-2xl font-bold text-black'>
        ¡Revisa tu correo!
      </h1>
      <p className='text-center text-md text-black py-5'>
        Te hemos enviado un enlace para restablecer tu contraseña
      </p>
      <Button className='w-full' styling='primary'>
        <Link href='/'>Volver</Link>
      </Button>
    </div>
  );
}

function RestablecerButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' styling='primary' disabled={pending}>
      {pending ? 'Procesando...' : 'Restablecer'}
    </Button>
  );
}
