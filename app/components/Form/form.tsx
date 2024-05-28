'use client';
import styles from './form.module.css';
import GestEduIcon from '@/assets/svg/logo-black-vertical.svg';
import UserIcon from '@/assets/svg/user.svg';
import KeyIcon from '@/assets/svg/key.svg';
import EmailIcon from '@/assets/svg/email.svg';
import PhoneIcon from '@/assets/svg/phone.svg';
import LocationIcon from '@/assets/svg/place.svg';
import FingerprintIcon from '@/assets/svg/fingerprint.svg';
import CalendarIcon from '@/assets/svg/calendar.svg';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import InputField from '@/components/InputField/inputField';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { registerUser } from '@/lib/data/estudiante/actions';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '@/../context/SessionContext';
import { initialState } from '@/lib/definitions';

function LoginForm() {
  const session = useContext(SessionContext);
  const [logIn, dispatch] = useFormState(session.login, initialState);

  useEffect(() => {
    if (logIn.message?.includes('200')) {
      redirect('/');
    }
  }, [logIn.message]);

  return (
    <form
      className='flex h-full flex-col items-center justify-between gap-2 md:gap-2 md:px-6'
      action={dispatch}
    >
      <GestEduIcon className='h-auto w-2/4' />
      <h1 className='text-center text-2xl font-bold text-black'>
        Iniciar sesión
      </h1>
      <InputField
        placeholder='Ingresar correo'
        type='email'
        name='email'
        label='Correo electrónico'
      >
        <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='email-error' aria-live='polite' aria-atomic='true'>
        {logIn?.errors?.email &&
          logIn.errors.email.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='Ingresar contraseña'
        type='password'
        name='password'
        label='Contraseña'
      >
        <KeyIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div
        className='self-start pl-2'
        id='password-error'
        aria-live='polite'
        aria-atomic='true'
      >
        {logIn?.errors?.password &&
          logIn.errors.password.map((error: string) => (
            <p className='text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <LoginButton />
      <div className='my-4 flex w-full flex-col gap-3 text-center'>
        <Link className={styles.links} href='/resetPass'>
          Olvidé mi contraseña
        </Link>
        <span className='text-black'>
          ¿No tienes aun una cuenta?{' '}
          <Link className={styles.links} href='/registrarse'>
            Regístrate
          </Link>
        </span>
      </div>
    </form>
  );
}

function RegistrarForm({
  registrado,
}: {
  registrado: (value: boolean) => void;
}) {
  const [register, dispatch] = useFormState(registerUser, initialState);
  useEffect(() => {
    if (register.message.includes('201')) {
      registrado(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register.message]);

  return (
    <form
      className='flex min-h-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'
      action={dispatch}
    >
      <h1 className='text-center text-2xl font-bold leading-snug text-black'>
        Complete el formulario para ingresar
      </h1>
      <InputField placeholder='Nombre' type='text' name='nombre' label='Nombre'>
        <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='nombre-error' aria-live='polite' aria-atomic='true'>
        {register?.errors?.nombre &&
          register.errors.nombre.map((error: string) => (
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
        {register?.errors?.apellido &&
          register.errors.apellido.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='jane@doe.com'
        type='email'
        name='email'
        label='Correo electrónico'
      >
        <EmailIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='email-error' aria-live='polite' aria-atomic='true'>
        {register?.errors?.email &&
          register.errors.email.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='12347890 (sin puntos ni guiones)'
        type='text'
        name='ci'
        label='Cedula de Identidad'
        pattern='^[1-9]\d{3}\d{3}[1-9]'
      >
        <FingerprintIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='ci-error' aria-live='polite' aria-atomic='true'>
        {register?.errors?.ci &&
          register.errors.ci.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='dd-mm-yyyy'
        type='date'
        name='fechaNac'
        label='Fecha de nacimiento'
        pattern='dd-mm-yyyy'
      >
        <CalendarIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='fechaNac-error' aria-live='polite' aria-atomic='true'>
        {register?.errors?.fechaNac &&
          register.errors.fechaNac.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='Av. Siempre Viva 123'
        type='string'
        name='domicilio'
        label='Dirección'
      >
        <LocationIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='domicilio-error' aria-live='polite' aria-atomic='true'>
        {register?.errors?.domicilio &&
          register.errors.domicilio.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='09X XXX XXX'
        type='string'
        name='telefono'
        label='Telefono'
      >
        <PhoneIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='telefono-error' aria-live='polite' aria-atomic='true'>
        {register?.errors?.telefono &&
          register.errors.telefono.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='Constraseña'
        type='password'
        name='password'
        label='Contraseña'
      >
        <KeyIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='password-error' aria-live='polite' aria-atomic='true'>
        {register?.errors?.password &&
          register.errors.password.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='Confirmar contraseña'
        type='password'
        name='confirmPassword'
        label='Confirmar contraseña'
      >
        <KeyIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='confirm-error' aria-live='polite' aria-atomic='true'>
        {register?.errors?.confirmPassword &&
          register.errors.confirmPassword.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className='flex w-2/3 flex-col items-center gap-1 sm:w-full'>
        <RegisterButton />
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-auto' styling='primary' disabled={pending}>
      {pending ? 'Ingresando...' : 'Ingresar'}
    </Button>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-2/3' styling='primary' disabled={pending}>
      {pending ? 'Registrando...' : 'Registrarse'}
    </Button>
  );
}

export default function Form() {
  const path = usePathname();
  const router = useRouter();
  const [registrado, setRegistrado] = useState(false);

  useEffect(() => {
    if (registrado) {
      router.push('/ingresar');
    }
  }, [registrado, router]);

  return (
    <FormContainer>
      {path === '/ingresar' ? (
        <LoginForm />
      ) : (
        <RegistrarForm registrado={setRegistrado} />
      )}
    </FormContainer>
  );
}
