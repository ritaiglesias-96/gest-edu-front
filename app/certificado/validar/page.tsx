'use client';

import Certificado from '@/components/Certificado/certificado';
import FormContainer from '@/components/FormContainer/formContainer';

export default function ValidarCertificado() {
  return (
    <FormContainer className='mt-20 w-2/5 gap-2 md:gap-2 md:px-6'>
        <h1 className='text-center font-bold'>Certificado</h1>
        <Certificado />
    </FormContainer>
  );
}
