'use client';
import { User, emptyUser } from '@/lib/definitions';
import './profile.css';
import Button from '@/components/Button/button';
import Image from 'next/image';
import UserIcon from '@/assets/svg/user.svg';
import LocationIcon from '@/assets/svg/place.svg';
import FingerprintIcon from '@/assets/svg/fingerprint.svg';
import PhoneIcon from '@/assets/svg/phone.svg';
import CalendarIcon from '@/assets/svg/calendar.svg';
import EmailIcon from '@/assets/svg/email.svg';
import CheckIcon from '@mui/icons-material/Check';
import {
  FormControl,
  InputLabel,
  Input,
  IconButton,
  Alert,
  Collapse,
} from '@mui/material';
import FormContainer from '../FormContainer/formContainer';
import { useEffect, useState } from 'react';
import {
  editarUsuarioFetch,
  obtenerDatosUsuarioFetch,
} from '@/lib/data/actions';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { fbStorage } from '../../../firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function Profile() {
  const [datosUsuario, setUsuario] = useState<User>(emptyUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editado, setEditado] = useState(false);
  const [date, setDate] = useState('');
  const [ci, setCI] = useState('');
  const [validPhone, setValidPhone] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchDatosUser = async () => {
    const data = await obtenerDatosUsuarioFetch().catch((error) => {
      setError(error);
      setLoading(false);
    });
    if (data.imagen === null)
      data.imagen = '../../../public/assets/images/default-user.png';
    setUsuario(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDatosUser();
  }, []);

  useEffect(() => {
    const inputDate = datosUsuario?.fechaNac;
    const formattedDate = convertirFecha(inputDate);
    setDate(formattedDate);
    const formattedCI = datosUsuario?.ci.replace(
      /^(\d{1})(\d{3})(\d{3})(\d{1})$/,
      '$1.$2.$3-$4'
    );
    setCI(formattedCI);
    const validPhone = /^\d+$/.test(datosUsuario?.telefono);
    setValidPhone(validPhone);
  }, [datosUsuario]);

  function convertirFecha(inputDate: string) {
    if (inputDate !== null) {
      const date = new Date(inputDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formattedDay = day < 10 ? '0' + day : day;
      const formattedMonth = month < 10 ? '0' + month : month;
      return `${formattedDay}/${formattedMonth}/${year}`;
    }
    return '';
  }

  const handleClickEditar = () => {
    setErrorMessage('');
    if (!validPhone) {
      setErrorMessage('¡Ingrese solo números en el teléfono!');
      setOpen(true);
      return;
    }

    if (
      datosUsuario.telefono !== '' &&
      datosUsuario.domicilio !== '' &&
      datosUsuario.imagen !== ''
    ) {
      editarUsuarioFetch(
        datosUsuario.telefono,
        datosUsuario.domicilio,
        datosUsuario.imagen
      ).then(() => {
        setEditado(true);
        setOpen(true);
      }).catch(() => {
        setErrorMessage('¡Hubo un error al editar los datos!');
        setOpen(true);
      });
    } else {
      setErrorMessage('¡Complete todos los campos antes de editar!');
      setOpen(true);
    }
  };

  const handleChange = (name: string, newValue: string) => {
    if (name === 'telefono') {
      setUsuario({ ...datosUsuario, telefono: newValue });
      setValidPhone(/^\d+$/.test(newValue));
    }
    if (name === 'domicilio') {
      setUsuario({ ...datosUsuario, domicilio: newValue });
    }
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error al cargar los datos: {error}</p>;
  }

  const handlefile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const storageRef = ref(fbStorage, datosUsuario.ci);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error('Error uploading file:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
            setUsuario({ ...datosUsuario, imagen: downloadURL });
          });
        }
      );
    }
  };

  return (
    <FormContainer className=' text-black sm:w-4/5 md:w-2/3'>
      <div className=' grid w-full grid-cols-1 items-center justify-items-center gap-4 sm:grid-cols-2'>
        <div className='relative'>
          <Image
            loader={() => datosUsuario?.imagen}
            src={datosUsuario?.imagen}
            alt=''
            width={200}
            height={100}
            className='h-32 w-auto rounded-full border-2 border-black object-cover md:h-48'
          />
          <div className='absolute -bottom-2 flex w-full justify-center'>
            <input
              style={{ display: 'none' }}
              accept='image/png, image/jpeg'
              id='choose-file'
              type='file'
              onChange={(event) => handlefile(event)}
            />
            <label htmlFor='choose-file'>
              <IconButton aria-label='upload' component='span'>
                <FileUploadRoundedIcon />
              </IconButton>
            </label>
          </div>
        </div>
        <div>
          <h3 className=' break-all'>
            {datosUsuario?.nombre} {datosUsuario?.apellido}
          </h3>
        </div>
        <div className=' col-span-full'>
          <h4>Datos Personales:</h4>
        </div>
        <div
          id='divNombre'
          className='flex w-full flex-row justify-center gap-2'
        >
          <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
          <FormControl
            variant='standard'
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          >
            <InputLabel htmlFor='component-simple'>Nombre</InputLabel>
            <Input
              id='component-simple'
              name='nombre'
              value={datosUsuario?.nombre}
              size='small'
              disabled={true}
            />
          </FormControl>
        </div>
        <div
          id='divApellido'
          className='flex w-full flex-row justify-center gap-2'
        >
          <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
          <FormControl
            variant='standard'
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          >
            <InputLabel htmlFor='component-simple'>Apellido</InputLabel>
            <Input
              id='component-simple'
              value={datosUsuario?.apellido}
              size='small'
              disabled={true}
            />
          </FormControl>
        </div>
        <div
          id='divDocumento'
          className='flex w-full flex-row justify-center gap-2'
        >
          <FingerprintIcon className='h-auto w-6 fill-garnet sm:w-8' />
          <FormControl
            variant='standard'
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          >
            <InputLabel htmlFor='component-simple'>Documento</InputLabel>
            <Input
              id='component-simple'
              value={ci}
              size='small'
              disabled={true}
            />
          </FormControl>
        </div>
        <div
          id='divCorreo'
          className='flex w-full flex-row justify-center gap-2'
        >
          <EmailIcon className='h-auto w-6 fill-garnet sm:w-8' />
          <FormControl
            variant='standard'
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          >
            <InputLabel htmlFor='component-simple'>
              Correo electrónico
            </InputLabel>
            <Input
              id='component-simple'
              value={datosUsuario?.email}
              size='small'
              disabled={true}
            />
          </FormControl>
        </div>
        <div
          id='divFechaNacimiento'
          className='flex w-full flex-row justify-center gap-2'
        >
          <CalendarIcon className='h-auto w-6 fill-garnet sm:w-8' />
          <FormControl
            variant='standard'
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          >
            <InputLabel htmlFor='component-simple'>
              Fecha de nacimiento
            </InputLabel>
            <Input
              id='component-simple'
              value={date}
              size='small'
              disabled={true}
            />
          </FormControl>
        </div>
        <div
          id='divTelefono'
          className='flex w-full flex-row justify-center gap-2'
        >
          <PhoneIcon className='h-auto w-6 fill-garnet sm:w-8' />
          <FormControl
            variant='standard'
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          >
            <InputLabel htmlFor='component-simple'>Teléfono</InputLabel>
            <Input
              id='component-simple'
              name='telefono'
              value={datosUsuario?.telefono}
              size='small'
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              inputProps={{
                inputMode: 'numeric',
              }}
            />
            {!validPhone && (
              <p style={{ color: 'red' }}>¡Ingrese solo números!</p>
            )}
          </FormControl>
        </div>
        <div
          id='divDomicilio'
          className='flex w-full flex-row justify-center gap-2'
        >
          <LocationIcon className='h-auto w-6 fill-garnet sm:w-8' />
          <FormControl
            variant='standard'
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
          >
            <InputLabel htmlFor='component-simple'>Domicilio</InputLabel>
            <Input
              id='component-simple'
              name='domicilio'
              value={datosUsuario?.domicilio}
              size='small'
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </FormControl>
        </div>
        <div className='col-span-full'>
          <Button id='btnEditar' styling='primary' onClick={handleClickEditar}>
            Editar datos
          </Button>
        </div>
        <Collapse in={isOpen} className='col-span-full'>
          {editado ? (
            <Alert
              icon={<CheckIcon fontSize='inherit' />}
              severity='success'
              variant='filled'
              onClose={() => {
                setOpen(false);
              }}
            >
              ¡Datos editados correctamente!
            </Alert>
          ) : (
            <Alert
              severity='error'
              variant='filled'
              onClose={() => {
                setOpen(false);
              }}
            >
              {errorMessage}
            </Alert>
          )}
        </Collapse>
      </div>
    </FormContainer>
  );
}
