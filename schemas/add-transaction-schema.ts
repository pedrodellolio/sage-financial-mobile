import { TransactionType } from "@/models/transaction";
import { z } from "zod";
import { Label } from "@/models/label";

export const addTransactionSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  valueBrl: z.string().min(1, "Valor é obrigatória"),
  type: z.nativeEnum(TransactionType),
  // label: z
  //   .object({
  //     id: z.string(),
  //     title: z.string(),
  //   })
  //   .nullable()
  //   .refine((data) => data !== null, { message: "Label is required" }),
  occurredAt: z.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date format",
  }),
});

export type AddTransactionFormData = z.infer<typeof addTransactionSchema>;
