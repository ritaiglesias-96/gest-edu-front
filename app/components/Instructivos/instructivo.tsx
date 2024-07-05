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
import DownloadIcon from '@/assets/svg/download.svg';
import { Download } from '@mui/icons-material';

export default function InstructivosPage() {
  const [expanded, setExpanded] = React.useState<string | false>('');

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(() => ({
    border: `1px solid rgba(0, 0, 0, .125)`,
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
  ))(() => ({
    backgroundColor: 'rgba(255, 255, 255, .05)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: 1,
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: 2,
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className='relative box-border flex size-full flex-col items-center md:w-2/3'>
      <h1>Instructivos</h1>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography variant='h5' className='px-4'>
            Consultar
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='px-4'>
          <div className='flex'>
            <Grading className='mr-5 h-6 self-center sm:w-auto' />
            <h6>Asignaturas pendientes</h6>
          </div>
          <p>
            Por cada carrera que el estudiante se encuentra inscripto, puede ver
            las asignaturas que tiene pendientes para finalizar la carrera.
          </p>
          <hr />
          <div className='flex'>
            <Grading className='mr-5 h-6 self-center sm:w-auto' />
            <h6>Horarios</h6>
          </div>
          <p>
            Permite consultar los horarios de la semana, de los cursos que se
            encuentra inscripto. Se muestra una tabla con los cursos, y haciendo
            encuentra inscripto. Se muestra una tabla con los cursos, y haciendo
            click en el boton detalles, puede ver los horarios desglosados por
            día de la semana.
          </p>
          <hr />
          <div className='flex'>
            <Grading className='mr-5 h-6 self-center sm:w-auto' />
            <h6>Trámites</h6>
          </div>
          <p>
            Permite ver el estado de los trámites, los cuales pueden ser de
            inscripción a carrera o solicitud de título. El estado puede ser
            aceptado o rechazado, y para el caso de solicitud de título cuando
            inscripción a carrera o solicitud de título. El estado puede ser
            aceptado o rechazado, y para el caso de solicitud de título cuando
            es rechazado, se muestra un breve mensaje con el motivo por el cual
            fue rechazado. También muestra la fecha en que fue realizada la
            solicitud, y la fecha en que fue aceptada o rechazada.           
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
          <Typography variant='h5' className='px-4'>
            Solicitudes
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='px-4'>
          <div className='flex'>
            <School className='mr-5 h-6 self-center sm:w-auto' />
            <h6>Solicitud de título</h6>
          </div>
          <p>
            En la sección de solicitudes, el estudiante puede ver las
            carreras en las que se encuentra inscripto y aún no han finalizado. 
            Haciendo click en el botón solicitar título, se envía una solicitud, 
            la cual debe ser aprobada por el coordinador de la carrera. En caso de 
            ser rechazada, se muestra un mensaje indicando el motivo, por ejemplo, 
            no tiene los créditos suficientes o no tiene aprobadas todas las 
            asignaturas. Tanto cuando es aprobada como rechazada, el estudiante 
            recibe una triple notificación, por correo electrónico, notificación web 
            y mobile.
          </p>
          <hr />
          <div className='flex'>
            <Grading className='mr-5 h-6 self-center sm:w-auto' />
            <h6>Solicitud de certificado</h6>
          </div>
          <p>
            En cuanto a la solicitud de certificado, se puede descargar en
            formato PDF, el cual contiene un código para que pueda ser validado
            por la persona u organización que recibe el certificado. Ingresando
            dicho código en la página como invitado, puede ver los datos del
            certificado y comprobar que corresponde al estudiante.
          </p>
          <div className='flex'>
            <DownloadIcon className='mr-5 h-6 self-center sm:w-auto' />
            <h6>Solicitud de certificado</h6>
          </div>
          <hr />
            En la sección de escolaridad, se puede descargar en 
            formato PDF, la escolaridad del estudiante. La misma
            contará con información acerca del progreso del 
            estudiante en la carrera pertinente.        
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
          <Typography variant='h5' className='px-4'>
            Inscripciones
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='px-4'>
          En la sección inscripciones, el estudiante puede inscribirse tanto a
          carreras, como a cursos y exámenes. Para ello, se divide en dos secciones
          más.
          <div className='flex'>
            <Edit className='mr-5 h-6 self-center sm:w-auto' />
            <h6>Mis carreras</h6>
          </div>
          <p>
            Muestra las carreras en las que se encuentra inscripto, y dentro de 
            este listado, es posible anotarse tanto a cursos como a exámenes. Al 
            hacer clic en cursos, se redirige a otra página, donde puede seleccionar 
            el curso que desea filtrando por asignatura. También es posible darse de 
            baja si ya se encuentra inscripto en un curso que aún no ha comenzado. 
            En el caso de exámenes, también se redirige a otra página, donde se 
            muestran los exámenes disponibles para inscribirse. Luego de acceder 
            al examen, se muestran dos botones: uno para inscribirse y otro para 
            darse de baja. Al hacer click en alguno de estos botones, se solicita 
            confirmación tanto para inscribirse como para darse de baja.
          </p>
          <hr />
          <div className='flex'>
            <Edit className='mr-5 h-6 self-center sm:w-auto' />
            <h6>Otras carreras</h6>
          </div>
          <p>
            Son las carreras en las que el estudiante no se encuentra inscripto,
            donde se muestra la lista de carreras disponibles y en dicha lista
            se encuentra un botón, donde al hacer click se muestra un mensaje de
            confirmación para inscribirse a la carrera. Luego de realizada la
            inscripción, esta debe ser aprobada por un coordiador, y
            finalmente el estudiante recibe una triple notificacion por correo
            electrónico, notificacion web y mobile, tanto en caso que sea
            aprobada o rechazada.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
          <Typography variant='h5' className='px-4'>
            Perfil
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='px-4'>
          <p>
            Sección donde puede visualizar los datos de su perfil, nombre,
            apellido, documento, correo electrónico, fecha de nacimiento,
            teléfono y domicilio. También puede agregar una foto de perfil. Los
            teléfono y domicilio. También puede agregar una foto de perfil. Los
            únicos datos que está permitido modificar son la foto, domicilio y
            el teléfono.
          </p>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
