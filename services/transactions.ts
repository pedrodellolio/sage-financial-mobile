import { Transaction, TransactionType } from "@/models/transaction";
import api from "./axios-config";
import { AddTransactionFormData } from "@/schemas/add-transaction-schema";

export interface AddTransactionDto {
  title: string;
  valueBrl: number;
  type: TransactionType;
  occurredAt: Date;
}

export async function getTransactionsByMonthAndYear(
  month: number,
  year: number
): Promise<Transaction[]> {
  try {
    const response = await api.get<Transaction[]>(
      `transaction/get-by-month-year`,
      {
        params: { month, year },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function getTransactionsByPeriod(
  start: Date,
  end: Date,
  type?: TransactionType
): Promise<Transaction[]> {
  try {
    const response = await api.get<Transaction[]>(`transaction/get-by-period`, {
      params: { start, end, type },
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
  try {
    return await api.post<Transaction>(`transaction`, transaction);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    console.log(transactionId);
    return await api.delete<Transaction>(`transaction/`);
  } catch (error) {
    console.error("Error deleting transactions:", error);
    throw error;
  }
}
