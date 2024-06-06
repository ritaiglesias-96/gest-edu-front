'use client';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Estudiante } from '@/lib/definitions';
import { getEstudiante } from '@/lib/data/funcionario/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import Button from '@/components/Button/button';
import InputField from '@/components/InputField/inputField';
import EmailIcon from '@/assets/svg/email.svg';
import PhoneIcon from '@/assets/svg/phone.svg';
import LocationIcon from '@/assets/svg/place.svg';
import FingerprintIcon from '@/assets/svg/fingerprint.svg';
import CalendarIcon from '@/assets/svg/calendar.svg';

export default function EstudiantePage({ params }: { params: { ci: string } }) {
  const router = useRouter();
  const [estudiante, setEstudiante] = useState<Estudiante>();
  const [loading, setLoading] = useState(true);
  const [fallout, setFallout] = useState(false);

  useEffect(() => {
    const fetchEstudiante = async () => {
      const data = await getEstudiante(params.ci);
      if (data) {
        if (!data.imagen) data.imagen = '/static/images/default-user-image.png';
        setEstudiante(data);
        setLoading(false);
      } else {
        setLoading(false);
        setFallout(true);
      }
    };
    fetchEstudiante();
  }, [params.ci]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{ color: '#802c2c' }} />
      </Box>
    );
  }

  if (fallout) {
    return (
      <div className='mx-auto flex flex-col items-center justify-center text-ivory'>
        <h1>Ha ocurrido un error</h1>
        <Button onClick={() => router.back()} styling='primary'>
          Regresar
        </Button>
      </div>
    );
  }

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-1/3'>
      <div className='h-fit w-full p-2'>
        <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory p-6 text-black'>
          <div className='mt-4 grid grid-cols-1 items-center gap-4 md:grid-cols-2'>
            {estudiante?.imagen && (
              <Image
                src={estudiante?.imagen}
                alt='imagen perfil'
                width={200}
                height={200}
                className='rounded-full border-2 border-black object-cover'
              />
            )}
            <h3 className='break-all text-center'>
              {estudiante?.nombre} {estudiante?.apellido}
            </h3>
            <InputField
              type='text'
              name='ci'
              label='Cedula de Identidad'
              value={estudiante?.ci}
            >
              <FingerprintIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              type='text'
              name='email'
              label='Email'
              value={estudiante?.email}
            >
              <EmailIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              type='text'
              name='telefono'
              label='Telefono'
              value={estudiante?.telefono}
            >
              <PhoneIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              type='text'
              name='domicilio'
              label='Domicilio'
              value={estudiante?.domicilio}
            >
              <LocationIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
            <InputField
              type='text'
              name='fechaNac'
              label='Fecha de Nacimiento'
              className='col-span-2 mx-auto w-fit'
              value={
                estudiante?.fechaNac
                  ? new Date(estudiante.fechaNac).toLocaleDateString()
                  : 'N/A'
              }
            >
              <CalendarIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </InputField>
          </div>
        </div>
      </div>
    </div>
  );
}
