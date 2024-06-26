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

// Para las fechas que vienen con el formato que muestra el GET de cursos en swagger
export function convertirFechaCurso(dateString: string): string {
  // Check for empty string input (optional)
  if (!dateString) {
    return '';
  }

  // Create a Date object from the string
  const date = new Date(dateString);

  // Check for invalid date format
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided: ' + dateString); // Throw an error for invalid format
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days

  return `${day}/${month}/${year}`; // Format the date string
}

export function convertirHora(hora: string) {
  // Divide la cadena en partes utilizando ':' como delimitador
  const partes = hora.split(':');
  // Devuelve las dos primeras partes (HH y MM) unidas por ':'
  return `${partes[0]}:${partes[1]}`;
}