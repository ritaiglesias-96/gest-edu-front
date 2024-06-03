'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registrarHorarioDiaCurso } from '@/lib/data/funcionario/actions';
import { Input, InputLabel } from '@mui/material';
import { horarios } from './horarios';

function HorariosPorDia(cursoId: any) {
  const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

  const handleChange = (horario: any, tipoHora: string, dia: any) => {
    horarios.forEach((element: any) => {
      if (element.dia == dia.toUpperCase() && tipoHora == 'horaInicio') {
        element.horaInicio = horario;
      } else if (element.dia == dia.toUpperCase() && tipoHora == 'horaFin') {
        element.horaFin = horario;
      }
    });
  };

  const handleClick = () => {
    horarios.forEach((horario: any) => {
      if (horario.horaInicio && horario.horaFin) {
        registrarHorarioDiaCurso(horario, cursoId);
      }
    });
  };

  return (
    <div>
      {dias.map((dia, index) => (
        <div key={index} className='flex justify-around space-x-40'>
          <h4 className='w-6 justify-center text-black'>{dia}</h4>
          <div>
            <InputLabel htmlFor='component-simple'>Hora Inicio</InputLabel>
            <Input
              className={
                'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
              }
              type='time'
              name='horaInicio'
              onChange={(event) => {
                console.log(event.target.value);
                handleChange(event?.target.value, event.target.name, dia);
              }}
            ></Input>
          </div>
          <div>
            <InputLabel htmlFor='component-simple'>Hora Fin</InputLabel>
            <Input
              className={
                'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
              }
              type='time'
              name='horaFin'
              onChange={(event) =>
                handleChange(event?.target.value, event.target.name, dia)
              }
            ></Input>
          </div>
        </div>
      ))}
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
  );
}

export default function FuncionarioHorariosCursoAgregarHome({
  params,
}: {
  params: { id: string; asignaturaId: string; cursoId: string };
}) {
  const router = useRouter();
  const [fecha, setFecha] = useState('');
  const [diasPrevInsc, setDiasPrevInsc] = useState('');
  const [docenteIds, setDocentes] = useState([1, 2, 3]);

  /*     if (params) {
      registrarFechaExamen(data).then((res) => {
        if (res) {
          alert(res.message);
          if (res.message) {
            alert('Fecha registrada con exito');
            router.back();
          }
        }
      });
    } */

  return (
    <FormContainer>
      <div className='flex min-h-full w-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'>
        <h1 className='pb-4 text-center text-2xl font-bold leading-snug text-black'>
          Registrar Horarios Semanales
        </h1>
        <HorariosPorDia cursoId={params.cursoId} />
      </div>
    </FormContainer>
  );
}
