"use client";
import { useEffect, useState } from "react";

export default function DetallesCurso() {
  const [curso, setCurso] = useState<any>();
  useEffect(() => {
    const tempCurso = {
      id: 1,
      nombre: "Curso 1",
      estado: "activo",
    };
    setCurso(tempCurso);
  }, []);

  return (
    <div className="relative box-border size-full w-3/6 justify-center overflow-auto">
      <div className="my-2 box-content flex flex-col items-center justify-between rounded-md bg-ivory px-4 py-2 md:flex-row md:align-baseline">
        <div className="flex flex-col rounded-md text-center font-bold text-black md:text-left lg:max-w-md">
          <h3 className="m-0 p-0">Curso: {curso?.nombre}</h3>
          <div className="flex flex-col">
            <p className="font-bold">Estado: {curso?.estado}</p>
          </div>
        </div>
        {/* <div className="flex w-full flex-row justify-evenly rounded-md text-black md:w-fit md:flex-col md:justify-center">
        <div className="flex flex-col">
          <p className="font-bold">Creditos:</p>
          <p>{asignatura?.creditos + " creditos"}</p>
        </div>
      </div>*/}
      </div>
    </div>
  );
}
