import { FC } from 'react';
import jsPDF from 'jspdf';
import { Certificado } from '@/lib/definitions'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import Button from '../Button/button';
import Download from '@/assets/svg/download.svg';
import { convertirFecha } from '@/utils/utils';

interface Props {
  certificado: Certificado;
}

const CertificadoPDF: FC<Props> = ({ certificado }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100); // Color gris
    doc.setFontSize(12);
    doc.text(`Fecha de Emisión: ${convertirFecha(certificado.fecha)}`, 130, 20);

    // Configurar estilos y contenido del PDF

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); //color negro
    doc.text('Certificado', 105, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Carrera: ${certificado.carrera}`, 20, 60);

    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${certificado.estudiante.nombre}`, 20, 80);
    doc.text(`Apellido: ${certificado.estudiante.apellido}`, 20, 90);
    doc.text(`CI: ${certificado.estudiante.ci.replace(/(\d+)(?=\d$)/g,'$1-')}`, 20, 100);
    doc.text(`Domicilio: ${certificado.estudiante.domicilio}`, 20, 110);
    doc.text(`Email: ${certificado.estudiante.email}`, 20, 120);
    doc.text(`Fecha de Nacimiento: ${convertirFecha(certificado.estudiante.fechaNac!)}`, 20, 130);
    doc.text(`Teléfono: ${certificado.estudiante.telefono}`, 20, 140);    

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100); // Color gris
    doc.text(`Código de Validación: ${certificado.codigoValidacion}`, 20, 170);

    // Descargar el PDF
    doc.save(
      `certificado_${certificado.estudiante.ci}_${convertirFecha(certificado.fecha)}.pdf`
    );
  };

  return (
    <div>
      <Button styling='primary' onClick={generatePDF}>
        <div className='flex items-center'>
          <Download className='lg:w-7' />
          <span>Descargar</span>
        </div>
      </Button>
    </div>
  );
};

export default CertificadoPDF;
