import { TransactionType } from "@/models/transaction";
import { parse } from "date-fns";
import { z } from "zod";

export const addTransactionSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  valueBrl: z.string().min(1, "Valor é obrigatória"),
  type: z.nativeEnum(TransactionType),
  occurredAt: z.date({
    required_error: 'Date is required',
    invalid_type_error: 'Invalid date format',
  })
});

export type AddTransactionFormData = z.infer<typeof addTransactionSchema>;
