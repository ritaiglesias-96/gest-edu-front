'use client';

import { Role, User } from '@/lib/definitions';
import Button from '@/components/Button/button';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import UserIcon from '@/assets/svg/user.svg';
import LocationIcon from '@/assets/svg/place.svg';
import FingerprintIcon from '@/assets/svg/fingerprint.svg';
import CalendarIcon from '@/assets/svg/calendar.svg';
import EmailIcon from '@/assets/svg/email.svg';
import { FormControl, InputLabel, Input, Link } from '@mui/material';
import FormContainer from '../FormContainer/formContainer';
import { useEffect, useState } from 'react';
import { editarPerfilFetch, editarUsuarioFetch, obtenerDatosUsuarioFetch } from '@/lib/data/actions';

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
    imagen: '',
    fechaNac: '12/12/1990',
    ci: '12546897',
    telefono: '099546987',
    domicilio: 'Calle Falsa 1234',
  };

  const [datosUsuario, setUsuario] = useState<User>(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editado, setEditado] = useState(false);

  useEffect(() => {
    obtenerDatosUsuarioFetch()
        .then(u => {
          setUsuario(u);
          setLoading(false);
          console.log('USUARIO', u);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
  }, []); 

  const handleClickEditar = () => {
    if(datosUsuario.telefono !== '' && datosUsuario.domicilio !== '' && datosUsuario.imagen !== '')
    {      
      editarUsuarioFetch(datosUsuario.telefono, datosUsuario.domicilio, datosUsuario.imagen)
        .then(()=>{
          setEditado(true);          
      });
    }
  }



  const handleChange = (name: string, newValue: string) => {
    if(name === 'telefono') setUsuario({ ...datosUsuario, telefono: newValue });
    if(name === 'domicilio') setUsuario({ ...datosUsuario, domicilio: newValue });
    //if(name === 'imagen') setUsuario({ ...datosUsuario, imagen: newValue });
  };

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error al cargar los datos: {error}</p>;
  }  

  const urlImagen = 'https://i.ebayimg.com/images/g/RNsAAOSwGotWq6ju/s-l500.jpg';
  
  return (    
    <FormContainer>
      <div>
        <div style={{ display: 'inline-block', alignContent: 'center'}}>
          <Image
            loader={() => urlImagen}
            src={urlImagen}
            alt='user image'
            width={200}
            height={100}
            style={{
              objectFit: 'cover',
              height: '200px',
              borderRadius: '50%',
              padding: '10px',
            }}
          />
        </div>
        <div id="divNombreCabezal" style={{ display: 'inline-block', verticalAlign: 'middle', height: '100%' }}>
          <h3>{datosUsuario?.nombre} {datosUsuario?.apellido}</h3>
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
              <Input id="component-simple" name="nombre" value={datosUsuario?.nombre} size='small'  />
            </FormControl>
          </div>

          <div id='divDocumento' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <FingerprintIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Documento</InputLabel>
              <Input id="component-simple" value={datosUsuario?.ci} size='small' />
            </FormControl>
          </div>

          <div id='divFechaNacimiento' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <CalendarIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Fecha de nacimiento</InputLabel>
              <Input id="component-simple" value={datosUsuario?.fechaNac} size='small' />
            </FormControl>
          </div>

          <div id='divTelefono' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <CalendarIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Telefono</InputLabel>
              <Input 
                id="component-simple" 
                name="telefono" 
                value={datosUsuario?.telefono} 
                size='small' 
                onChange={(e) => handleChange(e.target.name, e.target.value)} 
                readOnly={false} 
                inputProps={{
                  inputMode: 'numeric',
                }}/>
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
              <Input id="component-simple" value={datosUsuario?.apellido} size='small' />
            </FormControl>
          </div>

          <div id='divCorreo' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <EmailIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Correo electrónico</InputLabel>
              <Input id="component-simple" value={datosUsuario?.email} size='small' />
            </FormControl>
          </div>

          <div id='divFechaNac' style={{ paddingBottom: '15px' }}>
            <div style={{ display: 'inline-block', verticalAlign: 'middle', paddingRight: '5px' }}>
              <LocationIcon className='h-auto w-6 fill-garnet sm:w-8' />
            </div>
            <FormControl variant="standard" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <InputLabel htmlFor="component-simple">Domicilio</InputLabel>
              <Input id="component-simple" name="domicilio" value={datosUsuario?.domicilio} size='small' onChange={(e) => handleChange(e.target.name, e.target.value)}/>
            </FormControl>
          </div>
        </div>
        <div style={{ alignContent: 'center', textAlign: 'center' }}>
          <div style={{ padding: '5px', display: 'inline-block' }}>
            <Button id='btnEditar' className='primary' onClick={handleClickEditar}>Editar datos</Button>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}