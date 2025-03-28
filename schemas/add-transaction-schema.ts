import { RecurrenceType, TransactionType } from "@/models/transaction";
import { z } from "zod";

export const addTransactionSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  valueBrl: z.coerce.number().min(1, "Valor é obrigatória"),
  type: z.nativeEnum(TransactionType),
  label: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .optional(),
  occurredAt: z.coerce.date(),
  totalInstallments: z.coerce.number(),
  frequency: z.nativeEnum(RecurrenceType).optional(),
  interestPercentage: z.coerce.number().transform((i) => i / 100),
});

export type AddTransactionFormData = z.infer<typeof addTransactionSchema>;
