'use client';
import {
  getCarrera,
  getCarreraYAsignatura,
} from '@/lib/data/coordinador/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@/components/Button/button';
import { Box } from '@mui/material';
import { Asignatura, Carrera } from '@/lib/definitions';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import List from '@/components/List/list';

export default function PlanDeEstudioPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [carrera, setCarrera] = useState<Carrera>();
  const [fallout, setFallout] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const carrera = await getCarrera(params.id);
      if (carrera) {
        setCarrera(carrera);
        setLoading(false);
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
      {carrera?.existePlanEstudio ? (
        <div className='flex h-full w-screen flex-col justify-between text-center'>
          <h1>{carrera?.nombre}</h1>
          <h2>Plan de estudio:</h2>
          <PlanDeEstudioExistente id={params.id} />
        </div>
      ) : (
        <PlanDeEstudioRegistro id={params.id} />
      )}
    </>
  );
}

function PlanDeEstudioExistente({ id }: { id: string }) {
  const router = useRouter();
  const [columns, setColumns] = useState(0);
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [loading, setLoading] = useState(false);
  const [fallout, setFallout] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const asignaturas = await getCarreraYAsignatura(id);
      if (asignaturas) {
        setAsignaturas(asignaturas.asignaturas);
        setLoading(false);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
    for (const element of asignaturas) {
      if (element.semestrePlanEstudio > columns) {
        setColumns(element.semestrePlanEstudio);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className='w-full overflow-auto p-4'>
      <div className='relative mx-auto block w-min'>
        <div
          className={` grid w-full auto-cols-auto gap-3 rounded-lg bg-peach-yellow p-4`}
        >
          {asignaturas.map((asignatura, key) => (
            <div
              style={{
                gridRow: asignatura.semestrePlanEstudio,
                width: '100%',
                minWidth: '150px',
                height: '100%',
                flexBasis: '100px',
              }}
              key={key}
              className={`flex flex-col items-center justify-between break-words rounded-md bg-black p-2`}
            >
              <h6>Semestre: {asignatura.semestrePlanEstudio}</h6>
              <p>{asignatura.nombre}</p>
              <p>
                <strong>Creditos:</strong> {asignatura.creditos}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanDeEstudioRegistro({ id }: { id: string }) {
  const router = useRouter();
  const [columns, setColumns] = useState(0);
  const [asignaturas, setAsignaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fallout, setFallout] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const asignaturas = await getCarreraYAsignatura(id);
      if (asignaturas) {
        setAsignaturas(asignaturas.asignaturas);
        setLoading(false);
      } else {
        setFallout(true);
      }
    };
    fetch().finally(() => setLoading(false));
    for (const element of asignaturas) {
      const asignatura: Asignatura = element;
      if (asignatura.semestrePlanEstudio > columns) {
        setColumns(asignatura.semestrePlanEstudio);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <List
      isEditableAsignaturas={true}
      rows={asignaturas}
      rowsLoading={loading}
      columnsType={'none'}
    />
  );
}
