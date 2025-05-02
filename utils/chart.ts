import { Transaction, TransactionType } from "@/models/transaction";
import {
  addDays,
  eachDayOfInterval,
  format,
  startOfDay,
  subDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { compareDates, getLastWeekDaysPeriod, today } from "./date";
import { Theme } from "@/constants/theme";
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
    const dateKey = format(t.occurredAt, "yyyy-MM-dd");
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

interface SummaryStack {
  value: number;
  color: string;
  marginBottom?: number;
}

interface SummaryDataItem {
  label: string;
  stacks: SummaryStack[];
}

export const formatSummaryChart = (data: Transaction[]): SummaryDataItem[] => {
  const today = startOfDay(new Date());
  const start = subDays(today, 3);
  const end = addDays(today, 3);

  const expenseMap = new Map<string, number>();
  const incomeMap = new Map<string, number>();

  data.forEach((t) => {
    const dateKey = format(t.occurredAt, "yyyy-MM-dd");
    if (t.type === TransactionType.EXPENSE) {
      expenseMap.set(dateKey, (expenseMap.get(dateKey) || 0) + t.valueBrl);
    } else if (t.type === TransactionType.INCOME) {
      incomeMap.set(dateKey, (incomeMap.get(dateKey) || 0) + t.valueBrl);
    }
  });

  const result: SummaryDataItem[] = [];

  eachDayOfInterval({ start, end }).forEach((date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const expenseValue = expenseMap.get(dateKey) || 0;
    const incomeValue = incomeMap.get(dateKey) || 0;
    const label = format(date, "dd", { locale: ptBR });

    const stacks: SummaryStack[] = [
      { value: expenseValue, color: Theme.colors.primary },
      { value: incomeValue, color: "green", marginBottom: 2 },
    ];

    result.push({ label, stacks });
  });
  return result;
};

export const formatLabelsDistributionChart = (data: Transaction[]) => {
  const sumMap = new Map<string, { value: number; color?: string }>();

  data.forEach((t) => {
    const label = t.label;
    if (!label?.title) return;

    const current = sumMap.get(label.title);
    if (current) {
      current.value += t.valueBrl;
    } else {
      sumMap.set(label.title, {
        value: t.valueBrl,
        color: label.colorHex,
      });
    }
  });

  const result = Array.from(sumMap.entries()).map(
    ([name, { value, color }]) => ({
      name,
      value,
      color: color ?? Theme.colors.secondary,
    })
  );

  return result;
};

export function formatFixedVariableExpensesChart(transactions: Transaction[]) {
  const expenses = transactions.filter(
    (tx) => tx.type === TransactionType.EXPENSE
  );

  const fixedTotal = expenses
    .filter((tx) => tx.frequency !== null)
    .reduce((sum, tx) => sum + tx.valueBrl, 0);

  const variableTotal = expenses
    .filter((tx) => tx.frequency === null)
    .reduce((sum, tx) => sum + tx.valueBrl, 0);
  console.log(fixedTotal, variableTotal);
  return [
    {
      value: fixedTotal,
      color: Theme.colors.secondary,
      tooltipText: fixedTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    },
    {
      value: variableTotal,
      color: "green",
      tooltipText: variableTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    },
  ];
}
