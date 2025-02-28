import { z } from "zod";
import { BudgetGoalType } from "@/models/budgetGoal";

export const addBudgetGoalSchema = z.object({
  value: z.string().min(1, "Valor é obrigatória"),
  type: z.nativeEnum(BudgetGoalType),
  labelId: z.string(),
  // label: z
  //   .object({
  //     id: z.string(),
  //     title: z.string(),
  //   })
  //   .nullable()
  //   .refine((data) => data !== null, { message: "Label is required" }),
});

export type AddBudgetGoalFormData = z.infer<typeof addBudgetGoalSchema>;
