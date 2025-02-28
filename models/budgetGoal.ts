import { Label } from "./label";

export interface BudgetGoal {
  id: string;
  value: number;
  type: BudgetGoalType;
  label: Label;
}

export enum BudgetGoalType {
  PERCENTAGE,
  CURRENCY,
}
