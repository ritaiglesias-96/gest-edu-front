'use client';

import Certificado from '@/components/Certificado/certificado';
import FormContainer from '@/components/FormContainer/formContainer';

export default function ValidarCertificado() {
  return (
    <div className='relative z-10 mx-auto my-4 flex w-2/3 flex-col rounded-xl bg-ivory px-2 pb-6 pt-2 shadow-lg shadow-garnet md:p-10 mt-20'>
      <h1 className='text-center font-bold'>Certificado</h1>
      <Certificado />
    </div>
  );
}
