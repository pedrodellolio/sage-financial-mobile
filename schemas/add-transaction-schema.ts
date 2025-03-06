import { RecurrenceType, TransactionType } from "@/models/transaction";
import { z } from "zod";

export const addTransactionSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  valueBrl: z.string().min(1, "Valor é obrigatória"),
  type: TransactionType,
  label: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .optional(),
  // .nullable(),
  occurredAt: z.coerce.date(),
  // parentTransaction: z.object()
  // installment: number;
  // totalInstallments: number;
  frequency: RecurrenceType,
});

export type AddTransactionFormData = z.infer<typeof addTransactionSchema>;
