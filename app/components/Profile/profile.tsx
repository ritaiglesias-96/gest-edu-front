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
import { FormControl, InputLabel, Input, Link, styled, IconButton } from '@mui/material';
import FormContainer from '../FormContainer/formContainer';
import { useEffect, useState } from 'react';
import { editarUsuarioFetch, obtenerDatosUsuarioFetch } from '@/lib/data/actions';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ButtonMaterial from '@mui/material/Button';

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
    if (datosUsuario.telefono !== '' && datosUsuario.domicilio !== '' && datosUsuario.imagen !== '') {
      editarUsuarioFetch(datosUsuario.telefono, datosUsuario.domicilio, datosUsuario.imagen)
        .then(() => {
          setEditado(true);
        });
    }
  }



  const handleChange = (name: string, newValue: string) => {
    if (name === 'telefono') setUsuario({ ...datosUsuario, telefono: newValue });
    if (name === 'domicilio') setUsuario({ ...datosUsuario, domicilio: newValue });
    //if(name === 'imagen') setUsuario({ ...datosUsuario, imagen: newValue });
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
      // Aquí puedes manejar el archivo
      console.log('Archivo seleccionado:', file);
      // Puedes leer el contenido del archivo si es necesario
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        console.log('Contenido del archivo:', file.name);
      };
      reader.readAsText(file); // Puedes cambiar readAsText a otro método dependiendo del tipo de archivo
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <FormContainer>
      <div>
        <div>
          <div style={{ display: 'inline-block', verticalAlign: 'center' }}>
            <Image
              loader={() => datosUsuario?.imagen}
              src={datosUsuario?.imagen}
              alt='user image'
              width={200}
              height={100}
              style={{
                objectFit: 'cover',
                height: '200px',
                borderRadius: '50%',
                padding: '10px',
                display: 'inline-block'
              }}
            />
            <div id="divNombreCabezal" style={{ display: 'inline-block', verticalAlign: 'middle', height: '100%' }}>
              <h3>{datosUsuario?.nombre} {datosUsuario?.apellido}</h3>
            </div>
          </div>
          <div style={{ marginLeft: '80px', marginTop: '-50px' }}>
            <>
              <input
                style={{ display: "none" }}
                accept="image/png, image/jpeg" 
                id="choose-file"
                type="file"
                onChange={(event) => handlefile(event)}
              />
              <label htmlFor="choose-file">
                <IconButton aria-label="upload" component="span">
                  <CameraAltIcon />
                </IconButton>
              </label>
            </>
            {/* <ButtonMaterial
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
              startIcon={<CameraAltIcon fontSize='medium'/>}
            >
              <VisuallyHiddenInput type="file" />
            </ButtonMaterial> */}
          </div>
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
              <Input id="component-simple" name="nombre" value={datosUsuario?.nombre} size='small' />
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
                }} />
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
              <Input id="component-simple" name="domicilio" value={datosUsuario?.domicilio} size='small' onChange={(e) => handleChange(e.target.name, e.target.value)} />
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