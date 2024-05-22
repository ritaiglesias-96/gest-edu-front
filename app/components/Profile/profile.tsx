'use client';

import { editarPerfilFetch } from '@/lib/data/actions';
import { Role, User, initialState } from '@/lib/definitions';
import Button from '@/components/Button/button';
import Image from 'next/image';
import { useContext } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { SessionContext } from '../../../context/SessionContext';
import InputField from '../InputField/inputField';
import UserIcon from '@/assets/svg/user.svg';
import PhoneIcon from '@/assets/svg/phone.svg';
import LocationIcon from '@/assets/svg/place.svg';
import GestEduIcon from '@/assets/svg/logo-black-vertical.svg';
import FormContainer from '../FormContainer/formContainer';

function EditarPerfilUsuario() {
  const session = useContext(SessionContext);
  const [editar, dispatch] = useFormState(editarPerfilFetch, initialState);

  return (
    <form
      className='flex h-full flex-col items-center justify-between gap-2 md:gap-2 md:px-6'
      action={dispatch}
    >
      <GestEduIcon className='h-auto w-2/4' />
      <h1 className='text-center text-2xl font-bold text-black'>
        Perfil de usuario
      </h1>
      <InputField
        placeholder='Telefono'
        type='text'
        name='telefono'
        label='telefono'
      >
        <PhoneIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div id='telefono-error' aria-live='polite' aria-atomic='true'>
        {editar?.errors?.imagen &&
          editar.errors.imagen.map((error: string) => (
            <p className='mt-2 text-sm text-garnet' key={error}>
              {error}
            </p>
          ))}
      </div>
      <InputField
        placeholder='Domicilio'
        type='text'
        name='domicilio'
        label='Domicilio'
      >
        <LocationIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div
        className='self-start pl-2'
        id='domicilio-error'
        aria-live='polite'
        aria-atomic='true'
      >
      </div>
      <InputField
        placeholder='Imagen'
        type='text'
        name='imagen'
        label='Imagen'
      >
        <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
      </InputField>
      <div
        className='self-start pl-2'
        id='imagen-error'
        aria-live='polite'
        aria-atomic='true'
      >
      </div>
      <EditarPerfilButton />
      
    </form>
  );
}

function EditarPerfilButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-auto' styling='primary' disabled={pending}>
      {pending ? 'Editando...' : 'Editar'}
    </Button>
  );
}

export default function Profile() {
  const user: User = {
    nombre: 'Jane',
    apellido: 'Doe',
    email: 'janedoe@mail.com',
    password: '',
    role: Role.estudiante,
    imagen:
      'https://instagram.fmvd4-1.fna.fbcdn.net/v/t51.29350-15/345246766_196321919934409_8390276178172233635_n.jpg?stp=dst-jpg_e35_p750x750_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzQweDE2NzMuc2RyLmYyOTM1MCJ9&_nc_ht=instagram.fmvd4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=_jIlnMR-EwIQ7kNvgHQIu0M&edm=ANTKIIoBAAAA&ccb=7-5&oh=00_AYDGxkMftFxQ_U81CaDr9baFCb3KvP-CguMfHdV77-ZdsA&oe=664C8EF8&_nc_sid=cf751b',
    fechaNac: '12/12/1990',
    ci: '12546897',
    telefono: '099546987',
    domicilio: '',
  };

  return (
    // <div className=' rounded-2xl sm:bg-ivory sm:my-4 sm:w-2/3 min-h-full'>
    //   <Image
    //     src={user.imagen}
    //     alt='user image'
    //     width={200}
    //     height={100}
    //     style={{
    //       objectFit: 'cover',
    //       height: '200px',
    //       borderRadius: '50%',
    //       padding: '10px',
    //     }}
    //   />
    // </div>
    <FormContainer>
      <EditarPerfilUsuario />
    </FormContainer>
    
  );
}