export const today = new Date();
export const currentMonth = today.getMonth() + 1;
export const currentYear = today.getFullYear();
const tomorrowDate = new Date(today);
tomorrowDate.setDate(today.getDate() + 1);
export const tomorrow = tomorrowDate;

export const getLastWeekDaysPeriod = () => {
  const end = new Date(); // Today
  end.setHours(23, 59, 59, 999); // Set to end of the day

  const start = new Date();
  start.setDate(start.getDate() - 6); // Go back 6 days to include today (7 days total)
  start.setHours(0, 0, 0, 0); // Set to start of the day

  return { start, end };
};

export function compareDates(data1: Date, data2: Date) {
  // Cria novas instâncias de Date para evitar mutações nas datas originais
  const d1 = new Date(data1);
  const d2 = new Date(data2);

  // Zera as horas, minutos, segundos e milissegundos de ambas as datas
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  // Compara os timestamps (milissegundos desde 1 de janeiro de 1970)
  if (d1.getTime() > d2.getTime() || d1.getTime() < d2.getTime()) return false;
  return true; // datas são iguais
}
