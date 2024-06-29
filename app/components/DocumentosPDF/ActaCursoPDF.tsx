import { ActaCurso } from '@/lib/definitions';
import { FC } from 'react';
import jsPDF from 'jspdf';
import { Download } from '@mui/icons-material';
import Button from '../Button/button';

interface Props {
  acta: ActaCurso;
}

const ActaCursoPDF: FC<Props> = ({ acta }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Fecha de emisión del PDF
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100); // Color gris
    doc.setFontSize(12);
    doc.text(
      `Fecha de Emisión: ${new Date().toLocaleDateString('es-ES')}`,
      130,
      20
    );

    // Configurar estilos y contenido del PDF
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); // Color negro
    doc.text('Acta de fin de curso', 105, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Asignatura: ${acta.asignaturaNombre}`, 20, 60);
    doc.text(`Fecha de inicio de curso: `, 20, 70);
    doc.text(`${acta.fechaInicio}`, 75, 70);
    doc.text(`Fecha de fin de curso: `, 20, 77);
    doc.text(`${acta.fechaFin}`, 75, 77);

    doc.setFont('helvetica', 'normal');
    doc.text('Docente:', 20, 90);
    doc.text(`${acta.docente.nombre} ${acta.docente.apellido}`, 20, 97);

    doc.text('Estudiantes Inscriptos:', 20, 130);
    acta.inscriptos.forEach((estudiante, index) => {
      const y = 140 + index * 10;
      doc.text(
        `${index + 1}. ${estudiante.nombre} ${estudiante.apellido} - CI: ${estudiante.ci}`,
        20,
        y
      );
      doc.text('Calificación:', 160, y); // Espacio para calificación
    });

    // Añadir las firmas al final de la última página
    const pageHeight = doc.internal.pageSize.height;
    const footerY = pageHeight - 30; // Espacio desde el final de la página

    // Línea y texto para firma del coordinador
    doc.setLineWidth(0.5);
    doc.line(20, footerY, 80, footerY);
    doc.text(`Firma Coordinador ${acta.asignaturaNombre}`, 20, footerY + 10);

    // Línea y texto para firma del docente
    doc.line(130, footerY, 190, footerY);
    doc.text('Firma Docente', 130, footerY + 10);

    // Descargar el PDF
    doc.save(`acta_curso_${acta.id}.pdf`);
  };

  return (
    <div className='mt-8 flex justify-center'>
      <Button styling='primary' onClick={generatePDF}>
        <div className='flex items-center'>
          <Download className='lg:w-7' />
          <span>Descargar</span>
        </div>
      </Button>
    </div>
  );
};

export default ActaCursoPDF;
