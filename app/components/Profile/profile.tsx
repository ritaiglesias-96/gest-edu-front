'use client';

import { Role, User } from '@/lib/definitions';
import Button from '@/components/Button/button';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import UserIcon from '@/assets/svg/user.svg';
import LocationIcon from '@/assets/svg/place.svg';
import FingerprintIcon from '@/assets/svg/fingerprint.svg';
import CalendarIcon from '@/assets/svg/fingerprint.svg';
import EmailIcon from '@/assets/svg/fingerprint.svg';
import { initializeApp } from "firebase/app";
import { FormControl, InputLabel, Input } from '@mui/material';
import FormContainer from '../FormContainer/formContainer';
import { authToken } from '@/utils/auth';
import { useState, useEffect } from 'react';
import { obtenerDatosUsuario } from '@/lib/data/actions';


const firebaseConfig = {
  apiKey: "AIzaSyCVI7TOxOsaQ0zApLLgZxpBW9_78LPxQk8",
  authDomain: "gestedu-4b92d.firebaseapp.com",
  projectId: "gestedu-4b92d",
  storageBucket: "gestedu-4b92d.appspot.com",
  messagingSenderId: "648304797890",
  appId: "1:648304797890:web:7cdd9694e8097da5d4335b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


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
    domicilio: 'Calle Falsa 1234',
  };

  const [usuario, setUsuario] = useState(user);
  
  useEffect(() => {
    obtenerDatosUsuario().then((u) => {
      usuario.nombre = u.Nombre;
      usuario.apellido = u.Apelldio;
      usuario.email = u.email;
      usuario.password = '';
      //usuario.role = Role.estudiante;
      usuario.imagen= u.imagen;
      usuario.fechaNac = u.fechaNac;
      usuario.ci = u.ci; 
      usuario.telefono = u.telefono;
      usuario.domicilio = u.domicilio;
    }); 
  });

  

  return (
    <FormContainer>
      <div>
        <div style={{ display: 'inline-block', alignContent: 'center' }}>
          <Image
            src={user.imagen}
            alt=''
            width={150}
            height={150}
            style={{
              objectFit: 'cover',
              height: '150px',
              borderRadius: '50%',
              padding: '20px',
              display: 'inline-block'
            }}
          />
        </div>
        <div id="divNombreCabezal" style={{ display: 'inline-block', verticalAlign: 'middle', height: '100%' }}>
          <h3>{user.nombre} {user.apellido}</h3>
        </div>
        <div>
          <h6 style={{
            objectFit: 'cover',
            padding: '10px'
          }}>Datos Personlanes:</h6>
        </div>
        <div style={{
          width: '50%',
          objectFit: 'cover',
          padding: '10px',
          display: 'inline-block'
        }}>

          <div id='divNombre' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Nombre</InputLabel>
              <Input id="component-simple" value={user.nombre} size='small' />
            </FormControl>
          </div>

          <div id='divDocumento' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <FingerprintIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Documento</InputLabel>
              <Input id="component-simple" value={user.ci} size='small' />
            </FormControl>
          </div>

          <div id='divFechaNacimiento' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <CalendarIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Fecha de nacimiento</InputLabel>
              <Input id="component-simple" value={user.fechaNac} size='small' />
            </FormControl>
          </div>

        </div>
        <div style={{
          width: '50%',
          objectFit: 'cover',
          padding: '10px',
          paddingBottom: '10%',
          display: 'inline-block'
        }}>

          <div id='divApellido' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <UserIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Apellido</InputLabel>
              <Input id="component-simple" value={user.apellido} size='small' />
            </FormControl>
          </div>

          <div id='divCorreo' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <EmailIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Correo electrónico</InputLabel>
              <Input id="component-simple" value={user.email} size='small' />
            </FormControl>
          </div>

          <div id='divFechaNac' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <LocationIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Domicilio</InputLabel>
              <Input id="component-simple" value={user.domicilio} size='small' />
            </FormControl>
          </div>
        </div>
        <div style={{ alignContent: 'center', textAlign: 'center' }}>

          <div style={{ padding: '5px', display: 'inline-block' }}>
            <Button id='btnEditar' className='primary'>Editar datos</Button>
          </div>

        </div>
      </div>
    </FormContainer>
  );
}



