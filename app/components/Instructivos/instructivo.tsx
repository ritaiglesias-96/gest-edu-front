'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Grading from '@/assets/svg/grading.svg';
import Edit from '@/assets/svg/edit.svg';
import School from '@/assets/svg/school.svg';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function InstructivosPage() {
  const [expanded, setExpanded] = React.useState<string | false>('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>Consultar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='flex'>
              <Grading className='h-6 self-center sm:w-auto mr-5' />
              <h6>Asignaturas pendientes</h6>
            </div>
            Por cada carrera que el estudiante se encuentra inscripto, puede ver
            las asignaturas que tiene pendientes para finalizar la carrera.
            <div className='flex'>
              <Grading className='h-6 self-center sm:w-auto mr-5' />
              <h6>Horarios</h6>
            </div>
            Permite consultar los horarios de la semana, de los cursos que se
            encuentra inscripto. Se muestra una tabla con las cursos, y haciendo
            click en el boton detalles, puede ver los horarios desglosados por
            dia de la semana.
            <div className='flex'>
              <Grading className='h-6 self-center sm:w-auto mr-5' />
              <h6>Tramites</h6>
            </div>
            Permite ver el estado de los trámites, los cuales pueden ser de
            inscripción a carrear o solicitud de título. El estado puede ser
            aceptado o rechazado, y para el caso de solicitud de titulo cuando
            es rechazado, se muestra un breve mensaje con el motivo por el cual
            fue rechazado. Tambien muestra la fecha en que fue realizado la
            solicitud, y la fecha que fue aceptodo o rechazado.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
          <Typography>Solicitudes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='flex'>
              <School className='h-6 self-center sm:w-auto mr-5' />
              <h6>Solicitud de título</h6>
            </div>
            <p>
              En la seccion del solicitudes, el estudiante puede ver las
              carreras que se encuentra inscripto y aun no han finalizado.
              Haciendo clic en el botón solicitar título, se envía una
              solicitud, la cual debe ser aprobada por el coordinador de la
              carrera. En caso de ser rechazada, se muestra un mensaje indicando
              el motivo, por ejemplo, no tiene los créditos suficientes o no
              tiene aprobadas todas las asignaturas. Tanto cuando es aprobada
              como rechazada, el estudiante recibe una triple notificación, por
              correo electrónico, notificaciónweb y mobile.
            </p>
            <hr />
            <div className='flex'>
              <Grading className='h-6 self-center sm:w-auto mr-5' />
              <h6>Solicitud de certificado</h6>
            </div>
            <p>
              En cuanto a la solicitud de certificado, se puede descargar en
              formato PDF, el cual contiene un código para que pueda ser
              validado por la persona u organización que recibe el certificado.
              Ingresando dicho código en la página como invitado, puede ver los
              datos del certificado y comprobar que corresponde al estudiante.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
          <Typography>Inscripciones</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            En la sección inscripciones, el estudiante puede inscribirse tanto a
            carrras, como cursos y exámenes. Para ello, se divide en dos
            secciones mas.
            <div className='flex'>
              <Edit className='h-6 self-center sm:w-auto mr-5' />
              <h6>Mis carreras</h6>
            </div>
            <p>
              Muestra las carreras que se encuentra inscripto, y dentro de éste
              listado, es posible anotarse tanto a cursos como exámenes. Al
              hacer clic en cursos, es redirigido a otra página, donde puede
              seleccionar el curso que desea filtrando por asignatura. Tambien
              es posible darse de baja si ya se encuentra inscripto en un curso
              que aun no ha comenzado. En el caso de exámenes, tambien es
              redirigido a otra página, donde se muestra los exámenes
              disponibles para inscribirse. Luego de acceder al exámen se
              muestran dos botones, para inscribirse o darse de baja. Al hacer
              click en alguno de éstos botones, se solicita confirmación tanto
              para inscribirse como para darse de baja.
            </p>
            <div className='flex'>
              <Edit className='h-6 self-center sm:w-auto mr-5' />
              <h6>Otras carreras</h6>
            </div>
            <p>
              Son las carreras que el estudiante no se encuentra inscripto,
              donde se muestra la lista de carreras disponibles y en dicha lista
              se encuentra un boton, donde al hacer click se muestra mensaje de
              confirmación para inscribirse a la carrera. Luego de realizada la
              inscripción, esta debe ser aprobada por un coordiador, y
              finalmente el estudiante recibe una triple notificacion por correo
              electrónico, notificacion web y mobile, tanto en caso que sea
              aprobada o rechazada.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
          <Typography>Perfil</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sección donde puede visualizar los datos de su perfil, nombre,
            apellido, documento, correo electrónico, fecha de nacimiento,
            teléfono y domicilio. Tambien puede agregar una foto de perfil. Los
            únicos datos que está permitido modificar son la foto, domicilio y
            el teléfono.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
