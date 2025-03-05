import { Transaction } from "@/models/transaction";
import api from "./axios-config";
import { Wallet } from "@/models/wallet";
import { Summary } from "@/models/summary";

export async function syncWallet(month: number, year: number) {
  try {
    const response = await api.patch<Wallet>(`wallet/sync`, { month, year });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function getWalletsByPeriod(start: Date, end: Date) {
  try {
    const response = await api.get<Wallet[]>(`wallet/get-by-period`, {
      params: { start, end },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw error;
  }
}

export async function getWalletByMonthAndYear(
  month: number,
  year: number
): Promise<Wallet> {
  try {
    const response = await api.get<Wallet>(`wallet/get-by-month-year`, {
      params: { month, year },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function getSummary(
  month: number,
  year: number
): Promise<Summary> {
  const wallet = await getWalletByMonthAndYear(month, year);
  return {
    balance: wallet.incomesBrl - wallet.expensesBrl,
    expenses: wallet.expensesBrl,
    income: wallet.incomesBrl,
  };
}
