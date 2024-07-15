'use client';
import Button from '@/components/Button/button';
import FormContainer from '@/components/FormContainer/formContainer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  getDocentes,
  getPeriodosExamenCarrera,
  registrarFechaExamen,
} from '@/lib/data/funcionario/actions';
import { Input, InputLabel, Collapse, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Docente } from '@/lib/definitions';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { convertirFecha } from '@/utils/utils';

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
  const [periodosSelect, setPeriodosSelect] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    getDocentes().then((res) => {
      setListaDocentes(res.content);
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const existePeriodos = await getPeriodosExamenCarrera(params.id);

      if (existePeriodos) {
        const periodosAux = existePeriodos.periodos.map((item: any) => ({
          ...item,
          fechaInicio: convertirFecha(item.fechaInicio),
          fechaFin: convertirFecha(item.fechaFin),
        }));
        const newFormattedData = periodosAux.map((item: any) => {
          const startDate = item.fechaInicio;
          const endDate = item.fechaFin;
          return `${startDate} - ${endDate}`;
        });
        setPeriodosSelect(newFormattedData);
      }
    };
    fetch();
  }, [params.id]);

  const handleClick = () => {
    const [startDate, endDate] = selectedDate.split(' - ').map((date) => {
      const [day, month, year] = date.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); // Adjust month (0-indexed)
    });

    const checkDateObject = new Date(fecha);

    const isBetween =
      checkDateObject >= startDate && checkDateObject <= endDate;

    if (isBetween) {
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
              if (res.message) {
                setMensajeError(res.message);
                setAlertError(true);
              } else {
                setMensajeError('Examen registrado con exito');
                setAlertOk(true);
              }
            }
          });
        }
      } else {
        setMensajeError('Debe seleccionar por lo menos un docente');
        setAlertError(true);
      }
    } else {
      setMensajeError(
        'La fecha ingresada no esta dentro del periodo de examen seleccionado'
      );
      setAlertError(true);
    }
  };

  const handleChange = (event: SelectChangeEvent<typeof docenteAux>) => {
    const {
      target: { value },
    } = event;

    setDocenteAux(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleChangeSingle = (event: SelectChangeEvent) => {
    setDisabled(false);
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <FormContainer>
        <div className='flex min-h-full w-full flex-col items-center justify-between gap-1 md:mx-auto md:h-full md:max-w-full md:gap-2 md:px-6'>
          <h1 className='pb-4 text-center text-2xl font-bold leading-snug text-black'>
            Agregar Fecha y hora de examen
          </h1>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Periodo</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={selectedDate}
              label='Periodo'
              onChange={handleChangeSingle}
            >
              {periodosSelect.map((periodo) => (
                <MenuItem key={periodo} value={periodo}>
                  <ListItemText primary={periodo} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputLabel htmlFor='component-simple'>Fecha y Hora</InputLabel>
          <Input
            className={
              'mx-3 w-full py-1 text-sm invalid:border-atomic-tangerine invalid:text-atomic-tangerine focus:underline focus:outline-none sm:text-base'
            }
            type='datetime-local'
            name='fecha'
            onChange={(event) => setFecha(event.target.value)}
            disabled={disabled}
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
            disabled={disabled}
          ></Input>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id='demo-multiple-checkbox-label'>Docentes</InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id={'demo-multiple-checkbox'}
              multiple
              value={docenteAux}
              onChange={handleChange}
              input={<OutlinedInput label='Docentes' />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              disabled={disabled}
            >
              {listaDocentes.map((docente) => (
                <MenuItem
                  key={docente.nombre}
                  value={docente.nombre}
                  disabled={
                    docenteAux.length >= 3 &&
                    !docenteAux.includes(docente.nombre)
                  }
                >
                  <Checkbox checked={docenteAux.indexOf(docente.nombre) > -1} />
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
      </FormContainer>
      {alertOk && (
        <Collapse
          in={alertOk}
          className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
        >
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            severity='success'
            variant='filled'
            onClose={() => {
              setAlertOk(false);
              router.back();
            }}
          >
            {mensajeError}
          </Alert>
        </Collapse>
      )}
      {alertError && (
        <Collapse
          in={alertError}
          className='absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-garnet'
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
    </>
  );
}
