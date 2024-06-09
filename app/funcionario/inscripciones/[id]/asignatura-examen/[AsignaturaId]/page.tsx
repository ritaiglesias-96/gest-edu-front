'use client';

import List from "@/components/List/list";
import { getExamenesAsignatura } from "@/lib/data/funcionario/actions";
import { Examen } from "@/lib/definitions";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function examenActivoPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [rows, setRows] = useState<any[]>([]);
    const [rowsLoading, setRowsLoading] = useState(true);
    const [fallout, setFallout] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const existeExamen = await getExamenesAsignatura(params.id);
            if (existeExamen) {
                const examenes = existeExamen.content.map((examen:Examen) => ({
                    id: examen.id,
                    fecha: new Date(examen.fecha).toLocaleDateString('es-ES'),
                    asignaturaNombre: examen.asignatura.nombre,
            }));
                setRows(examenes);
                setRowsLoading(false);
            } else {
                setFallout(true);
            }
        };
        fetch().finally(() => setLoading(false));
    }, [params.id]);



    return (
        <>
            {loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
                    <CircularProgress sx={{ color: '#802c2c' }} />
                </Box>
            )}
            {!loading && (
                <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
                    <h1 className='text-center font-bold'>Examenes</h1>
                    <List
                        rows={rows}
                        rowsLoading={rowsLoading}
                        columnsType='examenFuncionario'
                    />
                </div>
            )}
        </>
    );
}