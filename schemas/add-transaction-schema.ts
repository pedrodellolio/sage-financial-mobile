import { RecurrenceType, TransactionType } from "@/models/transaction";
import { z } from "zod";

export const addTransactionSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  valueBrl: z
    .string()
    .min(1, "Valor é obrigatória")
    .transform((val) => parseFloat(val)),
  type: z.nativeEnum(TransactionType),
  label: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .optional(),
  occurredAt: z.coerce.date(),
  totalInstallments: z
    .string()
    .transform((val) => parseInt(val))
    .refine((num) => num <= 60, "Número de 60 parcelas permitidas"),
  frequency: z.nativeEnum(RecurrenceType).optional(),
});

export type AddTransactionFormData = z.infer<typeof addTransactionSchema>;
