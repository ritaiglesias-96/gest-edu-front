'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getDocentes,
  registrarFechaExamen,
} from '@/lib/data/funcionario/actions';
import { Input, InputLabel } from '@mui/material';

export default function FuncionarioHorariosExamenesAgregarHome({
  params,
}: {
  params: { id: string; asignaturaId: string };
}) {
  const router = useRouter();
  const [fecha, setFecha] = useState('');
  const [diasPrevInsc, setDiasPrevInsc] = useState('');
  const [docenteIds, setDocentes] = useState([1, 2, 3]);
  const [listaDocentes, setListaDocentes] = useState([]);

  const handleClick = () => {
    const asignaturaId = params.asignaturaId;
    const data = { fecha, diasPrevInsc, asignaturaId, docenteIds };
    console.log(data);

    if (params) {
      registrarFechaExamen(data).then((res) => {
        if (res) {
          alert(res.message);
          if (res.message) {
            alert('Fecha registrada con exito');
            router.back();
          }
        }
      });
    }
  };

  useEffect(() => {
    getDocentes().then((res) => {
      setListaDocentes(res);
    });
  }, []);
  /*   useEffect(() => {
    if (registro.message.includes('200')) {
      router.back();
    }
  }, [registro.message, router]); */
  return (
    <FormContainer>
      <div className='flex min-h-full w-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'>
        <h1 className='pb-4 text-center text-2xl font-bold leading-snug text-black'>
          Agregar Fecha y hora de examen
        </h1>
        <InputLabel htmlFor='component-simple'>Fecha y Hora</InputLabel>
        <Input
          className={
            'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
          }
          type='datetime-local'
          name='fecha'
          onChange={(event) => setFecha(event.target.value)}
        ></Input>
        <InputLabel htmlFor='component-simple'>
          Dias previos para la inscripcion
        </InputLabel>
        <Input
          className={
            'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
          }
          type='number'
          name='diasPrevInsc'
          onChange={(event) => setDiasPrevInsc(event.target.value)}
        ></Input>
        {/*  <ul>
          {listaDocentes.map((docente) => (
            <li key={docente.id}>
              <input
                type='checkbox'
                checked={selectedTeachers.includes(docente.id)}
                onChange={(e) =>
                  handleCheckboxChange(docente.id, e.target.checked)
                }
                disabled={selectedTeachers.length === 3}
              />
              {docente.name}
            </li>
          ))}
        </ul> */}
        <div className='flex w-2/3 flex-col justify-between gap-1 sm:w-full sm:flex-row'>
          <Button
            onClick={() => handleClick()}
            className='w-full'
            styling='primary'
          >
            Registrar
          </Button>
        </div>
      </div>
    </FormContainer>
  );
}
