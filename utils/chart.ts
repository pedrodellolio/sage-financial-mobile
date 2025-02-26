import { Transaction } from "@/models/transaction";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getLastWeekDaysPeriod, today } from "./date";

export const formatExpensesChart = (data: Transaction[]) => {
  const { start, end } = getLastWeekDaysPeriod();

  const transactionMap = new Map<string, number>();

  data.forEach((t) => {
    const dateKey = format(t.occurredAt, "yyyy-MM-dd"); // Formata a data como string para chave única
    transactionMap.set(
      dateKey,
      (transactionMap.get(dateKey) || 0) + t.valueBrl
    );
  });

  // Criar o array final com todos os dias entre start e end
  return eachDayOfInterval({ start, end }).map((date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    return {
      label: format(date, "d", { locale: ptBR }),
      value: transactionMap.get(dateKey) || 0,
      frontColor: date.getDay() === today.getDay() ? "red" : "",
    };
  });
};
