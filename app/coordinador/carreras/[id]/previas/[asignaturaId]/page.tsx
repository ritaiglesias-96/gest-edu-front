'use client';
import { useEffect, useState } from 'react';
import { getAsgignaturaYPrevituras, getAsignatura, getNoPrevituras, getPrevituras } from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import { Asignatura, Carrera } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';
import Close from '@/assets/svg/close.svg';

export default function PreviaturasPage({
    params,
}: {
    params: { id: string; asignaturaId: string };
}) {
    const router = useRouter();
    const [asignatura, setAsignatura] = useState<Asignatura>();
    const [fallout, setFallout] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState<any[]>([]);
    const [rowsLoading, setRowsLoading] = useState(true);
    const [noPrevias, setNoPrevias] = useState(false);

    useEffect(() => {
        getAsignatura(params.asignaturaId).then((asignatura) => {
            setAsignatura(asignatura);
        })
    }, []);

    useEffect(() => {
        getPrevituras(params.asignaturaId).then((previaturas) => {
            setLoading(false);
            setRowsLoading(false);
            setRows(previaturas);
        })
    }, []);

    return (
        <>
            {noPrevias && (
                <SeleccionarPreviatura setOpen={setNoPrevias} asignaturaId={params.id} />
            )}
            {loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
                    <CircularProgress sx={{ color: '#802c2c' }} />
                </Box>
            )}
            <div className='relative box-border size-full w-3/6 justify-center overflow-auto'>
                {!fallout && !loading && (
                    <>
                        <h1 className='text-center font-bold'>Previaturas</h1>
                        <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
                            <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md'>
                                <h3 className='m-0 p-0'>{asignatura?.nombre}</h3>
                                <div className='flex flex-col'>
                                    <p className='font-bold'>Descripcion:</p>
                                    <p>{asignatura?.descripcion}</p>
                                </div>
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
                                }}>
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


function SeleccionarPreviatura({ setOpen, asignaturaId }: { setOpen: (open: boolean) => void; asignaturaId: string; }) {
    const [rowsLoading, setRowsLoading] = useState(true);
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        getNoPrevituras(asignaturaId).then((noPrevias) => {
            for (let i = 0; i < noPrevias.length; i++) {
                noPrevias[i].idAsignatura = asignaturaId;
            }

            setRows(noPrevias);
            setRowsLoading(false);
            setRows(noPrevias);
        })
    }, []);

    return (
        <>
            <div
                className='absolute z-10 size-full backdrop-blur-sm'
                onClick={() => setOpen(false)}
            />
            <div className='absolute z-20 mx-auto my-4 flex size-fit flex-col rounded-xl bg-ivory p-6 shadow-lg shadow-garnet  md:p-8 w-full md:w-2/3'>
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