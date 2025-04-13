import { TransactionType } from "@/models/transaction";
import { z } from "zod";

export const filterTransactionSchema = z.object({
  minValue: z.coerce.number().optional(),
  maxValue: z.coerce.number().optional(),
  isRecurrent: z.boolean(),
  isInstallment: z.boolean(),
  // label: z
  //   .object({
  //     id: z.string(),
  //     title: z.string(),
  //   })
  //   .optional(),
  type: z.nativeEnum(TransactionType).optional(),
});

export type FilterTransactionFormData = z.infer<typeof filterTransactionSchema>;
