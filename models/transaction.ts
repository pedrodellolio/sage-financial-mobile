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

export const formatRecurrenceType = (option?: RecurrenceType) => {
  switch (option) {
    case RecurrenceType.BIWEEKLY:
      return "Quinzenalmente";
    case RecurrenceType.MONTHLY:
      return "Mensalmente";
    case RecurrenceType.WEEKLY:
      return "Semanalmente";
    default:
      return "Mensalmente";
  }
};

export const toRecurrenceType = (option: string) => {
  switch (option) {
    case "Quinzenalmente":
      return RecurrenceType.BIWEEKLY;
    case "Mensalmente":
      return RecurrenceType.MONTHLY;
    case "Semanalmente":
      return RecurrenceType.WEEKLY;
    default:
      return RecurrenceType.MONTHLY;
  }
};

export const RecurrenceOptions = Object.keys(RecurrenceType)
  .filter((key) => isNaN(Number(key)))
 
