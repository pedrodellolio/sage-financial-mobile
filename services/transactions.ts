import {
  getRecurrenceTypeLabel,
  RecurrenceOptions,
  Transaction,
  TransactionType,
} from "@/models/transaction";
import api from "./axios-config";
import { AddTransactionFormData } from "@/schemas/add-transaction-schema";
import { FilterTransactionFormData } from "@/schemas/filter-transaction-schema";

export interface AddTransactionDto {
  title: string;
  valueBrl: number;
  type: TransactionType;
  occurredAt: Date;
}

export async function getTransactionById(transactionId: string) {
  try {
    const response = await api.get<Transaction>(`transaction/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
}

export async function getTransactionsByMonthAndYear(
  month: number,
  year: number,
  input?: string,
  filters?: FilterTransactionFormData
): Promise<Transaction[]> {
  try {
    const response = await api.get<Transaction[]>(
      `transaction/get-by-month-year`,
      {
        params: {
          month,
          year,
          input,
          onlyRecurrent: filters?.isRecurrent,
          onlyInstallment: filters?.isInstallment,
          minValue: filters?.minValue,
          maxValue: filters?.maxValue,
          type: filters?.type,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function getTotalExpensesByLabel(
  labelId: string,
  month: number,
  year: number
): Promise<number> {
  try {
    const response = await api.get<number>(`transaction/total`, {
      params: { labelId, month, year },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching total:", error);
    throw error;
  }
}

export async function getTransactionsByPeriod(
  start: Date,
  end: Date,
  type?: TransactionType,
  limit?: number,
  onlyRecurrentOrInstallment: boolean = false
): Promise<Transaction[]> {
  try {
    const response = await api.get<Transaction[]>(`transaction/get-by-period`, {
      params: { start, end, type, limit, onlyRecurrentOrInstallment },
    });
    return response.data.map((t) => {
      return { ...t, occurredAt: t.occurredAt };
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function postTransaction(transaction: AddTransactionFormData) {
  console.log(transaction);
  try {
    return await api.post<boolean>(`transaction`, {
      ...transaction,
      label: transaction.label ?? null,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function updateTransaction(
  transactionId: string,
  transaction: AddTransactionFormData
) {
  try {
    return await api.put<boolean>(`transaction`, {
      ...transaction,
      id: transactionId,
      label: transaction.label ?? null,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    return await api.delete<Transaction>(`transaction/${transactionId}`);
  } catch (error) {
    console.error("Error deleting transactions:", error);
    throw error;
  }
}
