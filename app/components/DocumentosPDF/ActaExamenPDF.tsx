import { ActaExamen } from '@/lib/definitions';
import { FC, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Download } from '@mui/icons-material';
import Button from '../Button/button';
import headerImage from '@/assets/images/logo-black-horizontal.png';
import { useRouter } from 'next/navigation';

interface Props {
  acta: ActaExamen;
}

const ActaExamenPDF: FC<Props> = ({ acta }) => {
  const router = useRouter();
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const convertImageToBase64 = (url: string) => {
      return new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          if (xhr.status === 200) {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(xhr.response);
          } else {
            reject(`Error al obtener la imagen: ${xhr.statusText}`);
          }
        };
        xhr.onerror = () => {
          reject('Error de red al obtener la imagen.');
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      });
    };
    if (typeof headerImage === 'string') {
      convertImageToBase64(headerImage)
        .then((base64) => {
          setBase64Image(base64);
        })
        .catch((error) => {
          setError(`Error al cargar la imagen: ${error}`);
        });
    } else if (headerImage instanceof Object && 'src' in headerImage) {
      convertImageToBase64(headerImage.src)
        .then((base64) => {
          setBase64Image(base64);
        })
        .catch((error) => {
          setError(`Error al cargar la imagen: ${error}`);
        });
    } else {
      setError('No se puede determinar la URL de la imagen.');
    }
  }, []);

  const generatePDF = () => {
    if (!base64Image) {
      console.error('La imagen base64 no está disponible.');
      return;
    }

    const doc = new jsPDF();
    const addHeader = () => {
      doc.addImage(base64Image!, 'PNG', 10, 10, 50, 15); // Ajusta la imagen como encabezado
    };
    addHeader();
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
    doc.text('Acta de Examen', 105, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Asignatura: ${acta.asignaturaNombre}`, 20, 60);
    doc.text(`Fecha del Examen: ${acta.fecha}`, 20, 70);

    doc.setFont('helvetica', 'normal');
    doc.text('Docentes:', 20, 90);
    acta.docentes.forEach((docente, index) => {
      doc.text(
        `${index + 1}. ${docente.nombre} ${docente.apellido}`,
        20,
        100 + index * 10
      );
    });

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
    doc.save(`acta_examen_${acta.id}.pdf`);
  };

  return (
    <div className='mt-8 flex justify-center'>
      <Button
        styling='primary'
        onClick={() => {
          generatePDF();
          router.back();
        }}
      >
        <div className='flex items-center'>
          <Download className='lg:w-7' />
          <span>Descargar</span>
        </div>
      </Button>
    </div>
  );
};

export default ActaExamenPDF;
