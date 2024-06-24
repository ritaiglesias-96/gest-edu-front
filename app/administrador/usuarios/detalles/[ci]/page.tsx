'use client';

import { useEffect, useState } from 'react';
import FormContainer from '@/components/FormContainer/formContainer';
import { desactivarCuenta, getUserByCi } from '@/lib/data/admin/actions';
import Image from 'next/image';
import InputField from '@/components/InputField/inputField';
import UserIcon from '@/assets/svg/user.svg';
import UsersIcon from '@/assets/svg/people.svg';
import LocationIcon from '@/assets/svg/place.svg';
import FingerprintIcon from '@/assets/svg/fingerprint.svg';
import PhoneIcon from '@/assets/svg/phone.svg';
import CalendarIcon from '@/assets/svg/calendar.svg';
import EmailIcon from '@/assets/svg/email.svg';
import Button from '@/components/Button/button';

interface Usuario {
  id: string;
  ci: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  domicilio: string;
  fechaNac: string;
  imagen: string;
  tipoUsuario: string;
}

export default function UsuarioPage({ params }: { params: { ci: string } }) {
  const [userData, setUserData] = useState<Usuario>();
  useEffect(() => {
    const getUser = async () => {
      const user: Usuario | null = await getUserByCi(params.ci);
      if (user) setUserData(user);
    };
    getUser();
  }, [params.ci]);
  return (
    <FormContainer>
      <div className='flex flex-col gap-4 text-black'>
        {userData && (
          <div className=' grid w-full grid-cols-1 items-center justify-items-center gap-4 sm:grid-cols-2'>
            <Image
              loader={() => userData?.imagen}
              src={userData?.imagen}
              alt=''
              width={100}
              height={100}
              className='h-32 w-auto rounded-full border-2 border-black object-cover md:h-44'
            />
            <div>
              <h3 className=' break-all'>
                {userData?.nombre} {userData?.apellido}
              </h3>
            </div>
            <div className=' col-span-full'>
              <h4>Datos Personlanes:</h4>
            </div>
            <InputField label='Nombre' value={userData?.nombre} disabled={true}>
              <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              label='Apellido'
              value={userData?.apellido}
              disabled={true}
            >
              <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              label='Cedula de Identidad'
              value={userData?.ci}
              disabled={true}
              type='text'
            >
              <FingerprintIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              label='Email'
              value={userData?.email}
              disabled={true}
              type='email'
            >
              <EmailIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              label='Fecha de Nacimiento'
              value={userData?.fechaNac}
              disabled={true}
            >
              <CalendarIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              label='Domicilio'
              value={userData?.domicilio}
              disabled={true}
            >
              <LocationIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              label='Telefono'
              value={userData?.telefono}
              disabled={true}
            >
              <PhoneIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              label='Tipo de Usuario'
              value={userData?.tipoUsuario}
              disabled={true}
            >
              <UsersIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            {userData.tipoUsuario === 'FUNCIONARIO' ||
            userData.tipoUsuario === 'COORDINADOR' ? (
              <Button
                styling='primary'
                className='col-span-full'
                onClick={() => {
                  desactivarCuenta(userData?.id);
                }}
              >
                Desactivar usuario
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </FormContainer>
  );
}
