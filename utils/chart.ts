import { Transaction, TransactionType } from "@/models/transaction";
import { eachDayOfInterval, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { compareDates, getLastWeekDaysPeriod, today } from "./date";
import { Theme } from "@/constants/theme";
import { barDataItem, pieDataItem } from "react-native-gifted-charts";
import { Summary } from "@/models/summary";
import { Wallet } from "@/models/wallet";

export const formatBalanceChart = (data: Wallet[]) => {
  var result = data.map((w) => {
    return {
      label: `${w.month}/${w.year}`,
      value: w.expensesBrl - w.incomesBrl,
      frontColor: Theme.colors.secondary,
    };
  });
  return result;
};

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
      frontColor: compareDates(date, today)
        ? Theme.colors.primary
        : Theme.colors.secondary,
    };
  });
};

export const formatSummaryChart = (data: Transaction[]) => {
  const { start, end } = getLastWeekDaysPeriod();
  const expenseMap = new Map();
  const incomeMap = new Map();

  data.forEach((t) => {
    const dateKey = format(t.occurredAt, "yyyy-MM-dd");
    if (t.type === TransactionType.EXPENSE) {
      expenseMap.set(dateKey, (expenseMap.get(dateKey) || 0) + t.valueBrl);
    } else if (t.type === TransactionType.INCOME) {
      incomeMap.set(dateKey, (incomeMap.get(dateKey) || 0) + t.valueBrl);
    }
  });

  const result: barDataItem[] = [];
  eachDayOfInterval({ start, end }).forEach((date, index) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const expenseValue = expenseMap.get(dateKey) || 0;
    const incomeValue = incomeMap.get(dateKey) || 0;
    // const isPrimary = compareDates(date, new Date());
    const frontColor = Theme.colors.secondary;

    // Adiciona a despesa com as propriedades obrigatórias nas posições pares
    result.push({
      value: expenseValue,
      label: format(date, "dd", { locale: ptBR }),
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: "gray" },
      frontColor,
    });

    // Adiciona a receita sem label nas posições ímpares
    result.push({
      value: incomeValue,
      frontColor: "green",
    });
  });

  return result;
};

export const formatLabelsPieChart = (data: Transaction[]) => {
  const expenseMap = new Map();

  data.forEach((t) => {
    if (t.label) {
      const dateKey = format(t.occurredAt, "yyyy-MM-dd");
      expenseMap.set(
        t.label.title,
        (expenseMap.get(dateKey) || 0) + t.valueBrl
      );
    }
  });

  const result: pieDataItem[] = [];
  const labels = data.filter((l) => l.label?.title).map((l) => l.label?.title);
  labels.forEach((label, index) => {
    const expenseValue = expenseMap.get(label) || 0;

    result.push({
      value: expenseValue,
    });
  });

  return result;
};
