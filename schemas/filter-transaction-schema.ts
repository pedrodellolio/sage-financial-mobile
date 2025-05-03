import { TransactionType } from "@/models/transaction";
import { z } from "zod";

export const filterTransactionSchema = z.object({
  minValue: z.string(),
  maxValue: z.string(),
  isRecurrent: z.boolean(),
  isInstallment: z.boolean(),
  // label: z
  //   .object({
  //     id: z.string(),
  //     title: z.string(),
  //   })
  //   .optional(),
  type: z.nativeEnum(TransactionType).nullable(),
});

export type FilterTransactionFormData = z.infer<typeof filterTransactionSchema>;
