export function convertirFecha(fecha: string) {
  // Crear un objeto Date a partir de la cadena de fecha
  const fechaObj = new Date(fecha);

  // Obtener el día, mes y año de la fecha
  const dia = fechaObj.getDate().toString().padStart(2, '0');
  const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
  const anio = fechaObj.getFullYear();

  // Formatear la fecha en el formato "dd/MM/yyyy"
  return `${dia}/${mes}/${anio}`;
}
