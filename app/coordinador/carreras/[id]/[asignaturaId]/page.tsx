'use client';
import { useEffect, useState } from 'react';
import { editAsignatura, getAsignatura } from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import PencilIcon from '@/assets/svg/edit.svg';
import Close from '@/assets/svg/close.svg';
import { Asignatura, initialState } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import InputField from '@/components/InputField/inputField';

export default function AsignaturaPage({
  params,
}: {
  params: { id: string; asignaturaId: string };
}) {
  const router = useRouter();
  const [asignatura, setAsignatura] = useState<Asignatura>();
  const [fallout, setFallout] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const existeAsignatura = await getAsignatura(params.asignaturaId);
      console.log(existeAsignatura);
      if (existeAsignatura) {
        setAsignatura(existeAsignatura);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
  }, [params.asignaturaId]);

  return (
    <>
      {edit && (
        <EditAsignatura
          setOpen={setEdit}
          id={params.id}
          setAsignatura={setAsignatura}
        />
      )}
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#802c2c' }} />
        </Box>
      )}
      <div className='relative box-border size-full w-3/6 justify-center overflow-auto'>
        {!fallout && !loading && (
          <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
            <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
              <h3 className='m-0 p-0'>{asignatura?.nombre}</h3>
              <div className='flex flex-col'>
                <p className='font-bold'>Descripcion:</p>
                <p>{asignatura?.descripcion}</p>
              </div>
            </div>
            <div className='flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center'>
              <div className='flex flex-col'>
                <p className='font-bold'>Creditos:</p>
                <p>{asignatura?.creditos + ' creditos'}</p>
              </div>
            </div>
            <div className='flex w-fit max-w-52 flex-col justify-center rounded-md'>
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
          </div>
        )}
        {fallout && !loading && (
          <div className='mx-auto flex flex-col items-center justify-center text-ivory'>
            <h1>Ha ocurrido un error</h1>
            <Button onClick={() => router.back()} styling='primary'>
              Regresar
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function EditAsignatura({
  setOpen,
  setAsignatura,
  id,
}: {
  setOpen: (open: boolean) => void;
  setAsignatura: (asignatura: Asignatura) => void;
  id: string;
}) {
  const router = useRouter();
  const [editForm, dispatch] = useFormState(editAsignatura, initialState);
  useEffect(() => {
    console.log(editForm.message);
    if (editForm.message.includes('200')) {
      const fetch = async () => {
        await getAsignatura(id).then((data) => {
          setAsignatura(data);
        });
      };
      fetch();
      setOpen(false);
    }
  }, [editForm.message, id, setAsignatura, setOpen]);
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
        <h2 className='text-center text-black'>Editar Asignaruea</h2>
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
            name='asignaturaId'
            label='Asignatura ID'
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
