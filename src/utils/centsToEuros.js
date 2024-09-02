export function centsToEuros(cents) {
  if (typeof cents !== "number" || isNaN(cents)) {
    throw new Error("Input must be a valid number");
  }

  const euros = (cents / 100).toFixed(2);
  return euros.replace(".", ",");
}
