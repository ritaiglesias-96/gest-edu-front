'use client';

import Button from '@/components/Button/button';
import ActaCursoPDF from '@/components/DocumentosPDF/ActaCursoPDF';
import { getActaCurso } from '@/lib/data/funcionario/actions';
import { ActaCurso, Estudiante } from '@/lib/definitions';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ActaCursoPage({
  params,
}: {
  params: { cursoId: string };
}) {
  const router = useRouter();
  const [actaCurso, setActaCurso] = useState<ActaCurso | null>(null);
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getActaCurso(params.cursoId);
        if (response) {
          const curso = response.curso;
          const estudiantes = response.estudiantes.map(
            (estudiante: Estudiante) => estudiante
          );
          const docente = response.docente;
          const asignaturaNombre = response.asignatura.nombre;
          const fechaInicio = new Date(curso.fechaInicio).toLocaleDateString(
            'es-ES'
          );
          const fechaFin = new Date(curso.fechaFin).toLocaleDateString('es-ES');

          const acta: ActaCurso = {
            id: curso.id,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            inscriptos: estudiantes,
            asignaturaNombre: asignaturaNombre,
            docente: docente,
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

  return <ActaCursoPDF acta={actaCurso!} />;
}
