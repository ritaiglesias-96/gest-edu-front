//Para las que vienen formato  yyyy-mm-ddThh:mm con la T en el medio
export function formatDate(dateString: string): string {
  const parts = dateString.split('T');
  if (parts.length !== 2) {
    throw new Error('Invalid date format. Expected YYYY-MM-DDTHH:mm');
  }

  const datePart = parts[0];
  const [year, month, day] = datePart.split('-');

  // Ensure two-digit formatting for month and day
  const formattedMonth = month.padStart(2, '0');
  const formattedDay = day.padStart(2, '0');

  return `${formattedDay}/${formattedMonth}/${year}`;
}

// Para las fechas que vienen con el formato que muestra el GET de cursos en swagger
export function formatDateCurso(dateString: string): string {
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
