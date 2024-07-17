import { FC, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Certificado } from '@/lib/definitions';
import Button from '../Button/button';
import Download from '@/assets/svg/download.svg';
import { convertirFecha } from '@/utils/utils';
import headerImage from '@/assets/images/logo-black-horizontal.png';

interface Props {
  certificado: Certificado;
}

const CertificadoPDF: FC<Props> = ({ certificado }) => {
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
    let y = 40;
    let pageNumber = 1;

    const addHeader = () => {
      doc.addImage(base64Image!, 'PNG', 10, 10, 50, 15);
    };

    const applyGeneralStyles = () => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
    };

    addHeader();
    applyGeneralStyles();
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100);
    doc.setFontSize(12);
    doc.text(`Fecha de Emisión: ${convertirFecha(certificado.fecha)}`, 130, 20);

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Certificado', 105, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Carrera: ${certificado.carrera}`, 20, 60);

    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${certificado.estudiante.nombre}`, 20, 80);
    doc.text(`Apellido: ${certificado.estudiante.apellido}`, 20, 90);
    doc.text(
      `CI: ${certificado.estudiante.ci.replace(/(\d+)(?=\d$)/g, '$1-')}`,
      20,
      100
    );
    doc.text(`Domicilio: ${certificado.estudiante.domicilio}`, 20, 110);
    doc.text(`Email: ${certificado.estudiante.email}`, 20, 120);
    doc.text(
      `Fecha de Nacimiento: ${convertirFecha(certificado.estudiante.fechaNac!)}`,
      20,
      130
    );
    doc.text(`Teléfono: ${certificado.estudiante.telefono}`, 20, 140);

    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100);
    doc.text(`Código de Validación: ${certificado.codigoValidacion}`, 20, 170);

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
