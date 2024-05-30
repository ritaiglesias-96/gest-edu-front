'use client';
import { useEffect, useState } from 'react';
import { getAsgignaturaYPrevituras, getAsignatura, getPrevituras } from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Button from '@/components/Button/button';
import { Asignatura, Carrera } from '@/lib/definitions';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';

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
    const [carrera, setCarrera] = useState<Carrera>();
    console.log("as",params.asignaturaId);
    
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
            {loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
                    <CircularProgress sx={{ color: '#802c2c' }} />
                </Box>
            )}
            <div className='relative box-border size-full w-3/6 justify-center overflow-auto'>
                {!fallout && !loading && (
                    <>
                        <div className='my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline'>
                            <div className='flex flex-col rounded-md text-center font-bold text-black md:text-left '>
                                <h3 className='m-0 p-0'>{asignatura?.nombre}</h3>
                            </div>
                        </div>
                        <div>
                            <List
                                rows={rows}
                                rowsLoading={rowsLoading}
                                columnsType='previtaturas'
                            />
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


