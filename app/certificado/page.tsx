'use client';
import FormContainer from '@/components/FormContainer/formContainer';
import InputField from '@/components/InputField/inputField';
import Key from '@/assets/svg/key.svg';
import Button from '@/components/Button/button';

export default function ValidarCertificado() {
  return (
    <FormContainer className='mt-20 w-2/5'>
      <div className='flex-col text-center items-center justify-between '>
        <h3>Validar certificado</h3>
        <h4>Ingrese código</h4>
        <InputField
          placeholder='Código'
          type='text'
          name='codigo'
          label='Código'
          className='text-left mt-5'
        >
          <Key className='h-auto w-6 fill-garnet sm:w-8' />
        </InputField>
        <Button styling='primary' className='mt-5'>Validar</Button>
      </div>
    </FormContainer>
  );
}
