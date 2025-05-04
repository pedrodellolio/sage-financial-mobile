import api from "./axios-config";
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

export async function postBudgetGoal(
  goal: AddBudgetGoalFormData,
  month: number,
  year: number
) {
  try {
    console.log({
      value: goal.value,
      type: goal.type,
      labelId: goal.label.id,
      month,
      year,
    });
    return await api.post<BudgetGoal>(`budgetGoal`, {
      value: goal.value,
      type: goal.type,
      labelId: goal.label.id,
      month,
      year,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function updateBudgetGoal(
  budgetGoalId: string,
  budgetGoal: AddBudgetGoalFormData
) {
  try {
    return await api.put<BudgetGoal>(`budgetGoal`, {
      id: budgetGoalId,
      value: budgetGoal.value,
      type: budgetGoal.type,
      label: budgetGoal.label,
    });
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error;
  }
}

export async function deleteBudgetGoal(goalId: string) {
  try {
    return await api.delete<BudgetGoal>(`budgetGoal/${goalId}`);
  } catch (error: any) {
    throw error;
  }
}
