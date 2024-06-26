'use client';

import ActaExamenPDF from '@/components/DocumentosPDF/ActaExamenPDF';
import { getActaCurso } from '@/lib/data/funcionario/actions';
import { ActaExamen } from '@/lib/definitions';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ActaCursoPage({
  params,
}: {
  params: { cursoId: string };
}) {
  const [actaCurso, setActaCurso] = useState<ActaExamen | null>(null);
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getActaCurso(params.cursoId);
        console.log('🚀 ~ fetch ~ response:', response);
        if (response) {
          const curso = response.curso;
          const estudiantes = response.inscripciones.map(
            (inscripcion: any) => inscripcion.estudiante
          );
          console.log('🚀 ~ fetch ~ estudiantes:', estudiantes);
          const docentes = curso.docentes;
          const asignaturaNombre = curso.asignatura.nombre;
          const fecha = new Date(curso.fecha).toLocaleDateString('es-ES');

          const acta: ActaExamen = {
            id: curso.id,
            fecha: fecha,
            inscriptos: estudiantes,
            asignaturaNombre: asignaturaNombre,
            docentes: docentes,
          };
          setActaCurso(acta);
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
  }, [params.cursoId]);

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#802c2c' }} />
        </Box>
      )}
      {!loading && <ActaExamenPDF acta={actaCurso!} />}
    </>
  );
}
