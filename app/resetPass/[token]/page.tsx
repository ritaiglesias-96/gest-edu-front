'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import InputField from '@/components/InputField/inputField';
import PasswordIcon from '@/assets/svg/key.svg';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { initialState } from '@/lib/definitions';
import { cambiarPassFetch } from '@/lib/data/actions';

export default function RestorePasswordTokenPage({
  params,
}: {
  params: { token: string };
}) {
  const [confirmSent, setConfirmSent] = useState(false);
  const [cambiarPass, dispatch] = useFormState(cambiarPassFetch, initialState);
  useEffect(() => {
    if (cambiarPass.message.includes('200')) {
      setConfirmSent(true);
    }
  }, [cambiarPass.message]);
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
            type='password'
            name='password'
            label='Contraseña'
            placeholder='Nueva contraseña'
            required
          >
            <PasswordIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='password-error' aria-live='polite' aria-atomic='true'>
            {cambiarPass?.errors?.password &&
              cambiarPass.errors.password.map((error: string) => (
                <p className='mt-2 text-sm text-garnet' key={error}>
                  {error}
                </p>
              ))}
          </div>
          <InputField
            type='password'
            name='confirmPassword'
            label='Confirmar contraseña'
            placeholder='Confirmar nueva contraseña'
            required
          >
            <PasswordIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='confirmPassword-error' aria-live='polite' aria-atomic='true'>
            {cambiarPass?.errors?.confirmPassword &&
              cambiarPass.errors.confirmPassword.map((error: string) => (
                <p className='mt-2 text-sm text-garnet' key={error}>
                  {error}
                </p>
              ))}
          </div>
          <InputField
            type='text'
            name='tokenPassword'
            label='Token'
            className='hidden'
            value={params.token}
          ></InputField>
          <ConfirmarButton />
        </form>
      )}
    </FormContainer>
  );
}

function ModalConfirm() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-center text-2xl font-bold text-black'>
        ¡Contraseña restablecida!
      </h1>
      <p className='text-center text-md text-black py-5'>
        Tu contraseña ha sido restablecida con éxito
      </p>
      <Button className='w-full' styling='primary'>
        <Link href='/ingresar'>Iniciar sesion</Link>
      </Button>
    </div>
  );
}

function ConfirmarButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' styling='primary' disabled={pending}>
      {pending ? 'Procesando...' : 'Confirmar'}
    </Button>
  );
}
