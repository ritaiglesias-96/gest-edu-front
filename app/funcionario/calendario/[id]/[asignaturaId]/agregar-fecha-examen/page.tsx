'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getDocentes,
  registrarFechaExamen,
} from '@/lib/data/funcionario/actions';
import { Input, InputLabel } from '@mui/material';
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Docente } from '@/lib/definitions';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default function FuncionarioHorariosExamenesAgregarHome({
  params,
}: {
  params: { id: string; asignaturaId: string };
}) {
  const router = useRouter();
  const [fecha, setFecha] = useState('');
  const [diasPrevInsc, setDiasPrevInsc] = useState('');
  const [docenteAux, setDocenteAux] = useState<string[]>([]);
  const [listaDocentes, setListaDocentes] = useState<Docente[]>([]);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    getDocentes().then((res) => {
      setListaDocentes(res.content);
    });
  }, []);

  function MultipleSelectCheckmarks() {
    const handleChange = (event: SelectChangeEvent<typeof docenteAux>) => {
      const {
        target: { value },
      } = event;

      setDocenteAux(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value
      );
    };

    return (
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id='demo-multiple-checkbox-label'>Tag</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id={'demo-multiple-checkbox'}
            multiple
            value={docenteAux}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {listaDocentes.map((docente) => (
              <MenuItem
                key={docente.nombre}
                value={docente.nombre}
                disabled={
                  docenteAux.length >= 3 && !docenteAux.includes(docente.nombre)
                }
              >
                <Checkbox checked={docenteAux.indexOf(docente.nombre) > -1} />
                <ListItemText primary={docente.nombre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  const handleClick = () => {
    const asignaturaId = params.asignaturaId;
    const docenteIds = docenteAux
      .filter((nombre) =>
        listaDocentes.some((docente) => docente.nombre === nombre)
      )
      .map(
        (nombre) =>
          listaDocentes.find((docente) => docente.nombre === nombre)!.id
      );

    if (docenteIds) {
      const data = { fecha, diasPrevInsc, asignaturaId, docenteIds };

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
    } else {
      alert('Debe seleccionar por lo menos un docente');
    }
  };

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
        <MultipleSelectCheckmarks />
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
