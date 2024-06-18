'use client';

import FormContainer from '@/components/FormContainer/formContainer';
import InputField from '@/components/InputField/inputField';
import Key from '@/assets/svg/key.svg';
import Button from '@/components/Button/button';
import { useState } from 'react';
import { validarCertificadoFetch } from '@/lib/data/actions';
import { Certificado } from '@/lib/definitions';
import { Collapse, Alert } from '@mui/material';

export default function CodigoCertificado() {
  const [codigo, setCodigo] = useState('');
  const [info, setInfo] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigo(e.target.value);
  };

  const handleSubmit = () => {
    if (codigo) {
      validarCertificadoFetch(codigo).then(
        (response: Certificado) => {
          if(!response){
            setMensaje('Certificado no encontrado.');
            setInfo(true);
            setTimeout(setAlertHelper, 3000);
          }else{
            sessionStorage.setItem('datos-certificado', JSON.stringify(response));
            window.location.href = `${window.location.pathname}/validar`;
          }        
        }
      );
    }else{
      setMensaje('Debe ingresar un código');
      setInfo(true);
      setTimeout(setAlertHelper, 3000);
    }
  };

  const setAlertHelper = () => {
    setInfo(false);    
  };

  return (
    <FormContainer className='mt-20 w-2/5 gap-2 md:gap-2 md:px-6'>
      <div className='flex-col text-center items-center justify-between '>
        <h3>Validar certificado</h3>
        <h4>Ingrese código</h4>
        <InputField
          placeholder='Código'
          type='text'
          name='codigo'
          label='Código'
          onChange={handleChange}
          className='text-left mt-5'
        >
          <Key className='h-auto w-6 fill-garnet sm:w-8' />
        </InputField>
        <Button styling='primary' className='mt-5' onClick={handleSubmit}>
          Validar
        </Button>
        <Collapse in={info} className='col-span-full mt-5'>
          <Alert
            variant='outlined'
            severity='warning'
            onClose={() => {
              setInfo(false);
            }}
          >
            {mensaje}
          </Alert>
        </Collapse>
      </div>
    </FormContainer>
  );
}
