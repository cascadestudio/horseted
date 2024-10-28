export function ISOtoLastMessageDate(ISO) {
  const date = new Date(ISO);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const diffInTime = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  if (diffInDays === 0 || diffInDays === 1) {
    return "Hier";
  }

  if (diffInDays > 1 && diffInDays < 7) {
    return `il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`;
  }

  if (diffInDays > 0 && diffInDays < 7) {
    return `il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`;
  }

  const options = {
    day: "numeric",
    month: "short",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

export function ISOtoDate(ISO) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(new Date(ISO));
}

export function ISOtoShortDate(ISODate) {
  const date = new Date(ISODate);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
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
