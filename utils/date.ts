import { lastDayOfMonth, startOfMonth } from "date-fns";

export const today = new Date();
export const currentMonth = today.getMonth() + 1;
export const currentYear = today.getFullYear();
const tomorrowDate = new Date(today);
tomorrowDate.setDate(today.getDate() + 1);
export const tomorrow = tomorrowDate;

export const getLastWeekDaysPeriod = () => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  return { start, end };
};

export const getFirstDayOfMonth = (month: number, year: number) => {
  const dataReferencia = new Date(year, month, 1);
  return startOfMonth(dataReferencia);
};

export const getLastDayOfMonth = (month: number, year: number) => {
  const dataReferencia = new Date(year, month, 1);
  return lastDayOfMonth(dataReferencia);
};

export function compareDates(data1: Date, data2: Date) {
  const d1 = new Date(data1);
  const d2 = new Date(data2);

  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  if (d1.getTime() > d2.getTime() || d1.getTime() < d2.getTime()) return false;
  return true; // datas são iguais
}
