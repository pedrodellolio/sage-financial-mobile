import { Label } from "./label";

export interface Transaction {
  id: string;
  title: string;
  valueBrl: number;
  type: TransactionType;
  occurredAt: string;
  label: Label | null;
  parentTransaction: Transaction | null;
  installment: number;
  totalInstallments: number;
  frequency: RecurrenceType | null;
  interestPercentage: number;
}

export enum TransactionType {
  EXPENSE,
  INCOME,
}

export enum RecurrenceType {
  WEEKLY,
  BIWEEKLY,
  MONTHLY,
  YEARLY,
}

const RecurrenceTypeMap: Record<RecurrenceType, string> = {
  [RecurrenceType.WEEKLY]: "Semanal",
  [RecurrenceType.BIWEEKLY]: "Quinzenal",
  [RecurrenceType.MONTHLY]: "Mensal",
  [RecurrenceType.YEARLY]: "Anual",
};

const ReverseRecurrenceTypeMap: Record<string, RecurrenceType> = Object.fromEntries(
  Object.entries(RecurrenceTypeMap).map(([key, value]) => [value, Number(key) as RecurrenceType])
);

export const getRecurrenceTypeLabel = (type: RecurrenceType): string => {
  return RecurrenceTypeMap[type] || "Mensal";
};

export const getRecurrenceTypeFromLabel = (label: string): RecurrenceType | null => {
  return ReverseRecurrenceTypeMap[label] ?? null;
};

export const RecurrenceOptions = Object.entries(RecurrenceTypeMap).map(([key, title]) => ({
  id: Number(key),
  title,
}));