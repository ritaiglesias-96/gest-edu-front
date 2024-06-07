'use client';
import { useEffect, useState } from 'react';
import {
  getAsignatura,
  getNoPrevituras,
  getPrevituras,
  editAsignatura,
} from '@/lib/data/coordinador/actions';
import List from '@/components/List/list';
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
  const [rows, setRows] = useState<any[]>([]);
  const [rowsLoading, setRowsLoading] = useState(true);
  const [noPrevias, setNoPrevias] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const existeAsignatura = await getAsignatura(params.asignaturaId);
      if (existeAsignatura) {
        setAsignatura(existeAsignatura);
      } else {
        setFallout(true);
      }
      const previas = await getPrevituras(params.asignaturaId);
      if (previas) {
        setRows(previas);
      }
      setRowsLoading(false);
    };
    fetch().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {noPrevias && (
        <SeleccionarPreviatura
          setOpen={setNoPrevias}
          asignaturaId={params.asignaturaId}
        />
      )}
      <div className='relative box-border size-full justify-center overflow-auto px-3 md:w-5/6'>
        {!fallout && !loading && (
          <>
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
            <div>
              <List
                rows={rows}
                rowsLoading={rowsLoading}
                columnsType='previtaturas'
              />
            </div>
            <div className='my-2 box-content flex flex-col items-center justify-center rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
              <Button
                className='w-full self-center'
                onClick={() => {
                  setNoPrevias(!noPrevias);
                }}
              >
                Agregar previa
              </Button>
            </div>
          </>
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

function SeleccionarPreviatura({
  setOpen,
  asignaturaId,
}: {
  setOpen: (open: boolean) => void;
  asignaturaId: string;
}) {
  const [rowsLoading, setRowsLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getNoPrevituras(asignaturaId);
      if (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].idAsignatura = asignaturaId;
        }
        setRows(data);
        setRowsLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className='absolute z-10 size-full backdrop-blur-sm'
        onClick={() => setOpen(false)}
      />
      <div className='absolute z-20 mx-auto my-6 flex h-fit w-10/12 flex-col rounded-xl bg-ivory p-6 shadow-lg shadow-garnet  md:w-2/3 md:p-8'>
        <button
          className='right-0 block w-fit cursor-pointer self-end'
          onClick={() => setOpen(false)}
        >
          <Close className='self-end fill-garnet hover:fill-bittersweet sm:size-10' />
        </button>
        <h2 className='text-center text-black'>Seleccionar previatura</h2>
        <List
          rows={rows}
          rowsLoading={rowsLoading}
          columnsType='noPrevitaturas'
        />
      </div>
    </>
  );
}
