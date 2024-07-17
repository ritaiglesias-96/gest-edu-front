import { ActaCurso } from '@/lib/definitions';
import { FC, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Download } from '@mui/icons-material';
import Button from '../Button/button';
import headerImage from '@/assets/images/logo-black-horizontal.png';
import { useRouter } from 'next/navigation';

interface Props {
  acta: ActaCurso;
}

const ActaCursoPDF: FC<Props> = ({ acta }) => {
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
      doc.addImage(base64Image!, 'PNG', 10, 10, 50, 15);
    };
    addHeader();
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100);
    doc.setFontSize(12);
    doc.text(
      `Fecha de Emisión: ${new Date().toLocaleDateString('es-ES')}`,
      130,
      20
    );

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
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
      doc.text('Calificación:', 160, y);
    });

    const pageHeight = doc.internal.pageSize.height;
    const footerY = pageHeight - 30;

    doc.setLineWidth(0.5);
    doc.line(20, footerY, 80, footerY);
    doc.text(`Firma Coordinador ${acta.asignaturaNombre}`, 20, footerY + 10);

    doc.line(130, footerY, 190, footerY);
    doc.text('Firma Docente', 130, footerY + 10);

    doc.save(`acta_curso_${acta.id}.pdf`);
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

export default ActaCursoPDF;
