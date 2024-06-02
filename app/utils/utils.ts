export const convertirFecha = (fecha: string) => {
  if (fecha !== null) {
    // Crear un objeto Date a partir de la cadena de entrada
    const date = new Date(fecha);

    // Obtener el día, mes y año de la fecha
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexed (0 = Enero, 11 = Diciembre)
    const year = date.getFullYear();

    // Formatear el día y el mes para que tengan siempre dos dígitos
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    // Devolver la fecha formateada
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  return '';
};

export const formatDateHour = (dateString: string) => {
  const parts = dateString.split('T');
  if (parts.length !== 2) {
    throw new Error('Invalid date format. Expected YYYY-MM-DDTHH:mm');
  }

  const datePart = parts[0];
  const timePart = parts[1];

  // Extract date components
  const [year, month, day] = datePart.split('-');

  // Extract time components (minutes and hours)
  const [minutes, hours] = timePart.split(':');

  // Ensure two-digit formatting for month, day, hours, and minutes
  const formattedMonth = month.padStart(2, '0');
  const formattedDay = day.padStart(2, '0');
  const formattedHours = hours.padStart(2, '0');
  const formattedMinutes = minutes.padStart(2, '0');

  // Return the formatted date string with full year
  return `${formattedMinutes}:${formattedHours} ${formattedDay}/${formattedMonth}/${year}`;
};
