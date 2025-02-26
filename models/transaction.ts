export interface Transaction {
  id: string;
  title: string;
  valueBrl: number;
  type: TransactionType;
  occurredAt: string;
}

export enum TransactionType {
  EXPENSE,
  INCOME,
}
