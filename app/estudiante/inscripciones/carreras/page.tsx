'use client';
import Modal from '@/components/Modal/modal';

export default function CarrerasHome() {
  const carrera = {
    id: 0,
    nombre: 'Ingenieria de Produccion',
    descripcion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel odio ultrices, eleifend massa eu, ullamcorper arcu. Praesent orci quam, hendrerit at urna eu, lobortis faucibus arcu. Nulla a augue vulputate, faucibus quam et, iaculis dui. Donec augue quam, semper et venenatis id, pellentesque rhoncus sem. Proin pretium eget nisl vitae feugiat.',
    duracionAnios: 4,
    creditos: 420,
    existePlanEstudio: true,
  };

  return (
    <section className="text-ivory">
      <Modal carrera={carrera} className="inset-1/2" />
    </section>
  );
}
