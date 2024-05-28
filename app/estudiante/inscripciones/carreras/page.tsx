'use client';
import Modal from '@/components/Modal/modal';
import { useState } from 'react';

export default function CarrerasHome() {
  const [carrera, setcarrera] = useState({
    id: 1,
    nombre: 'Tecnologo informatico InitData',
    descripcion:
      'Carrera de tecnologo informatico donde se enseña a programar en java, c++, c# y python',
    duracionAnios: 1.5,
    creditos: 9,
    existePlanEstudio: true,
  });

  return (
    <section className="text-ivory">
      <Modal carrera={carrera} className="inset-1/2" />
    </section>
  );
}
