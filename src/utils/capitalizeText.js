export default function capitalizeText(text) {
  return text
    .toLowerCase()
    .replace(/(^|\s)(\S)/g, (match, p1, p2) => p1 + p2.toUpperCase());
}
