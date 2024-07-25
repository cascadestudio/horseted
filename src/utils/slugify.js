export default function slugify(string) {
  const accentsMap = new Map([
    ["à", "a"],
    ["á", "a"],
    ["â", "a"],
    ["ã", "a"],
    ["ä", "a"],
    ["å", "a"],
    ["è", "e"],
    ["é", "e"],
    ["ê", "e"],
    ["ë", "e"],
    ["ì", "i"],
    ["í", "i"],
    ["î", "i"],
    ["ï", "i"],
    ["ò", "o"],
    ["ó", "o"],
    ["ô", "o"],
    ["õ", "o"],
    ["ö", "o"],
    ["ù", "u"],
    ["ú", "u"],
    ["û", "u"],
    ["ü", "u"],
    ["ý", "y"],
    ["ÿ", "y"],
    ["ç", "c"],
    ["ñ", "n"],
  ]);

  let slug = string.toLowerCase().trim();

  for (let [accentedChar, regularChar] of accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    slug = slug.replace(regex, regularChar);
  }

  slug = slug.replace(/[\s\W-]+/g, "-").replace(/^-+|-+$/g, "");

  return slug;
}
