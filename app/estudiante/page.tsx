'use strict';
import Contacto from '@/components/Contacto/page';

export default function EstudianteHome() {
  return (
    <section className=' text-ivory'>
      <h1>Estudiante</h1>
      <Contacto />
      <div id='token_div'></div>
      <div id='permission_div'></div>
      <div id='messages'></div>
    </section>
  );
}
