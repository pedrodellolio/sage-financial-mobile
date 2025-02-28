import { Transaction, TransactionType } from "@/models/transaction";
import api from "./axios-config";
import { AddTransactionFormData } from "@/schemas/add-transaction-schema";
import { BudgetGoal, BudgetGoalType } from "@/models/budgetGoal";
import { AddBudgetGoalFormData } from "@/schemas/add-budget-goal-schema";

export interface AddBudgetGoalDto {
  value: number;
  type: BudgetGoalType;
  labelId: string;
}

export async function getBudgetGoalById(goalId: string) {
  try {
    const response = await api.get<BudgetGoal>(`budgetGoal/${goalId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }
}

export async function getBudgetGoalsByMonthAndYear(
  month: number,
  year: number
): Promise<BudgetGoal[]> {
  try {
    const response = await api.get<BudgetGoal[]>(
      `budgetGoal/get-by-month-year`,
      {
        params: { month, year },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error;
  }
}

export async function postBudgetGoal(goal: AddBudgetGoalFormData) {
  try {
    return await api.post<Transaction>(`budgetGoal`, {
      value: goal.value,
      type: goal.type,
      labels: goal.labelId,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

// export async function updateBudgetGoal(
//   goalId: string,
//   transaction: AddBudgetGoalFormData
// ) {
//   try {
//     return await api.put<Transaction>(`budgetGoal`, {
//       id: goalId,
//       title: transaction.title,
//       valueBrl: transaction.valueBrl,
//       occurredAt: transaction.occurredAt,
//       // labels: [transaction.label],
//       type: transaction.type,
//     });
//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     throw error;
//   }
// }

export async function deleteBudgetGoal(goalId: string) {
  try {
    return await api.delete<Transaction>(`budgetGoal/${goalId}`);
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error;
  }
}
