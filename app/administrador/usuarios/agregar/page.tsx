'use client';
import UserIcon from '@/assets/svg/user.svg';
import Button from '@/components/Button/button';
import InputField from '@/components/InputField/inputField';
import FormContainer from '@/components/FormContainer/formContainer';
import { useFormState, useFormStatus } from 'react-dom';
import { registerUserFromAdmin } from '@/lib/data/admin/actions';
import { SetStateAction, useEffect, useState } from 'react';
import KeyIcon from '@/assets/svg/key.svg';
import EmailIcon from '@/assets/svg/email.svg';
import PhoneIcon from '@/assets/svg/phone.svg';
import LocationIcon from '@/assets/svg/place.svg';
import FingerprintIcon from '@/assets/svg/fingerprint.svg';
import CalendarIcon from '@/assets/svg/calendar.svg';
import { initialState } from '@/lib/definitions';
import { useRouter } from 'next/navigation';

export default function AltaUsuarioPage() {
  const [register, dispatch] = useFormState(
    registerUserFromAdmin,
    initialState
  );
  const [selectedUserType, setSelectedUserType] = useState('COORDINADOR'); // Valor inicial del dropdown
  const router = useRouter();

  useEffect(() => {
    if (register.message.includes('200')) {
      router.back();
    }
  }, [register.message, router]);

  const handleDropdownChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedUserType(event.target.value);
  };

  return (
    <FormContainer>
      <form
        className='grid min-h-full grid-cols-2  items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'
        action={dispatch}
      >
        <h1 className=' col-span-full text-center text-2xl font-bold leading-snug text-black'>
          Agregar Usuario
        </h1>
        <div>
          <InputField
            placeholder='Nombre'
            type='text'
            name='nombre'
            label='Nombre'
          >
            <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='nombre-error' aria-live='polite' aria-atomic='true'>
            {register.errors?.nombre?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <InputField
            placeholder='Apellido'
            type='text'
            name='apellido'
            label='Apellido'
          >
            <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='apellido-error' aria-live='polite' aria-atomic='true'>
            {register?.errors?.apellido?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <InputField
            placeholder='jane@doe.com'
            type='email'
            name='email'
            label='Correo electrónico'
          >
            <EmailIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='email-error' aria-live='polite' aria-atomic='true'>
            {register?.errors?.email?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <InputField
            placeholder='12347890 (sin puntos ni guiones)'
            type='string'
            name='ci'
            label='Cedula de Identidad'
            pattern='^[1-9]\d{3}\d{3}[1-9]'
          >
            <FingerprintIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='ci-error' aria-live='polite' aria-atomic='true'>
            {register?.errors?.ci?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
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
            {register?.errors?.fechaNac?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <InputField
            placeholder='Av. Siempre Viva 123'
            type='string'
            name='domicilio'
            label='Dirección'
          >
            <LocationIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='domicilio-error' aria-live='polite' aria-atomic='true'>
            {register?.errors?.domicilio?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <InputField
            placeholder='09X XXX XXX'
            type='string'
            name='telefono'
            label='Telefono'
          >
            <PhoneIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='telefono-error' aria-live='polite' aria-atomic='true'>
            {register?.errors?.telefono?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <div className='flex w-full flex-col rounded-lg border border-garnet bg-white px-4 py-1 text-black'>
            <label
              htmlFor='dropdown'
              className='py-0 text-sm font-semibold sm:text-base'
            >
              Seleccione un tipo de Usuario
            </label>
            <select
              id='dropdown'
              name='tipoUsuario'
              className='w-full py-1 text-sm focus:underline focus:outline-none sm:text-base '
              value={selectedUserType}
              onChange={handleDropdownChange}
            >
              <option value='COORDINADOR'>COORDINADOR</option>
              <option value='FUNCIONARIO'>FUNCIONARIO</option>
            </select>
          </div>
        </div>
        <div>
          <InputField
            placeholder='Constraseña'
            type='password'
            name='password'
            label='Contraseña'
          >
            <KeyIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='password-error' aria-live='polite' aria-atomic='true'>
            {register?.errors?.password?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <InputField
            placeholder='Confirmar contraseña'
            type='password'
            name='confirmPassword'
            label='Confirmar contraseña'
          >
            <KeyIcon className='h-auto w-6 fill-garnet sm:w-8' />
          </InputField>
          <div id='confirm-error' aria-live='polite' aria-atomic='true'>
            {register?.errors?.confirmPassword?.map((error: string) => (
              <p className='mt-2 text-sm text-garnet' key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className=' col-span-full flex w-2/3 flex-col justify-between gap-1 sm:w-full sm:flex-row'>
          <AltaUsuarioButton />
        </div>
      </form>
    </FormContainer>
  );
}

function AltaUsuarioButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' styling='primary' disabled={pending}>
      {pending ? 'Agregando...' : 'Agregar'}
    </Button>
  );
}
