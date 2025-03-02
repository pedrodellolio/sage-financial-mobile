import { Label } from "./label";

export interface Transaction {
  id: string;
  title: string;
  valueBrl: number;
  type: TransactionType;
  occurredAt: string;
  label: Label;
}

export enum TransactionType {
  EXPENSE,
  INCOME,
}
