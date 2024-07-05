export function convertirFecha(fecha: string) {
  if (!fecha) {
    return '';
  }
  // Create a Date object from the string
  const date = new Date(fecha).toISOString().split('T')[0];
  const parts = date.split('-');
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return formattedDate; // Format the date string
}

export function formatText(text: string) {
  return (
    text.charAt(0).toUpperCase() +
    text.slice(1).toLowerCase().replace(/_/g, ' ')
  );
}

// Para las fechas que vienen con el formato que muestra el GET de cursos en swagger
export function convertirFechaCurso(dateString: string): string {
  if (!dateString) {
    return '';
  }
  // Create a Date object from the string
  const date = new Date(dateString).toISOString().split('T')[0];
  const parts = date.split('-');
  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return formattedDate; // Format the date string
}

export function convertirHora(hora: string) {
  // Divide la cadena en partes utilizando ':' como delimitador
  const partes = hora.split(':');
  // Devuelve las dos primeras partes (HH y MM) unidas por ':'
  return `${partes[0]}:${partes[1]}`;
}
