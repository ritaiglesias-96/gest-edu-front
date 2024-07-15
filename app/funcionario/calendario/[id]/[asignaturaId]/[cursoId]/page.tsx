'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import React, { useState } from 'react';
import { Input, InputLabel, Collapse, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { registrarHorarioDiaCurso } from '@/lib/data/funcionario/actions';
import { horarios } from './horarios';
import { HorarioCurso } from '@/lib/definitions';

function HorariosPorDia(cursoId: { cursoId: string }) {
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

  const handleChange = (horario: string, tipoHora: string, dia: string) => {
    horarios.forEach((element: HorarioCurso) => {
      if (element.dia == dia.toUpperCase() && tipoHora == 'horaInicio') {
        element.horaInicio = horario;
      } else if (element.dia == dia.toUpperCase() && tipoHora == 'horaFin') {
        element.horaFin = horario;
      }
    });
  };

  const handleClick = (dia: string) => {
    horarios.forEach((horario: HorarioCurso) => {
      if (
        horario.dia == dia.toUpperCase() &&
        horario.horaFin &&
        horario.horaInicio
      ) {
        registrarHorarioDiaCurso(horario, cursoId.cursoId).then((res) => {
          if (res === null) {
            setMensajeError('Error al registrar horario');
            setAlertError(true);
          } else {
            setAlertOk(true);
          }
        });
      } else if (horario.dia == dia.toUpperCase()) {
        setMensajeError('Seleccione horarios');
        setAlertError(true);
      }
    });
  };

  return (
    <div className='space-y-2'>
      {dias.map((dia, index) => (
        <div key={dia + index} className='flex justify-around space-x-40'>
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
          <Button
            onClick={() => handleClick(dia)}
            className='w-full'
            styling='primary'
          >
            Registrar
          </Button>
        </div>
      ))}
      {alertOk && (
        <Collapse
          in={alertOk}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            variant='filled'
            onClose={() => {
              setAlertOk(false);
            }}
          >
            ¡Horario registrado correctamente!
          </Alert>
        </Collapse>
      )}
      {alertError && (
        <Collapse
          in={alertError}
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='error'
            variant='filled'
            onClose={() => {
              setAlertError(false);
            }}
          >
            {mensajeError}
          </Alert>
        </Collapse>
      )}
    </div>
  );
}

export default function FuncionarioHorariosCursoAgregarHome({
  params,
}: {
  params: { id: string; asignaturaId: string; cursoId: string };
}) {
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
