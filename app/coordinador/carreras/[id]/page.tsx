'use client';
import { useEffect, useState } from 'react';
import {
  editCarrera,
  getCarreraYAsignatura,
  getCarrera,
} from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import Link from 'next/link';
import PencilIcon from '@/assets/svg/edit.svg';
import Close from '@/assets/svg/close.svg';
import { Carrera, initialState } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import InputField from '@/components/InputField/inputField';
import List from '@/components/List/list';

export default function CarreraPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [carrera, setCarrera] = useState<Carrera>();
  const [fallout, setFallout] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeCarrera = await getCarreraYAsignatura(params.id);
      if (existeCarrera) {
        setCarrera(existeCarrera.carrera);
        setRows(existeCarrera.asignaturas);
        setRowsLoading(false);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
        <CircularProgress sx={{ color: '#802c2c' }} />
      </Box>
    );
  }

  if (fallout && !loading) {
    return (
      <div className='mx-auto flex flex-col items-center justify-center text-ivory'>
        <h1>Ha ocurrido un error</h1>
        <Button onClick={() => router.back()} styling='primary'>
          Regresar
        </Button>
      </div>
    );
  }

  return (
    <>
      {edit && (
        <EditCarrera setOpen={setEdit} id={params.id} setCarrera={setCarrera} />
      )}
      <div className='relative box-border size-full justify-center overflow-auto md:w-5/6'>
        {!fallout && !loading && (
          <div className='h-fit w-full p-2'>
            <div className='my-2 box-content flex flex-col items-center justify-between gap-3 rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
              <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
                <h3 className='m-0 p-0'>{carrera?.nombre}</h3>
                <div className='flex flex-col'>
                  <p className='font-bold'>Descripcion:</p>
                  <p>{carrera?.descripcion}</p>
                </div>
              </div>
              <div className='flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center'>
                <div className='flex flex-col'>
                  <p className='font-bold'>Duracion:</p>
                  <p>{carrera?.duracionAnios + ' años'}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='font-bold'>Creditos:</p>
                  <p>{carrera?.creditos + ' creditos'}</p>
                </div>
                <Button
                  className='w-full self-center'
                  styling='pill'
                  onClick={() => {
                    setEdit(!edit);
                  }}
                >
                  <PencilIcon className='h-auto w-6 fill-garnet sm:w-8' />
                </Button>
              </div>
              <div className='flex w-full flex-col justify-center rounded-md md:max-w-52'>
                <Link href={`/coordinador/carreras/${params.id}/plan-estudio`}>
                  <Button className='w-full' styling='primary'>
                    {!carrera?.existePlanEstudio
                      ? 'Registrar Plan de estudio'
                      : 'Ver Plan de estudio'}
                  </Button>
                </Link>
                {!carrera?.existePlanEstudio && (
                  <Link href={`/coordinador/carreras/${params.id}/agregar`}>
                    <Button className='w-full' styling='primary'>
                      Agregar asignatura
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <List
              rows={rows}
              rowsLoading={rowsLoading}
              columnsType='asignatura'
              isNormalDataGrid={true}
            />
          </div>
        )}
      </div>
    </>
  );
}

function EditCarrera({
  setOpen,
  setCarrera,
  id,
}: {
  setOpen: (open: boolean) => void;
  setCarrera: (carrera: Carrera) => void;
  id: string;
}) {
  const router = useRouter();
  const [editForm, dispatch] = useFormState(editCarrera, initialState);
  useEffect(() => {
    if (editForm.message.includes('200')) {
      const fetch = async () => {
        await getCarrera(id).then((data) => {
          setCarrera(data);
        });
      };
      fetch();
      setOpen(false);
    }
  }, [editForm.message, id, setCarrera, setOpen]);
  return (
    <>
      <div
        className='absolute z-10 size-full backdrop-blur-sm'
        onClick={() => setOpen(false)}
      />
      <div className='absolute z-20 mx-auto my-4 flex size-fit flex-col rounded-xl bg-ivory p-6 shadow-lg shadow-garnet  md:p-10'>
        <button
          className='right-0 block w-fit cursor-pointer self-end'
          onClick={() => setOpen(false)}
        >
          <Close className='self-end fill-garnet hover:fill-bittersweet sm:size-10' />
        </button>
        <h2 className='text-center text-black'>Editar Carrera</h2>
        <form
          className='flex min-h-full w-full flex-col items-center justify-between gap-2 md:mx-auto md:h-full md:max-w-full md:gap-2 '
          action={dispatch}
        >
          <InputField
            placeholder='Nombre'
            type='text'
            name='nombre'
            label='Nombre'
          ></InputField>
          <div id='nombre-error' aria-live='polite' aria-atomic='true'>
            {editForm?.errors?.nombre &&
              editForm.errors.nombre.map((error: string) => (
                <p className='mt-2 text-sm text-garnet' key={error}>
                  {error}
                </p>
              ))}
          </div>
          <InputField
            placeholder='Descripcion'
            type='textarea'
            name='descripcion'
            label='Descripcion'
          ></InputField>
          <div id='descripcion-error' aria-live='polite' aria-atomic='true'>
            {editForm?.errors?.descripcion &&
              editForm.errors.descripcion.map((error: string) => (
                <p className='mt-2 text-sm text-garnet' key={error}>
                  {error}
                </p>
              ))}
          </div>
          <InputField
            type='number'
            name='carreraId'
            label='Carrera ID'
            className='hidden'
            value={parseInt(id)}
          />
          <div id='carreraId-error' aria-live='polite' aria-atomic='true'>
            {editForm?.errors?.carreraId &&
              editForm.errors.carreraId.map((error: string) => (
                <p className='mt-2 text-sm text-garnet' key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className='flex w-2/3 flex-col items-center gap-1 sm:w-full'>
            <EditButton />
          </div>
        </form>
      </div>
    </>
  );
}

function EditButton() {
  const { pending } = useFormStatus();
  return (
    <Button className='w-auto' styling='primary' disabled={pending}>
      {pending ? 'Editando...' : 'Aceptar'}
    </Button>
  );
}
