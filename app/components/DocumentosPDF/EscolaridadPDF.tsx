import { FC, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Escolaridad } from '@/lib/definitions'; // Ajusta la ruta según tu estructura de archivos
import Button from '../Button/button';
import Download from '@/assets/svg/download.svg';
import { convertirFecha } from '@/utils/utils';
import headerImage from '../../assets/images/logo-black-horizontal.png'; // Ajusta la ruta según tu estructura de archivos

interface Props {
  escolaridad: Escolaridad;
}

const CertificadoPDF: FC<Props> = ({ escolaridad }) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para convertir la imagen a base64
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

    // Manejo de la imagen según cómo se importe
    if (typeof headerImage === 'string') {
      // Si headerImage es una cadena (URL directa o importación dinámica)
      convertImageToBase64(headerImage)
        .then((base64) => {
          setBase64Image(base64);
        })
        .catch((error) => {
          setError(`Error al cargar la imagen: ${error}`);
        });
    } else if (headerImage instanceof Object && 'src' in headerImage) {
      // Si headerImage es un objeto de imagen (StaticImageData)
      convertImageToBase64(headerImage.src)
        .then((base64) => {
          setBase64Image(base64);
        })
        .catch((error) => {
          setError(`Error al cargar la imagen: ${error}`);
        });
    } else {
      // Manejar otros casos o lanzar un error si no se puede determinar la URL de la imagen
      setError('No se puede determinar la URL de la imagen.');
    }
  }, []);

  const generatePDF = () => {
    if (!base64Image) {
      console.error('La imagen base64 no está disponible.');
      return;
    }

    const doc = new jsPDF();
    let y = 40; // Coordenada y inicial, ajustada para dejar espacio debajo del encabezado
    let pageNumber = 1;
    const pageHeight = doc.internal.pageSize.height;
    let totalPages = 1;

    const addPageIfNecessary = (heightToAdd: number) => {
      if (y + heightToAdd > pageHeight - 10) { // Deja espacio para el pie de página
        doc.addPage();
        totalPages++;
        y = 40; // Reinicia la posición vertical en la nueva página, ajustada para dejar espacio debajo del encabezado
        addHeader(); // Vuelve a agregar el encabezado en la nueva página
        footer(doc, totalPages);
      }
    };

    // Footer con número de página
    const footer = (pdf: jsPDF, pageNum: number) => {
      pdf.setFontSize(10);
      pdf.text(`Página ${pageNum}`, 150, pageHeight - 10);
    };

    // Agregar encabezado con imagen en todas las páginas
    const addHeader = () => {
      doc.addImage(base64Image!, 'PNG', 10, 10, 50, 15); // Ajusta la imagen como encabezado
    };

    // Configurar encabezado y primera página
    addHeader();
    footer(doc, pageNumber);

    // Información general
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12); // Tamaño de fuente para la fecha de emisión
    doc.setTextColor(100); // Color gris
    doc.text(`Fecha de Emisión: ${convertirFecha(new Date().toISOString())}`, 130, y);
    y += 10;

    doc.setFontSize(20); // Tamaño de fuente para el título del certificado
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0); // Color negro
    doc.text('Certificado de Escolaridad', 105, y, { align: 'center' });
    y += 20;

    doc.setFontSize(12); // Tamaño de fuente para los detalles de la carrera y estudiante
    doc.setFont('helvetica', 'bold');
    doc.text(`Carrera: ${escolaridad.carrera.nombre}`, 20, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${escolaridad.estudiante.nombre}`, 20, y);
    y += 10;
    doc.text(`Apellido: ${escolaridad.estudiante.apellido}`, 20, y);
    y += 10;
    doc.text(`CI: ${escolaridad.estudiante.ci.replace(/(\d+)(?=\d$)/g, '$1-')}`, 20, y);
    y += 10;
    doc.text(`Domicilio: ${escolaridad.estudiante.domicilio}`, 20, y);
    y += 10;
    doc.text(`Email: ${escolaridad.estudiante.email}`, 20, y);
    y += 10;
    doc.text(`Fecha de Nacimiento: ${convertirFecha(escolaridad.estudiante.fechaNac!)}`, 20, y);
    y += 10;
    doc.text(`Teléfono: ${escolaridad.estudiante.telefono}`, 20, y);
    y += 20;

    // Detalle de semestres
    doc.setFontSize(12); // Tamaño de fuente para los detalles de los semestres y asignaturas
    doc.setFont('helvetica', 'bold');
    doc.text(`Créditos Aprobados: ${escolaridad.creditosAprobados}`, 20, y);
    y += 10;

    escolaridad.semestres.forEach((semestre) => {
      addPageIfNecessary(60); // Espacio para cada semestre aproximadamente

      doc.setFont('helvetica', 'bold');
      doc.text(`Año: ${semestre.anio} - Semestre: ${semestre.semestre}`, 20, y);
      y += 10;

      semestre.asignaturas.forEach((asignatura) => {
        addPageIfNecessary(30); // Espacio para cada asignatura aproximadamente

        doc.setFont('helvetica', 'normal');
        doc.text(`Asignatura: ${asignatura.nombre} (Créditos: ${asignatura.creditos})`, 20, y);
        y += 10;

        asignatura.cursos.forEach((curso) => {
          doc.text(`Curso Finalizado: ${convertirFecha(curso.fechaFinCurso)} - Calificación: ${curso.calificacion}`, 30, y);
          y += 5;
        });

        asignatura.examenes.forEach((examen) => {
          doc.text(`Examen: ${convertirFecha(examen.fechaExamen)} - Calificación: ${examen.calificacion}`, 30, y);
          y += 5;
        });

        y += 5; // Añadir un espacio adicional después de cada asignatura
      });

      y += 10; // Añadir un espacio adicional después de cada semestre
    });

    doc.setFontSize(12); // Tamaño de fuente para el código de validación
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100); // Color gris
    doc.text(`Código de Validación: ${escolaridad.estudiante.id}`, 20, y);

    // Descargar el PDF
    doc.save(
      `escolaridad_${escolaridad.estudiante.apellido}_${escolaridad.estudiante.nombre}_${convertirFecha(new Date().toISOString())}.pdf`
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
