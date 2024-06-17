'use client';
import {
  getCarreraYAsignaturaPendientes,
  obtenerCarrerasInscriptoFetch,
} from '@/lib/data/estudiante/actions';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Asignatura, Carrera, CarreraAsignaturas } from '@/lib/definitions';

export default function ConsultarCarreras() {
  const [carrerasIncripto, setCarrerasIncripto] = useState<Carrera[]>([]);
  const [cargarPendientes, setCargarPendientes] = useState(false);
  const [carrerasAsignaturas, setCarrerasAsignaturas] = useState<
    CarreraAsignaturas[]
  >([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  useEffect(() => {
    obtenerCarrerasInscriptoFetch().then((data) => {
      setCarrerasIncripto(data.content);
      setCargarPendientes(true);
    });
  }, []);

  useEffect(() => {
    carrerasIncripto.map((carrera) => {
      getCarreraYAsignaturaPendientes(carrera.id.toString()).then((data) => {
        const carrera: Carrera = data?.carrera;
        const asignaturas: Asignatura[] = data?.asignaturas;
        const carreraAsignaturas: CarreraAsignaturas = { carrera, asignaturas };
        //TODO: Hacer if para que no agrege mas de una vez la carrera
        //prevCarreras.push(carreraAsignaturas);
        setCarrerasAsignaturas((prevCarreras: CarreraAsignaturas[]) => [
          ...prevCarreras,
          carreraAsignaturas,
        ]);
        console.log(carrerasAsignaturas);
      });
    });
  }, [cargarPendientes]);

  return (
    <div className='relative box-border size-full justify-center overflow-auto md:w-3/4'>
      <h1 className='text-center font-bold'>Carreras del estudiante</h1>
      <h5 className='text-center font-bold'>
        Asignaturas pendientes para finalizar una carrera.
      </h5>
      <div>
        {carrerasAsignaturas.length <= 0 && (
          <div className='my-8 box-content items-center rounded-md bg-ivory py-8 '>
            <div className='items-center rounded-md text-center text-black '>
              <h3 className='m-0 p-0'>
                No se encontraron inscripciones a carreras.
              </h3>
            </div>
          </div>
        )}
        {carrerasAsignaturas.map((carrera) => (
          <Accordion key={carrera.carrera.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              <h5>{carrera.carrera.nombre}</h5>
            </AccordionSummary>
            <AccordionDetails>
              {carrera.asignaturas.length > 0 ? (
                <TableContainer>
                  <Table
                    sx={{ minWidth: 700, width: '100%' }}
                    aria-label='customized table'
                  >
                    <TableBody>
                      {carrera.asignaturas.map((asignatura) => (
                        <StyledTableRow key={asignatura.nombre}>
                          <StyledTableCell component='th' scope='row'>
                            {asignatura.nombre}
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            Creditos: {asignatura.creditos}
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            Semestre: {asignatura.semestrePlanEstudio}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p>No tiene asignaturas pendientes</p>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
