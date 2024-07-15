'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDocentes, registrarCurso } from '@/lib/data/funcionario/actions';
import { Alert, Collapse, Input, InputLabel } from '@mui/material';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Docente } from '@/lib/definitions';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FuncionarioCursosAgregarHome({
  params,
}: {
  params: { id: string; asignaturaId: string };
}) {
  const router = useRouter();
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [diasPrevInsc] = useState(30); // 30 días por defecto
  const [estado] = useState('ACTIVO'); // Estado por defecto
  const [docente, setDocente] = useState<string>('');
  const [listaDocentes, setListaDocentes] = useState<Docente[]>([]);
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    getDocentes().then((res) => {
      setListaDocentes(res.content);
    });
  }, []);

  const handleChangeDocente = (event: SelectChangeEvent) => {
    setDocente(event.target.value);
  };

  const handleClick = () => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      setMensajeError(
        'La fecha de fin debe ser posterior a la fecha de inicio'
      );
      setAlertError(true);
    } else if (inicio < new Date()) {
      setMensajeError(
        'La fecha de inicio debe ser posterior a la fecha actual'
      );
      setAlertError(true);
    } else {
      const asignaturaId = params.asignaturaId;
      const docenteId = listaDocentes.find((d) => d.nombre === docente)?.id;

      if (docenteId) {
        // Convertir el objeto data a FormData
        const formData = new FormData();
        formData.append('fechaInicio', fechaInicio);
        formData.append('fechaFin', fechaFin);
        formData.append('diasPrevInsc', diasPrevInsc.toString());
        formData.append('estado', estado);
        formData.append('asignaturaId', asignaturaId);
        formData.append('docenteId', docenteId.toString());

        // Crear un prevState válido
        const prevState = {
          id: 0,
          fechaInicio: '',
          fechaFin: '',
          diasPrevInsc: 30,
          estado: 'ACTIVO',
          asignaturaId: 0,
          docenteId: 0,
        };

        registrarCurso(prevState, formData)
          .then((res) => {
            if (res.message.includes('200')) {
              setMensajeError('Curso registrado');
              setAlertOk(true);
              router.back();
            } else {
              setMensajeError(res.message);
              setAlertError(true);
            }
          })
          .catch(() => {
            setMensajeError('Un error ocurrió al registrar el curso');
            setAlertError(true);
          });
      } else {
        setMensajeError('Debe seleccionar un docente');
        setAlertError(true);
      }
    }
  };

  return (
    <FormContainer>
      <div className='flex min-h-full w-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'>
        <h1 className='pb-4 text-center text-2xl font-bold leading-snug text-black'>
          Agregar Curso
        </h1>
        <InputLabel htmlFor='component-simple'>Fecha de Inicio</InputLabel>
        <Input
          className='mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
          type='date'
          name='fechaInicio'
          inputProps={{ pattern: 'dd-mm-yyyy' }}
          onChange={(event) => {
            setFechaInicio(event.target.value);
          }}
        />
        <InputLabel htmlFor='component-simple'>Fecha de Fin</InputLabel>
        <Input
          className='mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
          type='date'
          name='fechaFin'
          inputProps={{ pattern: 'dd-mm-yyyy' }}
          onChange={(event) => {
            setFechaFin(event.target.value);
          }}
        />
        <InputLabel htmlFor='component-simple'>Docente</InputLabel>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id='demo-simple-select-label'>Docente</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={docente}
            onChange={handleChangeDocente}
            input={<OutlinedInput label='Docente' />}
            MenuProps={MenuProps}
          >
            {listaDocentes.map((docente) => (
              <MenuItem key={docente.nombre} value={docente.nombre}>
                <ListItemText primary={docente.nombre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            {mensajeError}
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
    </FormContainer>
  );
}
