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
