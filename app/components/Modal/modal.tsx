'use client';
import Button from '@/components/Button/button';
import FormContainer from '../FormContainer/formContainer';

export default function Modal({ carrera }: any) {
  return (
    <FormContainer>
      <div className="outline-none max-w-max max-h-max h-full w-full flex flex-col items-center justify-center rounded-2xl bg-ivory text-black text-center space-y-2">
        <h4>{carrera.nombre}</h4>
        <p className="max-w-xl">{carrera.descripcion}</p>
        <p className="flex">
          Cantidad de creditos:&nbsp;
          <span className="font-bold"> {carrera.creditos}</span>
        </p>
        <p className="flex">
          Duracion de la carrera (años):&nbsp;
          <span className="font-bold"> {carrera.duracionAnios}</span>
        </p>
        <div className="flex space-x-2">
          <Button className="w-auto" styling="primary">
            {'Inscribirse'}
          </Button>
          <Button className="w-auto" styling="secondary">
            {'Plan de Estudio'}
          </Button>
        </div>
      </div>
    </FormContainer>
  );
}
