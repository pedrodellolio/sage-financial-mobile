import { BudgetGoal } from "./budgetGoal";
import { Transaction } from "./transaction";

export interface Notification {
  transaction?: Transaction;
  budgetGoal?: BudgetGoal;
  triggerDate: string;
  isEnabled: boolean;
}
