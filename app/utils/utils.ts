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
}