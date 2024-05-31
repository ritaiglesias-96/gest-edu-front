'use client'
import List from "@/components/List/list";
import { obtenerAsignaturasPorCarreran, obtenerInscripcionesVigentesExamen } from "@/lib/data/estudiante/actions";
import { useState, useEffect } from "react";

export default function ExamenesEstudiante() {
    const [rows, setRows] = useState([]);
    const [rowsLoading, setRowsLoading] = useState(true);
    const [carreraId, setCarrera] = useState('');

    useEffect(() => {
        let id = sessionStorage.getItem('carrera_id');
        if (id) {
            console.log('id', id);
            setCarrera(id);
        }
    }, []);

    useEffect(() => {
        if (carreraId) {
            obtenerAsignaturasPorCarreran(carreraId).then((data) => {
                console.log(data);
                setRows(data.content ? data.content : []);
                setRowsLoading(false);
            });
        }
    }, [carreraId]);

    return (
        <div className='relative box-border size-full justify-center overflow-auto md:w-2/3'>
            <h1 className='text-center font-bold'>Inscripciones a examen</h1>
            <h6 className='text-center font-bold'>Seleccione una asignatura</h6>
            <div className='h-fit w-full p-4'>
                <List rows={rows} rowsLoading={rowsLoading} columnsType='asignatura-examenes' />
            </div>
        </div>
    )
}