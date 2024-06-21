'use client';

import ActaExamenPDF from "@/components/DocumentosPDF/ActaExamenPDF";
import { getInscriptosAExamen } from "@/lib/data/funcionario/actions";
import { ActaExamen } from "@/lib/definitions";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";


export default function ActaExamenPage({params}: {params: {examenId: string}}) {

    const [actaExamen, setActaExamen] = useState<ActaExamen | null>(null);
    const [fallout, setFallout] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetch = async () => {
            try {
            const response = await getInscriptosAExamen("2"); //TODO HARDCODEADO PQ NO ME DEVUELVE NADA SI USO params.examenId pq no hay datos
                if (response && response.length > 0) {
                    const examen = response[0].examen;
                    const estudiantes = response.map((inscripcion: any) => inscripcion.estudiante);
                    const docentes = examen.docentes;
                    const asignaturaNombre = examen.asignatura.nombre;
                    const fecha = new Date(examen.fecha).toLocaleDateString('es-ES');

                    const acta: ActaExamen = {
                        id: examen.id,
                        fecha: fecha,
                        inscriptos: estudiantes,
                        asignaturaNombre: asignaturaNombre,
                        docentes: docentes,
                    };
                    setActaExamen(acta);
                } else {
                    setFallout(true);
                }
            } catch (error) {
                console.error('Error fetching examenes:', error);
                setFallout(true);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [params.examenId]);


    return (
        <>
          {loading && (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
              <CircularProgress sx={{ color: '#802c2c' }} />
            </Box>
          )}
          {!loading && (
           <ActaExamenPDF acta={actaExamen!}
           />
          )}
        </>
      );

}
