export const today = new Date();
export const currentMonth = today.getMonth() + 1;
export const currentYear = today.getFullYear();
const tomorrowDate = new Date(today);
tomorrowDate.setDate(today.getDate() + 1);
export const tomorrow = tomorrowDate;

const prepositions = new Set([
  "de",
  "do",
  "da",
  "das",
  "dos",
  "a",
  "as",
  "o",
  "os",
  "e",
  "em",
  "para",
  "por",
  "com",
  "sobre",
  "entre",
  "sem",
  "até",
  "como",
  "na",
  "no",
  "nas",
  "nos",
]);

export const capitalize = (str: string) => {
  return str
    .split(" ")
    .map((word, index) => {
      if (
        index === 0 ||
        index === str.split(" ").length - 1 ||
        !prepositions.has(word.toLowerCase())
      ) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.toLowerCase();
    })
    .join(" ");
};
