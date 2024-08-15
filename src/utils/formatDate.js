export function ISOtoDate(ISO) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(new Date(ISO));
}

export function dateToISO(dateString) {
  // Split the input date string (e.g., "13/09/1989")
  const [day, month, year] = dateString.split("/").map(Number);

  // Create a new Date object using the extracted values
  const date = new Date(year, month - 1, day);

  // Get the current time components
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const milliseconds = currentDate.getMilliseconds();

  // Set the time components to the Date object
  date.setHours(hours, minutes, seconds, milliseconds);

  // Convert the date to an ISO 8601 string with UTC (Z) timezone
  const isoString = date.toISOString();

  return isoString;
}
